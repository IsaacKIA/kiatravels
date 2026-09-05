import { CalendarClock, ArrowRight } from "lucide-react";
import type { Opportunity } from "@/data/work-abroad";

const statusStyles: Record<Opportunity["status"], string> = {
  open: "bg-emerald-100 text-emerald-800 border-emerald-200",
  upcoming: "bg-amber-100 text-amber-900 border-amber-200",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
};

const statusLabel: Record<Opportunity["status"], string> = {
  open: "Active Opportunity",
  upcoming: "Upcoming Route",
  closed: "Closed Intake",
};

export default function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <div className="glass-card-hover group relative flex flex-col justify-between rounded-2xl border border-line bg-white p-6 shadow-sm transition-all hover:border-amber-400">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-charcoal-soft flex items-center gap-1.5">
              <span className="text-base" aria-hidden>{opportunity.countryFlagEmoji}</span>
              <span>{opportunity.country}</span>
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-ink group-hover:text-amber-800 transition-colors">
              {opportunity.jobTitle}
            </h3>
            <p className="mt-0.5 text-xs text-amber-800 font-semibold">{opportunity.sector}</p>
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${statusStyles[opportunity.status]}`}
          >
            {statusLabel[opportunity.status]}
          </span>
        </div>

        {opportunity.salary && (
          <p className="mt-4 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
            {opportunity.salary}
          </p>
        )}

        {opportunity.benefits && opportunity.benefits.length > 0 && (
          <ul className="mt-3.5 space-y-1 text-xs text-charcoal-soft">
            {opportunity.benefits.map((b) => (
              <li key={b} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {opportunity.applicationDeadline && (
          <p className="mt-4 flex items-center gap-1.5 text-xs text-charcoal-soft">
            <CalendarClock className="h-3.5 w-3.5 text-amber-600" aria-hidden />
            <span>Apply before: {opportunity.applicationDeadline}</span>
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-line/60 flex items-center gap-3">
        <a
          href={`/work-abroad/${opportunity.slug}`}
          className="focus-ring inline-flex flex-1 items-center justify-center rounded-xl border border-line bg-slate-50 px-3.5 py-2 text-xs font-bold text-charcoal transition-all hover:bg-slate-100"
        >
          Details
        </a>
        <a
          href={`/contact?opportunity=${opportunity.slug}`}
          className="focus-ring shimmer-btn inline-flex flex-1 items-center justify-center gap-1 rounded-xl px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <span>Apply</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
