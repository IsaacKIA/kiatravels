import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  FileCheck2,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Globe2,
  MessageSquare,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import { buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Visa Assistance Ghana | Consular Dossier & Application Support",
  description:
    "98% accuracy visa documentation and application preparation for UK, Schengen, Canada, USA, and GCC visas.",
  alternates: { canonical: "/visa-assistance" },
};

const visaPillars = [
  {
    code: "01",
    title: "Work & Employment Visas",
    badge: "Type-D • CoS • GCC",
    icon: Briefcase,
    accent: "bg-amber-50 text-amber-800 ring-amber-200",
    points: ["European Type-D Work Permits", "UK Skilled Worker CoS", "GCC Employment Residency"],
  },
  {
    code: "02",
    title: "Student & Academic Visas",
    badge: "CAS • Study Permit • F-1",
    icon: GraduationCap,
    accent: "bg-blue-50 text-blue-800 ring-blue-200",
    points: ["UK CAS Student Route", "Canada IMM 1294 + PAL", "US F-1 & EU Student Visas"],
  },
  {
    code: "03",
    title: "Visitor, Business & Schengen",
    badge: "Short-Stay & Conference",
    icon: Globe2,
    accent: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    points: ["Schengen 29-Country Visas", "UK Standard Visitor", "US B1/B2 & Canada TRV"],
  },
  {
    code: "04",
    title: "28-Day Financial Dossier Audit",
    badge: "Zero Refusal Traps",
    icon: ShieldCheck,
    accent: "bg-violet-50 text-violet-800 ring-violet-200",
    points: ["Bank Statement Maturity Check", "Sponsor Source-of-Funds", "Home-Ties Evidence"],
  },
  {
    code: "05",
    title: "Consular Interview Coaching",
    badge: "1-on-1 Mock Sessions",
    icon: MessageSquare,
    accent: "bg-amber-50 text-amber-800 ring-amber-200",
    points: ["UKVI Credibility Prep", "US Embassy F-1 / B1-B2 Prep", "Study Plan / SOP Review"],
  },
  {
    code: "06",
    title: "Biometrics, Flights & Insurance",
    badge: "Submission Ready",
    icon: FileCheck2,
    accent: "bg-blue-50 text-blue-800 ring-blue-200",
    points: ["VFS / TLS Appointment Booking", "Verifiable Flight & Hotel Holds", "Embassy Travel Insurance"],
  },
];

export default function VisaAssistancePage() {
  return (
    <>
      <TrackPageView eventName="visa_enquiry" />

      <PageHero
        kicker="Consular Documentation Desk"
        title="Embassy-ready visa dossiers. Built with 98% accuracy."
        description="Complete document verification, financial statement auditing, and interview preparation for Work, Study, and Visitor visas worldwide."
        primaryCta={{
          label: "Start Visa Assessment",
          href: buildWhatsAppLink("Hi, I'd like help preparing my visa application."),
          external: true,
        }}
        secondaryCta={{ label: "Book Dossier Audit", href: "/contact?service=visa-assistance" }}
      />

      {/* Visual Photo Showcase Banner */}
      <section className="mx-auto max-w-6xl px-5 pt-14 sm:px-8 lg:pt-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="photo-card-glow relative h-72 overflow-hidden rounded-3xl border border-line shadow-lg md:col-span-7">
            <Image
              src="/images/visa.png"
              alt="Consular Visa Documentation & Passport Stamping"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="photo-card-img object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/25 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 text-white">
              <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                UK • Schengen • Canada • USA • GCC
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                Precision Consular Dossier Preparation
              </h2>
            </div>
          </div>

          <div className="photo-card-glow relative h-72 overflow-hidden rounded-3xl border border-line shadow-lg md:col-span-5">
            <Image
              src="/images/Travel Abroad (2).png"
              alt="Approved Global Mobility & Departure"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="photo-card-img object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/25 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 text-white">
              <span className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                98% Dossier Accuracy
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">
                From Biometrics to Boarding
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Card Visual Bento Grid */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Full Consular Coverage
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
              What Our Visa Desk Executes
            </h2>
          </div>
          <p className="text-xs font-semibold text-charcoal-soft">
            Zero document forgery &bull; 100% sovereign embassy compliant
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visaPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.code}
                className="glass-card-hover flex flex-col justify-between rounded-3xl border border-line bg-white p-7 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${pillar.accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-line bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-charcoal">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{pillar.title}</h3>

                  <ul className="mt-4 space-y-2.5 border-t border-line/60 pt-4 text-xs font-semibold text-charcoal">
                    {pillar.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast CTA Banner */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-800 bg-[#0f172a] p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Prevent Avoidable Refusals
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
              Have an advisor audit your documents before you submit.
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={buildWhatsAppLink("Hi, I'd like an advisor to review my visa documents.")}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:bg-amber-300"
            >
              <span>WhatsApp Visa Desk</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              href="/contact?service=visa-assistance"
              className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10"
            >
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
