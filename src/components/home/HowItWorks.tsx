import { howItWorks } from "@/data/site";
import {
  MessageSquare,
  ClipboardList,
  FileCheck,
  Rocket,
} from "lucide-react";

const stepIcons = [MessageSquare, ClipboardList, FileCheck, Rocket];
const stepColors = [
  "text-amber-400 bg-amber-400/15 ring-amber-400/30",
  "text-blue-400 bg-blue-400/15 ring-blue-400/30",
  "text-emerald-400 bg-emerald-400/15 ring-emerald-400/30",
  "text-violet-400 bg-violet-400/15 ring-violet-400/30",
];

export default function HowItWorks() {
  return (
    <section className="dark-section-glow relative overflow-hidden bg-[#0a0a0a] text-white py-20 sm:py-28">
      {/* Background glows */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-amber-500/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-blue-500/12 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-400">
              Clear &amp; Simple Roadmap
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              How it works
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400 leading-relaxed">
            A structured, 4-stage process designed to eliminate confusion, prevent costly
            errors, and get you abroad smoothly.
          </p>
        </div>

        {/* Steps Grid with Connectors */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item, i) => {
            const Icon = stepIcons[i % stepIcons.length];
            const colorClasses = stepColors[i % stepColors.length];
            const isLast = i === howItWorks.length - 1;

            return (
              <div
                key={item.step}
                className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-7 backdrop-blur-sm transition-all hover:border-amber-400/40 hover:bg-white/[0.06]"
              >
                {/* Step connector line — hidden on mobile, shown on lg */}
                {!isLast && (
                  <div className="absolute hidden lg:block top-[52px] left-full z-10 w-6 -ml-0.5">
                    <div className="h-[2px] w-full bg-gradient-to-r from-amber-400/60 to-amber-400/10 rounded-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-amber-400/50" />
                  </div>
                )}

                {/* Step number badge */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${colorClasses} transition-transform group-hover:scale-110`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-3xl font-black text-white/20 group-hover:text-white/30 transition-colors select-none">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>

                {/* Mobile vertical connector */}
                {!isLast && (
                  <div className="sm:hidden absolute left-10 top-full h-6 w-[2px] bg-gradient-to-b from-amber-400/50 to-amber-400/0 rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA nudge */}
        <div className="mt-14 text-center">
          <p className="text-sm text-slate-500">
            Ready to start?{" "}
            <a
              href="/#matcher"
              className="text-amber-400 font-semibold hover:text-amber-300 transition-colors underline underline-offset-4"
            >
              Take the 60-second pathway quiz →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
