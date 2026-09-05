"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import { siteConfig, trackEvent } from "@/data/site";
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
  const initialService: ContactServiceKey =
    requestedService && isServiceKey(requestedService) ? requestedService : "general";

  const [service, setService] = useState<ContactServiceKey>(initialService);
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [extra, setExtra] = useState<Record<string, string>>({});
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [waLink, setWaLink] = useState<string | null>(null);
  const [startedTracking, setStartedTracking] = useState(false);

  const fields = contactFieldsByService[service];

  function track() {
    if (!startedTracking) {
      setStartedTracking(true);
      trackEvent("form_start", { form: "contact", service });
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (website) return; // honeypot tripped

    const nextErrors: Record<string, string> = {};
    if (!fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!whatsapp.trim()) nextErrors.whatsapp = "Please enter a WhatsApp number we can reach you on.";
    fields.forEach((field) => {
      if (field.required && !extra[field.id]?.trim()) {
        nextErrors[field.id] = `Please fill in ${field.label.toLowerCase()}.`;
      }
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    trackEvent("form_submit", { form: "contact", service });

    const serviceLabel = serviceOptions.find((s) => s.value === service)?.label ?? "General Enquiry";
    const lines = [
      `Hi, I have an enquiry — ${serviceLabel}.`,
      `Name: ${fullName}`,
      `WhatsApp: ${whatsapp}`,
      ...fields
        .filter((f) => extra[f.id]?.trim())
        .map((f) => `${f.label}: ${extra[f.id]}`),
    ];
    const message = lines.join("\n");
    const link = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(link, "_blank", "noopener,noreferrer");
    setWaLink(link);
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-sm border border-line bg-white px-6 py-14 text-center">
        <CheckCircle2 className="h-9 w-9 text-gold-deep" aria-hidden />
        <h3 className="mt-4 font-display text-xl text-ink">Enquiry ready</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-charcoal-soft">
          We&rsquo;ve opened WhatsApp with your details filled in — just hit send.
        </p>
        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-4 text-sm font-semibold text-gold-deep underline underline-offset-4"
          >
            Didn&rsquo;t open? Click here to open WhatsApp
          </a>
        )}
        <button
          type="button"
          onClick={() => {
            setFullName("");
            setWhatsapp("");
            setExtra({});
            setStatus("idle");
            setWaLink(null);
            setStartedTracking(false);
          }}
          className="focus-ring mt-6 text-sm font-semibold text-ink underline underline-offset-4 hover:text-gold-deep"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line bg-white p-7 sm:p-9 shadow-md">
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

      <div>
        <label htmlFor="service" className="text-sm font-medium text-ink">
          What&rsquo;s this about?
        </label>
        <select
          id="service"
          value={service}
          onChange={(e) => {
            setService(e.target.value as ContactServiceKey);
            setExtra({});
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
          label="Full Name"
          id="fullName"
          value={fullName}
          onChange={(v) => {
            setFullName(v);
            track();
          }}
          error={errors.fullName}
        />
        <TextField
          label="WhatsApp Number"
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

      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring shimmer-btn mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        Send Enquiry
      </button>
      <p className="mt-3 text-xs text-charcoal-soft">
        This opens WhatsApp with your details pre-filled.
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
