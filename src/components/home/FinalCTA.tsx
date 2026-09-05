import StartJourneyButton from "@/components/StartJourneyButton";
import { siteConfig } from "@/data/site";
import { MessageCircle, Star, Quote, ArrowRight, MapPin, Phone } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] text-white py-24 sm:py-32">
      {/* Rich ambient background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-br from-amber-500/8 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-1/2 bg-gradient-to-tl from-blue-600/8 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* Left — Testimonial Quote */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 mb-8">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              From Our Community
            </div>

            {/* Big quote */}
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 h-8 w-8 fill-amber-400/20 text-amber-400/20" />
              <blockquote className="pl-6 text-xl font-display leading-relaxed text-slate-200 sm:text-2xl">
                &ldquo;KIA Consult didn&rsquo;t just help me get a visa — they gave me
                a clear, honest roadmap to a completely new life. I&rsquo;m now a
                registered nurse in Manchester, and I owe so much of it to their guidance.&rdquo;
              </blockquote>
            </div>

            {/* Attribution */}
            <div className="mt-8 flex items-center gap-4 pl-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white ring-2 ring-amber-400/30">
                KA
              </div>
              <div>
                <p className="font-semibold text-white">Kwame Asante</p>
                <p className="text-sm text-slate-400">Registered Nurse — Manchester, UK 🇬🇧</p>
                <div className="mt-1 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1.5 text-[11px] text-slate-500">Skilled Worker Route</span>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div className="mt-10 grid grid-cols-3 gap-4 pl-6 border-l border-white/8">
              {[
                { value: "500+", label: "Guided" },
                { value: "98%", label: "Accuracy" },
                { value: "15+", label: "Countries" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-white">
                    {s.value}
                  </p>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA Panel */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
              Your Future Awaits
            </div>

            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl leading-[1.1]">
              Your next chapter{" "}
              <span className="gradient-text-luxury">starts today.</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Whether you&rsquo;re seeking international employment, planning study abroad, or
              preparing your visa paperwork — everything starts with an honest conversation.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3.5">
              <StartJourneyButton className="focus-ring shimmer-btn group flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold tracking-wide text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95" />

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Hi KIA Consult, I would like to speak with an advisor about my travel plans."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/6 py-4 text-sm font-bold tracking-wide text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-emerald-500/40"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <span>Chat on WhatsApp</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </a>
            </div>

            {/* Office info */}
            <div className="mt-8 space-y-2.5 rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <Phone className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>{siteConfig.phoneLocal} (GH) &nbsp;·&nbsp; {siteConfig.phoneIntl} (UK)</span>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-center text-slate-600 leading-relaxed">
              Free 15-minute initial consultation &bull; No obligation &bull; Honest advice guaranteed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
