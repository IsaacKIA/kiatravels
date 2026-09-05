// CMS-ready structures for Work Abroad. `opportunities` is intentionally
// empty — do not add placeholder jobs, employers, or salaries here. Populate
// this array only from a verified source (a real employer, a real listing).

export type OpportunityStatus = "open" | "upcoming" | "closed";

export type Opportunity = {
  slug: string;
  country: string;
  countryFlagEmoji: string;
  jobTitle: string;
  sector: string;
  salary?: string;
  benefits?: string[];
  requirements?: string[];
  applicationDeadline?: string;
  status: OpportunityStatus;
};

export const opportunities: Opportunity[] = [];

// General categories KIA helps people explore — not a claim of current
// vacancies in any of them.
export const sectorsExplored = [
  "Hospitality & Care",
  "Construction & Trades",
  "Logistics & Transport",
  "Healthcare Support",
  "Agriculture & Processing",
];

export const workAbroadProcess = [
  {
    title: "Consultation",
    description: "We start by understanding your background, goals and target countries.",
  },
  {
    title: "Guidance on requirements",
    description: "We walk you through what employers and countries typically require.",
  },
  {
    title: "Document preparation",
    description: "We help you get your CV, certificates and supporting documents in order.",
  },
  {
    title: "Application support",
    description: "We support you through the application and, where applicable, interview stage.",
  },
];
