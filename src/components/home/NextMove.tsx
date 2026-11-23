"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Compass,
  FileCheck,
  Plane,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { services, trackEvent } from "@/data/site";

const primarySlugs = ["work-abroad", "study-abroad", "travel-tourism"];

const serviceVisuals: Record<
  string,
  {
    icon: typeof Briefcase;
    image: string;
    badge: string;
    accent: string;
    glow: string;
    highlights: string[];
    topDestinations: string[];
  }
> = {
  "work-abroad": {
    icon: Briefcase,
    image: "/images/work abroad.png",
    badge: "Europe & GCC Placements",
    accent: "bg-amber-500 text-white",
    glow: "hover:border-amber-400/70 hover:shadow-amber-500/10",
    highlights: [
      "Direct European & GCC employer placements",
      "Skilled trades, engineering, warehouse & cleaning",
      "Accommodation, work permit & flight packages",
    ],
    topDestinations: ["🇱🇹 Lithuania", "🇵🇱 Poland", "🇩🇪 Germany", "🇦🇪 UAE"],
  },
  "study-abroad": {
    icon: GraduationCap,
    image: "/images/Study Abroad.png",
    badge: "2026/27 University Intakes",
    accent: "bg-blue-600 text-white",
    glow: "hover:border-blue-400/70 hover:shadow-blue-500/10",
    highlights: [
      "Undergraduate & Master's degree admissions",
      "2–3 Year Post-Study Work Visa pathways",
      "WAEC English waivers & 28-day financial audit",
    ],
    topDestinations: ["🇬🇧 UK", "🇨🇦 Canada", "🇺🇸 USA", "🇩🇪 Germany"],
  },
  "travel-tourism": {
    icon: Compass,
    image: "/images/Tour Abroad.png",
    badge: "Global Tours & Ghana DMC",
    accent: "bg-emerald-600 text-white",
    glow: "hover:border-emerald-400/70 hover:shadow-emerald-500/10",
    highlights: [
      "Dubai, European & family holiday packages",
      "Inbound Ghana Heritage, Culture & Nature DMC",
      "VIP airport meet, fleet & hotel contracting",
    ],
    topDestinations: ["🇦🇪 Dubai", "🇪🇺 Schengen", "🇬🇭 Visit Ghana", "🇬🇧 UK"],
  },
};

export default function NextMove() {
  const primary = services.filter((s) => primarySlugs.includes(s.slug));
  const secondary = services.filter((s) => !primarySlugs.includes(s.slug));

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Core Mobility Divisions</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Choose your international pathway.
          </h2>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-800 underline underline-offset-4 hover:text-amber-950"
        >
          View all 6 divisions →
        </Link>
      </div>

      {/* Primary Photo-Backed Pathway Cards */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {primary.map((service) => {
          const visual = serviceVisuals[service.slug];
          const Icon = visual.icon;

          return (
            <div
              key={service.slug}
              className={`group glass-card-hover relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white shadow-lg transition-all ${visual.glow}`}
            >
              <div>
                {/* Rich Photo Header */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={visual.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/25 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${visual.accent} shadow-md`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                      {visual.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-5 right-5">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400">
                      DIVISION {service.index}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {visual.topDestinations.map((dest) => (
                      <span
                        key={dest}
                        className="rounded-lg border border-line bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-700"
                      >
                        {dest}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-xs font-semibold text-charcoal">
                    {visual.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-line/60 px-6 py-4">
                <Link
                  href={service.href}
                  onClick={() =>
                    trackEvent(`${service.slug.replace(/-/g, "_")}_view`, {
                      location: "homepage_next_move",
                    })
                  }
                  className="focus-ring inline-flex w-full items-center justify-between rounded-xl bg-slate-100 px-4 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-all group-hover:bg-ink group-hover:text-white"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Visual Photo Cards: Visa Assistance & Flight Booking */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {secondary.map((service) => {
          const isVisa = service.slug === "visa-assistance";
          const SecondaryIcon = isVisa ? FileCheck : Plane;
          const imgSrc = isVisa ? "/images/visa.png" : "/images/flight booking.png";
          const tag = isVisa ? "98% Dossier Accuracy" : "Accra (ACC) Departure Hub";

          return (
            <Link
              key={service.slug}
              href={service.href}
              onClick={() =>
                trackEvent(`${service.slug.replace(/-/g, "_")}_view`, {
                  location: "homepage_next_move_secondary",
                })
              }
              className="photo-card-glow group relative flex overflow-hidden rounded-3xl border border-line bg-white shadow-md"
            >
              <div className="relative w-2/5 shrink-0 overflow-hidden">
                <Image
                  src={imgSrc}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 40vw, 25vw"
                  className="photo-card-img object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900 border border-amber-200">
                      {tag}
                    </span>
                    <SecondaryIcon className="h-4 w-4 text-amber-700" />
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-ink group-hover:text-amber-800">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-charcoal-soft">
                    {service.description}
                  </p>
                </div>

                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-ink group-hover:text-amber-800">
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* High-Impact B2B Institutional Showcase Banner */}
      <div className="relative mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-[#0f172a] text-white shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="relative min-h-[260px] overflow-hidden bg-slate-900 lg:col-span-5">
            <Image
              src="/images/engineer.png"
              alt="B2B Institutional Manpower, Academic & DMC Partnerships"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0f172a]/90" />
            <div className="absolute bottom-4 left-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-md">
                <Building2 className="h-3 w-3" />
                Ghana HQ &bull; UK International Desk
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between p-8 sm:p-10 lg:col-span-7">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
                B2B &amp; INSTITUTIONAL PARTNERSHIPS
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                Partner with KIA across Manpower, Universities &amp; Ghana DMC.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Your accountable Ghanaian partner for{" "}
                <strong className="text-white">Overseas HR Agencies &amp; Employers</strong>{" "}
                (skilled &amp; general workforce),{" "}
                <strong className="text-white">Universities</strong> (vetted student cohorts), and{" "}
                <strong className="text-white">Global Tour Operators</strong> (inbound Ghana DMC).
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/partners"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md transition-all hover:bg-amber-300"
              >
                <span>Explore B2B Corporate Profile</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact?service=b2b-partnership"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10"
              >
                <span>Submit B2B Mandate</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
