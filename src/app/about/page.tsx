import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  ShieldCheck,
  Globe2,
  CheckCircle2,
  ArrowUpRight,
  Award,
  Clock,
  Compass,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import { services, siteConfig, buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us | KIA-Start Up Consult — Ghana & UK Global Mobility Desk",
  description:
    "KIA-Start Up Consult connects Ghanaian talent, students, and travelers to global opportunities—and serves as a B2B execution partner for international employers, universities, and tour operators.",
  alternates: { canonical: "/about" },
};

const coreValues = [
  {
    title: "Primary-Source Honesty",
    tag: "Zero False Promises",
    description: "Clear requirements, real timelines, and zero forged documents.",
    icon: ShieldCheck,
    accent: "bg-amber-50 text-amber-800 ring-amber-200",
  },
  {
    title: "Advisory Precision",
    tag: "98% Dossier Accuracy",
    description: "Every file is audited against sovereign embassy and employer standards.",
    icon: Award,
    accent: "bg-blue-50 text-blue-800 ring-blue-200",
  },
  {
    title: "Fast SLA Turnaround",
    tag: "End-to-End Desk",
    description: "In-house sourcing, medicals, visa documentation, and flight ticketing.",
    icon: Clock,
    accent: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  },
  {
    title: "Ghana HQ + UK Desk",
    tag: "Bilateral Coordination",
    description: "Ground execution in Ghana paired with UK international coordination.",
    icon: Compass,
    accent: "bg-violet-50 text-violet-800 ring-violet-200",
  },
];

export default function AboutPage() {
  return (
    <>
      <TrackPageView eventName="about_view" />

      <PageHero
        kicker="About KIA-Start Up Consult"
        title="Ghanaian roots. Global execution."
        description="Built on structured business advisory, we guide individuals toward international careers, degrees, and travel—and serve as an accountable B2B partner in Ghana."
        primaryCta={{
          label: "Explore B2B Partnerships",
          href: "/partners",
        }}
        secondaryCta={{
          label: "Chat with Our Team",
          href: buildWhatsAppLink("Hi, I'd like to know more about KIA-Start Up Consult."),
          external: true,
        }}
      />

      {/* Visual Photo Split + Dual-Mandate Overview */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Video & Photo Collage Card */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xl">
              <div className="relative h-64 w-full bg-slate-900">
                <Image
                  src="/images/Travel abroad.png"
                  alt="KIA-Start Up Consult Global Mobility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <video
                  src="/video/travel abroad.mp4"
                  poster="/images/Travel abroad.png"
                  preload="metadata"
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="relative z-10 h-full w-full object-cover"
                />
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/25 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 z-30 text-white">
                  <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                    Registered in Ghana &bull; UK Coordination
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-bold text-white">
                    One Integrated Mobility Desk
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-line bg-slate-50 p-2">
                <div className="relative h-24 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/work abroad.png"
                    alt="Work Abroad"
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-24 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/Group study.png"
                    alt="Study Abroad"
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-24 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/Ghana Culture.png"
                    alt="Visit Ghana DMC"
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-line border-t border-line bg-[#fafaf9] text-center">
                <div className="p-4">
                  <p className="font-display text-2xl font-bold text-ink">500+</p>
                  <p className="text-[11px] font-semibold text-charcoal-soft">Guided</p>
                </div>
                <div className="p-4">
                  <p className="font-display text-2xl font-bold text-ink">15+</p>
                  <p className="text-[11px] font-semibold text-charcoal-soft">Corridors</p>
                </div>
                <div className="p-4">
                  <p className="font-display text-2xl font-bold text-emerald-700">98%</p>
                  <p className="text-[11px] font-semibold text-charcoal-soft">Accuracy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Concise Pitch + Practice Links */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              What We Do
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
              Two mandates. One standard of excellence.
            </h2>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-line bg-white p-5 shadow-2xs">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  01 &mdash; For Individual Applicants (B2C)
                </p>
                <p className="mt-1 text-sm font-medium text-charcoal">
                  Step-by-step guidance across Overseas Work Placements, University Admissions,
                  Consular Visas, Flight Ticketing, and International Tours.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#0f172a] p-5 text-white shadow-md">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  02 &mdash; For International Institutions (B2B)
                </p>
                <p className="mt-1 text-sm text-slate-200">
                  Accountable Ghanaian execution for Overseas HR Agencies &amp; Employers
                  (Manpower), Universities (Student Cohorts), and Global Tour Operators (Ghana DMC).
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={service.href}
                  className="focus-ring rounded-xl border border-line bg-white px-3.5 py-2 text-xs font-bold text-ink transition-all hover:border-amber-400 hover:text-amber-900"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 Bento Value Cards */}
      <section id="values" className="border-y border-line bg-white py-16 sm:py-24 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Our Operating DNA
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
              Why Clients &amp; Partners Trust KIA
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="glass-card-hover rounded-3xl border border-line bg-[#fafaf9] p-6 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${val.accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-line bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal">
                      {val.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{val.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal-soft">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Operational Coordinates & B2B Strip */}
      <section className="bg-[#0b0f17] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-white/15 bg-white/[0.03] p-8 sm:p-10 lg:grid-cols-12">
            <div className="space-y-3 lg:col-span-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                <Building2 className="h-3 w-3" />
                Operational Desks
              </span>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Ghana Headquarters &amp; UK International Coordination
              </h2>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {siteConfig.address}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Globe2 className="h-4 w-4 text-amber-400" />
                  GH: {siteConfig.phoneLocal} &bull; UK: {siteConfig.phoneIntl}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Link
                href="/partners"
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:bg-amber-300"
              >
                <span>B2B Corporate Profile</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
