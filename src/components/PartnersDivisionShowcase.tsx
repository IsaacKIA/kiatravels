"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Compass,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { trackEvent } from "@/data/site";

type DivisionId = "workforce" | "education" | "tourism";

const divisions: {
  id: DivisionId;
  code: string;
  label: string;
  badge: string;
  icon: typeof Briefcase;
  ctaLabel: string;
  cards: {
    title: string;
    subtitle: string;
    badge: string;
    image: string;
    tags: string[];
    span?: string;
  }[];
}[] = [
  {
    id: "workforce",
    code: "01",
    label: "Workforce & Manpower",
    badge: "GCC & Europe Supply",
    icon: Briefcase,
    ctaLabel: "Submit Manpower Demand Order",
    cards: [
      {
        title: "Highly Skilled & Engineering",
        subtitle: "Tier I — Executive & Technical",
        badge: "Degree & License Verified",
        image: "/images/engineer.png",
        tags: ["Engineers & HSE", "Nurses & Healthcare", "Site Managers"],
        span: "md:col-span-7",
      },
      {
        title: "Certified Electricians & Power",
        subtitle: "Tier II — Trade-Tested Technicians",
        badge: "Practical Trade-Tested",
        image: "/images/Electrician worker.png",
        tags: ["Industrial Electricians", "6G Welders", "Heavy Drivers"],
        span: "md:col-span-5",
      },
      {
        title: "Plumbing, HVAC & Mechanical",
        subtitle: "Tier II & III — Technical & Operations",
        badge: "Police CID Cleared",
        image: "/images/plumber work.png",
        tags: ["Plumbers & Pipefitters", "HVAC Techs", "Warehouse Staff"],
        span: "md:col-span-5",
      },
      {
        title: "Facility, Hospitality & General Workforce",
        subtitle: "Tier IV — High-Volume Deployment",
        badge: "GAMCA Medical Ready",
        image: "/images/Cleaning.png",
        tags: ["Facility Cleaners", "Construction Helpers", "Hospitality & Security"],
        span: "md:col-span-7",
      },
    ],
  },
  {
    id: "education",
    code: "02",
    label: "Universities & Study",
    badge: "UK • Canada • USA • EU",
    icon: GraduationCap,
    ctaLabel: "Partner as an Academic Institution",
    cards: [
      {
        title: "Partner University Recruitment",
        subtitle: "Undergraduate & Postgraduate Cohorts",
        badge: "High Visa Grant Rate",
        image: "/images/University Campus.png",
        tags: ["WAEC Verification", "CAS / LOA Protection", "Fast Conversion"],
        span: "md:col-span-7",
      },
      {
        title: "28-Day Financial & Sponsor Audit",
        subtitle: "Pre-CAS Proof-of-Funds Screening",
        badge: "Zero Refusal Traps",
        image: "/images/University area view.png",
        tags: ["Bank Statement Audit", "Sponsor Vetting", "Tuition Readiness"],
        span: "md:col-span-5",
      },
      {
        title: "Campus Cohorts & Group Study",
        subtitle: "In-Country Fairs & Representation",
        badge: "Ghana-Wide Reach",
        image: "/images/Group study.png",
        tags: ["Campus Info Sessions", "UKVI Interview Prep", "Group Flights"],
        span: "md:col-span-5",
      },
      {
        title: "Global Graduate Mobility",
        subtitle: "2–3 Year Post-Study Work Pathways",
        badge: "PSW • PGWP • STEM OPT",
        image: "/images/Study Abroad.png",
        tags: ["UK Graduate Route", "Canada DLI & PGWP", "US F-1 & Europe"],
        span: "md:col-span-7",
      },
    ],
  },
  {
    id: "tourism",
    code: "03",
    label: "Travel & Ghana DMC",
    badge: "Aviation & Inbound Tours",
    icon: Compass,
    ctaLabel: "Request DMC or Corporate Travel Proposal",
    cards: [
      {
        title: "Visit Ghana Destination Management (DMC)",
        subtitle: "Inbound Tour Operator & Diaspora Partner",
        badge: "Full Ground Execution",
        image: "/images/Visit Ghana.png",
        tags: ["VIP Airport Meet", "Chauffeur Fleet", "4★/5★ Hotel Blocks"],
        span: "md:col-span-7",
      },
      {
        title: "UNESCO Castles, Culture & Royal Heritage",
        subtitle: "Accra • Cape Coast • Elmina • Kumasi",
        badge: "Curated Circuits",
        image: "/images/Ghana heritage.png",
        tags: ["Heritage Castles", "Royal Festivals", "Eco-Tourism"],
        span: "md:col-span-5",
      },
      {
        title: "Corporate & Workforce Group Aviation",
        subtitle: "Kotoka International (ACC) Departure Hub",
        badge: "In-House Flight Desk",
        image: "/images/lets fly.png",
        tags: ["Labor Cohort Fares", "Executive Delegations", "Flight Manifests"],
        span: "md:col-span-5",
      },
      {
        title: "Dubai, UAE & International Holiday Packages",
        subtitle: "Outbound Leisure & MICE Conferences",
        badge: "E-Visa + Hotel + Flights",
        image: "/images/Dubai visit.png",
        tags: ["Dubai Luxury Tours", "Schengen Holidays", "Family Packages"],
        span: "md:col-span-7",
      },
    ],
  },
];

export default function PartnersDivisionShowcase() {
  const [activeTab, setActiveTab] = useState<DivisionId>("workforce");
  const current = divisions.find((d) => d.id === activeTab) ?? divisions[0];

  return (
    <section id="b2b-divisions" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      {/* Header + Interactive 3-Division Tabs */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Interactive B2B Showcase
          </span>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Three B2B Divisions. Zero Friction.
          </h2>
        </div>

        {/* 3 Visual Tab Buttons */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {divisions.map((div) => {
            const Icon = div.icon;
            const isActive = div.id === activeTab;
            return (
              <button
                key={div.id}
                type="button"
                onClick={() => {
                  setActiveTab(div.id);
                  trackEvent("b2b_division_switch", { division: div.id });
                }}
                className={`focus-ring group flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? "scale-[1.02] border-ink bg-[#0f172a] text-white shadow-lg"
                    : "border-line bg-white text-ink hover:border-amber-400 hover:shadow-sm"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isActive
                      ? "bg-amber-400 text-slate-950"
                      : "bg-amber-50 text-amber-800 group-hover:bg-ink group-hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isActive ? "text-amber-400" : "text-charcoal-soft"
                    }`}
                  >
                    {div.badge}
                  </p>
                  <p className="truncate font-display text-sm font-bold">{div.label}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 12-Column Asymmetric Photographic Bento Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12">
        {current.cards.map((card) => (
          <Link
            key={card.title}
            href="/contact?service=b2b-partnership"
            className={`photo-card-glow group relative flex h-80 flex-col justify-between overflow-hidden rounded-3xl border border-line bg-slate-900 p-6 text-white shadow-xl ${card.span ?? "md:col-span-6"}`}
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="photo-card-img object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17]/95 via-[#0b0f17]/35 to-black/15" />

            {/* Top Row: Badge + Arrow */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="rounded-full bg-amber-400 px-3.5 py-1 text-[11px] font-bold text-slate-950 shadow-md">
                {card.badge}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-md backdrop-blur-md transition-transform group-hover:scale-110 group-hover:bg-amber-400">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>

            {/* Bottom Row: Title + Compact Pill Tags */}
            <div className="relative z-10">
              <p className="text-xs font-semibold text-amber-300">{card.subtitle}</p>
              <h3 className="mt-0.5 font-display text-2xl font-bold text-white sm:text-3xl">
                {card.title}
              </h3>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Single Sleek Action Bar */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-white px-6 py-4 shadow-xs sm:flex-row">
        <div className="flex items-center gap-2.5 text-xs font-bold text-ink">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span>Ready to execute {current.label} mandates from Ghana</span>
        </div>
        <Link
          href="/contact?service=b2b-partnership"
          className="focus-ring inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-charcoal"
        >
          <span>{current.ctaLabel}</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
