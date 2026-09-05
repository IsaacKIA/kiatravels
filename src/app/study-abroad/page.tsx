import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import DestinationCard from "@/components/DestinationCard";
import { destinations, otherDestinationsNote, studyAbroadProcess } from "@/data/study-abroad";
import { siteConfig, buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Study Abroad from Ghana",
  description:
    "Guidance on studying abroad in the UK, Canada and the USA — destinations, requirements and application preparation.",
  alternates: { canonical: "/study-abroad" },
};

export default function StudyAbroadPage() {
  return (
    <>
      <TrackPageView eventName="study_abroad_view" />

      <PageHero
        kicker="Study Abroad"
        title="Study beyond borders."
        description="We help you understand what studying abroad actually involves — from choosing a destination to preparing a complete, honest application."
        primaryCta={{
          label: "Find My Study Pathway",
          href: buildWhatsAppLink("Hi, I'd like guidance on studying abroad."),
          external: true,
        }}
        secondaryCta={{ label: "Send an Enquiry", href: "/contact?service=study-abroad" }}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Explore destinations</h2>
        <p className="mt-3 max-w-2xl text-sm text-charcoal-soft">
          The UK is our primary destination — most of our process experience is built around it.
          We also support Canada and the USA, and can look at other countries case by case.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination.slug} destination={destination} />
          ))}
        </div>
        <p className="mt-8 max-w-2xl rounded-sm border border-line bg-white p-5 text-sm leading-relaxed text-charcoal-soft">
          {otherDestinationsNote}
        </p>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">How it works</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {studyAbroadProcess.map((step, i) => (
              <div key={step.title}>
                <span className="font-display text-2xl text-gold-deep">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="flex items-start gap-3 rounded-sm border border-line bg-white p-6">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brick" aria-hidden />
            <div>
              <h2 className="font-display text-lg text-ink">Important</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                KIA-Start Up Consult provides guidance, documentation support and application
                assistance. We do not claim partnerships with any university, and we do not
                guarantee admission. Admission decisions are made by the institution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 lg:py-20">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Ready to explore your study options?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-charcoal-soft">
            Start with a conversation. We&rsquo;ll tell you honestly what&rsquo;s involved.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={buildWhatsAppLink("Hi, I'd like guidance on studying abroad.")}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center justify-center rounded-sm bg-ink px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-ink-deep"
            >
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.phoneLocalHref}`}
              className="focus-ring inline-flex items-center justify-center rounded-sm border border-ink/20 px-7 py-3.5 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-paper"
            >
              Call {siteConfig.phoneLocal}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
