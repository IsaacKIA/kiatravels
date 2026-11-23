"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import JobCard from "@/components/JobCard";
import EmptyState from "@/components/EmptyState";
import { jobs, jobSectors } from "@/data/jobs";
import { buildWhatsAppLink } from "@/data/site";

export default function JobsExplorer() {
  const searchParams = useSearchParams();
  const initialSector = searchParams.get("sector") ?? "all";
  const initialCountry = searchParams.get("country") ?? "all";

  const [selectedSector, setSelectedSector] = useState<string>(initialSector);
  const [selectedCountry, setSelectedCountry] = useState<string>(initialCountry);
  const [query, setQuery] = useState<string>("");

  const availableCountries = useMemo(() => {
    const map = new Map<string, string>();
    jobs.forEach((job) => {
      if (!map.has(job.country)) {
        map.set(job.country, job.countryFlagEmoji);
      }
    });
    return Array.from(map.entries()).map(([country, flag]) => ({ country, flag }));
  }, []);

  const availableSectors = useMemo(() => {
    const set = new Set<string>(jobSectors);
    jobs.forEach((job) => set.add(job.sector));
    return Array.from(set);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (selectedCountry !== "all" && job.country !== selectedCountry) {
        return false;
      }
      if (
        selectedSector !== "all" &&
        job.sector.toLowerCase() !== selectedSector.toLowerCase() &&
        !(job.sector === "Multiple Sectors" && job.benefits?.join(" ").toLowerCase().includes(selectedSector.split(" ")[0].toLowerCase()))
      ) {
        return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        const haystack = [
          job.title,
          job.country,
          job.sector,
          job.description ?? "",
          ...(job.benefits ?? []),
          ...(job.requirements ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [selectedCountry, selectedSector, query]);

  const hasFilters = selectedCountry !== "all" || selectedSector !== "all" || query.trim() !== "";

  return (
    <>
      {/* Interactive Filter Bar */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search role, country, or skill (e.g. driver, warehouse, Lithuania)..."
                aria-label="Search job opportunities"
                className="focus-ring w-full rounded-xl border border-line bg-slate-50/70 py-2.5 pr-9 pl-10 text-xs font-medium text-ink placeholder:text-slate-400 focus:bg-white outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Country Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCountry("all")}
                className={`focus-ring rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                  selectedCountry === "all"
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-slate-50 text-charcoal hover:border-amber-400"
                }`}
              >
                All Countries ({jobs.length})
              </button>
              {availableCountries.map(({ country, flag }) => (
                <button
                  key={country}
                  type="button"
                  onClick={() =>
                    setSelectedCountry((prev) => (prev === country ? "all" : country))
                  }
                  className={`focus-ring rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                    selectedCountry === country
                      ? "border-amber-500 bg-amber-50 text-amber-950 font-bold"
                      : "border-line bg-white text-charcoal hover:border-amber-300"
                  }`}
                >
                  {flag} {country}
                </button>
              ))}
            </div>
          </div>

          {/* Sector Filter Pills */}
          <div className="mt-4 pt-4 border-t border-line/60">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal-soft">
                Filter by Sector
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCountry("all");
                    setSelectedSector("all");
                    setQuery("");
                  }}
                  className="text-xs font-bold text-amber-800 hover:underline"
                >
                  Reset all filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedSector("all")}
                className={`focus-ring rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  selectedSector === "all"
                    ? "border-amber-500 bg-amber-100/80 text-amber-950 font-bold"
                    : "border-line bg-slate-50 text-charcoal hover:border-amber-300"
                }`}
              >
                All Sectors
              </button>
              {availableSectors.map((sector) => (
                <button
                  key={sector}
                  type="button"
                  onClick={() =>
                    setSelectedSector((prev) => (prev === sector ? "all" : sector))
                  }
                  className={`focus-ring rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    selectedSector === sector
                      ? "border-amber-500 bg-amber-100/80 text-amber-950 font-bold"
                      : "border-line bg-slate-50 text-charcoal hover:border-amber-300"
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Current openings</h2>
            <p className="mt-1 text-sm text-charcoal-soft">
              Showing {filteredJobs.length} of {jobs.length} verified active listing
              {jobs.length !== 1 ? "s" : ""}
              {selectedCountry !== "all" ? ` in ${selectedCountry}` : ""}
              {selectedSector !== "all" ? ` · ${selectedSector}` : ""}
            </p>
          </div>
        </div>

        <div className="mt-10">
          {filteredJobs.length === 0 ? (
            <EmptyState
              title="No matching job openings found"
              description="Try clearing your country or sector filter, or message our advisors directly on WhatsApp to check upcoming demand orders for your trade."
              ctaLabel="Ask an Advisor on WhatsApp"
              ctaHref={buildWhatsAppLink(
                "Hi, I'm looking for a specific overseas job opportunity. Can you advise on available roles?"
              )}
            />
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
