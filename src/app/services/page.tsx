import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  FileCheck2,
  Plane,
  Compass,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";

export const metadata: Metadata = {
  title: "Services & Practices | KIA-Start Up Consult",
  description:
    "Explore our six integrated practices: Work Abroad, Study Abroad, Visa Assistance, Flight Booking, Travel & Tourism, and B2B Institutional Partnerships.",
  alternates: { canonical: "/services" },
};

const serviceShowcases = [
  {
    code: "01",
    title: "Work Abroad Placements",
    badge: "Europe & GCC",
    image: "/images/work abroad.png",
    icon: Briefcase,
    accent: "bg-amber-500 text-white",
    perks: ["Lithuania, Poland, Serbia & Germany", "UAE, Saudi Arabia & Qatar Roles", "Work Permit + Accommodation"],
    href: "/work-abroad",
    cta: "Explore Work Placements",
  },
  {
    code: "02",
    title: "Study Abroad Admissions",
    badge: "2–3 Yr Post-Study Work",
    image: "/images/Study Abroad.png",
    icon: GraduationCap,
    accent: "bg-blue-600 text-white",
    perks: ["UK, Canada, USA & Europe", "WAEC English Waiver Options", "28-Day Financial Audit"],
    href: "/study-abroad",
    cta: "Explore Study Pathways",
  },
  {
    code: "03",
    title: "Consular Visa Assistance",
    badge: "98% Dossier Accuracy",
    image: "/images/visa.png",
    icon: FileCheck2,
    accent: "bg-violet-600 text-white",
    perks: ["Work, Study & Schengen Visas", "Bank Statement & Ties Audit", "1-on-1 Interview Coaching"],
    href: "/visa-assistance",
    cta: "Get Visa Assistance",
  },
  {
    code: "04",
    title: "Flight & Group Ticketing",
    badge: "Accra (ACC) Hub",
    image: "/images/flight boarding.png",
    icon: Plane,
    accent: "bg-amber-600 text-white",
    perks: ["Student Extra-Baggage Fares", "Workforce Group Dispatch", "Transit-Safe Routing"],
    href: "/flight-booking",
    cta: "Request Flight Quote",
  },
  {
    code: "05",
    title: "Travel, Tours & Ghana DMC",
    badge: "Outbound & Inbound",
    image: "/images/Visit Ghana.png",
    icon: Compass,
    accent: "bg-emerald-600 text-white",
    perks: ["Dubai & European Holiday Packages", "Corporate & Conference (MICE)", "Inbound Ghana Heritage DMC"],
    href: "/travel-tourism",
    cta: "Explore Travel & DMC",
  },
  {
    code: "B2B",
    title: "Institutional Partnerships",
    badge: "Employers • Universities • DMC",
    image: "/images/engineer.png",
    icon: Building2,
    accent: "bg-ink text-amber-400",
    perks: ["Turnkey Ghanaian Manpower Supply", "University Cohort Recruitment", "Tour Operator DMC Contracting"],
    href: "/partners",
    cta: "View B2B Corporate Profile",
  },
];

export default function ServicesPage() {
  return (
    <>
      <TrackPageView eventName="services_view" />

      <PageHero
        kicker="All Practices & Services"
        title="Six integrated divisions. One trusted partner."
        description="Select a practice below to explore our active programmes for individuals and international B2B partners."
        primaryCta={{ label: "Browse Open Jobs", href: "/jobs" }}
        secondaryCta={{ label: "B2B Partnership Desk", href: "/partners" }}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {serviceShowcases.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.code}
                className="photo-card-glow group flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white shadow-lg"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="photo-card-img object-cover"
                    />
                    <div className="photo-card-overlay absolute inset-0" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-md ${item.accent}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                        {item.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 left-5 right-5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-300">
                        PRACTICE {item.code}
                      </span>
                      <h2 className="font-display text-2xl font-bold text-white">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-2.5 text-xs font-semibold text-charcoal">
                      {item.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-line/60 px-6 py-4">
                  <Link
                    href={item.href}
                    className="focus-ring flex w-full items-center justify-between rounded-xl bg-slate-100 px-4 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-all group-hover:bg-ink group-hover:text-white"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
