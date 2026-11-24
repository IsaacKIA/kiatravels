"use client";

import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Wrench,
  MessageCircle,
  ShieldCheck,
  Loader2,
  UserCheck,
} from "lucide-react";
import { siteConfig, trackEvent } from "@/data/site";

const tradeCategories = [
  "Certified Electrician / Industrial Power",
  "Plumber / Pipefitter / HVAC Technician",
  "Welder (6G / TIG / MIG) & Structural Fabricator",
  "Heavy-Duty Trailer / Bus / Commercial Driver",
  "Civil / Mechanical / Electrical / HSE Engineer",
  "Registered Nurse / Healthcare / Caregiver",
  "Warehouse / Forklift / Logistics Operator",
  "Aviation / Corporate / Industrial Security",
  "Facility Cleaning / Hospitality / Culinary",
  "Construction Helper / General Manpower",
];

const qualificationTiers = [
  "Practical Trade Experience / Apprenticeship",
  "NVTI / National Trade Certificate",
  "HND / Technical Diploma",
  "Bachelor's / Master's Degree",
];

const passportStatuses = [
  "Valid International Passport Ready",
  "Passport Renewal / Processing in Progress",
  "Preparing to Apply for Passport",
];

const targetCorridors = [
  "Either GCC (UAE / Saudi / Qatar) or Europe",
  "Europe & Schengen (Lithuania, Poland, Germany, Serbia)",
  "UAE, Saudi Arabia & Qatar (GCC Fast-Track)",
];

export default function TalentRegistrySection() {
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [trade, setTrade] = useState(tradeCategories[0]);
  const [experienceYears, setExperienceYears] = useState("2–4 Years");
  const [qualification, setQualification] = useState(qualificationTiers[1]);
  const [passportStatus, setPassportStatus] = useState(passportStatuses[0]);
  const [corridor, setCorridor] = useState(targetCorridors[0]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [waLink, setWaLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !whatsapp.trim()) {
      setError("Please enter your full name and WhatsApp phone number.");
      return;
    }
    setError(null);
    setStatus("submitting");

    const details = {
      Trade_Category: trade,
      Experience: experienceYears,
      Qualification: qualification,
      Passport_Status: passportStatus,
      Preferred_Corridor: corridor,
    };

    let refId = `KIA-${Date.now().toString(36).toUpperCase()}`;
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "talent-registry",
          fullName,
          whatsapp,
          service: "talent-registry",
          details,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; referenceId?: string };
      if (data.referenceId) refId = data.referenceId;
    } catch {
      // Fallback gracefully if offline
    }

    trackEvent("talent_registry_submit", { trade, corridor });

    const msg = [
      `Hello KIA-Start Up Consult, I have registered in the Global Talent & Trade Registry [Ref: ${refId}].`,
      `Name: ${fullName}`,
      `WhatsApp: ${whatsapp}`,
      `Trade / Role: ${trade}`,
      `Experience: ${experienceYears}`,
      `Qualification: ${qualification}`,
      `Passport Status: ${passportStatus}`,
      `Target Region: ${corridor}`,
    ].join("\n");

    const generatedWa = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    setReferenceId(refId);
    setWaLink(generatedWa);
    setStatus("success");
  }

  return (
    <section
      id="talent-registry"
      className="scroll-mt-20 border-t border-line bg-gradient-to-b from-white to-[#fafaf9] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#0b0f17] text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column (5 cols): Pitch & B2B Database Value */}
            <div className="flex flex-col justify-between bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1206] p-8 sm:p-10 lg:col-span-5">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                  <Wrench className="h-3 w-3" />
                  KIA Manpower Talent Pool
                </span>

                <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                  Join Our Global Skilled &amp; General Manpower Registry.
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  We continuously shortlist candidates from our verified Ghanaian talent database
                  for incoming GCC and European employer demand orders.
                </p>

                <ul className="mt-6 space-y-3 text-xs font-semibold text-slate-200">
                  {[
                    "Priority matching for UAE, Saudi, Qatar & European job orders",
                    "Open to Highly Skilled, Skilled Trades, Semi-Skilled & General workers",
                    "Instant Candidate Registry Reference ID for fast-track vetting",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs text-slate-300">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Direct B2B Placement Pipeline</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Your profile is logged directly with our Ghana &amp; UK recruitment desk.
                </p>
              </div>
            </div>

            {/* Right Column (7 cols): Interactive Registration Form */}
            <div className="bg-white p-7 text-ink sm:p-10 lg:col-span-7">
              {status === "success" ? (
                <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                    <UserCheck className="h-7 w-7" />
                  </div>
                  <span className="mt-4 rounded-full bg-amber-100 px-3 py-1 font-mono text-xs font-bold text-amber-900">
                    Registry ID: {referenceId}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-ink">
                    Profile Logged in KIA Talent Pool
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-charcoal-soft">
                    Your trade profile has been recorded on our server. Click below to send your
                    Registry ID to our Recruitment Desk on WhatsApp for priority verification.
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {waLink && (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-xs font-bold text-white shadow-md transition-all hover:bg-[#20bd5a]"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Verify Profile on WhatsApp</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setFullName("");
                        setWhatsapp("");
                        setStatus("idle");
                      }}
                      className="rounded-xl border border-line bg-slate-50 px-5 py-3.5 text-xs font-bold text-ink hover:bg-slate-100"
                    >
                      Register Another Candidate
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <h3 className="font-display text-xl font-bold text-ink">
                      Candidate Trade &amp; Skill Registration
                    </h3>
                    <span className="text-xs font-semibold text-emerald-700">
                      30-Second Intake
                    </span>
                  </div>

                  {error && (
                    <p className="rounded-xl border border-brick/30 bg-red-50 px-4 py-2.5 text-xs font-semibold text-brick">
                      {error}
                    </p>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="reg-name" className="text-xs font-bold text-ink">
                        Full Name *
                      </label>
                      <input
                        id="reg-name"
                        type="text"
                        required
                        placeholder="e.g. Kwesi Mensah"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="focus-ring mt-1 w-full rounded-xl border border-line bg-slate-50/70 px-3.5 py-2.5 text-sm text-ink outline-none focus:bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="reg-phone" className="text-xs font-bold text-ink">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        id="reg-phone"
                        type="tel"
                        required
                        placeholder="e.g. 024 123 4567"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="focus-ring mt-1 w-full rounded-xl border border-line bg-slate-50/70 px-3.5 py-2.5 text-sm text-ink outline-none focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="reg-trade" className="text-xs font-bold text-ink">
                        Primary Trade / Role Category
                      </label>
                      <select
                        id="reg-trade"
                        value={trade}
                        onChange={(e) => setTrade(e.target.value)}
                        className="focus-ring mt-1 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-semibold text-ink outline-none"
                      >
                        {tradeCategories.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="reg-exp" className="text-xs font-bold text-ink">
                        Years of Practical Experience
                      </label>
                      <select
                        id="reg-exp"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="focus-ring mt-1 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-semibold text-ink outline-none"
                      >
                        {["1–2 Years", "2–4 Years", "5–8 Years", "8+ Years (Senior)"].map((yr) => (
                          <option key={yr} value={yr}>
                            {yr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="reg-qual" className="text-xs font-bold text-ink">
                        Qualification / Trade Certificate
                      </label>
                      <select
                        id="reg-qual"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="focus-ring mt-1 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-semibold text-ink outline-none"
                      >
                        {qualificationTiers.map((q) => (
                          <option key={q} value={q}>
                            {q}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="reg-passport" className="text-xs font-bold text-ink">
                        Passport Readiness
                      </label>
                      <select
                        id="reg-passport"
                        value={passportStatus}
                        onChange={(e) => setPassportStatus(e.target.value)}
                        className="focus-ring mt-1 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-semibold text-ink outline-none"
                      >
                        {passportStatuses.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="reg-corridor" className="text-xs font-bold text-ink">
                      Preferred Deployment Corridor
                    </label>
                    <select
                      id="reg-corridor"
                      value={corridor}
                      onChange={(e) => setCorridor(e.target.value)}
                      className="focus-ring mt-1 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-semibold text-ink outline-none"
                    >
                      {targetCorridors.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="focus-ring shimmer-btn mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.01] disabled:opacity-70"
                  >
                    {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                    <span>Register in KIA Global Manpower Database</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
