import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import { visaServices } from "@/data/visa-assistance";
import { siteConfig, buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Visa Assistance Ghana | Application Support & Documentation",
  description:
    "Get practical visa application support from KIA-Start Up Consult. We help Ghanaians prepare complete, honest applications for UK, Canada, USA, Europe and beyond.",
  keywords: [
    "Visa Assistance Ghana",
    "Visa Application Ghana",
    "UK Visa Ghana",
    "Canada Visa Ghana",
    "Schengen Visa Ghana",
    "Visa Documentation Ghana",
    "Travel Visa Help Ghana",
  ],
  alternates: { canonical: "/visa-assistance" },
  openGraph: {
    title: "Visa Assistance Ghana | KIA-Start Up Consult",
    description:
      "Practical visa application support and documentation guidance for Ghanaians — UK, Canada, USA, Europe and beyond.",
    type: "website",
    url: "/visa-assistance",
  },
};

export default function VisaAssistancePage() {
  return (
    <>
      <TrackPageView eventName="visa_enquiry" />

      <PageHero
        kicker="Visa Assistance"
        title="Your journey deserves the right preparation."
        description="Wherever you're headed, a visa application goes more smoothly when you understand the process and prepare properly. We support applications for any destination — not just a fixed list of countries."
        primaryCta={{
          label: "Get Visa Assistance",
          href: buildWhatsAppLink("Hi, I'd like help with Visa Assistance."),
          external: true,
        }}
        secondaryCta={{ label: "Send an Enquiry", href: "/contact?service=visa-assistance" }}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">What we help with</h2>
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visaServices.map((service) => (
            <div key={service.title} className="border-l-2 border-gold-deep pl-5">
              <h3 className="font-display text-lg text-ink">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="flex items-start gap-3 rounded-sm border border-line bg-white p-6">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brick" aria-hidden />
            <div>
              <h2 className="font-display text-lg text-ink">Important</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                KIA-Start Up Consult helps you prepare and understand the process. Visa decisions
                are made by the relevant government authority — we do not control the outcome and
                never offer a &ldquo;guaranteed visa.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 lg:py-20">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">Know the process before you commit.</h2>
          <p className="mx-auto mt-4 max-w-lg text-charcoal-soft">
            Start with a conversation about your specific destination and situation.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={buildWhatsAppLink("Hi, I'd like help with Visa Assistance.")}
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
