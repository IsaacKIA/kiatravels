"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Plane,
  Award,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { siteConfig, trackEvent } from "@/data/site";

interface QuestionStep {
  id: number;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    desc: string;
    icon: typeof Briefcase;
  }[];
}

const steps: QuestionStep[] = [
  {
    id: 1,
    title: "What is your primary international objective?",
    subtitle: "Select the pathway that aligns with your immediate career, academic, or travel goal.",
    options: [
      {
        id: "work",
        label: "Work Abroad & Overseas Placement",
        desc: "Secure verified European or GCC employment, work permits, and relocation packages.",
        icon: Briefcase,
      },
      {
        id: "study",
        label: "Study Abroad (Undergraduate / Master's)",
        desc: "Access international universities, scholarships, and 2–3 year Post-Study Work visas.",
        icon: GraduationCap,
      },
      {
        id: "travel",
        label: "Visitor Visa, Conference or Group Travel",
        desc: "Schengen, UK, US & Canadian visitor dossiers, business delegations, and flight routing.",
        icon: Plane,
      },
    ],
  },
  {
    id: 2,
    title: "What is your current qualification or trade tier?",
    subtitle: "Determines which statutory visa framework, points threshold, or trade placement fits you.",
    options: [
      {
        id: "degree",
        label: "Bachelor's Degree (BSc / BA / BEng)",
        desc: "Eligible for Master's admissions, UK/EU skilled worker routes, and Germany Chancenkarte.",
        icon: Award,
      },
      {
        id: "hnd",
        label: "HND / Technical Diploma / Certified Trade",
        desc: "Eligible for direct European & GCC technical/trade placements and degree top-ups.",
        icon: Award,
      },
      {
        id: "wassce",
        label: "SHS / WASSCE or General Workforce",
        desc: "Eligible for undergraduate degree admissions and general/semi-skilled overseas work.",
        icon: Award,
      },
      {
        id: "masters",
        label: "Master's / Senior Professional",
        desc: "Fast-track specialist sponsorship, PhD/MBA tracks, and executive visitor clearances.",
        icon: Award,
      },
    ],
  },
  {
    id: 3,
    title: "Which destination corridor interests you most?",
    subtitle: "We manage full documentation and placement workflows across each of these corridors.",
    options: [
      {
        id: "europe",
        label: "Europe & Schengen 🇪🇺",
        desc: "Lithuania, Poland, Serbia & Germany — National Type-D work permits & Chancenkarte.",
        icon: Globe,
      },
      {
        id: "uk",
        label: "United Kingdom 🇬🇧",
        desc: "CAS-sponsored university degrees (2-year Graduate Visa) & CoS Skilled Worker routes.",
        icon: Globe,
      },
      {
        id: "uae",
        label: "UAE & Gulf States (GCC) 🇦🇪",
        desc: "Tax-free salary, 2–4 week fast-track employment residency across trades & hospitality.",
        icon: Globe,
      },
      {
        id: "canada",
        label: "Canada & North America 🇨🇦 🇺🇸",
        desc: "Canadian DLI study permits (up to 3-year PGWP) and US F-1 STEM OPT pathways.",
        icon: Globe,
      },
    ],
  },
];

export default function VisaMatcher() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (optionId: string) => {
    const updated = { ...answers, [currentStep]: optionId };
    setAnswers(updated);

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
      trackEvent("visa_matcher_completed", updated);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
  };

  const getRecommendation = () => {
    const goal = answers[0] || "work";
    const region = answers[2] || "europe";

    if (goal === "study") {
      if (region === "canada") {
        return {
          title: "Canada DLI College / University + 3-Year PGWP Route",
          time: "4 to 7 Months Prior to Intake",
          visaCategory: "Study Permit (Subclass IMM 1294) & PAL",
          highlights: [
            "Part-time work authorization during academic semesters",
            "Up to 3-year Post-Graduation Open Work Permit (PGWP)",
            "Direct Express Entry & Provincial Nominee PR points",
          ],
        };
      }
      if (region === "europe") {
        return {
          title: "European English-Taught University Pathway",
          time: "3 to 6 Months Prior to Intake",
          visaCategory: "National Visa (Type D) — Academic Residence",
          highlights: [
            "Affordable tuition across accredited European universities",
            "18-month post-graduation job search residence permit",
            "Full Schengen mobility across 29 European countries",
          ],
        };
      }
      return {
        title: "UK University CAS Admission + 2-Year Graduate Visa",
        time: "3 to 5 Months Prior to Intake",
        visaCategory: "UK Student Route (CAS Sponsorship)",
        highlights: [
          "2 full years of post-study work authorization in the UK",
          "WAEC C6+ English language waiver for Ghanaian applicants",
          "Strict 28-day proof-of-funds audit & UKVI interview coaching",
        ],
      };
    }

    if (goal === "travel") {
      return {
        title: "Consular Visitor, Conference & Business Delegation Route",
        time: "3 to 6 Weeks Consular Processing",
        visaCategory: "Schengen Type-C / UK Standard Visitor / US B1-B2",
        highlights: [
          "Complete flight itinerary, hotel vouchers & travel insurance",
          "6-month bank statement & home-ties documentation audit",
          "Thorough biometric submission & interview preparation",
        ],
      };
    }

    if (region === "uae") {
      return {
        title: "GCC Employer-Sponsored Work Residency (UAE, KSA, Qatar)",
        time: "2 to 4 Weeks Fast-Track Deployment",
        visaCategory: "GCC 2-Year Employment & Residence Visa",
        highlights: [
          "100% tax-free monthly compensation & employer accommodation",
          "Active openings in skilled trades, driving, security, logistics & hospitality",
          "GAMCA medical fitness, police clearance & flight ticketing handled",
        ],
      };
    }
    if (region === "uk") {
      return {
        title: "UK Skilled Worker & Healthcare Sponsorship Route",
        time: "3 to 5 Months to Departure",
        visaCategory: "Skilled Worker Visa (CoS Pathway)",
        highlights: [
          "Direct Certificate of Sponsorship (CoS) application guidance",
          "International ATS-compliant CV & credential verification",
          "IOM Accra TB clearance & Ghana Police CID documentation",
        ],
      };
    }

    return {
      title: "European Work Mobility Placement / Germany Chancenkarte",
      time: "1 to 3 Months Processing Window",
      visaCategory: "National Type-D Work Permit (Lithuania, Poland, Serbia, Germany)",
      highlights: [
        "Confirmed work placement package with accommodation & return flight",
        "Roles across warehousing, manufacturing, construction & hospitality",
        "End-to-end work permit mediation, police clearance & visa filing",
      ],
    };
  };

  const recommendation = getRecommendation();

  const formattedWhatsAppMsg = `Hello KIA-Start Up Consult! I completed the Pathway Assessment:\n- Objective: ${answers[0] || "Not specified"}\n- Qualification: ${answers[1] || "Not specified"}\n- Target Corridor: ${answers[2] || "Not specified"}\n- Recommended Route: ${recommendation.title}\nCan an advisor review my profile?`;

  return (
    <section
      id="matcher"
      className="relative overflow-hidden border-y border-line bg-white py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute -top-20 left-1/3 h-96 w-96 rounded-full bg-amber-400/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/3 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 shadow-2xs">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
            <span>Interactive Pathway &amp; Eligibility Assessment</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Find your ideal international route in 3 steps.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-charcoal-soft">
            Select three quick parameters below to generate a tailored regulatory and documentation
            recommendation for your background.
          </p>
        </div>

        {/* Assessment Card */}
        <div className="glass-panel mt-12 rounded-3xl border border-line bg-white/95 p-6 shadow-2xl sm:p-10">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-charcoal-soft">
              <span>
                {showResult
                  ? "Assessment Complete"
                  : `Step ${currentStep + 1} of ${steps.length}`}
              </span>
              <span className="text-amber-700">
                {showResult
                  ? "100%"
                  : `${Math.round(((currentStep + 1) / steps.length) * 100)}%`}
              </span>
            </div>
            <div className="mt-2.5 flex gap-2">
              {steps.map((s, idx) => {
                const isCompleted = showResult || idx < currentStep;
                const isActive = !showResult && idx === currentStep;
                return (
                  <div
                    key={s.id}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      isCompleted
                        ? "bg-emerald-500"
                        : isActive
                          ? "step-pill-active"
                          : "bg-slate-200"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {!showResult ? (
            <div>
              <div className="mb-7">
                <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                  {steps[currentStep].title}
                </h3>
                <p className="mt-1.5 text-sm text-charcoal-soft">
                  {steps[currentStep].subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {steps[currentStep].options.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = answers[currentStep] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className={`group flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-ink bg-ink text-white shadow-lg"
                          : "border-line bg-white hover:border-amber-400 hover:bg-amber-50/20 hover:shadow-md"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                              isSelected
                                ? "bg-amber-400 text-ink"
                                : "bg-amber-50 text-amber-800 group-hover:bg-ink group-hover:text-white"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <ArrowRight
                            className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                              isSelected
                                ? "text-amber-400"
                                : "text-slate-400 group-hover:text-ink"
                            }`}
                          />
                        </div>

                        <h4
                          className={`mt-4 font-display text-lg font-bold ${
                            isSelected ? "text-white" : "text-ink"
                          }`}
                        >
                          {opt.label}
                        </h4>
                        <p
                          className={`mt-1.5 text-xs leading-relaxed ${
                            isSelected ? "text-slate-300" : "text-charcoal-soft"
                          }`}
                        >
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {currentStep > 0 && (
                <div className="mt-6 flex justify-start">
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="text-xs font-bold text-charcoal-soft underline underline-offset-4 hover:text-ink"
                  >
                    ← Back to previous step
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-dropdown-in">
              <div className="rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-7 text-white shadow-xl sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Recommended Pathway Match
                  </span>
                  <span className="font-mono text-xs text-amber-400">
                    Est. Timeline: {recommendation.time}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                  {recommendation.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-amber-300/90">
                  Statutory Visa Category: {recommendation.visaCategory}
                </p>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Key Pathway Highlights &amp; Dossier Scope:
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {recommendation.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                      formattedWhatsAppMsg
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("whatsapp_click", {
                        location: "visa_matcher_result",
                        route: recommendation.title,
                      })
                    }
                    className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#20bd5a]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Discuss This Pathway on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-5 py-4 text-xs font-bold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Start Over</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
