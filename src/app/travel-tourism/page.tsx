import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import { travelCategories } from "@/data/travel-tourism";
import { siteConfig, buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Travel & Tourism",
  description:
    "Professional support planning leisure, family, business, group and international travel.",
  alternates: { canonical: "/travel-tourism" },
};

export default function TravelTourismPage() {
  return (
    <>
      <TrackPageView eventName="travel_enquiry" />

      <PageHero
        kicker="Travel & Tourism"
        title="Plan your next journey with confidence."
        description="Whatever the occasion — a family trip, a business schedule, a group holiday — we help you plan it properly, from the first idea to the final itinerary."
        primaryCta={{
          label: "Plan My Journey",
          href: buildWhatsAppLink("Hi, I'd like to plan a trip."),
          external: true,
        }}
        secondaryCta={{ label: "Send an Enquiry", href: "/contact?service=travel-tourism" }}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">What kind of trip?</h2>
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {travelCategories.map((category) => (
            <div key={category.title} className="ticket-card ml-3 p-7">
              <h3 className="font-display text-lg text-ink">{category.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 lg:py-20">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Tell us where you want to go.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-charcoal-soft">
            We&rsquo;ll help you understand the next step, whatever kind of trip you&rsquo;re
            planning.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={buildWhatsAppLink("Hi, I'd like to plan a trip.")}
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
