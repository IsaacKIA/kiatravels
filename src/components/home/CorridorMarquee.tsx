const marqueeItems = [
  "🇬🇧 United Kingdom — CAS Study & Skilled Worker",
  "🇩🇪 Germany — Engineering & Chancenkarte",
  "🇱🇹 Lithuania — Industrial Electricians & Trades",
  "🇦🇪 Dubai & Abu Dhabi — Tax-Free GCC Deployments",
  "🇨🇦 Canada — DLI Colleges & 3-Year PGWP",
  "🇵🇱 Poland — Plumbers, Pipefitters & Type-D Permits",
  "🇬🇭 Visit Ghana — Heritage, Culture & Corporate DMC",
  "🇫🇮 Finland — Facility & Commercial Operations",
  "🇺🇸 United States — F-1 STEM OPT & Visitor Visas",
];

export default function CorridorMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-slate-800 bg-[#0b0f17] py-3.5 text-white">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0b0f17] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0b0f17] to-transparent" />

      <div className="marquee-track flex w-max items-center gap-8">
        {[...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex shrink-0 items-center gap-3 text-xs font-bold tracking-wide text-slate-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
