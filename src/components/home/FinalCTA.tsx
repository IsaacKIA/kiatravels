import Link from "next/link";
import StartJourneyButton from "@/components/StartJourneyButton";
import { siteConfig } from "@/data/site";
import {
  MessageCircle,
  Star,
  Quote,
  ArrowRight,
  MapPin,
  Phone,
  Building2,
} from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-br from-amber-500/8 via-transparent to-transparent" />
        <div className="absolute right-0 bottom-0 h-full w-1/2 bg-gradient-to-tl from-blue-600/8 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left — Distinct European Work Placement Story + B2B Highlight */}
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              Verified Placement Spotlight
            </div>

            <div className="relative">
              <Quote className="absolute -top-2 -left-2 h-8 w-8 fill-amber-400/20 text-amber-400/20" />
              <blockquote className="pl-6 font-display text-xl leading-relaxed text-slate-200 sm:text-2xl">
                &ldquo;From my police clearance and trade verification in Ghana to my Lithuanian
                work permit, accommodation, and flight ticket—KIA-Start Up Consult handled every
                stage transparently. I arrived in Vilnius with a confirmed contract and zero
                surprises.&rdquo;
              </blockquote>
            </div>

            <div className="mt-8 flex items-center gap-4 pl-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white ring-2 ring-emerald-400/30">
                KM
              </div>
              <div>
                <p className="font-semibold text-white">Kofi Mensah</p>
                <p className="text-sm text-slate-400">
                  Logistics &amp; Warehouse Specialist — Vilnius, Lithuania 🇱🇹
                </p>
                <div className="mt-1 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1.5 text-[11px] text-slate-500">
                    Europe Work &amp; Mobility Package
                  </span>
                </div>
              </div>
            </div>

            {/* Institutional B2B Callout */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 pl-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Building2 className="h-4 w-4" />
                <span>For Employers, Universities &amp; Tour Operators</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                Looking to source vetted Ghanaian manpower, recruit qualified university students,
                or partner with an accountable Ghana Destination Management Company (DMC)?
              </p>
              <Link
                href="/partners"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-white underline decoration-amber-400 underline-offset-4 hover:text-amber-300"
              >
                <span>View Our B2B Corporate Profile &amp; Partnership Desk</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — Consultation Dispatch Panel */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
              Direct Advisory Desk
            </div>

            <h2 className="mt-5 font-display text-3xl leading-[1.1] font-bold tracking-tight text-white sm:text-4xl">
              Begin your journey{" "}
              <span className="gradient-text-luxury">with clarity.</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Whether you are applying for an overseas work placement, planning university study
              abroad, or initiating a B2B partnership—everything starts with a structured
              conversation.
            </p>

            <div className="mt-8 flex flex-col gap-3.5">
              <StartJourneyButton className="focus-ring shimmer-btn group flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold tracking-wide text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95" />

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Hello KIA-Start Up Consult, I would like to speak with an advisor."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/6 py-4 text-sm font-bold tracking-wide text-white backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <span>Chat with an Advisor on WhatsApp</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </a>
            </div>

            <div className="mt-8 space-y-2.5 rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Phone className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                <span>
                  {siteConfig.phoneLocal} (GH) &nbsp;&bull;&nbsp; {siteConfig.phoneIntl} (UK)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
