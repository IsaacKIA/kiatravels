import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  GraduationCap,
  FileCheck2,
  ShieldCheck,
  PlaneTakeoff,
  Building2,
  CheckCircle2,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/data/study-abroad";
import { buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Study Abroad from Ghana | UK, Canada, USA & Europe Admissions",
  description:
    "Fast-track university admissions, scholarship matching, and study visa dossiers for the UK, Canada, USA, and Europe.",
  alternates: { canonical: "/study-abroad" },
};

const studentMosaic = [
  {
    title: "Collaborative Campus Life",
    tag: "UK & Canadian Universities",
    image: "/images/Group study.png",
    span: "md:col-span-2",
  },
  {
    title: "1-on-1 Admission Guidance",
    tag: "Course & Scholarship Match",
    image: "/images/Student.png",
    span: "md:col-span-1",
  },
  {
    title: "Undergraduate & Master's",
    tag: "WAEC English Waivers",
    image: "/images/Study Abroad.png",
    span: "md:col-span-1",
  },
  {
    title: "Post-Study Work Pathways",
    tag: "2–3 Year Graduate Work Permits",
    image: "/images/Study Abroad (2).png",
    span: "md:col-span-2",
  },
];

const studySteps = [
  {
    step: "01",
    title: "Course & Campus Match",
    tag: "WAEC / Degree Audit",
    icon: GraduationCap,
  },
  {
    step: "02",
    title: "Offer & CAS / LOA",
    tag: "2–4 Wk Turnaround",
    icon: FileCheck2,
  },
  {
    step: "03",
    title: "28-Day Financial Audit",
    tag: "Proof-of-Funds Check",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "Visa & Flight Dispatch",
    tag: "Interview + Ticketing",
    icon: PlaneTakeoff,
  },
];

export default function StudyAbroadPage() {
  return (
    <>
      <TrackPageView eventName="study_abroad_view" />

      <PageHero
        kicker="Study Abroad & Post-Study Work"
        title="World-class degrees. Built-in work permits."
        description="Direct undergraduate and postgraduate admissions across the UK, Canada, USA, and Europe—with full financial proof-of-funds auditing and visa interview prep."
        primaryCta={{
          label: "Start My Study Application",
          href: buildWhatsAppLink("Hi, I'd like guidance on studying abroad."),
          external: true,
        }}
        secondaryCta={{ label: "Book Free Consultation", href: "/contact?service=study-abroad" }}
      />

      {/* Cinematic Study Abroad Video + Highlights Banner */}
      <section className="mx-auto max-w-6xl px-5 pt-14 sm:px-8 lg:pt-20">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#0f172a] text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative min-h-[280px] overflow-hidden bg-slate-900 lg:col-span-7">
              <video
                src="/video/study abroad.mp4"
                poster="/images/Study Abroad.png"
                preload="metadata"
                controls
                muted
                loop
                playsInline
                autoPlay
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-5">
              <div>
                <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                  2026 / 2027 Intakes Open
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                  From Ghana to the world&rsquo;s leading campuses.
                </h2>
                <ul className="mt-5 space-y-2.5 text-xs font-semibold text-slate-200">
                  {[
                    "WAEC C6+ English Waivers (No IELTS for most UK universities)",
                    "Up to 3-Year Post-Study Work Permits (PGWP / PSW / STEM OPT)",
                    "Complete 28-Day Sponsor Bank Statement & Visa Audit",
                    "Student Flight Fares & Campus Accommodation Support",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-4 border-t border-white/10">
                <a
                  href={buildWhatsAppLink("Hi, I watched the Study Abroad video and want to check my eligibility.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md transition-all hover:bg-amber-300"
                >
                  <span>Check My Admission Eligibility</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo-Backed Study Destinations */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Top Academic Corridors
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
              Primary Study Destinations
            </h2>
          </div>
          <p className="text-xs font-semibold text-charcoal-soft">
            Also supporting Germany, Australia, Ireland &amp; Schengen campuses
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
      </section>

      {/* Student Life Photographic Bento Mosaic */}
      <section className="border-t border-line bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Student Experience
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
                Campus Life &amp; Career Launchpad
              </h2>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {studentMosaic.map((tile) => (
              <div
                key={tile.title}
                className={`photo-card-glow group relative h-64 overflow-hidden rounded-3xl border border-line shadow-md ${tile.span}`}
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="photo-card-img object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/25 to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="inline-block rounded-full bg-amber-400 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                    {tile.tag}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">
                    {tile.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual 4-Step Admission Strip */}
      <section className="border-t border-line bg-[#fafaf9] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              From Transcript to Campus
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
              4 Steps to Your Study Visa
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {studySteps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="glass-card-hover flex flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-800 ring-1 ring-amber-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-3xl font-bold text-amber-500/40">
                      {s.step}
                    </span>
                  </div>
                  <div className="mt-6">
                    <span className="inline-block rounded-full border border-line bg-slate-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                      {s.tag}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold text-ink">{s.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual B2B University & Pathway Showcase */}
      <section className="bg-[#0b0f17] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0f172a] to-[#1e293b] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative min-h-[240px] lg:col-span-5">
                <Image
                  src="/images/Travel Abroad (3).png"
                  alt="International University Partnerships"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                    <Building2 className="h-3 w-3" />
                    For Universities &amp; EdTech Partners
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between p-8 sm:p-10 lg:col-span-7">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    Recruit pre-vetted, financially audited student cohorts from Ghana.
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2.5 text-xs">
                    {[
                      "Primary WAEC & Transcript Verification",
                      "28-Day Bank Statement Audit",
                      "CAS / LOA Visa Grant Protection",
                      "In-Country Cohort Conversion",
                    ].map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 font-semibold text-slate-200"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/partners"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:bg-amber-300"
                  >
                    <span>Explore Academic B2B Profile</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact?service=b2b-partnership"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                  >
                    <span>Partner With Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
