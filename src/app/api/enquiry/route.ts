import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { siteConfig } from "@/data/site";

export type EnquiryPayload = {
  type: "contact" | "b2b-partnership" | "job-application" | "talent-registry" | "flight-booking";
  fullName: string;
  whatsapp: string;
  email?: string;
  service?: string;
  details?: Record<string, string>;
  website?: string; // Honeypot field — must always be empty
};

const ALLOWED_TYPES = new Set([
  "contact",
  "b2b-partnership",
  "job-application",
  "talent-registry",
  "flight-booking",
]);

// Sliding-window in-memory rate limiter (10 submissions per 10 minutes per IP)
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 10;
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipHits.get(ip) ?? []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX_REQUESTS) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  return false;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeText(input: unknown, maxLength = 300): string {
  if (typeof input !== "string") return "";
  return input.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength);
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Same-origin fetch without explicit origin header
  const host = request.headers.get("host");
  try {
    const originUrl = new URL(origin);
    if (host && originUrl.host === host) return true;
    const allowedSiteHost = new URL(siteConfig.siteUrl).host;
    return originUrl.host === allowedSiteHost || originUrl.hostname === "localhost";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const responseHeaders = { "Cache-Control": "no-store, max-age=0" };

  try {
    // 1. CSRF / Origin Validation
    if (!isSameOrigin(request)) {
      return NextResponse.json(
        { ok: false, error: "Forbidden cross-origin request." },
        { status: 403, headers: responseHeaders }
      );
    }

    // 2. IP Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "local";
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please wait a few minutes and try again." },
        { status: 429, headers: responseHeaders }
      );
    }

    const body = (await request.json()) as Partial<EnquiryPayload>;

    // 3. Server-Side Honeypot Check (silently drop automated bot submissions)
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json(
        {
          ok: true,
          referenceId: `KIA-${Date.now().toString(36).toUpperCase()}`,
          timestamp: new Date().toISOString(),
        },
        { headers: responseHeaders }
      );
    }

    const fullName = sanitizeText(body.fullName, 120);
    const whatsapp = sanitizeText(body.whatsapp, 40);

    if (!fullName || !whatsapp) {
      return NextResponse.json(
        { ok: false, error: "Full name and phone/WhatsApp number are required." },
        { status: 400, headers: responseHeaders }
      );
    }

    const rawType = sanitizeText(body.type, 40);
    const safeType = ALLOWED_TYPES.has(rawType) ? rawType : "contact";
    const email = sanitizeText(body.email, 160) || undefined;
    const service = sanitizeText(body.service, 80) || "general";

    const sanitizedDetails: Record<string, string> = {};
    if (body.details && typeof body.details === "object") {
      for (const [k, v] of Object.entries(body.details).slice(0, 15)) {
        const cleanKey = sanitizeText(k, 60);
        const cleanVal = sanitizeText(v, 500);
        if (cleanKey && cleanVal) {
          sanitizedDetails[cleanKey] = cleanVal;
        }
      }
    }

    const referenceId = `KIA-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const record = {
      referenceId,
      timestamp,
      type: safeType,
      fullName,
      whatsapp,
      email,
      service,
      details: sanitizedDetails,
    };

    // 4. Structured server log (always captured in Vercel / cloud hosting logs)
    console.info("[KIA_LEAD_CAPTURED]", JSON.stringify(record));

    // 5. Persist locally to .data/enquiries.jsonl when running on writable disk
    try {
      const dataDir = path.join(process.cwd(), ".data");
      await fs.mkdir(dataDir, { recursive: true });
      await fs.appendFile(
        path.join(dataDir, "enquiries.jsonl"),
        JSON.stringify(record) + "\n",
        "utf8"
      );
    } catch {
      // Serverless read-only filesystems skip local file append cleanly
    }

    // 6. Optional Webhook forwarding (Google Sheets / Zapier / Make / Slack)
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      }).catch(() => {});
    }

    // 7. Optional Direct Email via Resend REST API (with strict HTML escaping)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const detailLines = Object.entries(record.details)
        .map(([k, v]) => `<li><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</li>`)
        .join("");

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "KIA Portal <onboarding@resend.dev>",
          to: [siteConfig.email],
          subject: `[${record.referenceId}] New ${record.type.toUpperCase()} — ${record.fullName}`,
          html: `
            <h2>New Enquiry Captured (${escapeHtml(record.referenceId)})</h2>
            <p><strong>Type:</strong> ${escapeHtml(record.type)}</p>
            <p><strong>Name:</strong> ${escapeHtml(record.fullName)}</p>
            <p><strong>Phone / WhatsApp:</strong> ${escapeHtml(record.whatsapp)}</p>
            ${record.email ? `<p><strong>Email:</strong> ${escapeHtml(record.email)}</p>` : ""}
            <p><strong>Service:</strong> ${escapeHtml(record.service)}</p>
            <ul>${detailLines}</ul>
            <p><small>Submitted at ${escapeHtml(record.timestamp)}</small></p>
          `,
        }),
      }).catch(() => {});
    }

    return NextResponse.json(
      {
        ok: true,
        referenceId,
        timestamp,
      },
      { headers: responseHeaders }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to process enquiry." },
      { status: 500, headers: responseHeaders }
    );
  }
}
