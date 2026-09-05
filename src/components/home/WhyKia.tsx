import { whyKia } from "@/data/site";
import { UserCheck, Compass, Globe, Sparkles, Headphones, ArrowUpRight } from "lucide-react";

const icons = [UserCheck, Compass, Globe, Sparkles, Headphones];

const cardThemes = [
  // Hero card (index 0) — dark premium
  {
    wrapper: "why-hero-card lg:col-span-2 group relative rounded-2xl p-8",
    iconBg: "bg-amber-400/15 text-amber-400 ring-1 ring-amber-400/30",
    titleColor: "text-white group-hover:text-amber-300",
    bodyColor: "text-slate-400",
    isHero: true,
  },
  // Regular cards
  {
    wrapper: "glass-card-hover group relative rounded-2xl border border-line bg-white p-7 shadow-sm transition-all hover:border-blue-400/40",
    iconBg: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    titleColor: "text-ink group-hover:text-blue-700",
    bodyColor: "text-charcoal-soft",
    isHero: false,
  },
  {
    wrapper: "glass-card-hover group relative rounded-2xl border border-line bg-white p-7 shadow-sm transition-all hover:border-emerald-400/40",
    iconBg: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    titleColor: "text-ink group-hover:text-emerald-700",
    bodyColor: "text-charcoal-soft",
    isHero: false,
  },
  {
    wrapper: "glass-card-hover group relative rounded-2xl border border-line bg-white p-7 shadow-sm transition-all hover:border-violet-400/40",
    iconBg: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
    titleColor: "text-ink group-hover:text-violet-700",
    bodyColor: "text-charcoal-soft",
    isHero: false,
  },
  {
    wrapper: "glass-card-hover group relative rounded-2xl border border-line bg-white p-7 shadow-sm transition-all hover:border-amber-400/40",
    iconBg: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    titleColor: "text-ink group-hover:text-amber-700",
    bodyColor: "text-charcoal-soft",
    isHero: false,
  },
];

export default function WhyKia() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      {/* Section Header */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
          <Sparkles className="h-3 w-3 text-amber-600" />
          The KIA Advantage
        </div>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
          More than a service.{" "}
          <span className="gradient-text-gold">A partner</span> for your global journey.
        </h2>
        <p className="mt-4 text-base text-charcoal-soft leading-relaxed">
          Navigating international applications can feel overwhelming. We provide constant advocacy,
          meticulous attention to detail, and realistic timelines — from Ghana to the world.
        </p>
      </div>

      {/* Cards Grid — hero card spans 2 cols */}
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {whyKia.map((item, idx) => {
          const Icon = icons[idx % icons.length];
          const theme = cardThemes[idx % cardThemes.length];

          return (
            <div key={item.title} className={theme.wrapper}>
              {/* Hero card ambient glow */}
              {theme.isHero && (
                <>
                  <div className="pointer-events-none absolute top-0 right-0 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />
                  <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full bg-blue-400/10 blur-2xl" />
                </>
              )}

              <div className="relative">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${theme.iconBg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3
                  className={`mt-5 font-display text-xl font-bold transition-colors ${theme.titleColor} ${
                    theme.isHero ? "text-2xl" : ""
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-2.5 text-sm leading-relaxed ${theme.bodyColor} ${
                    theme.isHero ? "text-base" : ""
                  }`}
                >
                  {item.description}
                </p>

                {theme.isHero && (
                  <div className="mt-6">
                    <a
                      href="/about"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      Learn our story
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
