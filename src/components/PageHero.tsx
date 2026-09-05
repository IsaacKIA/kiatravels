import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

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
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-[#fafaf9] to-white py-16 sm:py-24">
      {/* Ambient background blur */}
      <div className="pointer-events-none absolute -top-20 right-10 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 left-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        {kicker && (
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 shadow-sm mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>{kicker}</span>
          </div>
        )}

        <h1 className="font-display text-[2.2rem] leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
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
                className="focus-ring inline-flex items-center justify-center rounded-xl border border-line bg-white/90 px-7 py-3.5 text-sm font-bold tracking-wide text-charcoal shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
