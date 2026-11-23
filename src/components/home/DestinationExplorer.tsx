"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Globe2,
  Clock,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { siteConfig, trackEvent } from "@/data/site";

interface DestinationItem {
  id: string;
  name: string;
  flag: string;
  city: string;
  category: ("work" | "study" | "fast")[];
  image: string;
  badge: string;
  badgeColor: string;
  processingTime: string;
  stayBackPeriod: string;
  workRights: string;
  topSectors: string[];
}

const destinationsList: DestinationItem[] = [
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    city: "London, Manchester & Birmingham",
    category: ["work", "study"],
    image: "/images/University Campus.png",
    badge: "2-Year Graduate Work Visa",
    badgeColor: "bg-amber-500 text-white",
    processingTime: "3–6 Weeks",
    stayBackPeriod: "2–3 Years Graduate Visa",
    workRights: "20 hrs/wk (Study) • Full-Time (CoS)",
    topSectors: ["Healthcare & Nursing", "IT & Engineering", "Business & Finance"],
  },
  {
    id: "germany",
    name: "Germany & EU Europe",
    flag: "🇩🇪",
    city: "Berlin, Vilnius, Warsaw & Belgrade",
    category: ["work", "study", "fast"],
    image: "/images/Germany.png",
    badge: "Type-D Work Permits & Chancenkarte",
    badgeColor: "bg-blue-600 text-white",
    processingTime: "4–8 Weeks",
    stayBackPeriod: "1–2 Yr Work / 18-Mo Job Seeker",
    workRights: "Full Employer Placement / Study",
    topSectors: ["Skilled Trades", "Manufacturing & Warehousing", "Hospitality"],
  },
  {
    id: "uae",
    name: "UAE & Gulf States (GCC)",
    flag: "🇦🇪",
    city: "Dubai, Abu Dhabi, Riyadh & Doha",
    category: ["work", "fast"],
    image: "/images/Beautiful Dubai.png",
    badge: "0% Tax • 2–4 Wk Fast-Track",
    badgeColor: "bg-emerald-600 text-white",
    processingTime: "2–4 Weeks",
    stayBackPeriod: "2-Year Renewable Residency",
    workRights: "Full Employer Sponsorship",
    topSectors: ["Electricians & Plumbers", "Heavy Transport", "Security & Aviation"],
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    city: "Toronto, Vancouver & Calgary",
    category: ["work", "study"],
    image: "/images/University area view.png",
    badge: "Up to 3-Year Open Work Permit (PGWP)",
    badgeColor: "bg-red-600 text-white",
    processingTime: "6–10 Weeks",
    stayBackPeriod: "Up to 3 Years PGWP",
    workRights: "Off-Campus & Co-Op Work Rights",
    topSectors: ["Applied Technology", "Engineering Trades", "Healthcare"],
  },
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    city: "New York, Houston & California",
    category: ["study"],
    image: "/images/University.png",
    badge: "STEM OPT 3-Year Work Extension",
    badgeColor: "bg-indigo-600 text-white",
    processingTime: "4–8 Weeks",
    stayBackPeriod: "1–3 Years OPT Work Auth",
    workRights: "On-Campus 20 hrs + CPT/OPT",
    topSectors: ["Computer Science & AI", "Biotechnology", "Graduate Business"],
  },
  {
    id: "ghana",
    name: "Visit Ghana (Heritage DMC)",
    flag: "🇬🇭",
    city: "Accra, Cape Coast, Elmina & Kumasi",
    category: ["fast"],
    image: "/images/Ghana heritage.png",
    badge: "Inbound Heritage & Eco-Tourism",
    badgeColor: "bg-amber-600 text-white",
    processingTime: "1–2 Weeks",
    stayBackPeriod: "Custom Group & VIP Circuits",
    workRights: "Full Ground Fleet & Hotel DMC",
    topSectors: ["Heritage & Castles", "Cultural Festivals", "Corporate Delegations"],
  },
];

const filters = [
  { id: "all" as const, label: "All Corridors", count: destinationsList.length },
  {
    id: "work" as const,
    label: "Work Pathways",
    count: destinationsList.filter((d) => d.category.includes("work")).length,
  },
  {
    id: "study" as const,
    label: "Study & PGWP",
    count: destinationsList.filter((d) => d.category.includes("study")).length,
  },
  {
    id: "fast" as const,
    label: "Fast-Track & DMC",
    count: destinationsList.filter((d) => d.category.includes("fast")).length,
  },
];

type FilterType = "all" | "work" | "study" | "fast";

export default function DestinationExplorer() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredDestinations = destinationsList.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category.includes(activeFilter);
  });

  useEffect(() => {
    const idx = filters.findIndex((f) => f.id === activeFilter);
    const btn = btnRefs.current[idx];
    const container = containerRef.current;
    if (!btn || !container) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setPillStyle({
      left: btnRect.left - containerRect.left,
      width: btnRect.width,
    });
  }, [activeFilter]);

  return (
    <section id="destinations" className="relative overflow-hidden bg-[#fafaf9] py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-900">
              <Globe2 className="h-3.5 w-3.5 text-blue-600" />
              <span>Global Destination Corridors</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Explore our top corridors.
            </h2>
          </div>

          {/* Interactive Sliding Filter Pills */}
          <div
            ref={containerRef}
            className="relative flex flex-wrap items-center gap-1 rounded-2xl border border-line bg-white p-1.5 shadow-sm"
          >
            <div
              className="filter-active-pill absolute top-1.5 bottom-1.5 hidden rounded-xl transition-all duration-300 sm:block"
              style={{ left: pillStyle.left, width: pillStyle.width }}
            />

            {filters.map((tab, i) => (
              <button
                key={tab.id}
                ref={(el) => {
                  btnRefs.current[i] = el;
                }}
                type="button"
                onClick={() => {
                  setActiveFilter(tab.id);
                  trackEvent("destination_filter_click", { filter: tab.id });
                }}
                className={`relative z-10 flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-colors duration-200 ${
                  activeFilter === tab.id
                    ? "bg-ink text-white sm:bg-transparent"
                    : "text-charcoal-soft hover:text-ink"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-black transition-colors ${
                    activeFilter === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-charcoal-soft"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Photo-Backed Destination Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="photo-card-glow group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line/80 bg-white shadow-md"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={dest.image}
                  alt={`${dest.name} - ${dest.city}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="photo-card-img object-cover"
                />
                <div className="photo-card-overlay absolute inset-0" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold shadow-md ${dest.badgeColor}`}
                  >
                    {dest.badge}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow-md backdrop-blur-md">
                    {dest.flag}
                  </span>
                </div>

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <p className="text-xs font-medium text-slate-300">{dest.city}</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                    {dest.name}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="grid grid-cols-2 gap-2.5 rounded-2xl border border-line/60 bg-slate-50/80 p-3 text-xs">
                    <div className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-charcoal-soft">
                          Lead Time
                        </p>
                        <p className="font-bold text-charcoal">{dest.processingTime}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                      <div>
                        <p className="text-[10px] font-bold uppercase text-charcoal-soft">
                          Tenure / Stay
                        </p>
                        <p className="font-bold text-charcoal">{dest.stayBackPeriod}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {dest.topSectors.map((sector) => (
                      <span
                        key={sector}
                        className="inline-flex items-center gap-1 rounded-lg border border-line bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-charcoal"
                      >
                        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t border-line/60 pt-4">
                  <p className="mb-3 flex items-center gap-1 text-xs font-medium text-charcoal-soft">
                    <Briefcase className="h-3.5 w-3.5 text-amber-600" />
                    {dest.workRights}
                  </p>

                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                      `Hello KIA-Start Up Consult, I'd like to explore opportunities in ${dest.name} (${dest.badge}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("destination_card_click", { destination: dest.name })
                    }
                    className="focus-ring group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3 text-xs font-bold tracking-wide text-white shadow-sm transition-all hover:bg-charcoal"
                  >
                    <span>Explore {dest.name}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
