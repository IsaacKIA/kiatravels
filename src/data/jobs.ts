// CMS-ready data file for Job Listings published on the /jobs page.
// These are overseas work opportunities KIA helps clients apply for.
//
// IMPORTANT: Only populate this array with verified, real listings.
// Do NOT add placeholder jobs, invented employers, or fabricated salaries.
// See the Opportunity type for all available fields.

export type JobType = "full-time" | "part-time" | "contract" | "seasonal";
export type JobStatus = "open" | "upcoming" | "closed";

export type Job = {
  slug: string;
  /** ISO 3166-1 alpha-2 country code or descriptive name */
  country: string;
  countryFlagEmoji: string;
  title: string;
  sector: string;
  /** Employment type */
  type: JobType;
  /** Optional salary range or rate string, e.g. "€2,000 – €2,800 / month" */
  salary?: string;
  /** Short markdown-friendly description (1–2 sentences) */
  description?: string;
  /** Bullet-point list of key requirements */
  requirements?: string[];
  /** Bullet-point list of benefits / perks */
  benefits?: string[];
  /** ISO 8601 date string or human-readable deadline, e.g. "31 Oct 2026" */
  applicationDeadline?: string;
  status: JobStatus;
  /** If true, this listing is pinned to the homepage teaser strip */
  featured?: boolean;
  /** Path to a hero image for the card, relative to /public, e.g. "/images/jobs-europe-work.jpg" */
  image?: string;
};

export const jobs: Job[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // PART 1: EUROPEAN WORK & MOBILITY — one listing per country
  // Package: Accommodation + Flight Tickets + Work Placement | 1–2 month processing
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "europe-work-mobility-lithuania",
    country: "Lithuania",
    countryFlagEmoji: "🇱🇹",
    title: "Work & Mobility Placement — Lithuania",
    sector: "Multiple Sectors",
    type: "full-time",
    salary: "EUR 1,200 – EUR 2,000 / month",
    description:
      "International work placement in Lithuania covering multiple sectors. Standard package includes accommodation, return flight tickets, and confirmed work placement. Processing time: 1–2 months.",
    requirements: [
      "Valid international passport",
      "Willingness to relocate and work abroad",
      "Basic English communication skills",
      "Good health and fitness for role applied for",
    ],
    benefits: [
      "Accommodation provided",
      "Flight tickets included",
      "Confirmed work placement",
      "Available roles: Hospitality (Waitress / Restaurant), Cleaning & Facility Services, Factory & Production Lines, Warehouse Operations, Skilled Trades & Technical Roles",
      "Processing time: 1–2 months",
    ],
    status: "open",
    featured: true,
    image: "/images/jobs-europe-lithuania.jpg",
  },
  {
    slug: "europe-work-mobility-serbia",
    country: "Serbia",
    countryFlagEmoji: "🇷🇸",
    title: "Work & Mobility Placement — Serbia",
    sector: "Multiple Sectors",
    type: "full-time",
    salary: "EUR 1,200 – EUR 2,000 / month",
    description:
      "International work placement in Serbia covering multiple sectors. Standard package includes accommodation, return flight tickets, and confirmed work placement. Processing time: 1–2 months.",
    requirements: [
      "Valid international passport",
      "Willingness to relocate and work abroad",
      "Basic English communication skills",
      "Good health and fitness for role applied for",
    ],
    benefits: [
      "Accommodation provided",
      "Flight tickets included",
      "Confirmed work placement",
      "Available roles: Hospitality (Waitress / Restaurant), Cleaning & Facility Services, Factory & Production Lines, Warehouse Operations, Skilled Trades & Technical Roles",
      "Processing time: 1–2 months",
    ],
    status: "open",
    featured: true,
    image: "/images/jobs-europe-serbia.jpg",
  },
  {
    slug: "europe-work-mobility-hungary",
    country: "Hungary",
    countryFlagEmoji: "🇭🇺",
    title: "Work & Mobility Placement — Hungary",
    sector: "Multiple Sectors",
    type: "full-time",
    salary: "EUR 1,200 – EUR 2,000 / month",
    description:
      "International work placement in Hungary covering multiple sectors. Standard package includes accommodation, return flight tickets, and confirmed work placement. Processing time: 1–2 months.",
    requirements: [
      "Valid international passport",
      "Willingness to relocate and work abroad",
      "Basic English communication skills",
      "Good health and fitness for role applied for",
    ],
    benefits: [
      "Accommodation provided",
      "Flight tickets included",
      "Confirmed work placement",
      "Available roles: Hospitality (Waitress / Restaurant), Cleaning & Facility Services, Factory & Production Lines, Warehouse Operations, Skilled Trades & Technical Roles",
      "Processing time: 1–2 months",
    ],
    status: "open",
    featured: true,
    image: "/images/jobs-europe-hungary.jpg",
  },
  {
    slug: "europe-work-mobility-finland",
    country: "Finland",
    countryFlagEmoji: "🇫🇮",
    title: "Work & Mobility Placement — Finland",
    sector: "Multiple Sectors",
    type: "full-time",
    salary: "EUR 1,200 – EUR 2,000 / month",
    description:
      "International work placement in Finland covering multiple sectors. Standard package includes accommodation, return flight tickets, and confirmed work placement. Processing time: 1–2 months.",
    requirements: [
      "Valid international passport",
      "Willingness to relocate and work abroad",
      "Basic English communication skills",
      "Good health and fitness for role applied for",
    ],
    benefits: [
      "Accommodation provided",
      "Flight tickets included",
      "Confirmed work placement",
      "Available roles: Hospitality (Waitress / Restaurant), Cleaning & Facility Services, Factory & Production Lines, Warehouse Operations, Skilled Trades & Technical Roles",
      "Processing time: 1–2 months",
    ],
    status: "open",
    image: "/images/jobs-europe-finland.jpg",
  },
  {
    slug: "europe-work-mobility-czech-republic",
    country: "Czech Republic",
    countryFlagEmoji: "🇨🇿",
    title: "Work & Mobility Placement — Czech Republic",
    sector: "Multiple Sectors",
    type: "full-time",
    salary: "EUR 1,200 – EUR 2,000 / month",
    description:
      "International work placement in the Czech Republic covering multiple sectors. Standard package includes accommodation, return flight tickets, and confirmed work placement. Processing time: 1–2 months.",
    requirements: [
      "Valid international passport",
      "Willingness to relocate and work abroad",
      "Basic English communication skills",
      "Good health and fitness for role applied for",
    ],
    benefits: [
      "Accommodation provided",
      "Flight tickets included",
      "Confirmed work placement",
      "Available roles: Hospitality (Waitress / Restaurant), Cleaning & Facility Services, Factory & Production Lines, Warehouse Operations, Skilled Trades & Technical Roles",
      "Processing time: 1–2 months",
    ],
    status: "open",
    image: "/images/jobs-europe-czech.jpg",
  },
  {
    slug: "europe-work-mobility-latvia",
    country: "Latvia",
    countryFlagEmoji: "🇱🇻",
    title: "Work & Mobility Placement — Latvia",
    sector: "Multiple Sectors",
    type: "full-time",
    salary: "EUR 1,200 – EUR 2,000 / month",
    description:
      "International work placement in Latvia covering multiple sectors. Standard package includes accommodation, return flight tickets, and confirmed work placement. Processing time: 1–2 months.",
    requirements: [
      "Valid international passport",
      "Willingness to relocate and work abroad",
      "Basic English communication skills",
      "Good health and fitness for role applied for",
    ],
    benefits: [
      "Accommodation provided",
      "Flight tickets included",
      "Confirmed work placement",
      "Available roles: Hospitality (Waitress / Restaurant), Cleaning & Facility Services, Factory & Production Lines, Warehouse Operations, Skilled Trades & Technical Roles",
      "Processing time: 1–2 months",
    ],
    status: "open",
    image: "/images/jobs-europe-latvia.jpg",
  },
  {
    slug: "europe-work-mobility-germany",
    country: "Germany",
    countryFlagEmoji: "🇩🇪",
    title: "Work & Mobility Placement — Germany",
    sector: "Multiple Sectors",
    type: "full-time",
    salary: "EUR 1,200 – EUR 2,000 / month",
    description:
      "International work placement in Germany covering multiple sectors. Standard package includes accommodation, return flight tickets, and confirmed work placement. Processing time: 1–2 months.",
    requirements: [
      "Valid international passport",
      "Willingness to relocate and work abroad",
      "Basic English communication skills",
      "Good health and fitness for role applied for",
    ],
    benefits: [
      "Accommodation provided",
      "Flight tickets included",
      "Confirmed work placement",
      "Available roles: Hospitality (Waitress / Restaurant), Cleaning & Facility Services, Factory & Production Lines, Warehouse Operations, Skilled Trades & Technical Roles",
      "Processing time: 1–2 months",
    ],
    status: "open",
    featured: true,
    image: "/images/jobs-europe-germany.jpg",
  },
  {
    slug: "europe-work-mobility-poland",
    country: "Poland",
    countryFlagEmoji: "🇵🇱",
    title: "Work & Mobility Placement — Poland",
    sector: "Multiple Sectors",
    type: "full-time",
    salary: "EUR 1,200 – EUR 2,000 / month",
    description:
      "International work placement in Poland covering multiple sectors. Standard package includes accommodation, return flight tickets, and confirmed work placement. Processing time: 1–2 months.",
    requirements: [
      "Valid international passport",
      "Willingness to relocate and work abroad",
      "Basic English communication skills",
      "Good health and fitness for role applied for",
    ],
    benefits: [
      "Accommodation provided",
      "Flight tickets included",
      "Confirmed work placement",
      "Available roles: Hospitality (Waitress / Restaurant), Cleaning & Facility Services, Factory & Production Lines, Warehouse Operations, Skilled Trades & Technical Roles",
      "Processing time: 1–2 months",
    ],
    status: "open",
    image: "/images/jobs-europe-poland.jpg",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PART 2: DUBAI & MIDDLE EAST — grouped by sector
  // ─────────────────────────────────────────────────────────────────────────

  // 1. Aviation & Airport Operations
  {
    slug: "dubai-aviation-airport-operations",
    country: "United Arab Emirates",
    countryFlagEmoji: "🇦🇪",
    title: "Aviation & Airport Operations",
    sector: "Aviation & Airport",
    type: "full-time",
    salary: "1,008 AED – 2,000 AED / month + Overtime",
    description:
      "Roles across major UAE aviation employers including Transguard, DNATA, Etihad, and Sharjah Airport. Overtime earnings can significantly boost take-home pay.",
    requirements: [
      "Valid international passport",
      "Good physical fitness",
      "Willingness to work shifts including nights and weekends",
      "No criminal record",
    ],
    benefits: [
      "Aircraft Cleaners / Aviation Cleaners: 1,075–1,120 AED (~GHS 3,900–4,050) + Overtime (total approx. GHS 4,000–5,000)",
      "Aviation Loaders (DNATA / Sky Cargo / Etihad / Sharjah): 1,008–1,205 AED (~GHS 3,500–4,200) + Overtime",
      "Aviation Security Guards: 2,000 AED (~GHS 6,800) + Overtime",
      "Aerospace Technician Trainees: USD-denominated training packages",
      "Employers: Transguard, DNATA, Etihad, Sharjah Airport Authority",
    ],
    status: "open",
    featured: true,
    image: "/images/jobs-dubai-aviation.jpg",
  },

  // 2. Security Services
  {
    slug: "dubai-security-services",
    country: "United Arab Emirates",
    countryFlagEmoji: "🇦🇪",
    title: "Security Guard Roles — Dubai & Abu Dhabi",
    sector: "Security Services",
    type: "full-time",
    salary: "2,000 AED – 3,220 AED / month + Overtime",
    description:
      "Security guard positions across Dubai and Abu Dhabi with reputable employers. Abu Dhabi contracts typically offer higher base salaries. Some contracts include full daily meal provision.",
    requirements: [
      "Valid international passport",
      "Good physical fitness and height requirements may apply",
      "Security background or willingness to train",
      "No criminal record",
      "Good English communication skills",
    ],
    benefits: [
      "Dubai (Ejadah / Arkan / Hemaya): 2,000–2,500 AED (~GHS 6,800) + Overtime",
      "Abu Dhabi (PSS / Skill Force / Hemaya): 2,770–3,220 AED (~GHS 9,200–10,400) + Overtime",
      "Some contracts: Breakfast, Lunch & Dinner fully provided (or meal allowance equivalent)",
    ],
    status: "open",
    featured: true,
    image: "/images/jobs-dubai-security.jpg",
  },

  // 3. Cleaning, Utility & Facility Management
  {
    slug: "dubai-cleaning-facility-management",
    country: "United Arab Emirates",
    countryFlagEmoji: "🇦🇪",
    title: "Cleaning, Utility & Facility Management",
    sector: "Cleaning & Facility Services",
    type: "full-time",
    salary: "1,000 AED – 1,500 AED / month + Overtime",
    description:
      "Wide range of cleaning, utility, and hospitality attendant roles across major UAE facility management companies including Farnek, Ejadah, Duserve, NAFFCO, and Berkelly.",
    requirements: [
      "Valid international passport",
      "Good health and physical fitness",
      "Willingness to work shifts",
      "Prior cleaning or hospitality experience (preferred but not always required)",
    ],
    benefits: [
      "Facility & General Cleaners / Utility Workers: 1,000–1,200 AED (~GHS 3,800–4,100) + Overtime (approx. GHS 3,900–5,500)",
      "Laundry Cleaners: 1,000 AED (~GHS 3,800)",
      "Hospitality Attendants (Attraction, Retail, Wardrobe, Commis Chef, Bar, Cashier, Room Attendants): 1,078–1,500 AED (~GHS 8,000 package tiers)",
      "Employers: Farnek, Ejadah, Duserve, NAFFCO, Berkelly",
    ],
    status: "open",
    image: "/images/jobs-dubai-cleaning.jpg",
  },

  // 4. Warehouse, Logistics & Construction
  {
    slug: "dubai-warehouse-logistics-construction",
    country: "United Arab Emirates",
    countryFlagEmoji: "🇦🇪",
    title: "Warehouse, Logistics & Construction",
    sector: "Logistics & Transport",
    type: "full-time",
    salary: "1,075 AED – 5,000 AED / month",
    description:
      "Opportunities in warehousing, logistics, and construction across Dubai and the UAE. Roles range from warehouse utility hands to senior camp boss positions with significantly higher pay.",
    requirements: [
      "Valid international passport",
      "Good physical fitness",
      "Prior warehouse or construction experience (preferred for senior roles)",
      "Willingness to work outdoors and in shift patterns",
    ],
    benefits: [
      "Warehouse Workers / Utility Hands (Amazon / General): 1,200 AED (~GHS 4,100) + Overtime (approx. GHS 4,500–5,500)",
      "Construction Helpers / Civil Defense Helpers (RAILS Contracting): 1,075–1,200 AED (~GHS 4,100)",
      "Camp Boss: 4,500–5,000 AED",
    ],
    status: "open",
    image: "/images/jobs-dubai-warehouse.jpg",
  },

  // 5. Driving & Transportation
  {
    slug: "dubai-driving-transportation",
    country: "United Arab Emirates",
    countryFlagEmoji: "🇦🇪",
    title: "Driving & Transportation Roles",
    sector: "Logistics & Transport",
    type: "full-time",
    salary: "2,500 AED – 3,500 AED / month + Allowances",
    description:
      "Driver roles across the UAE and Saudi Arabia including long-haul trailer driving, delivery, and bus driving. Trailer and long-haul positions offer the highest earnings plus allowances.",
    requirements: [
      "Valid international driving licence (category relevant to role)",
      "Valid international passport",
      "Driving experience (minimum 2 years for professional roles)",
      "Clean driving record",
      "For motorcycle delivery: valid motorcycle licence",
    ],
    benefits: [
      "Trailer / Long-Haul Drivers (A.I.M. / Almarai): 2,500–2,800 AED or 5,500 GHS + Allowances",
      "Delivery Drivers & Riders (KFC Motorcycle / Sraco Car Delivery): 2,500–3,500 AED / SAR",
      "Bus Drivers: 2,500 AED",
    ],
    status: "open",
    image: "/images/jobs-dubai-driving.jpg",
  },
];

// Sectors KIA helps clients explore — not a claim of current vacancies.
export const jobSectors = [
  "Hospitality & Care",
  "Construction & Trades",
  "Logistics & Transport",
  "Healthcare Support",
  "Agriculture & Processing",
  "IT & Technology",
  "Education & Teaching",
  "Domestic & Cleaning",
];

export const jobTypeLabels: Record<JobType, string> = {
  "full-time": "Full-Time",
  "part-time": "Part-Time",
  contract: "Contract",
  seasonal: "Seasonal",
};

export const jobStatusStyles: Record<JobStatus, string> = {
  open: "bg-emerald-100 text-emerald-800 border-emerald-200",
  upcoming: "bg-amber-100 text-amber-900 border-amber-200",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
};

export const jobStatusLabels: Record<JobStatus, string> = {
  open: "Active",
  upcoming: "Opening Soon",
  closed: "Closed",
};
