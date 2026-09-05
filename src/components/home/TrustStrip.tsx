"use client";

import { useCountUp, useScrollReveal } from "@/hooks/useScrollReveal";
import { Globe2, Award, ShieldCheck, Users } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Applicants Guided",
    sublabel: "Across Ghana & West Africa",
    iconColor: "text-amber-700",
    iconBg: "bg-amber-50",
    ringColor: "ring-amber-200",
  },
  {
    icon: Globe2,
    value: 15,
    suffix: "+",
    label: "Global Destinations",
    sublabel: "UK, Canada, Europe, USA, UAE",
    iconColor: "text-blue-700",
    iconBg: "bg-blue-50",
    ringColor: "ring-blue-200",
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Guidance Accuracy",
    sublabel: "Thorough documentation prep",
    iconColor: "text-emerald-700",
    iconBg: "bg-emerald-50",
    ringColor: "ring-emerald-200",
  },
  {
    icon: ShieldCheck,
    value: 100,
    suffix: "%",
    label: "Transparent Process",
    sublabel: "No hidden fees, honest advice",
    iconColor: "text-violet-700",
    iconBg: "bg-violet-50",
    ringColor: "ring-violet-200",
  },
];

function CountStat({ value, suffix }: { value: number; suffix: string }) {
  const ref = useCountUp(value);
  return (
    <p className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
      <span ref={ref}>0</span>
      <span className="text-amber-600">{suffix}</span>
    </p>
  );
}

export default function TrustStrip() {
  const sectionRef = useScrollReveal(0.1);

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="relative border-y border-line/80 bg-white/80 backdrop-blur-md overflow-hidden"
    >
      {/* Subtle top-border gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`reveal reveal-delay-${idx + 1} group flex flex-col items-center text-center sm:items-start sm:text-left`}
              >
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg} ${stat.iconColor} ring-1 ${stat.ringColor} transition-transform group-hover:scale-110 group-hover:shadow-md`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <CountStat value={stat.value} suffix={stat.suffix} />

                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-charcoal">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-[11px] text-charcoal-soft">{stat.sublabel}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle bottom-border gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
}
