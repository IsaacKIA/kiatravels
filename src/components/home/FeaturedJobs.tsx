import Link from "next/link";
import Image from "next/image";
import { Briefcase, ArrowRight, Sparkles } from "lucide-react";
import { jobs } from "@/data/jobs";
import { jobTypeLabels, jobStatusStyles, jobStatusLabels } from "@/data/jobs";

export default function FeaturedJobs() {
  const featuredJobs = jobs
    .filter((j) => j.status === "open" && j.featured)
    .slice(0, 3);

  const openJobs = jobs.filter((j) => j.status === "open");

  // Show at most 3: prefer featured, fall back to first open listings
  const displayJobs =
    featuredJobs.length > 0 ? featuredJobs : openJobs.slice(0, 3);

  // If there are no open listings at all, don't render this section
  if (displayJobs.length === 0) return null;

  return (
    <section className="relative border-y border-line bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
              <Sparkles className="h-3 w-3 text-amber-600" />
              We&rsquo;re Hiring
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Latest job opportunities
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal-soft">
              Verified international openings our team is actively placing
              candidates for.
            </p>
          </div>

          <Link
            href="/jobs"
            className="focus-ring group inline-flex shrink-0 items-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-bold text-charcoal shadow-sm transition-all hover:border-amber-400 hover:text-amber-800"
          >
            <span>See all openings</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Job cards strip */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayJobs.map((job) => (
            <Link
              key={job.slug}
              href={`/contact?job=${job.slug}`}
              className="glass-card-hover group flex flex-col rounded-2xl border border-line bg-white shadow-sm transition-all hover:border-amber-400 hover:shadow-md overflow-hidden"
            >
              {/* Hero image */}
              {job.image ? (
                <div className="relative h-36 w-full shrink-0 overflow-hidden">
                  <Image
                    src={job.image}
                    alt={job.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <span
                    className={`absolute bottom-2 left-3 rounded-full border px-2 py-0.5 text-[10px] font-bold backdrop-blur-sm ${jobStatusStyles[job.status]}`}
                  >
                    {jobStatusLabels[job.status]}
                  </span>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-2 p-5 pb-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800 transition-transform group-hover:scale-110 group-hover:bg-ink group-hover:text-white">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${jobStatusStyles[job.status]}`}
                  >
                    {jobStatusLabels[job.status]}
                  </span>
                </div>
              )}

              {/* Card body */}
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div>
                  <p className="text-[11px] font-bold text-amber-800">
                    {job.countryFlagEmoji} {job.country} · {job.sector}
                  </p>
                  <h3 className="mt-0.5 font-display text-base font-bold leading-snug text-ink transition-colors group-hover:text-amber-800">
                    {job.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-md border border-line bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-charcoal">
                    {jobTypeLabels[job.type]}
                  </span>
                  {job.salary && (
                    <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                      {job.salary}
                    </span>
                  )}
                  {job.applicationDeadline && (
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-charcoal-soft">
                      Deadline: {job.applicationDeadline}
                    </span>
                  )}
                </div>

                <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-amber-800 transition-colors group-hover:text-amber-700">
                  Apply now
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* See all CTA row */}
        <div className="mt-8 text-center">
          <Link
            href="/jobs"
            className="focus-ring shimmer-btn inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95"
          >
            View all {openJobs.length} open position{openJobs.length !== 1 ? "s" : ""}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
