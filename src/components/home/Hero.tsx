"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Plane,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Clock,
  Play,
} from "lucide-react";
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
  leadTime: string;
  status: string;
  image: string;
  highlights: string[];
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
    visaType: "CAS Student & Skilled Worker CoS",
    leadTime: "3–6 Weeks",
    status: "2026/27 Intakes Active",
    image: "/images/Study Abroad (2).png",
    highlights: ["2-Year Post-Study Work Visa", "28-Day Financial Audit"],
    accentGradient: "from-amber-500/30 to-orange-500/15",
    panelGradient: "from-[#0f172a] to-[#1e1206]",
  },
  {
    id: "germany",
    country: "Germany & Europe",
    city: "Berlin & Vilnius",
    code: "BER",
    flag: "🇩🇪",
    flightTime: "7h 10m via Hub",
    visaType: "Type-D Work Permit & Chancenkarte",
    leadTime: "4–8 Weeks",
    status: "Skilled & General Hiring",
    image: "/images/work abroad (2).png",
    highlights: ["Accommodation + Work Package", "Trades & Warehouse Roles"],
    accentGradient: "from-blue-500/30 to-indigo-500/15",
    panelGradient: "from-[#0f172a] to-[#05101a]",
  },
  {
    id: "uae",
    country: "UAE & Gulf States",
    city: "Dubai & Riyadh",
    code: "DXB",
    flag: "🇦🇪",
    flightTime: "7h 50m Direct",
    visaType: "GCC Sponsored Work & Tourism",
    leadTime: "2–4 Weeks Fast-Track",
    status: "Immediate Deployment",
    image: "/images/Dubai here we come.png",
    highlights: ["100% Tax-Free Salary", "Trades, Security & Aviation"],
    accentGradient: "from-emerald-500/30 to-teal-500/15",
    panelGradient: "from-[#0f172a] to-[#041a0f]",
  },
  {
    id: "ghana",
    country: "Visit Ghana (DMC)",
    city: "Accra & Cape Coast",
    code: "ACC",
    flag: "🇬🇭",
    flightTime: "Inbound Hub",
    visaType: "Heritage, Eco-Tourism & Corporate DMC",
    leadTime: "Custom Itineraries",
    status: "Year-Round Tours Open",
    image: "/images/Visit Ghana.png",
    highlights: ["VIP Airport Protocol & Fleet", "Culture & Heritage Circuits"],
    accentGradient: "from-amber-500/30 to-emerald-500/15",
    panelGradient: "from-[#0f172a] to-[#061e12]",
  },
];

export default function Hero() {
  const [selectedDest, setSelectedDest] = useState<Destination>(destinations[0]);
  const [transitioning, setTransitioning] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleSelect = (dest: Destination) => {
    if (dest.id === selectedDest.id) return;
    setTransitioning(true);
    setTimeout(() => {
      setSelectedDest(dest);
      setTransitioning(false);
    }, 180);
    trackEvent("hero_destination_switch", { destination: dest.city });
  };

  return (
    <section className="aurora-bg relative overflow-hidden bg-[#fafaf9] pt-8 pb-20 sm:pb-28 lg:pt-12 lg:pb-32">
      <div className="aurora-blob-1" />
      <div className="aurora-blob-2" />
      <div className="aurora-blob-3" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        {/* Left Column */}
        <div className="z-10">
          <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-amber-500/35 bg-white/95 px-4 py-1.5 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="pulse-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-bold tracking-wide text-charcoal">
              Ghana HQ &amp; UK Desk &bull; Work, Study &amp; Global Travel
            </span>
          </div>

          <h1 className="mt-5 font-display text-[2.65rem] leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.8rem]">
            Global careers,{" "}
            <span className="gradient-text-gold inline-block">world-class study</span> &amp;
            travel.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal-soft sm:text-lg">
            Verified overseas work placements, university admissions, visa dossiers, and{" "}
            <Link
              href="/partners"
              className="font-semibold text-ink underline decoration-amber-500/80 underline-offset-4 hover:text-amber-800"
            >
              B2B manpower, academic &amp; Ghana DMC partnerships
            </Link>
            .
          </p>

          {/* Interactive Corridor Switcher */}
          <div className="mt-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal-soft/80">
              Click to Preview Active Corridor:
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {destinations.map((dest) => {
                const isActive = selectedDest.id === dest.id;
                return (
                  <button
                    key={dest.id}
                    onClick={() => handleSelect(dest)}
                    type="button"
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "scale-105 bg-ink text-white shadow-md ring-2 ring-ink/20"
                        : "border border-line bg-white/95 text-charcoal hover:border-amber-400 hover:bg-white"
                    }`}
                  >
                    <span className="text-sm">{dest.flag}</span>
                    <span>{dest.country}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary CTA Buttons + Video Reel Trigger */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <StartJourneyButton className="focus-ring shimmer-btn group relative inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-bold tracking-wide text-white shadow-lg shadow-ink/20 transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <span className="inline-flex items-center gap-2">
                Start Your Journey
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </StartJourneyButton>

            <button
              type="button"
              onClick={() => setShowVideoModal(true)}
              className="focus-ring group inline-flex items-center justify-center gap-2.5 rounded-xl border border-line bg-white/95 px-5 py-4 text-sm font-bold text-ink shadow-sm transition-all hover:border-amber-400 hover:shadow-md"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-slate-950 transition-transform group-hover:scale-110">
                <Play className="h-3 w-3 fill-current" />
              </span>
              <span>Watch KIA Reel</span>
            </button>

            <Link
              href="/partners"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-[#0f172a] px-5 py-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-slate-800"
            >
              <Building2 className="h-4 w-4 text-amber-400" />
              <span>B2B Partners</span>
            </Link>
          </div>

          {/* Live Video Thumbnail Strip + Trust Badges */}
          <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-line/70 pt-6">
            <button
              type="button"
              onClick={() => setShowVideoModal(true)}
              className="group relative h-14 w-24 shrink-0 overflow-hidden rounded-xl border border-amber-400/60 bg-slate-900 shadow-md"
              aria-label="Play KIA Travels video"
            >
              <Image
                src="/images/lets fly.png"
                alt="Watch KIA Travels Reel"
                fill
                sizes="96px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors group-hover:bg-black/15">
                <Play className="h-4 w-4 fill-white text-white" />
              </div>
            </button>

            <div className="flex items-center gap-2.5 text-xs">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-200">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-ink">98% Dossier Accuracy</p>
                <p className="text-[11px] text-charcoal-soft">
                  Verified Work, Study &amp; Visa Files
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-ink">500+ Placed &amp; Guided</p>
                <p className="text-[11px] text-charcoal-soft">
                  Across Europe, GCC, UK &amp; North America
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Photo-Backed Interactive Route Showcase */}
        <div className="relative z-10 mx-auto w-full max-w-md lg:max-w-none">
          <div
            className={`card-border-glow absolute -inset-2 rounded-3xl bg-gradient-to-r ${selectedDest.accentGradient} blur-2xl transition-all duration-500`}
          />

          <div
            className={`ticket-card glass-panel relative overflow-hidden rounded-3xl transition-all duration-300 ${
              transitioning ? "scale-[0.985] opacity-70" : "scale-100 opacity-100"
            }`}
          >
            {/* Top Live Destination Photography Banner */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={selectedDest.image}
                alt={`${selectedDest.city}, ${selectedDest.country}`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-black/15" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                  <span>{selectedDest.flag}</span>
                  <span>{selectedDest.country}</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                  <Clock className="h-3 w-3" />
                  {selectedDest.leadTime}
                </span>
              </div>

              <div className="absolute bottom-3.5 left-5 right-5 flex items-end justify-between text-white">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                    {selectedDest.status}
                  </p>
                  <h2 className="font-display text-2xl font-bold text-white">
                    Accra (ACC) ⇄ {selectedDest.city} ({selectedDest.code})
                  </h2>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div
                className={`flight-shimmer rounded-2xl bg-gradient-to-r ${selectedDest.panelGradient} p-4 text-white shadow-inner`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      GHANA HUB
                    </p>
                    <p className="font-display text-2xl font-bold text-white">ACC</p>
                  </div>

                  <div className="flex flex-1 flex-col items-center px-4">
                    <span className="font-mono text-[10px] text-amber-400">
                      {selectedDest.flightTime}
                    </span>
                    <div className="relative my-2 flex w-full items-center">
                      <div className="h-[1.5px] w-full bg-slate-700">
                        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-amber-300" />
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 p-1.5 text-ink shadow-md shadow-amber-400/50">
                        <Plane className="h-3 w-3 rotate-90" />
                      </div>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-slate-300">
                      {selectedDest.visaType}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      CORRIDOR
                    </p>
                    <p className="font-display text-2xl font-bold text-amber-400">
                      {selectedDest.code}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedDest.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200/80 bg-amber-50/70 px-3 py-1.5 text-xs font-bold text-amber-950"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-700" />
                    {h}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-line/70 pt-4">
                <div>
                  <p className="text-xs font-bold text-ink">{selectedDest.country} Desk</p>
                  <p className="text-[11px] text-charcoal-soft">1-on-1 Advisory &amp; Dossier Check</p>
                </div>

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    `Hello KIA-Start Up Consult, I'd like to explore the ${selectedDest.country} (${selectedDest.visaType}) route.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", {
                      location: "hero_boarding_pass",
                      destination: selectedDest.country,
                    })
                  }
                  className="shrink-0 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-charcoal active:scale-95"
                >
                  Inquire Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Lightbox Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0f172a] px-6 py-3.5 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                KIA-Start Up Consult &mdash; Global Mobility &amp; Travel Showcase
              </span>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="rounded-lg bg-white/10 px-3 py-1 text-xs font-bold text-white hover:bg-white/20"
              >
                Close ✕
              </button>
            </div>
            <video
              src="/video/travel abroad.mp4"
              poster="/images/lets fly.png"
              controls
              autoPlay
              playsInline
              className="max-h-[75vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
