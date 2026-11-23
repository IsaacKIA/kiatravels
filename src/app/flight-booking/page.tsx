import type { Metadata } from "next";
import Image from "next/image";
import { Plane, CheckCircle2, Users, GraduationCap, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import FlightRequestForm from "@/components/FlightRequestForm";
import { buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Flight Booking & Group Ticketing | KIA-Start Up Consult",
  description:
    "Individual, student, and corporate workforce group flight ticketing from Accra (ACC) to Europe, the GCC, UK, and North America.",
  alternates: { canonical: "/flight-booking" },
};

const farePerks = [
  {
    title: "Student & Academic Fares",
    tag: "Extra Baggage Allowances",
    icon: GraduationCap,
  },
  {
    title: "Workforce Cohort Ticketing",
    tag: "Europe & GCC Group Dispatch",
    icon: Users,
  },
  {
    title: "Transit-Safe Routing",
    tag: "Zero Transit-Visa Surprises",
    icon: ShieldCheck,
  },
];

export default function FlightBookingPage() {
  return (
    <>
      <TrackPageView eventName="flight_booking_view" />

      <PageHero
        kicker="Aviation & Ticketing Desk"
        title="Smart international routing from Accra to the world."
        description="Individual, student, and corporate group flight reservations matched to your visa validity and transit requirements."
        primaryCta={{
          label: "Instant WhatsApp Quote",
          href: buildWhatsAppLink("Hi, I'd like a flight quote from KIA-Start Up Consult."),
          external: true,
        }}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Column (5 cols): Visual Aviation Showcase Card + 2-Photo Mosaic */}
          <div className="space-y-6 lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-lg">
              <div className="relative h-60 w-full">
                <Image
                  src="/images/flight boarding.png"
                  alt="International Flight Boarding & Ticketing Desk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                    <Plane className="h-3 w-3" />
                    Kotoka Intl (ACC) Departure Hub
                  </span>
                </div>
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <p className="text-xs font-semibold text-amber-300">
                    UK &bull; Schengen &bull; GCC &bull; North America
                  </p>
                  <h2 className="font-display text-2xl font-bold text-white">
                    Verified Itinerary &amp; Fare Desk
                  </h2>
                </div>
              </div>

              {/* Secondary 2-Photo Aviation Strip */}
              <div className="grid grid-cols-2 gap-2 border-b border-line bg-slate-50 p-2">
                <div className="relative h-28 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/Airport view.png"
                    alt="Airport Terminal View"
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative h-28 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/flight booking.png"
                    alt="Flight Booking Assistance"
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-3 p-6">
                {farePerks.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.title}
                      className="flex items-center gap-3.5 rounded-2xl border border-line bg-slate-50/80 p-3.5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800 ring-1 ring-amber-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-ink">{p.title}</p>
                        <p className="text-xs text-charcoal-soft">{p.tag}</p>
                      </div>
                    </div>
                  );
                })}

                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    "Embassy Flight Reservations",
                    "Date-Change Support",
                    "B2B Manifest Reporting",
                  ].map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-charcoal"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Interactive Flight Request Form */}
          <div className="lg:col-span-7">
            <FlightRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
