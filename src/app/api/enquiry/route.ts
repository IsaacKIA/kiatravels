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
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<EnquiryPayload>;

    if (!body.fullName?.trim() || !body.whatsapp?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Full name and phone/WhatsApp number are required." },
        { status: 400 }
      );
    }

    const referenceId = `KIA-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const record = {
      referenceId,
      timestamp,
      type: body.type ?? "contact",
      fullName: body.fullName.trim(),
      whatsapp: body.whatsapp.trim(),
      email: body.email?.trim() || undefined,
      service: body.service ?? "general",
      details: body.details ?? {},
    };

    // 1. Structured server log (always captured in Vercel / cloud hosting logs)
    console.info("[KIA_LEAD_CAPTURED]", JSON.stringify(record));

    // 2. Persist locally to .data/enquiries.jsonl when running on writable disk
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

    // 3. Optional Webhook forwarding (Google Sheets / Zapier / Make / Slack)
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      }).catch(() => {});
    }

    // 4. Optional Direct Email via Resend REST API (if RESEND_API_KEY is set)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const detailLines = Object.entries(record.details)
        .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
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
            <h2>New Enquiry Captured (${record.referenceId})</h2>
            <p><strong>Type:</strong> ${record.type}</p>
            <p><strong>Name:</strong> ${record.fullName}</p>
            <p><strong>Phone / WhatsApp:</strong> ${record.whatsapp}</p>
            ${record.email ? `<p><strong>Email:</strong> ${record.email}</p>` : ""}
            <p><strong>Service:</strong> ${record.service}</p>
            <ul>${detailLines}</ul>
            <p><small>Submitted at ${record.timestamp}</small></p>
          `,
        }),
      }).catch(() => {});
    }

    return NextResponse.json({
      ok: true,
      referenceId,
      timestamp,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to process enquiry." },
      { status: 500 }
    );
  }
}
