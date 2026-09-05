import type { Destination } from "@/data/study-abroad";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { buildWhatsAppLink } from "@/data/site";

export default function DestinationCard({ destination }: { destination: Destination }) {
  const isPrimary = destination.tier === "primary";

  return (
    <div
      className={`glass-card-hover group relative flex flex-col justify-between rounded-2xl border p-7 shadow-sm transition-all ${
        isPrimary
          ? "border-amber-400/80 bg-gradient-to-b from-amber-50/40 via-white to-white shadow-md sm:col-span-2 lg:col-span-1"
          : "border-line bg-white hover:border-amber-300"
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-3xl" aria-hidden>
            {destination.flagEmoji}
          </span>
          {isPrimary && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900 border border-amber-200">
              <Sparkles className="h-3 w-3 text-amber-600" />
              Primary Focus
            </span>
          )}
        </div>

        <h3 className="mt-4 font-display text-2xl font-bold text-ink group-hover:text-amber-800 transition-colors">
          {destination.country}
        </h3>

        <p className="mt-2.5 text-xs leading-relaxed text-charcoal-soft">
          {destination.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-line/60">
        <a
          href={buildWhatsAppLink(`Hi KIA Consult, I'd like guidance on studying in ${destination.country}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold text-ink hover:text-amber-700 transition-colors"
        >
          <span>Ask about {destination.country}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
