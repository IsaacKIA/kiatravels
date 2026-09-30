import Link from "next/link";
import Image from "next/image";
import { CalendarClock, MapPin, Clock, ArrowRight } from "lucide-react";
import type { Job } from "@/data/jobs";
import { jobTypeLabels, jobStatusStyles, jobStatusLabels } from "@/data/jobs";

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="glass-card-hover group relative flex flex-col rounded-2xl border border-line bg-white shadow-sm transition-all hover:border-amber-400 hover:shadow-md overflow-hidden">
      {/* Hero image */}
      {job.image && (
        <div className="relative h-44 w-full shrink-0 overflow-hidden">
          <Image
            src={job.image}
            alt={`${job.title} in ${job.country}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* Status badge on image */}
          <span
            className={`absolute bottom-3 left-3 rounded-full border px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-sm ${jobStatusStyles[job.status]}`}
          >
            {jobStatusLabels[job.status]}
          </span>
        </div>
      )}

      {/* Card body */}
      <div className="flex flex-col flex-1 justify-between p-6">
        <div>
          {/* Header: country + status badge (only show badge here when no image) */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-xs font-bold text-charcoal-soft">
                <MapPin className="h-3 w-3 shrink-0 text-amber-600" aria-hidden />
                <span className="truncate">
                  {job.countryFlagEmoji} {job.country}
                </span>
              </p>
              <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-amber-800 sm:text-xl">
                {job.title}
              </h3>
              <p className="mt-0.5 text-xs font-semibold text-amber-800">
                {job.sector}
              </p>
            </div>

            {!job.image && (
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${jobStatusStyles[job.status]}`}
              >
                {jobStatusLabels[job.status]}
              </span>
            )}
          </div>

          {/* Description */}
          {job.description && (
            <p className="mt-3.5 text-sm leading-relaxed text-charcoal-soft line-clamp-2">
              {job.description}
            </p>
          )}

          {/* Meta pills: type + salary */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md border border-line bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-charcoal">
              <Clock className="h-3 w-3 text-slate-500" aria-hidden />
              {jobTypeLabels[job.type]}
            </span>

            {job.salary && (
              <span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                {job.salary}
              </span>
            )}
          </div>

          {/* Key requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <ul className="mt-4 space-y-1 text-xs text-charcoal-soft">
              {job.requirements.slice(0, 3).map((req) => (
                <li key={req} className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Deadline */}
          {job.applicationDeadline && (
            <p className="mt-4 flex items-center gap-1.5 text-xs text-charcoal-soft">
              <CalendarClock className="h-3.5 w-3.5 shrink-0 text-amber-600" aria-hidden />
              <span>Apply before: {job.applicationDeadline}</span>
            </p>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex items-center gap-3 border-t border-line/60 pt-4">
          <Link
            href={`/contact?job=${job.slug}`}
            className="focus-ring shimmer-btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>Apply Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
