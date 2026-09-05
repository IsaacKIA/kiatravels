"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Globe2,
  Clock,
  Briefcase,
  GraduationCap,
  Sparkles,
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
  description: string;
  topSectors: string[];
}

const destinationsList: DestinationItem[] = [
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    city: "London & Manchester",
    category: ["work", "study"],
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    badge: "2-Year Post-Study Work Permit",
    badgeColor: "bg-amber-500 text-white",
    processingTime: "3–6 Weeks",
    stayBackPeriod: "2–3 Years Graduate Visa",
    workRights: "20 hrs/week (Study) / Full-Time (Work)",
    description:
      "World-class universities, direct NHS and skilled worker shortage pathways, and established Ghanaian diaspora networks.",
    topSectors: ["Healthcare & Nursing", "IT & Cybersecurity", "Finance & Business"],
  },
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    city: "Toronto, Vancouver & Calgary",
    category: ["work", "study"],
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80",
    badge: "3-Year Open Work Permit (PGWP)",
    badgeColor: "bg-red-600 text-white",
    processingTime: "6–10 Weeks",
    stayBackPeriod: "Up to 3 Years PGWP",
    workRights: "Full-Time Co-Op & Work Rights",
    description:
      "One of the world's most welcoming immigration ecosystems. Graduate from a DLI college and transition into permanent residency.",
    topSectors: ["Tech & Computing", "Engineering Trades", "Supply Chain"],
  },
  {
    id: "germany",
    name: "Germany",
    flag: "🇩🇪",
    city: "Berlin, Munich & Frankfurt",
    category: ["work", "study"],
    image:
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80",
    badge: "Chancenkarte / 0% Tuition Study",
    badgeColor: "bg-blue-600 text-white",
    processingTime: "4–8 Weeks",
    stayBackPeriod: "18 Months Job Seeking Visa",
    workRights: "140 Full Days / Year allowed",
    description:
      "Europe's strongest economic engine. Access English-taught tuition-free university programmes or the new Opportunity Card.",
    topSectors: ["Automotive & Mechanical", "Software Engineering", "Logistics"],
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    city: "Dubai & Abu Dhabi",
    category: ["work", "fast"],
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    badge: "0% Income Tax • Rapid Processing",
    badgeColor: "bg-emerald-600 text-white",
    processingTime: "1–3 Weeks (Fast-Track)",
    stayBackPeriod: "2-Year Renewable Residence",
    workRights: "Full Sponsorship Rights",
    description:
      "A booming global hub with zero personal income tax, swift visa processing, and booming luxury hospitality and real estate careers.",
    topSectors: ["Hospitality & Tourism", "Real Estate & Sales", "Aviation & Logistics"],
  },
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    city: "New York, Texas & California",
    category: ["study"],
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    badge: "STEM OPT 3-Year Extension",
    badgeColor: "bg-indigo-600 text-white",
    processingTime: "4–8 Weeks",
    stayBackPeriod: "1–3 Years OPT Work Auth",
    workRights: "On-campus 20 hrs + CPT/OPT",
    description:
      "The pinnacle of global academia. Benefit from lucrative STEM degree OPT extensions allowing up to 3 years of US employment post-graduation.",
    topSectors: ["Computer Science", "Biotechnology", "Data Analytics"],
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    city: "Sydney, Melbourne & Perth",
    category: ["study", "work"],
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    badge: "High Minimum Wage • Subclass 485",
    badgeColor: "bg-teal-600 text-white",
    processingTime: "6–8 Weeks",
    stayBackPeriod: "2–4 Years Post-Study Work",
    workRights: "48 hrs per fortnight during study",
    description:
      "Exceptional quality of life, highest national minimum wage rates in the world, and extensive post-study regional visa extensions.",
    topSectors: ["Mining & Engineering", "Aged Care & Nursing", "Agriculture"],
  },
];

const filters = [
  { id: "all" as const, label: "All Countries", count: destinationsList.length, color: "text-white" },
  { id: "work" as const, label: "Work Pathways", count: destinationsList.filter((d) => d.category.includes("work")).length, color: "text-blue-300" },
  { id: "study" as const, label: "Study & PGWP", count: destinationsList.filter((d) => d.category.includes("study")).length, color: "text-violet-300" },
  { id: "fast" as const, label: "Fast-Track ⚡", count: destinationsList.filter((d) => d.category.includes("fast")).length, color: "text-amber-300" },
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

  // Compute sliding pill position
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
    <section id="destinations" className="relative bg-[#fafaf9] py-24 sm:py-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 left-10 h-80 w-80 rounded-full bg-amber-400/12 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full bg-blue-500/12 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-900">
              <Globe2 className="h-3.5 w-3.5 text-blue-600" />
              <span>Global Destination Guide</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Explore where your talent{" "}
              <br className="hidden sm:inline" />
              can take you next.
            </h2>
            <p className="mt-4 text-base text-charcoal-soft">
              Compare processing timelines, post-study work rights, and industry demand across the
              world&rsquo;s top destinations for Ghanaian applicants.
            </p>
          </div>

          {/* Animated Filter Pills */}
          <div
            ref={containerRef}
            className="relative flex items-center gap-1 rounded-2xl bg-white border border-line shadow-sm p-1.5"
          >
            {/* Sliding indicator */}
            <div
              className="filter-active-pill absolute top-1.5 bottom-1.5 rounded-xl transition-all duration-300"
              style={{ left: pillStyle.left, width: pillStyle.width }}
            />

            {filters.map((tab, i) => (
              <button
                key={tab.id}
                ref={(el) => { btnRefs.current[i] = el; }}
                onClick={() => {
                  setActiveFilter(tab.id);
                  trackEvent("destination_filter_click", { filter: tab.id });
                }}
                className={`relative z-10 flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-colors duration-200 ${
                  activeFilter === tab.id ? "text-white" : "text-charcoal-soft hover:text-ink"
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

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="photo-card-glow group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line/80 bg-white shadow-md"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={dest.image}
                  alt={`${dest.name} - ${dest.city}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="photo-card-img object-cover"
                />
                <div className="photo-card-overlay absolute inset-0" />

                {/* Top Badge Row */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wide shadow-md backdrop-blur-md ${dest.badgeColor}`}
                  >
                    {dest.badge}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-lg shadow-sm">
                    {dest.flag}
                  </span>
                </div>

                {/* Country Title over Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-medium tracking-wide text-slate-300 uppercase">
                    {dest.city}
                  </p>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                    {dest.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="text-xs leading-relaxed text-charcoal-soft">{dest.description}</p>

                  {/* Key Metrics */}
                  <div className="mt-5 space-y-2.5 rounded-2xl bg-slate-50 p-3.5 border border-line/60 text-xs">
                    <div className="flex items-center justify-between text-charcoal">
                      <span className="flex items-center gap-1.5 text-charcoal-soft">
                        <Clock className="h-3.5 w-3.5 text-amber-600" />
                        Processing Time:
                      </span>
                      <strong className="font-bold">{dest.processingTime}</strong>
                    </div>
                    <div className="flex items-center justify-between text-charcoal">
                      <span className="flex items-center gap-1.5 text-charcoal-soft">
                        <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
                        Stay-Back Permit:
                      </span>
                      <strong className="font-bold">{dest.stayBackPeriod}</strong>
                    </div>
                    <div className="flex items-center justify-between text-charcoal">
                      <span className="flex items-center gap-1.5 text-charcoal-soft">
                        <Briefcase className="h-3.5 w-3.5 text-emerald-600" />
                        Work Rights:
                      </span>
                      <strong className="font-bold text-[11px]">{dest.workRights}</strong>
                    </div>
                  </div>

                  {/* High Demand Sectors */}
                  <div className="mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-soft">
                      High Demand Roles:
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {dest.topSectors.map((sector) => (
                        <span
                          key={sector}
                          className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-900 border border-amber-200/50"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-4 border-t border-line/60">
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                      `Hello KIA Consult! I am reviewing opportunities in ${dest.name} (${dest.badge}). Could you explain the requirements and how I can qualify?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("destination_inquire_click", { country: dest.name })}
                    className="focus-ring flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-xs font-bold text-white transition-all hover:bg-charcoal group-hover:shadow-lg"
                  >
                    <span>Inquire for {dest.name}</span>
                    <ArrowUpRight className="h-4 w-4 text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nudge */}
        <div className="mt-12 text-center">
          <p className="text-sm text-charcoal-soft">
            Not sure which country suits you?{" "}
            <a
              href="/#matcher"
              className="font-semibold text-amber-700 hover:text-amber-600 underline underline-offset-4 transition-colors"
            >
              Take our 60-second Pathway Matcher →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
