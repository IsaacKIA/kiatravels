"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Plane,
  Award,
  Globe,
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
    title: "What is your primary objective?",
    subtitle: "Select the option that best describes what you want to achieve abroad.",
    options: [
      {
        id: "work",
        label: "Work Abroad & Long-term Career",
        desc: "Secure international employment, work permits, and relocation sponsorship.",
        icon: Briefcase,
      },
      {
        id: "study",
        label: "Study Abroad (Degree / Master's)",
        desc: "Access top universities, tuition discounts, and post-study open work visas.",
        icon: GraduationCap,
      },
      {
        id: "travel",
        label: "Tourism, Family Visit or Conference",
        desc: "Holiday travel, business delegations, short-stay visas, and flight deals.",
        icon: Plane,
      },
    ],
  },
  {
    id: 2,
    title: "What is your highest educational qualification?",
    subtitle: "This helps determine which visa tier and points thresholds you qualify for.",
    options: [
      {
        id: "degree",
        label: "Bachelor's Degree",
        desc: "Eligible for graduate work permits, high-skilled visas, and Master's admissions.",
        icon: Award,
      },
      {
        id: "hnd",
        label: "HND / Diploma / Technical",
        desc: "Eligible for degree top-up programmes, direct trade vocations, and care routes.",
        icon: Award,
      },
      {
        id: "wassce",
        label: "SHS / WASSCE Graduate",
        desc: "Direct undergraduate admissions, foundation pathways, and technical training.",
        icon: Award,
      },
      {
        id: "masters",
        label: "Master's / Post-Graduate",
        desc: "Fast-track management visas, doctoral programmes, and executive roles.",
        icon: Award,
      },
    ],
  },
  {
    id: 3,
    title: "Which region interests you most?",
    subtitle: "We support legal pathways to each of these international corridors.",
    options: [
      {
        id: "uk",
        label: "United Kingdom 🇬🇧",
        desc: "Fast health & skilled worker visas, 2-year post-study work visa.",
        icon: Globe,
      },
      {
        id: "canada",
        label: "Canada 🇨🇦",
        desc: "3-year PGWP open work permit, strong permanent residency pathways.",
        icon: Globe,
      },
      {
        id: "europe",
        label: "Germany & Europe 🇩🇪 🇪🇺",
        desc: "Chancenkarte Opportunity Card, low-tuition English-taught degrees.",
        icon: Globe,
      },
      {
        id: "uae",
        label: "UAE (Dubai) 🇦🇪",
        desc: "Tax-free income, 2-week fast-track processing, immediate employment.",
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

  // Generate recommendation summary
  const getRecommendation = () => {
    const goal = answers[0] || "work";
    const region = answers[2] || "uk";

    if (goal === "study") {
      if (region === "canada") {
        return {
          title: "Canada DLI College + 3-Year PGWP Route",
          time: "4 to 7 Months to Departure",
          visaCategory: "Study Permit (Subclass IMM 1294)",
          highlights: [
            "Part-time work allowed (20 hrs/wk) during semesters",
            "Full 3-year Open Work Permit upon graduation",
            "Smooth transition points into Express Entry PR",
          ],
        };
      }
      if (region === "europe") {
        return {
          title: "Germany English-Taught University Pathway",
          time: "3 to 6 Months to Departure",
          visaCategory: "National Visa (Type D) - Study",
          highlights: [
            "Low to zero tuition at public universities",
            "18-month stay-back job search residence",
            "Full Schengen travel rights across 29 countries",
          ],
        };
      }
      return {
        title: "UK University Admission + Graduate Visa (PSW)",
        time: "3 to 5 Months to Departure",
        visaCategory: "Student Visa (CAS Sponsorship)",
        highlights: [
          "2 full years of post-study work authorization",
          "English language waiver options for Ghanaian graduates",
          "Fast university offer turnarounds in 2–4 weeks",
        ],
      };
    }

    if (goal === "travel") {
      return {
        title: "Standard Visitor & Tourism Corridor",
        time: "3 to 6 Weeks Processing",
        visaCategory: "Tourist / Business Visitor Visa",
        highlights: [
          "Complete itinerary & verifiable flight reservations",
          "Bank statement audit and ties-to-home evidence",
          "Thorough document dossier preparation",
        ],
      };
    }

    // Default: Work
    if (region === "uae") {
      return {
        title: "Dubai Employment & Relocation Visa",
        time: "2 to 4 Weeks Fast-Track",
        visaCategory: "UAE 2-Year Residence & Work Visa",
        highlights: [
          "100% Tax-free salary & rapid entry",
          "High demand in hospitality, retail, logistics & IT",
          "Direct employer sponsorship & Emirates ID",
        ],
      };
    }
    if (region === "europe") {
      return {
        title: "Germany Chancenkarte (Opportunity Card)",
        time: "3 to 6 Months to Departure",
        visaCategory: "Opportunity Card / Job Seeker Visa",
        highlights: [
          "Points-based legal job-hunting in Germany for up to 1 year",
          "Part-time trial work permitted while searching",
          "Direct conversion to EU Blue Card upon securing job",
        ],
      };
    }

    return {
      title: "UK Skilled Worker & Healthcare Sponsorship Route",
      time: "3 to 5 Months to Departure",
      visaCategory: "Skilled Worker Visa (CoS Pathway)",
      highlights: [
        "Direct Certificate of Sponsorship (CoS) application support",
        "ATS-standard international CV overhaul",
        "Guidance on authorized UK licensed sponsor employers",
      ],
    };
  };

  const recommendation = getRecommendation();

  const formattedWhatsAppMsg = `Hi KIA Consult! I completed your 60-Second Visa Matcher:\n- Goal: ${answers[0] || "Not specified"}\n- Education: ${answers[1] || "Not specified"}\n- Target Region: ${answers[2] || "Not specified"}\n- Recommended Route: ${recommendation.title}\nCan an advisor review my profile?`;

  return (
    <section id="matcher" className="relative py-24 sm:py-32 bg-white border-y border-line overflow-hidden">
      {/* Aurora glow effect */}
      <div className="pointer-events-none absolute -top-20 left-1/3 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/3 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Interactive Assessment Tool</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Find Your Best Global Visa Route in 60 Seconds
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-charcoal-soft">
            Answer 3 quick questions to discover your optimal immigration pathway, expected
            timelines, and requirements.
          </p>
        </div>

        {/* Assessment Card Container */}
        <div className="mt-12 rounded-3xl border border-line bg-[#fafaf9] p-6 sm:p-10 shadow-xl">
          {!showResult ? (
            <div>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-bold text-charcoal-soft uppercase tracking-wider">
                  <span>
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
                </div>
                <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Question */}
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-ink">
                  {steps[currentStep].title}
                </h3>
                <p className="mt-1.5 text-sm text-charcoal-soft">
                  {steps[currentStep].subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {steps[currentStep].options.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className="group flex flex-col items-start rounded-2xl border border-line bg-white p-5 text-left shadow-sm transition-all hover:border-amber-500 hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-800 transition-transform group-hover:scale-110 group-hover:bg-ink group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="mt-4 font-display text-base font-bold text-ink group-hover:text-amber-800 transition-colors">
                        {opt.label}
                      </h4>
                      <p className="mt-1 text-xs text-charcoal-soft leading-relaxed">
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Back navigation */}
              {currentStep > 0 && (
                <div className="mt-6 pt-4 border-t border-line/60 flex justify-start">
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="text-xs font-semibold text-charcoal-soft hover:text-ink transition-colors"
                  >
                    ← Back to previous question
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Result Card */
            <div className="animate-dropdown-in">
              <div className="flex items-center justify-between border-b border-line/70 pb-4">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                  Your Tailored Pathway Recommendation
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs font-bold text-charcoal-soft hover:text-ink transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Start Over</span>
                </button>
              </div>

              <div className="mt-6 rounded-2xl bg-[#0f172a] p-6 sm:p-8 text-white">
                <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
                  RECOMMENDED STRATEGY
                </span>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {recommendation.title}
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Official Visa Category: <strong className="text-white">{recommendation.visaCategory}</strong> &bull; Estimated Timeline: <strong className="text-amber-300">{recommendation.time}</strong>
                </p>

                <div className="mt-6 space-y-2.5 border-t border-slate-700 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Why this fits your profile:
                  </p>
                  {recommendation.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Hand-off */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-amber-50 p-6 border border-amber-200/70">
                <div>
                  <h4 className="font-display text-base font-bold text-ink">
                    Ready to evaluate your documents?
                  </h4>
                  <p className="mt-0.5 text-xs text-charcoal-soft">
                    Send your assessment results directly to a licensed KIA Consult advisor on WhatsApp.
                  </p>
                </div>

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    formattedWhatsAppMsg
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn shrink-0 flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span>Discuss Result on WhatsApp</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
