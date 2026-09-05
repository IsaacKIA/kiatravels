// CMS-ready structures for Study Abroad. Do not add named university
// partnerships unless a real, verified partnership exists.

export type Destination = {
  slug: string;
  country: string;
  flagEmoji: string;
  tier: "primary" | "secondary" | "other";
  description: string;
};

export const destinations: Destination[] = [
  {
    slug: "uk",
    country: "United Kingdom",
    flagEmoji: "🇬🇧",
    tier: "primary",
    description:
      "Our primary study destination. Most of our guidance and process experience is built around UK applications.",
  },
  {
    slug: "canada",
    country: "Canada",
    flagEmoji: "🇨🇦",
    tier: "secondary",
    description: "A growing destination we support, alongside the UK.",
  },
  {
    slug: "usa",
    country: "United States",
    flagEmoji: "🇺🇸",
    tier: "secondary",
    description: "A growing destination we support, alongside the UK.",
  },
];

export const otherDestinationsNote =
  "Considering somewhere else? We take other countries on a case-by-case basis — talk to us and we'll let you know honestly whether we can help.";

export const studyAbroadProcess = [
  {
    title: "Explore Destinations",
    description: "We talk through where fits your goals, budget and timeline.",
  },
  {
    title: "Choose Your Programme",
    description: "We help you narrow down a level and field of study that makes sense for you.",
  },
  {
    title: "Understand Requirements",
    description: "Academic, language and financial requirements, explained clearly upfront.",
  },
  {
    title: "Prepare Your Application",
    description: "We help you get documentation, personal statements and forms in order.",
  },
  {
    title: "Move Forward",
    description: "You submit your application with a clear understanding of what happens next.",
  },
];
