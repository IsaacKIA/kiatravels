"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, Mail, MessageCircle, Briefcase } from "lucide-react";
import { siteConfig, trackEvent } from "@/data/site";
import { jobs } from "@/data/jobs";
import {
  serviceOptions,
  contactFieldsByService,
  type ContactServiceKey,
} from "@/data/contact-fields";

function isServiceKey(value: string): value is ContactServiceKey {
  return Object.keys(contactFieldsByService).includes(value);
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service");
  const requestedJobSlug = searchParams.get("job");

  const matchedJob = requestedJobSlug
    ? jobs.find((j) => j.slug === requestedJobSlug)
    : undefined;

  const initialService: ContactServiceKey = matchedJob
    ? "work-abroad"
    : requestedService && isServiceKey(requestedService)
      ? requestedService
      : "general";

  const [service, setService] = useState<ContactServiceKey>(initialService);
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [extra, setExtra] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (matchedJob) {
      initial.country = matchedJob.country;
      initial.sector = `${matchedJob.title} (${matchedJob.sector})`;
    }
    return initial;
  });
  const [deliveryChannel, setDeliveryChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [waLink, setWaLink] = useState<string | null>(null);
  const [mailtoLink, setMailtoLink] = useState<string | null>(null);
  const [startedTracking, setStartedTracking] = useState(false);

  // Sync URL query changes if user navigates cleanly
  useEffect(() => {
    if (matchedJob) {
      setService("work-abroad");
      setExtra((prev) => ({
        ...prev,
        country: matchedJob.country,
        sector: `${matchedJob.title} (${matchedJob.sector})`,
      }));
    } else if (requestedService && isServiceKey(requestedService)) {
      setService(requestedService);
    }
  }, [matchedJob, requestedService]);

  const fields = contactFieldsByService[service];

  function track() {
    if (!startedTracking) {
      setStartedTracking(true);
      trackEvent("form_start", { form: "contact", service });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (website) return; // honeypot tripped

    const nextErrors: Record<string, string> = {};
    if (!fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!whatsapp.trim()) {
      nextErrors.whatsapp = "Please enter a phone or WhatsApp number we can reach you on.";
    }
    fields.forEach((field) => {
      if (field.required && !extra[field.id]?.trim()) {
        nextErrors[field.id] = `Please fill in ${field.label.toLowerCase()}.`;
      }
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    trackEvent("form_submit", { form: "contact", service, channel: deliveryChannel });

    // Record lead server-side first so zero B2B or desktop leads are lost
    let refId = `KIA-${Date.now().toString(36).toUpperCase()}`;
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type:
            service === "b2b-partnership"
              ? "b2b-partnership"
              : matchedJob
                ? "job-application"
                : "contact",
          fullName,
          whatsapp,
          email: extra.email,
          service,
          details: extra,
          website,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; referenceId?: string };
      if (data.referenceId) refId = data.referenceId;
    } catch {
      // Continue seamlessly even if offline
    }
    setReferenceId(refId);

    const serviceLabel =
      serviceOptions.find((s) => s.value === service)?.label ?? "General Enquiry";
    const lines = [
      `Hi KIA-Start Up Consult, I have an enquiry — ${serviceLabel} [Ref: ${refId}].`,
      `Name: ${fullName}`,
      `Phone / WhatsApp: ${whatsapp}`,
      ...fields
        .filter((f) => extra[f.id]?.trim())
        .map((f) => `${f.label}: ${extra[f.id]}`),
    ];
    const message = lines.join("\n");
    const generatedWaLink = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    const emailSubject =
      service === "b2b-partnership"
        ? `[${refId}] B2B Partnership Enquiry: ${extra.companyName || fullName} — KIA-Start Up Consult`
        : `[${refId}] ${serviceLabel} — ${fullName}`;
    const generatedMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(message)}`;

    setWaLink(generatedWaLink);
    setMailtoLink(generatedMailto);

    if (deliveryChannel === "email") {
      window.location.href = generatedMailto;
    } else {
      window.open(generatedWaLink, "_blank", "noopener,noreferrer");
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-line bg-white px-6 py-14 text-center shadow-sm">
        <CheckCircle2 className="h-10 w-10 text-emerald-600" aria-hidden />
        {referenceId && (
          <span className="mt-3 rounded-full bg-amber-100 px-3 py-1 font-mono text-xs font-bold text-amber-900">
            Reference ID: {referenceId}
          </span>
        )}
        <h3 className="mt-3 font-display text-xl font-bold text-ink">
          Enquiry Logged &amp; Ready to Send
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal-soft">
          Your enquiry has been logged on our server.{" "}
          {deliveryChannel === "email"
            ? "We've also opened your email client with your details pre-filled, or you can send it instantly via WhatsApp below."
            : "We've opened WhatsApp with your details pre-filled — just hit send, or use the official email button below."}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-xs font-bold text-white shadow-xs transition-all hover:brightness-95"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Send via WhatsApp</span>
            </a>
          )}
          {mailtoLink && (
            <a
              href={mailtoLink}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-slate-50 px-6 py-3 text-xs font-bold text-ink transition-all hover:border-amber-400 hover:bg-white"
            >
              <Mail className="h-4 w-4 text-amber-700" />
              <span>Send via Email ({siteConfig.email})</span>
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            setFullName("");
            setWhatsapp("");
            setExtra({});
            setStatus("idle");
            setWaLink(null);
            setMailtoLink(null);
            setStartedTracking(false);
          }}
          className="focus-ring mt-7 text-xs font-semibold text-charcoal-soft underline underline-offset-4 hover:text-ink"
        >
          Start another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-line bg-white p-7 shadow-md sm:p-9"
    >
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          type="text"
          id="contact-website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {matchedJob && service === "work-abroad" && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-300/80 bg-amber-50/80 p-4">
          <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-amber-800" />
          <div className="text-xs">
            <p className="font-bold text-amber-950">
              Applying for: {matchedJob.countryFlagEmoji} {matchedJob.title}
            </p>
            <p className="mt-0.5 text-amber-900/80">
              We&rsquo;ve pre-filled the target country and role below. Complete your details to
              proceed.
            </p>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="service" className="text-sm font-medium text-ink">
          What&rsquo;s this about?
        </label>
        <select
          id="service"
          value={service}
          onChange={(e) => {
            const nextService = e.target.value as ContactServiceKey;
            setService(nextService);
            setExtra({});
            if (nextService === "b2b-partnership") {
              setDeliveryChannel("email");
            }
            track();
          }}
          className="focus-ring mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none"
        >
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextField
          label={service === "b2b-partnership" ? "Contact Person & Title" : "Full Name"}
          id="fullName"
          value={fullName}
          onChange={(v) => {
            setFullName(v);
            track();
          }}
          error={errors.fullName}
        />
        <TextField
          label={service === "b2b-partnership" ? "Direct Phone / WhatsApp" : "WhatsApp Number"}
          id="whatsapp"
          type="tel"
          value={whatsapp}
          onChange={(v) => {
            setWhatsapp(v);
            track();
          }}
          error={errors.whatsapp}
        />
      </div>

      {fields
        .filter((f) => f.type !== "textarea")
        .map((field) => (
          <div key={field.id} className="mt-5">
            <TextField
              label={field.label}
              id={field.id}
              type={field.type}
              value={extra[field.id] ?? ""}
              onChange={(v) => {
                setExtra((prev) => ({ ...prev, [field.id]: v }));
                track();
              }}
              error={errors[field.id]}
            />
          </div>
        ))}

      {fields
        .filter((f) => f.type === "textarea")
        .map((field) => (
          <div key={field.id} className="mt-5">
            <label htmlFor={field.id} className="text-sm font-medium text-ink">
              {field.label}
            </label>
            <textarea
              id={field.id}
              rows={4}
              value={extra[field.id] ?? ""}
              onChange={(e) => {
                setExtra((prev) => ({ ...prev, [field.id]: e.target.value }));
                track();
              }}
              aria-invalid={Boolean(errors[field.id])}
              aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
              className={`focus-ring mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-ink outline-none ${
                errors[field.id] ? "border-brick" : "border-line"
              }`}
            />
            {errors[field.id] && (
              <p id={`${field.id}-error`} className="mt-1.5 text-xs text-brick">
                {errors[field.id]}
              </p>
            )}
          </div>
        ))}

      {/* Delivery preference selector */}
      <div className="mt-6">
        <p className="text-xs font-semibold text-charcoal-soft">Preferred submission channel:</p>
        <div className="mt-2 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setDeliveryChannel("whatsapp")}
            className={`focus-ring flex items-center justify-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all ${
              deliveryChannel === "whatsapp"
                ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                : "border-line bg-white text-charcoal-soft hover:border-slate-300"
            }`}
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span>Instant WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={() => setDeliveryChannel("email")}
            className={`focus-ring flex items-center justify-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all ${
              deliveryChannel === "email"
                ? "border-amber-500 bg-amber-50 text-amber-950"
                : "border-line bg-white text-charcoal-soft hover:border-slate-300"
            }`}
          >
            <Mail className="h-3.5 w-3.5 text-amber-700" />
            <span>Official Email</span>
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring shimmer-btn mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {deliveryChannel === "email" ? "Continue via Official Email" : "Continue on WhatsApp"}
      </button>
      <p className="mt-3 text-xs text-charcoal-soft">
        {deliveryChannel === "email"
          ? `Opens your email client addressed to ${siteConfig.email} with your enquiry details.`
          : "Opens WhatsApp with your enquiry pre-filled (with an email option on the next screen)."}
      </p>
    </form>
  );
}

function TextField({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`focus-ring mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-ink outline-none ${
          error ? "border-brick" : "border-line"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-brick">
          {error}
        </p>
      )}
    </div>
  );
}
