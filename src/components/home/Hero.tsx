"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Plane, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import StartJourneyButton from "@/components/StartJourneyButton";
import { siteConfig, trackEvent } from "@/data/site";

interface Destination {
  id: string;
  country: string;
  city: string;
  code: string;
  flag: string;
  flightTime: string;
  visaType: string;
  status: string;
  badgeColor: string;
  accentGradient: string;
  panelGradient: string;
}

const destinations: Destination[] = [
  {
    id: "uk",
    country: "United Kingdom",
    city: "London",
    code: "LHR",
    flag: "🇬🇧",
    flightTime: "6h 40m Direct",
    visaType: "Student & Skilled Worker Route",
    status: "Fall 2026 Intake Open",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    accentGradient: "from-amber-500/25 to-orange-500/12",
    panelGradient: "from-[#0f172a] to-[#1e1206]",
  },
  {
    id: "canada",
    country: "Canada",
    city: "Toronto",
    code: "YYZ",
    flag: "🇨🇦",
    flightTime: "11h 15m 1-Stop",
    visaType: "Study & PGWP Pathway",
    status: "Express & Study Ready",
    badgeColor: "bg-red-100 text-red-900 border-red-300",
    accentGradient: "from-red-500/25 to-rose-500/12",
    panelGradient: "from-[#0f172a] to-[#1a0505]",
  },
  {
    id: "germany",
    country: "Germany",
    city: "Berlin",
    code: "BER",
    flag: "🇩🇪",
    flightTime: "7h 10m Direct",
    visaType: "Opportunity Card / Job Seeker",
    status: "Chancenkarte Active",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
    accentGradient: "from-blue-500/25 to-indigo-500/12",
    panelGradient: "from-[#0f172a] to-[#05101a]",
  },
  {
    id: "uae",
    country: "United Arab Emirates",
    city: "Dubai",
    code: "DXB",
    flag: "🇦🇪",
    flightTime: "7h 50m Direct",
    visaType: "Employment & Tourism",
    status: "Immediate Processing",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    accentGradient: "from-emerald-500/25 to-teal-500/12",
    panelGradient: "from-[#0f172a] to-[#041a0f]",
  },
];

export default function Hero() {
  const [selectedDest, setSelectedDest] = useState<Destination>(destinations[0]);
  const [transitioning, setTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (dest: Destination) => {
    if (dest.id === selectedDest.id) return;
    setTransitioning(true);
    setTimeout(() => {
      setSelectedDest(dest);
      setTransitioning(false);
    }, 220);
    trackEvent("hero_destination_switch", { destination: dest.city });
  };

  return (
    <section className="aurora-bg relative overflow-hidden bg-[#fafaf9] pt-8 pb-20 sm:pb-28 lg:pt-14 lg:pb-32">
      {/* Dynamic Aurora Ambient Light Orbs — now visible */}
      <div className="aurora-blob-1" />
      <div className="aurora-blob-2" />
      <div className="aurora-blob-3" />

      {/* Subtle Dot Grid Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        {/* Left Column: Hero Copy & Actions */}
        <div className="z-10">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/35 bg-white/85 px-4 py-1.5 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="pulse-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-charcoal">
              2026/2027 Admissions &amp; Global Work Visas Active
            </span>
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          </div>

          {/* Headline */}
          <h1 className="mt-5 font-display text-[2.65rem] leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.8rem]">
            Your journey to{" "}
            <span className="gradient-text-gold inline-block">global opportunities</span>{" "}
            starts here.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal-soft sm:text-lg">
            Work abroad. Study abroad. Relocate with confidence.{" "}
            <strong className="font-semibold text-charcoal">KIA-Start Up Consult</strong> provides
            practical, transparent guidance from Ghana to the world&rsquo;s most sought-after
            destinations.
          </p>

          {/* Destination Quick-Select */}
          <div className="mt-7">
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-soft/80">
              Popular Routes — Click to inspect pass:
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {destinations.map((dest) => {
                const isActive = selectedDest.id === dest.id;
                return (
                  <button
                    key={dest.id}
                    onClick={() => handleSelect(dest)}
                    type="button"
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-250 ${
                      isActive
                        ? "bg-ink text-white shadow-md scale-105 ring-2 ring-ink/20"
                        : "bg-white/90 text-charcoal hover:bg-white hover:shadow-sm border border-line hover:border-amber-300/60"
                    }`}
                  >
                    <span className="text-sm">{dest.flag}</span>
                    <span>{dest.city}</span>
                    <span className="text-[10px] opacity-70 font-mono">({dest.code})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary CTA Buttons */}
          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <StartJourneyButton className="focus-ring shimmer-btn group relative inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-lg shadow-ink/25 transition-transform active:scale-[0.98] hover:scale-[1.02]">
              <span className="inline-flex items-center gap-2">
                Start Your Journey
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </StartJourneyButton>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                `Hello KIA Consult, I'm interested in traveling to ${selectedDest.city} (${selectedDest.country}) for ${selectedDest.visaType}. Can you guide me?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", { location: "hero_cta", destination: selectedDest.city })
              }
              className="focus-ring group inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white/90 px-7 py-4 text-sm font-semibold tracking-wide text-charcoal shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md hover:border-emerald-300"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span>Chat with an Advisor</span>
            </a>
          </div>

          {/* Social Proof & Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-line/60 pt-6 text-xs text-charcoal-soft">
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-2">
                {["KW", "AB", "EA"].map((initials, i) => (
                  <div
                    key={initials}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white ring-2 ring-white ${
                      i === 0 ? "bg-amber-500" : i === 1 ? "bg-blue-600" : "bg-emerald-600"
                    }`}
                  >
                    {initials}
                  </div>
                ))}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-[10px] font-bold text-white ring-2 ring-white">
                  +497
                </div>
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-charcoal">500+ Travelers</p>
                <p className="text-[11px] text-charcoal-soft">Guided from Ghana to the world</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-amber-600" />
              <span className="font-medium text-charcoal">Licensed &amp; Transparent Guidance</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Boarding Pass 2.0 */}
        <div className="relative z-10 mx-auto w-full max-w-md lg:max-w-none">
          {/* Animated golden halo glow — now vivid */}
          <div
            className={`card-border-glow absolute -inset-2 rounded-3xl bg-gradient-to-r ${selectedDest.accentGradient} blur-2xl transition-all duration-500`}
          />
          {/* Second layer inner glow */}
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-amber-400/20 via-transparent to-blue-400/10 blur-md" />

          <div
            className={`ticket-card glass-panel relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
              transitioning ? "opacity-60 scale-[0.99]" : "opacity-100 scale-100"
            }`}
          >
            {/* Boarding Pass Header */}
            <div className="flex items-center justify-between border-b border-line/70 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-amber-400 shadow-inner">
                  <Plane className="h-4 w-4 rotate-45" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-ink">
                    KIA GLOBAL BOARDING PASS
                  </p>
                  <p className="text-[10px] text-charcoal-soft font-mono">
                    ELECTRONIC TRAVEL ADVISORY
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  VERIFIED ROUTE
                </span>
              </div>
            </div>

            {/* Flight Route Visualizer — with shimmer */}
            <div
              className={`flight-shimmer my-6 rounded-xl bg-gradient-to-r ${selectedDest.panelGradient} p-5 text-white shadow-inner transition-all duration-400`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
                    ORIGIN
                  </p>
                  <p className="font-display text-3xl font-bold tracking-tight text-white">ACC</p>
                  <p className="text-xs text-slate-300">Accra, GH</p>
                </div>

                {/* Animated Flight Arc */}
                <div className="flex flex-1 flex-col items-center px-4">
                  <span className="text-[10px] font-mono text-amber-400 dest-transition">
                    {selectedDest.flightTime}
                  </span>
                  <div className="relative my-2 flex w-full items-center">
                    <div className="h-[1.5px] w-full bg-slate-700">
                      <div className="h-full w-2/3 bg-gradient-to-r from-transparent via-amber-400 to-amber-300 rounded-full" />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-amber-400 p-1.5 text-ink shadow-lg shadow-amber-400/60">
                      <Plane className="h-3 w-3 rotate-90" />
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400">
                    Direct Guidance
                  </span>
                </div>

                <div className="text-right dest-transition">
                  <p className="text-[11px] font-medium tracking-wider text-slate-400 uppercase">
                    DESTINATION
                  </p>
                  <p className="font-display text-3xl font-bold tracking-tight text-amber-400">
                    {selectedDest.code}
                  </p>
                  <p className="text-xs text-slate-300">{selectedDest.city}</p>
                </div>
              </div>

              {/* Destination flag accent */}
              <div className="mt-3 flex items-center justify-center">
                <span className="text-2xl">{selectedDest.flag}</span>
                <span className="ml-2 text-[10px] font-medium tracking-wide text-slate-400">
                  {selectedDest.country}
                </span>
              </div>
            </div>

            {/* Passenger & Journey Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3 border border-line/60">
                <p className="text-[10px] uppercase font-bold tracking-wider text-charcoal-soft">
                  Candidate
                </p>
                <p className="mt-1 font-semibold text-charcoal text-sm">You (Global Applicant)</p>
                <p className="text-[11px] text-charcoal-soft">From: Kotoka Intl (ACC)</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 border border-line/60 dest-transition">
                <p className="text-[10px] uppercase font-bold tracking-wider text-charcoal-soft">
                  Pathway
                </p>
                <p className="mt-1 font-semibold text-charcoal text-sm leading-tight">
                  {selectedDest.visaType}
                </p>
                <p className="text-[11px] text-amber-700 font-medium">Full Document Support</p>
              </div>
            </div>

            {/* Perforated Tear Line */}
            <div className="perforated my-5" />

            {/* Status & WhatsApp Quick Connect */}
            <div className="flex items-center justify-between gap-3">
              <div className="dest-transition">
                <span
                  className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-bold border ${selectedDest.badgeColor}`}
                >
                  {selectedDest.status}
                </span>
                <p className="mt-1.5 text-[11px] text-charcoal-soft flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  Personalized 1-on-1 Consultation
                </p>
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  `Hi KIA Consult! I am reviewing the ${selectedDest.city} route. How can I start my application?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-charcoal hover:scale-105 active:scale-95 shadow-md"
              >
                Inquire Route →
              </a>
            </div>

            {/* Barcode */}
            <div className="mt-5 border-t border-line/60 pt-3 flex items-center justify-between text-charcoal-soft/40 font-mono text-[9px]">
              <span>KIA-GH-{mounted ? selectedDest.code : "LHR"}-2026</span>
              <div className="flex gap-[2px] h-5 items-end">
                {[12, 18, 8, 20, 14, 22, 10, 16, 24, 12, 8, 18, 14, 20, 10].map((h, i) => (
                  <div key={i} style={{ height: `${h}px` }} className="w-[2px] bg-charcoal/35 rounded-sm" />
                ))}
              </div>
              <span>ISSUED IN ACCRA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
