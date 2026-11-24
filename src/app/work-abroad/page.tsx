import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Briefcase,
  FileCheck2,
  ShieldCheck,
  PlaneTakeoff,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import JobCard from "@/components/JobCard";
import WorkSalaryCalculator from "@/components/WorkSalaryCalculator";
import TalentRegistrySection from "@/components/TalentRegistrySection";
import { jobs, jobSectors } from "@/data/jobs";
import { buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Work Abroad from Ghana | Europe & GCC Job Placements",
  description:
    "Verified European and GCC work placements for Ghanaians—including work permits, accommodation, trade verification, and flight tickets.",
  alternates: { canonical: "/work-abroad" },
};

const corridors = [
  {
    region: "Europe & Schengen Mobility",
    countries: "🇩🇪 Germany • 🇱🇹 Lithuania • 🇵🇱 Poland • 🇷🇸 Serbia • 🇭🇺 Hungary",
    image: "/images/Germany.png",
    salary: "EUR 1,200 – EUR 2,000 / mo",
    timeline: "1–2 Months Processing",
    perks: ["Accommodation Included", "Flight Ticket Package", "Confirmed Work Permit"],
  },
  {
    region: "UAE & Gulf States (GCC)",
    countries: "🇦🇪 Dubai & Abu Dhabi • 🇸🇦 Saudi Arabia • 🇶🇦 Qatar",
    image: "/images/UAE.png",
    salary: "1,200 – 5,000 AED / mo (Tax-Free)",
    timeline: "2–4 Weeks Fast-Track",
    perks: ["100% Tax-Free Income", "Employer Housing & Transport", "2-Year Renewable Visa"],
  },
];

const tradeShowcase = [
  {
    title: "Engineering & Site Supervision",
    tag: "Highly Skilled & Technical",
    image: "/images/engineer.png",
  },
  {
    title: "Certified Electricians & Power",
    tag: "Industrial & Domestic Trades",
    image: "/images/Electrician worker.png",
  },
  {
    title: "Plumbing, Pipefitting & HVAC",
    tag: "Trade-Tested Technicians",
    image: "/images/plumber work.png",
  },
  {
    title: "Facility & Commercial Cleaning",
    tag: "Hospitality & Airport Utility",
    image: "/images/Cleaning.png",
  },
  {
    title: "Factory & Warehouse Operations",
    tag: "Production & Fulfillment",
    image: "/images/work abroad (2).png",
  },
  {
    title: "Construction & General Manpower",
    tag: "High-Volume Project Workforce",
    image: "/images/work abroad (3).png",
  },
];

const steps = [
  { step: "01", title: "Role & Trade Match", tag: "CV + Skill Check", icon: Briefcase },
  { step: "02", title: "Work Permit Filing", tag: "Employer Approval", icon: FileCheck2 },
  { step: "03", title: "Medical & Police CID", tag: "GAMCA & Clearance", icon: ShieldCheck },
  { step: "04", title: "Visa & Flight Dispatch", tag: "Departure Ready", icon: PlaneTakeoff },
];

export default function WorkAbroadPage() {
  const openJobs = jobs.filter((job) => job.status === "open");
  const topJobs = openJobs.slice(0, 6);

  return (
    <>
      <TrackPageView eventName="work_abroad_view" />

      <PageHero
        kicker="Overseas Work Placements"
        title="Verified jobs in Europe & the GCC."
        description="Confirmed international work placements across engineering, skilled trades, logistics, cleaning, and hospitality—with work permits, accommodation, and flights."
        primaryCta={{ label: `Browse ${openJobs.length} Open Jobs`, href: "/jobs" }}
        secondaryCta={{
          label: "Chat with Recruitment Desk",
          href: buildWhatsAppLink("Hi, I'd like to apply for an overseas work placement."),
          external: true,
        }}
      />

      {/* 2-Corridor Visual Photo Showcase */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Active Deployment Corridors
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
              Two Fast-Track Work Packages
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {jobSectors.slice(0, 5).map((sector) => (
              <Link
                key={sector}
                href={`/jobs?sector=${encodeURIComponent(sector)}`}
                className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-bold text-charcoal transition-all hover:border-amber-400 hover:text-amber-900"
              >
                {sector}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {corridors.map((c) => (
            <div
              key={c.region}
              className="photo-card-glow group overflow-hidden rounded-3xl border border-line bg-white shadow-lg"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.region}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="photo-card-img object-cover"
                />
                <div className="photo-card-overlay absolute inset-0" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="rounded-full bg-emerald-500 px-3.5 py-1 text-xs font-bold text-white shadow-md">
                    {c.salary}
                  </span>
                  <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
                    {c.timeline}
                  </span>
                </div>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <p className="text-xs font-semibold text-slate-200">{c.countries}</p>
                  <h3 className="mt-0.5 font-display text-2xl font-bold text-white sm:text-3xl">
                    {c.region}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div className="flex flex-wrap gap-2">
                  {c.perks.map((perk) => (
                    <span
                      key={perk}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-slate-50 px-3 py-1.5 text-xs font-bold text-charcoal"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      {perk}
                    </span>
                  ))}
                </div>

                <Link
                  href="/jobs"
                  className="focus-ring shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-ink px-5 py-3 text-xs font-bold text-white transition-all hover:bg-charcoal"
                >
                  <span>View Roles</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6-Tile Skilled Trades & Workforce Visual Gallery */}
      <section className="border-t border-line bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Workforce Categories in Demand
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
                Skilled Trades, Technical &amp; General Roles
              </h2>
            </div>
            <Link
              href="/partners"
              className="text-xs font-bold text-amber-800 underline underline-offset-4 hover:text-ink"
            >
              Employers: View 4-Tier Manpower Matrix →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tradeShowcase.map((trade) => (
              <Link
                key={trade.title}
                href="/jobs"
                className="photo-card-glow group relative h-64 overflow-hidden rounded-3xl border border-line shadow-md"
              >
                <Image
                  src={trade.image}
                  alt={trade.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="photo-card-img object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/25 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="inline-block rounded-full bg-amber-400 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                    {trade.tag}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                    {trade.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Featured Job Openings */}
      <section className="border-y border-line bg-[#fafaf9] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Now Hiring
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
                Featured Open Positions ({openJobs.length} Total)
              </h2>
            </div>
            <Link
              href="/jobs"
              className="focus-ring inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:border-amber-400"
            >
              <span>Filter All {openJobs.length} Jobs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {topJobs.map((job) => (
              <JobCard key={job.slug} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Overseas Work Salary & GHS Estimator */}
      <WorkSalaryCalculator />

      {/* 4-Step Deployment Strip */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Fast &amp; Transparent
          </span>
          <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
            4 Steps from Application to Departure
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="glass-card-hover rounded-3xl border border-line bg-white p-6 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-800 ring-1 ring-amber-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-3xl font-bold text-amber-500/40">
                    {s.step}
                  </span>
                </div>
                <span className="mt-6 inline-block rounded-full border border-line bg-slate-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                  {s.tag}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{s.title}</h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Talent & Trade Registry */}
      <TalentRegistrySection />

      {/* B2B Manpower Supply Banner */}
      <section className="bg-[#0b0f17] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-white/15 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#1e1206] p-8 sm:p-10 lg:flex-row lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                <Building2 className="h-3 w-3" />
                For International Employers &amp; HR Agencies
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                Source trade-tested Ghanaian manpower for GCC &amp; European demand orders.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/partners"
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:bg-amber-300"
              >
                <span>B2B Manpower Profile</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact?service=b2b-partnership"
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10"
              >
                <span>Submit Demand Order</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
