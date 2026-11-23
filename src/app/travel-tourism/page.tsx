import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Building2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import { buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Travel, Tourism & Visit Ghana DMC | KIA-Start Up Consult",
  description:
    "Outbound international tours (Dubai, Europe, Family Holidays) and Inbound Visit Ghana Destination Management (DMC), heritage, culture, and nature tours.",
  alternates: { canonical: "/travel-tourism" },
};

const outboundPackages = [
  {
    title: "Dubai & UAE Luxury Experience",
    tag: "Dubai Skyline, Desert Safari & Shopping",
    badge: "Fast E-Visa + Hotel",
    badgeColor: "bg-emerald-600 text-white",
    image: "/images/Beautiful Dubai.png",
    perks: ["UAE Tourist Visa", "4★/5★ Hotel & Transfers", "City & Marina Tours"],
  },
  {
    title: "Dubai Group & VIP Departures",
    tag: "Direct Flights from Accra (ACC)",
    badge: "All-Inclusive Package",
    badgeColor: "bg-amber-500 text-white",
    image: "/images/Dubai here we come.png",
    perks: ["Return Flights Included", "Guided Excursions", "Zero Hassle Entry"],
  },
  {
    title: "Family Vacations & Group Holidays",
    tag: "Custom Family-Friendly Itineraries",
    badge: "Family Packages",
    badgeColor: "bg-blue-600 text-white",
    image: "/images/Family Travel.png",
    perks: ["Child-Friendly Resorts", "Group Flight Discounts", "Full Visa Dossier"],
  },
  {
    title: "European & Global Tours",
    tag: "Schengen, UK & International Escapes",
    badge: "Schengen Dossier Ready",
    badgeColor: "bg-violet-600 text-white",
    image: "/images/Travel abroad.png",
    perks: ["Flight + Hotel Vouchers", "Travel Medical Insurance", "Embassy Interview Prep"],
  },
];

const ghanaDmcMosaic = [
  {
    title: "Visit Ghana: Gateway to West Africa",
    tag: "VIP Airport Protocol & Executive Fleet",
    image: "/images/Visit Ghana.png",
    span: "md:col-span-2",
  },
  {
    title: "Castles & UNESCO Heritage",
    tag: "Cape Coast & Elmina Circuits",
    image: "/images/Ghana heritage.png",
    span: "md:col-span-1",
  },
  {
    title: "Royal Festivals & Living Culture",
    tag: "Ashanti & Pan-African Roots",
    image: "/images/Ghana Culture.png",
    span: "md:col-span-1",
  },
  {
    title: "Eco-Tourism, Waterfalls & Canopy Walks",
    tag: "Kakum, Volta & Nature Reserves",
    image: "/images/Ghana nature.png",
    span: "md:col-span-2",
  },
];

export default function TravelTourismPage() {
  return (
    <>
      <TrackPageView eventName="travel_enquiry" />

      <PageHero
        kicker="Outbound Holidays & Visit Ghana DMC"
        title="Unforgettable global tours. Authentic Ghana heritage."
        description="From Dubai luxury escapes and family holidays to full-service Inbound Ghana Destination Management (DMC) for diaspora and international tour operators."
        primaryCta={{
          label: "Plan My Trip on WhatsApp",
          href: buildWhatsAppLink("Hi, I'd like to plan a trip with KIA-Start Up Consult."),
          external: true,
        }}
        secondaryCta={{ label: "Request Custom Itinerary", href: "/contact?service=travel-tourism" }}
      />

      {/* Inbound Visit Ghana & Heritage DMC 4-Tile Bento Mosaic */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Inbound Destination Management (DMC)
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
              Experience Ghana: Heritage, Culture &amp; Nature
            </h2>
          </div>
          <a
            href={buildWhatsAppLink("Hi, I'm interested in a Visit Ghana heritage / DMC tour.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 underline underline-offset-4 hover:text-ink"
          >
            <span>Book a Ghana Heritage Tour →</span>
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {ghanaDmcMosaic.map((tile) => (
            <a
              key={tile.title}
              href={buildWhatsAppLink(`Hi, I'd like to inquire about ${tile.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={`photo-card-glow group relative h-72 overflow-hidden rounded-3xl border border-line shadow-lg ${tile.span}`}
            >
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="photo-card-img object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/25 to-transparent" />
              <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-md backdrop-blur-md transition-transform group-hover:scale-110 group-hover:bg-amber-400">
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="inline-block rounded-full bg-amber-400 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                  {tile.tag}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                  {tile.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Outbound International Packages (2x2 Photo Grid) */}
      <section className="border-t border-line bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Outbound International Holidays
              </span>
              <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
                Dubai, Europe &amp; Family Packages
              </h2>
            </div>
            <p className="text-xs font-semibold text-charcoal-soft">
              Flights &bull; Visas &bull; 4★/5★ Hotels &bull; Guided Excursions
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {outboundPackages.map((item) => (
              <div
                key={item.title}
                className="photo-card-glow group flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-[#fafaf9] shadow-lg"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="photo-card-img object-cover"
                  />
                  <div className="photo-card-overlay absolute inset-0" />

                  <div className="absolute top-4 left-4">
                    <span
                      className={`rounded-full px-3.5 py-1 text-xs font-bold shadow-md ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <p className="text-xs font-semibold text-amber-300">{item.tag}</p>
                    <h3 className="mt-0.5 font-display text-2xl font-bold text-white sm:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                  <div className="flex flex-wrap gap-2">
                    {item.perks.map((perk) => (
                      <span
                        key={perk}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-1.5 text-xs font-bold text-charcoal"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        {perk}
                      </span>
                    ))}
                  </div>

                  <a
                    href={buildWhatsAppLink(
                      `Hi KIA-Start Up Consult, I'm interested in the ${item.title} package.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-ink px-5 py-3 text-xs font-bold text-white transition-all hover:bg-charcoal"
                  >
                    <span>Book</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Tour Operator & DMC Banner */}
      <section className="bg-[#0b0f17] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#041a0f] shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative min-h-[220px] lg:col-span-5">
                <Image
                  src="/images/Africa tour.png"
                  alt="Ghana & West Africa DMC Partner"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-between p-8 sm:p-10 lg:col-span-7">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                    <Building2 className="h-3 w-3" />
                    For Global Tour Operators &amp; Diaspora Groups
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                    Your on-the-ground Destination Management (DMC) partner in Ghana.
                  </h2>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/partners"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:bg-amber-300"
                  >
                    <span>Explore DMC B2B Profile</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact?service=b2b-partnership"
                    className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                  >
                    <span>Request DMC Proposal</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
