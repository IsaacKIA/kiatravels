import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import FAQAccordion from "@/components/FAQAccordion";
import { faqs } from "@/data/faq";
import { buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Honest answers about Work Abroad, Study Abroad, Visa Assistance, Flight Booking and how KIA-Start Up Consult works.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <TrackPageView eventName="faq_view" />

      <PageHero
        kicker="FAQ"
        title="Questions, answered honestly."
        description="No guarantees dressed up as promises — just clear answers about how things actually work."
      />

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <FAQAccordion items={faqs} />
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-8">
          <p className="text-charcoal-soft">Still have a question?</p>
          <a
            href={buildWhatsAppLink("Hi, I have a question that wasn't in your FAQ.")}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-4 inline-flex items-center justify-center rounded-sm bg-ink px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-ink-deep"
          >
            Ask on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
