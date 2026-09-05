import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import ServiceCards from "@/components/home/ServiceCards";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Work Abroad, Study Abroad, Visa Assistance, Flight Booking and Travel & Tourism — all our services in one place.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <TrackPageView eventName="services_view" />

      <PageHero
        kicker="Services"
        title="Everything we help with."
        description="Five ways we support your international journey — pick the one that matches where you are right now."
      />

      <ServiceCards
        heading="All services"
        description="Each one starts with a conversation, not a form."
        location="services_page"
      />
    </>
  );
}
