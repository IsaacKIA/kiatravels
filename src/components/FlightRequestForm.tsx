"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { siteConfig, trackEvent } from "@/data/site";

type FormState = {
  fullName: string;
  whatsapp: string;
  departure: string;
  destination: string;
  travelDate: string;
  returnDate: string;
  passengers: string;
  website: string; // honeypot — real users never fill this in
};

const initialState: FormState = {
  fullName: "",
  whatsapp: "",
  departure: "",
  destination: "",
  travelDate: "",
  returnDate: "",
  passengers: "1",
  website: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function FlightRequestForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [startedTracking, setStartedTracking] = useState(false);
  const [waLink, setWaLink] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (!startedTracking) {
      setStartedTracking(true);
      trackEvent("form_start", { form: "flight_booking" });
    }
  }

  function validate(v: FormState): Errors {
    const next: Errors = {};
    if (!v.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!v.whatsapp.trim()) next.whatsapp = "Please enter a WhatsApp number we can reach you on.";
    if (!v.departure.trim()) next.departure = "Please enter your departure city.";
    if (!v.destination.trim()) next.destination = "Please enter your destination.";
    if (!v.travelDate) next.travelDate = "Please choose a travel date.";
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (values.website) {
      // Honeypot tripped — silently drop, don't tell the bot why.
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    trackEvent("form_submit", { form: "flight_booking" });
    trackEvent("flight_enquiry", { departure: values.departure, destination: values.destination });

    const message = [
      "Hi, I'd like assistance booking a flight.",
      `Name: ${values.fullName}`,
      `From: ${values.departure}`,
      `To: ${values.destination}`,
      `Travel date: ${values.travelDate}`,
      values.returnDate ? `Return date: ${values.returnDate}` : null,
      `Passengers: ${values.passengers}`,
      `WhatsApp: ${values.whatsapp}`,
    ]
      .filter(Boolean)
      .join("\n");

    const link = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(link, "_blank", "noopener,noreferrer");
    setWaLink(link);
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-sm border border-line bg-white px-6 py-14 text-center">
        <CheckCircle2 className="h-9 w-9 text-gold-deep" aria-hidden />
        <h3 className="mt-4 font-display text-xl text-ink">Request ready</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-charcoal-soft">
          We&rsquo;ve opened WhatsApp with your details filled in — just hit send and our team
          will take it from there.
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
            setValues(initialState);
            setStatus("idle");
            setStartedTracking(false);
            setWaLink(null);
          }}
          className="focus-ring mt-6 text-sm font-semibold text-ink underline underline-offset-4 hover:text-gold-deep"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line bg-white p-7 sm:p-9 shadow-md">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="flight-website">Leave this field empty</label>
        <input
          type="text"
          id="flight-website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Full Name"
          id="fullName"
          value={values.fullName}
          onChange={(v) => update("fullName", v)}
          error={errors.fullName}
        />
        <Field
          label="WhatsApp Number"
          id="whatsapp"
          type="tel"
          value={values.whatsapp}
          onChange={(v) => update("whatsapp", v)}
          error={errors.whatsapp}
        />
        <Field
          label="Departure"
          id="departure"
          value={values.departure}
          onChange={(v) => update("departure", v)}
          error={errors.departure}
        />
        <Field
          label="Destination"
          id="destination"
          value={values.destination}
          onChange={(v) => update("destination", v)}
          error={errors.destination}
        />
        <Field
          label="Travel Date"
          id="travelDate"
          type="date"
          value={values.travelDate}
          onChange={(v) => update("travelDate", v)}
          error={errors.travelDate}
        />
        <Field
          label="Return Date (optional)"
          id="returnDate"
          type="date"
          value={values.returnDate}
          onChange={(v) => update("returnDate", v)}
        />
        <Field
          label="Number of Travellers"
          id="passengers"
          type="number"
          value={values.passengers}
          onChange={(v) => update("passengers", v)}
          min={1}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring shimmer-btn mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        Request Flight Assistance
      </button>
      <p className="mt-3 text-xs text-charcoal-soft">
        This opens WhatsApp with your details pre-filled — we don&rsquo;t book flights directly on
        the site yet.
      </p>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  min,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  min?: number;
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
        min={min}
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
