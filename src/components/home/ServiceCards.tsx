"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, GraduationCap, Compass, FileCheck, Plane } from "lucide-react";
import { services, trackEvent } from "@/data/site";

const serviceIcons: Record<string, typeof Briefcase> = {
  "work-abroad": Briefcase,
  "study-abroad": GraduationCap,
  "visa-assistance": FileCheck,
  "flight-booking": Plane,
  "travel-tourism": Compass,
};

export default function ServiceCards({
  heading = "What are you planning?",
  description = "Choose where your journey begins. Each service starts with a conversation, not a form.",
  location = "homepage_cards",
}: {
  heading?: string;
  description?: string;
  location?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="max-w-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 mb-3">
          Our Specializations
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 text-base text-charcoal-soft">{description}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = serviceIcons[service.slug] || Briefcase;

          return (
            <div
              key={service.slug}
              className="glass-card-hover group relative flex flex-col justify-between rounded-2xl border border-line bg-white p-7 shadow-sm transition-all hover:border-amber-400 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-800 transition-transform group-hover:scale-110 group-hover:bg-ink group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-300">
                    {service.index}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold text-ink group-hover:text-amber-800 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-charcoal-soft">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-line/60">
                <Link
                  href={service.href}
                  onClick={() =>
                    trackEvent(`${service.slug.replace(/-/g, "_")}_view`, { location })
                  }
                  className="focus-ring inline-flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 text-xs font-bold text-charcoal transition-all group-hover:bg-ink group-hover:text-white"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
