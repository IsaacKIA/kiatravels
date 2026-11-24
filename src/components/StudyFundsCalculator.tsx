"use client";

import { useState } from "react";
import { Calculator, ShieldCheck, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { buildWhatsAppLink, trackEvent } from "@/data/site";

interface StudyJurisdiction {
  id: string;
  label: string;
  flag: string;
  currency: string;
  symbol: string;
  ghsRate: number; // Approx indicative GHS conversion rate
  livingRequirement: number;
  livingNote: string;
  defaultTuition: number;
  defaultDeposit: number;
  ruleSummary: string;
}

const jurisdictions: StudyJurisdiction[] = [
  {
    id: "uk-outside",
    label: "UK (Outside London)",
    flag: "🇬🇧",
    currency: "GBP",
    symbol: "£",
    ghsRate: 19.8,
    livingRequirement: 9207, // £1,023 x 9 months
    livingNote: "UKVI Statutory: £1,023/mo × 9 months",
    defaultTuition: 15500,
    defaultDeposit: 4000,
    ruleSummary: "Must be held continuously for 28 consecutive days prior to CAS / visa application.",
  },
  {
    id: "uk-london",
    label: "UK (Greater London)",
    flag: "🇬🇧",
    currency: "GBP",
    symbol: "£",
    ghsRate: 19.8,
    livingRequirement: 12006, // £1,334 x 9 months
    livingNote: "UKVI Statutory: £1,334/mo × 9 months",
    defaultTuition: 17500,
    defaultDeposit: 5000,
    ruleSummary: "Must be held continuously for 28 consecutive days in an approved personal or parent account.",
  },
  {
    id: "canada",
    label: "Canada (DLI Permit)",
    flag: "🇨🇦",
    currency: "CAD",
    symbol: "CA$",
    ghsRate: 11.2,
    livingRequirement: 20635, // IRCC single applicant living funds
    livingNote: "IRCC Statutory 12-Month Living Threshold",
    defaultTuition: 18000,
    defaultDeposit: 6000,
    ruleSummary: "Requires 4–6 months verifiable bank history + clear sponsor source-of-funds evidence.",
  },
  {
    id: "germany",
    label: "Germany / Europe",
    flag: "🇩🇪",
    currency: "EUR",
    symbol: "€",
    ghsRate: 16.8,
    livingRequirement: 11904, // €992 x 12 months blocked account
    livingNote: "Statutory 12-Month Blocked Account (€992/mo)",
    defaultTuition: 3000,
    defaultDeposit: 1500,
    ruleSummary: "Public universities charge near-zero tuition; living funds are placed in a German Blocked Account.",
  },
  {
    id: "usa",
    label: "United States (F-1)",
    flag: "🇺🇸",
    currency: "USD",
    symbol: "$",
    ghsRate: 15.6,
    livingRequirement: 14500,
    livingNote: "Typical 9-Month Campus Room & Board Estimate",
    defaultTuition: 22000,
    defaultDeposit: 2000,
    ruleSummary: "Liquid bank statement must match or exceed the total 12-month cost printed on your Form I-20.",
  },
];

export default function StudyFundsCalculator() {
  const [selected, setSelected] = useState<StudyJurisdiction>(jurisdictions[0]);
  const [tuition, setTuition] = useState<number>(jurisdictions[0].defaultTuition);
  const [deposit, setDeposit] = useState<number>(jurisdictions[0].defaultDeposit);

  const handleSelectJurisdiction = (j: StudyJurisdiction) => {
    setSelected(j);
    setTuition(j.defaultTuition);
    setDeposit(j.defaultDeposit);
    trackEvent("study_calculator_switch", { jurisdiction: j.id });
  };

  const remainingTuition = Math.max(0, tuition - deposit);
  const totalForeignRequired = remainingTuition + selected.livingRequirement;
  const approxGhs = Math.round(totalForeignRequired * selected.ghsRate);

  const auditMessage = `Hello KIA-Start Up Consult, I used your Study Proof-of-Funds Calculator for ${selected.label}:\n- Annual Tuition: ${selected.symbol}${tuition.toLocaleString()}\n- Deposit Paid: ${selected.symbol}${deposit.toLocaleString()}\n- Required Bank Statement Balance: ${selected.symbol}${totalForeignRequired.toLocaleString()} (~GHS ${approxGhs.toLocaleString()})\nI would like an advisor to audit my sponsor/bank statement.`;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (7 cols): Interactive Controls */}
          <div className="p-7 sm:p-10 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
              <Calculator className="h-3.5 w-3.5 text-amber-600" />
              <span>Interactive 28-Day Proof-of-Funds Calculator</span>
            </div>

            <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
              Calculate your exact study visa bank statement balance.
            </h2>

            {/* Jurisdiction Pills */}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-charcoal-soft">
                1. Select Study Jurisdiction:
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {jurisdictions.map((j) => {
                  const active = j.id === selected.id;
                  return (
                    <button
                      key={j.id}
                      type="button"
                      onClick={() => handleSelectJurisdiction(j)}
                      className={`focus-ring inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                        active
                          ? "border-ink bg-ink text-white shadow-sm"
                          : "border-line bg-slate-50 text-charcoal hover:border-amber-400 hover:bg-white"
                      }`}
                    >
                      <span>{j.flag}</span>
                      <span>{j.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders / Numeric Inputs */}
            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-[#fafaf9] p-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="calc-tuition" className="text-xs font-bold text-charcoal-soft">
                    First-Year Tuition ({selected.currency})
                  </label>
                  <span className="font-mono text-sm font-bold text-ink">
                    {selected.symbol}
                    {tuition.toLocaleString()}
                  </span>
                </div>
                <input
                  id="calc-tuition"
                  type="range"
                  min={0}
                  max={35000}
                  step={500}
                  value={tuition}
                  onChange={(e) => setTuition(Number(e.target.value))}
                  className="mt-3 w-full accent-amber-600"
                />
              </div>

              <div className="rounded-2xl border border-line bg-[#fafaf9] p-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="calc-deposit" className="text-xs font-bold text-charcoal-soft">
                    Tuition Deposit Paid ({selected.currency})
                  </label>
                  <span className="font-mono text-sm font-bold text-emerald-700">
                    {selected.symbol}
                    {deposit.toLocaleString()}
                  </span>
                </div>
                <input
                  id="calc-deposit"
                  type="range"
                  min={0}
                  max={Math.max(tuition, 20000)}
                  step={500}
                  value={Math.min(deposit, tuition)}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="mt-3 w-full accent-emerald-600"
                />
              </div>
            </div>

            <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 text-xs text-amber-950">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              <p>
                <strong>Consular Rule:</strong> {selected.ruleSummary}
              </p>
            </div>
          </div>

          {/* Right Column (5 cols): Live Consular Balance Output */}
          <div className="flex flex-col justify-between bg-[#0f172a] p-7 text-white sm:p-10 lg:col-span-5">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400">
                REQUIRED 28-DAY MATURE BALANCE
              </span>

              <div className="mt-3">
                <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                  {selected.symbol}
                  {totalForeignRequired.toLocaleString()}
                </p>
                <p className="mt-1.5 font-mono text-xs font-semibold text-amber-300">
                  Approx. GHS {approxGhs.toLocaleString()} (Indicative Bank Rate)
                </p>
              </div>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Unpaid Tuition Balance:</span>
                  <span className="font-mono font-bold text-white">
                    {selected.symbol}
                    {remainingTuition.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Statutory Living Funds:</span>
                  <span className="font-mono font-bold text-white">
                    {selected.symbol}
                    {selected.livingRequirement.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">({selected.livingNote})</p>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Our desk audits your statement before CAS / visa filing</span>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <a
                href={buildWhatsAppLink(auditMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg transition-all hover:bg-amber-300"
              >
                <span>Audit My Bank Statement with Advisor</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
