import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Globe2,
  Users,
  FileCheck2,
  PlaneTakeoff,
  PhoneCall,
  Mail,
  MapPin,
  ArrowUpRight,
  Briefcase,
} from "lucide-react";
import TrackPageView from "@/components/TrackPageView";
import PrintProfileButton from "@/components/PrintProfileButton";
import PartnersDivisionShowcase from "@/components/PartnersDivisionShowcase";
import { siteConfig, buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "B2B & Institutional Partnerships (Company Profile) | Workforce, Universities & DMC",
  description:
    "Partner with KIA-Start Up Consult in Ghana across Overseas Manpower Recruitment (GCC & Europe), International Higher Education Admissions, and Corporate Travel / Destination Management (DMC).",
  alternates: { canonical: "/partners" },
};

const deploymentSteps = [
  {
    step: "01",
    title: "Demand Order & MOU",
    tag: "SLA Alignment",
    icon: Briefcase,
  },
  {
    step: "02",
    title: "Trade & Financial Vetting",
    tag: "100% Pre-Screened",
    icon: Users,
  },
  {
    step: "03",
    title: "GAMCA, Police CID & Visas",
    tag: "Consular Compliance",
    icon: FileCheck2,
  },
  {
    step: "04",
    title: "Flight Ticketing & Dispatch",
    tag: "Accra (ACC) Hub",
    icon: PlaneTakeoff,
  },
];

export default function PartnersPage() {
  return (
    <div className="bg-[#fafaf9]">
      <TrackPageView eventName="partners_b2b_view" />

      {/* ─────────────────────────────────────────────────────────────────────
          1. CINEMATIC VISUAL HERO (MINIMAL TEXT + LIVE VIDEO & PHOTO COLLAGE)
      ───────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0b0f17] pt-12 pb-18 text-white sm:pt-16 sm:pb-24">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Column (6 cols): Punchy Headline & Actions */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Building2 className="h-3.5 w-3.5" />
                <span>Corporate Profile &amp; B2B Desk</span>
              </div>

              <h1 className="mt-5 font-display text-3xl leading-[1.06] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                Your Ghana partner for{" "}
                <span className="gradient-text-luxury">Workforce, Universities &amp; DMC.</span>
              </h1>

              <p className="mt-4 max-w-xl text-base text-slate-300">
                Turnkey manpower supply, pre-vetted student cohorts, and inbound Ghana destination
                management—backed by Ghana HQ &amp; UK coordination.
              </p>

              {/* 4 Compact Stat Pills */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { value: "4 Tiers", label: "Manpower" },
                  { value: "15+ Markets", label: "GCC • EU • UK" },
                  { value: "98%", label: "Visa Accuracy" },
                  { value: "GH + UK", label: "Dual Desks" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5"
                  >
                    <p className="font-display text-lg font-bold text-amber-400">{s.value}</p>
                    <p className="text-[11px] text-slate-300">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 print:hidden">
                <Link
                  href="/contact?service=b2b-partnership"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 text-sm font-bold text-slate-950 shadow-lg transition-all hover:scale-[1.02] hover:bg-amber-300"
                >
                  <span>Partner With Us</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <a
                  href={buildWhatsAppLink(
                    "Hello KIA-Start Up Consult Partnership Management, we would like to discuss a B2B partnership."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-emerald-400 hover:bg-white/10"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>WhatsApp Desk</span>
                </a>

                <PrintProfileButton />
              </div>
            </div>

            {/* Right Column (6 cols): Visual Video + 3-Photo Bento Collage */}
            <div className="grid grid-cols-12 gap-3 lg:col-span-6">
              {/* Top Wide Live Video Card */}
              <div className="relative col-span-12 h-56 overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
                <Image
                  src="/images/Travel abroad.png"
                  alt="KIA-Start Up Consult Global Operations"
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
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0b0f17]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 z-30 flex items-center justify-between text-white">
                  <div>
                    <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold uppercase text-slate-950">
                      End-to-End Pipeline
                    </span>
                    <p className="mt-1 font-display text-lg font-bold">
                      Sourcing • Trade Testing • Visas • Flights
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom 3 Visual Pillar Thumbnails */}
              {[
                { label: "Skilled Workforce", img: "/images/electrical work.png" },
                { label: "Campus Cohorts", img: "/images/Student.png" },
                { label: "Visit Ghana DMC", img: "/images/Africa visit.png" },
              ].map((thumb) => (
                <div
                  key={thumb.label}
                  className="relative col-span-4 h-28 overflow-hidden rounded-2xl border border-white/15"
                >
                  <Image
                    src={thumb.img}
                    alt={thumb.label}
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <p className="absolute bottom-2 left-2.5 right-2 text-[11px] font-bold text-white">
                    {thumb.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          2. INTERACTIVE 3-DIVISION VISUAL BENTO SHOWCASE
      ───────────────────────────────────────────────────────────────────── */}
      <PartnersDivisionShowcase />

      {/* ─────────────────────────────────────────────────────────────────────
          3. 4-STAGE EXECUTION STRIP (ICON + BADGE ONLY, ZERO WALLS OF TEXT)
      ───────────────────────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Turnkey Delivery
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
              4-Stage B2B Execution Protocol
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deploymentSteps.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="glass-card-hover flex flex-col justify-between rounded-3xl border border-line bg-[#fafaf9] p-6 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-800 ring-1 ring-amber-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-3xl font-bold text-amber-500/40">
                      {stage.step}
                    </span>
                  </div>
                  <div className="mt-6">
                    <span className="inline-block rounded-full border border-line bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                      {stage.tag}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold text-ink">{stage.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          4. VISUAL CORPORATE ID & DIRECT PARTNERSHIP DISPATCH CARD
      ───────────────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#0b0f17] text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Photo Column */}
            <div className="relative min-h-[260px] lg:col-span-5">
              <Image
                src="/images/Airport view.png"
                alt="KIA-Start Up Consult Global Dispatch"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/30 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Registered in Ghana
                </span>
                <p className="mt-2 font-display text-2xl font-bold text-white">
                  KIA-Start Up Consult
                </p>
              </div>
            </div>

            {/* Right Scannable Corporate Credentials + CTA */}
            <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-7">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-400">
                  OFFICIAL CORPORATE CREDENTIALS
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                  Ready to sign an MOU or fulfill your next demand order.
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                  <div className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <div>
                      <p className="font-bold text-white">Ghana Headquarters</p>
                      <p className="mt-0.5 text-slate-300">{siteConfig.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                    <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <div>
                      <p className="font-bold text-white">UK International Desk</p>
                      <p className="mt-0.5 text-slate-300">{siteConfig.phoneIntl}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                    <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <div>
                      <p className="font-bold text-white">Ghana Phone &amp; WhatsApp</p>
                      <p className="mt-0.5 text-slate-300">{siteConfig.phoneLocal}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <div>
                      <p className="font-bold text-white">Official Partnership Email</p>
                      <p className="mt-0.5 text-slate-300">{siteConfig.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3 border-t border-white/10 pt-6 print:hidden">
                <Link
                  href="/contact?service=b2b-partnership"
                  className="focus-ring inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md transition-all hover:bg-amber-300"
                >
                  <span>Submit B2B Mandate</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                    "B2B Partnership Inquiry — KIA-Start Up Consult"
                  )}`}
                  className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                >
                  <Mail className="h-4 w-4 text-amber-400" />
                  <span>Email Operations Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
