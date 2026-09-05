"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, GraduationCap, Compass, FileCheck, Plane, CheckCircle } from "lucide-react";
import { services, trackEvent } from "@/data/site";

const primarySlugs = ["work-abroad", "study-abroad", "travel-tourism"];

const serviceVisuals: Record<
  string,
  {
    icon: typeof Briefcase;
    accent: string;
    glow: string;
    highlights: string[];
    topDestinations: string[];
  }
> = {
  "work-abroad": {
    icon: Briefcase,
    accent: "bg-amber-500 text-white",
    glow: "group-hover:border-amber-400/60 group-hover:shadow-amber-500/10",
    highlights: ["Direct employer sponsorship pathways", "CV & Cover letter overhaul for international ATS", "Work permit documentation readiness"],
    topDestinations: ["🇬🇧 UK", "🇩🇪 Germany", "🇦🇪 UAE", "🇶🇦 Qatar"],
  },
  "study-abroad": {
    icon: GraduationCap,
    accent: "bg-blue-600 text-white",
    glow: "group-hover:border-blue-400/60 group-hover:shadow-blue-500/10",
    highlights: ["Undergraduate & Post-graduate admissions", "Post-Study Work Permit (PGWP) eligibility guidance", "Scholarship & tuition discount advice"],
    topDestinations: ["🇨🇦 Canada", "🇬🇧 UK", "🇺🇸 USA", "🇩🇪 Germany"],
  },
  "travel-tourism": {
    icon: Compass,
    accent: "bg-emerald-600 text-white",
    glow: "group-hover:border-emerald-400/60 group-hover:shadow-emerald-500/10",
    highlights: ["Custom tourist itineraries & hotel vouchers", "Conference & business delegation trips", "Travel insurance & protocol advice"],
    topDestinations: ["🇦🇪 Dubai", "🇹🇷 Turkey", "🇪🇺 Schengen", "🇿🇦 S. Africa"],
  },
};

export default function NextMove() {
  const primary = services.filter((s) => primarySlugs.includes(s.slug));
  const secondary = services.filter((s) => !primarySlugs.includes(s.slug));

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
            Pathways to Success
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            What&rsquo;s your next move?
          </h2>
          <p className="mt-4 text-base text-charcoal-soft">
            Start with the big decision. We provide end-to-end guidance from preliminary consultation
            to departure so you never feel lost.
          </p>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-800 hover:text-amber-950 underline underline-offset-4"
        >
          View all specialized services →
        </Link>
      </div>

      {/* Primary Pathway Cards */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {primary.map((service) => {
          const visual = serviceVisuals[service.slug] || {
            icon: Briefcase,
            accent: "bg-ink text-white",
            glow: "",
            highlights: [],
            topDestinations: [],
          };
          const Icon = visual.icon;

          return (
            <div
              key={service.slug}
              className={`group glass-card-hover relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-lg transition-all ${visual.glow}`}
            >
              {/* Subtle gradient backdrop on card header */}
              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${visual.accent} shadow-md`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-mono text-sm font-bold text-slate-300">
                  {service.index}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="font-display text-2xl font-bold text-ink group-hover:text-amber-700 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
                  {service.description}
                </p>

                {/* Popular Destinations Chips */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {visual.topDestinations.map((dest) => (
                    <span
                      key={dest}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700"
                    >
                      {dest}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-charcoal-soft">
                  {visual.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to action */}
              <div className="mt-7 pt-4 border-t border-line/60">
                <Link
                  href={service.href}
                  onClick={() =>
                    trackEvent(`${service.slug.replace(/-/g, "_")}_view`, {
                      location: "homepage_next_move",
                    })
                  }
                  className="focus-ring inline-flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-charcoal transition-all group-hover:bg-ink group-hover:text-white"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Services Strip */}
      <div className="mt-14 rounded-2xl border border-line bg-gradient-to-r from-slate-50 via-white to-amber-50/40 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Essential Travel Support
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-ink">
              Need assistance with documentation or flight bookings?
            </h3>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {secondary.map((service) => {
            const isVisa = service.slug === "visa-assistance";
            const SecondaryIcon = isVisa ? FileCheck : Plane;

            return (
              <div
                key={service.slug}
                className="group flex items-center justify-between gap-4 rounded-xl border border-line/80 bg-white p-5 shadow-sm transition-all hover:border-amber-400/50 hover:shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-800 transition-transform group-hover:scale-105">
                    <SecondaryIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-ink group-hover:text-amber-800 transition-colors">
                      {service.title}
                    </h4>
                    <p className="mt-0.5 text-xs text-charcoal-soft line-clamp-1">
                      {service.description}
                    </p>
                  </div>
                </div>

                <Link
                  href={service.href}
                  onClick={() =>
                    trackEvent(`${service.slug.replace(/-/g, "_")}_view`, {
                      location: "homepage_next_move_secondary",
                    })
                  }
                  className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-slate-50 text-charcoal transition-all group-hover:bg-ink group-hover:text-white"
                  aria-label={service.ctaLabel}
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
