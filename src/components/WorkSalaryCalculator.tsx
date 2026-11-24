"use client";

import { useState } from "react";
import { Calculator, CheckCircle2, ArrowUpRight } from "lucide-react";
import { buildWhatsAppLink, trackEvent } from "@/data/site";

interface SalaryRoleTier {
  id: string;
  label: string;
  corridor: string;
  flag: string;
  currency: string;
  symbol: string;
  ghsRate: number;
  baseMonthly: number;
  hourlyOvertime: number;
  perks: string[];
}

const salaryTiers: SalaryRoleTier[] = [
  {
    id: "eu-mobility",
    label: "Europe Work Package (Warehouse / Factory / Hospitality)",
    corridor: "Lithuania • Poland • Germany • Serbia",
    flag: "🇪🇺",
    currency: "EUR",
    symbol: "€",
    ghsRate: 16.8,
    baseMonthly: 1400,
    hourlyOvertime: 10,
    perks: ["Employer Accommodation Provided", "Flight Ticket Included", "1–2 Month Processing"],
  },
  {
    id: "gcc-trades",
    label: "GCC Certified Electrician, Plumber, Welder or HVAC",
    corridor: "UAE • Saudi Arabia • Qatar",
    flag: "🇦🇪",
    currency: "AED",
    symbol: "AED ",
    ghsRate: 4.25,
    baseMonthly: 2600,
    hourlyOvertime: 16,
    perks: ["100% Tax-Free Salary", "Free Housing & Site Transport", "2-Year Renewable Visa"],
  },
  {
    id: "gcc-drivers",
    label: "GCC Heavy-Duty Trailer, Bus or Delivery Driver",
    corridor: "Dubai • Abu Dhabi • Riyadh",
    flag: "🇦🇪",
    currency: "AED",
    symbol: "AED ",
    ghsRate: 4.25,
    baseMonthly: 2800,
    hourlyOvertime: 18,
    perks: ["Trip Allowances + Overtime", "Free Employer Accommodation", "Medical Insurance"],
  },
  {
    id: "gcc-security",
    label: "GCC Aviation & Corporate Security Guard",
    corridor: "Dubai & Abu Dhabi Airports / Corporate",
    flag: "🇦🇪",
    currency: "AED",
    symbol: "AED ",
    ghsRate: 4.25,
    baseMonthly: 2400,
    hourlyOvertime: 14,
    perks: ["Free Accommodation & Meals (Select Contracts)", "Tax-Free Take-Home", "Fast Deployment"],
  },
  {
    id: "gcc-cleaning",
    label: "GCC Warehouse, Aviation Loader & Facility Cleaning",
    corridor: "Dubai & Sharjah (DNATA / Transguard / Farnek)",
    flag: "🇦🇪",
    currency: "AED",
    symbol: "AED ",
    ghsRate: 4.25,
    baseMonthly: 1200,
    hourlyOvertime: 9,
    perks: ["Zero Rent or Transport Cost", "High Overtime Availability", "2–4 Week Processing"],
  },
];

export default function WorkSalaryCalculator() {
  const [selected, setSelected] = useState<SalaryRoleTier>(salaryTiers[0]);
  const [weeklyOvertime, setWeeklyOvertime] = useState<number>(8);

  const monthlyOvertimePay = Math.round(weeklyOvertime * 4.33 * selected.hourlyOvertime);
  const totalMonthlyForeign = selected.baseMonthly + monthlyOvertimePay;
  const totalMonthlyGhs = Math.round(totalMonthlyForeign * selected.ghsRate);

  const applyMsg = `Hello KIA-Start Up Consult, I used the Overseas Salary Estimator for "${selected.label}" (${selected.corridor}) with ~${weeklyOvertime} hrs/wk overtime [Est. ${selected.symbol}${totalMonthlyForeign.toLocaleString()}/mo ~ GHS ${totalMonthlyGhs.toLocaleString()}]. How can I apply?`;

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Controls */}
          <div className="p-7 sm:p-10 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Calculator className="h-3.5 w-3.5 text-emerald-600" />
              <span>Interactive Overseas Earnings &amp; GHS Estimator</span>
            </div>

            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
              Estimate your monthly take-home pay in Europe or the GCC.
            </h2>

            <div className="mt-6">
              <label htmlFor="salary-role" className="text-xs font-bold uppercase tracking-wider text-charcoal-soft">
                1. Select Placement Package &amp; Trade Tier:
              </label>
              <select
                id="salary-role"
                value={selected.id}
                onChange={(e) => {
                  const found = salaryTiers.find((t) => t.id === e.target.value) ?? salaryTiers[0];
                  setSelected(found);
                  trackEvent("salary_calculator_role_change", { role: found.id });
                }}
                className="focus-ring mt-2 w-full rounded-2xl border border-line bg-[#fafaf9] px-4 py-3.5 text-sm font-bold text-ink outline-none focus:border-amber-400 focus:bg-white"
              >
                {salaryTiers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.flag} {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-[#fafaf9] p-4">
              <div className="flex items-center justify-between">
                <label htmlFor="ot-slider" className="text-xs font-bold text-charcoal-soft">
                  2. Estimated Weekly Overtime Hours:
                </label>
                <span className="font-mono text-sm font-bold text-ink">
                  {weeklyOvertime} hrs / week
                </span>
              </div>
              <input
                id="ot-slider"
                type="range"
                min={0}
                max={20}
                step={2}
                value={weeklyOvertime}
                onChange={(e) => setWeeklyOvertime(Number(e.target.value))}
                className="mt-3 w-full accent-emerald-600"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {selected.perks.map((perk) => (
                <span
                  key={perk}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-slate-50 px-3 py-1.5 text-xs font-bold text-charcoal"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {perk}
                </span>
              ))}
            </div>
          </div>

          {/* Right Output Panel */}
          <div className="flex flex-col justify-between bg-[#0f172a] p-7 text-white sm:p-10 lg:col-span-5">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                ESTIMATED MONTHLY TAKE-HOME
              </span>
              <p className="mt-1 text-xs text-slate-300">
                {selected.flag} {selected.corridor}
              </p>

              <div className="mt-4">
                <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                  {selected.symbol}
                  {totalMonthlyForeign.toLocaleString()}
                  <span className="text-base font-normal text-slate-400"> / mo</span>
                </p>
                <p className="mt-1.5 font-mono text-sm font-bold text-amber-400">
                  ≈ GHS {totalMonthlyGhs.toLocaleString()} / month
                </p>
              </div>

              <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Base Monthly Contract Salary:</span>
                  <span className="font-mono font-bold text-white">
                    {selected.symbol}
                    {selected.baseMonthly.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Est. Overtime ({weeklyOvertime} hrs/wk):</span>
                  <span className="font-mono font-bold text-emerald-400">
                    +{selected.symbol}
                    {monthlyOvertimePay.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Accommodation &amp; Transport:</span>
                  <span className="font-bold text-amber-300">Provided by Employer</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <a
                href={buildWhatsAppLink(applyMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg transition-all hover:bg-amber-300"
              >
                <span>Apply for This Placement Tier</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
