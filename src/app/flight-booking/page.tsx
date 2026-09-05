import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import FlightRequestForm from "@/components/FlightRequestForm";
import { siteConfig, buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Flight Booking Assistance",
  description:
    "Request help planning and booking flights for your international journey from Ghana.",
  alternates: { canonical: "/flight-booking" },
};

export default function FlightBookingPage() {
  return (
    <>
      <TrackPageView eventName="flight_booking_view" />

      <PageHero
        kicker="Flight Booking"
        title="Plan your flight with support, not guesswork."
        description="Tell us where you're headed and when. We'll help you plan and book a flight that fits your journey — no live airline booking engine yet, but a real person on the other end."
        secondaryCta={{
          label: "Chat on WhatsApp Instead",
          href: buildWhatsAppLink("Hi, I'd like help booking a flight."),
          external: true,
        }}
      />

      <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8 lg:py-20">
        <FlightRequestForm />
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-8">
          <p className="text-sm text-charcoal-soft">
            Prefer to talk it through first? Call{" "}
            <a href={`tel:${siteConfig.phoneLocalHref}`} className="focus-ring font-semibold text-ink underline underline-offset-4">
              {siteConfig.phoneLocal}
            </a>{" "}
            or message us on WhatsApp.
          </p>
        </div>
      </section>
    </>
  );
}
