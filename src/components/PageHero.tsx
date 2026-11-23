import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Cta = { label: string; href: string; external?: boolean };

export default function PageHero({
  kicker,
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  kicker?: string;
  title: string;
  description: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-[#fafaf9] via-white to-[#fafaf9] py-16 sm:py-24">
      {/* Warm architectural ambient lighting */}
      <div className="pointer-events-none absolute -top-24 right-10 h-80 w-80 rounded-full bg-amber-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          {kicker && (
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 bg-amber-50/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>{kicker}</span>
            </div>
          )}

          <h1 className="font-display text-[2.35rem] leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-soft sm:text-lg">
            {description}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  target={primaryCta.external ? "_blank" : undefined}
                  rel={primaryCta.external ? "noopener noreferrer" : undefined}
                  className="focus-ring shimmer-btn group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <span>{primaryCta.label}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  target={secondaryCta.external ? "_blank" : undefined}
                  rel={secondaryCta.external ? "noopener noreferrer" : undefined}
                  className="focus-ring inline-flex items-center justify-center rounded-xl border border-line bg-white/90 px-7 py-3.5 text-sm font-bold tracking-wide text-charcoal shadow-xs backdrop-blur-sm transition-all hover:border-amber-400 hover:bg-white hover:shadow-md"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
