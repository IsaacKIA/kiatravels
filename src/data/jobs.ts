// CMS-ready data file for Job Listings published on the /jobs page.
// Every listing features a specific role, verified package terms, and real photography.

export type JobType = "full-time" | "part-time" | "contract" | "seasonal";
export type JobStatus = "open" | "upcoming" | "closed";

export type Job = {
  slug: string;
  country: string;
  countryFlagEmoji: string;
  title: string;
  sector: string;
  type: JobType;
  salary?: string;
  description?: string;
  requirements?: string[];
  benefits?: string[];
  applicationDeadline?: string;
  status: JobStatus;
  featured?: boolean;
  image?: string;
};

export const jobs: Job[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // PART 1: EUROPEAN SPECIALIZED ROLES & WORK MOBILITY
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "europe-work-mobility-lithuania",
    country: "Lithuania",
    countryFlagEmoji: "🇱🇹",
    title: "Industrial Electricians & Power Technicians — Lithuania",
    sector: "Construction & Trades",
    type: "full-time",
    salary: "EUR 1,500 – EUR 2,200 / month",
    description:
      "Full-time placement in Lithuania for industrial and commercial electricians, switchgear installers, and power maintenance technicians. Includes employer-arranged accommodation, National Type-D work permit, and flight package.",
    requirements: [
      "Valid international passport (minimum 18 months validity)",
      "Practical electrical installation or substation maintenance experience",
      "NVTI, HND Electrical Engineering, or trade competency certificate",
      "Basic English communication and strict adherence to EU safety rules",
    ],
    benefits: [
      "Employer-provided accommodation near project site",
      "Flight ticket package & airport pickup in Vilnius",
      "1-year renewable National Type-D work permit & TRP pathway",
      "Paid overtime & European statutory health insurance",
      "Processing time: 1–2 months",
    ],
    status: "open",
    featured: true,
    image: "/images/Electrician worker.png",
  },
  {
    slug: "europe-work-mobility-germany",
    country: "Germany",
    countryFlagEmoji: "🇩🇪",
    title: "Mechanical, Civil & Plant Maintenance Engineers — Germany",
    sector: "Construction & Trades",
    type: "full-time",
    salary: "EUR 2,400 – EUR 3,500 / month",
    description:
      "Engineering and industrial plant supervision placements across Germany for qualified mechanical, electrical, and civil engineers and senior technicians under German skilled work and Chancenkarte pathways.",
    requirements: [
      "BSc / BEng / HND in Mechanical, Electrical, Civil, or Industrial Engineering",
      "Minimum 2 years hands-on plant, factory, or construction site experience",
      "Valid international passport & Ghana Police CID clearance",
      "Strong English proficiency (basic German A1/A2 is an added advantage)",
    ],
    benefits: [
      "Direct German employer contract or Chancenkarte placement support",
      "Accommodation assistance & relocation flight coordination",
      "Pathway to EU Blue Card & permanent residence",
      "Full German social security & healthcare coverage",
    ],
    status: "open",
    featured: true,
    image: "/images/engineer.png",
  },
  {
    slug: "europe-work-mobility-poland",
    country: "Poland",
    countryFlagEmoji: "🇵🇱",
    title: "Plumbers, Pipefitters & Sanitary Installers — Poland",
    sector: "Construction & Trades",
    type: "full-time",
    salary: "EUR 1,400 – EUR 2,100 / month",
    description:
      "Skilled plumbing, water-system installation, and commercial pipefitting positions for residential and industrial building projects in Warsaw, Gdańsk, and Wrocław.",
    requirements: [
      "Valid international passport & clean criminal record",
      "Minimum 2 years practical plumbing, pipefitting, or sanitary installation work",
      "Ability to read basic plumbing layouts and use modern press/weld fittings",
      "Physical fitness for indoor and outdoor construction sites",
    ],
    benefits: [
      "Official Voivodeship Work Permit (Zezwolenie na pracę)",
      "Furnished shared staff accommodation & work transport",
      "Return flight ticket & Schengen Type-D visa dossier processing",
      "Regular overtime hours available at 150% hourly rate",
    ],
    status: "open",
    featured: true,
    image: "/images/plumber work.png",
  },
  {
    slug: "europe-work-mobility-serbia",
    country: "Serbia",
    countryFlagEmoji: "🇷🇸",
    title: "Building Construction & Electrical Installation Crew — Serbia",
    sector: "Construction & Trades",
    type: "full-time",
    salary: "EUR 1,300 – EUR 1,900 / month",
    description:
      "Commercial and infrastructure construction crew openings in Belgrade and Novi Sad for site electricians, cable pullers, masons, and structural installation technicians.",
    requirements: [
      "Valid international passport",
      "Hands-on experience in site electrical wiring, masonry, or civil construction",
      "Team-oriented work ethic and willingness to work on large commercial sites",
      "Medical fitness and Ghana Police CID clearance",
    ],
    benefits: [
      "Free employer accommodation & daily site transportation",
      "Flight ticket & Serbian Type-D work visa included",
      "Fast 4–6 week work permit turnaround",
      "Renewable 1-year employment contract",
    ],
    status: "open",
    image: "/images/electrical works.png",
  },
  {
    slug: "europe-work-mobility-hungary",
    country: "Hungary",
    countryFlagEmoji: "🇭🇺",
    title: "Appliance & Factory Assembly Technicians — Hungary",
    sector: "Logistics & Transport",
    type: "full-time",
    salary: "EUR 1,250 – EUR 1,800 / month",
    description:
      "Technical assembly, equipment maintenance, and production line roles across electronics, automotive, and home-appliance manufacturing plants in Hungary.",
    requirements: [
      "Valid international passport",
      "Mechanical aptitude and experience with hand/power tools or assembly lines",
      "Willingness to work rotating 8-hour or 12-hour factory shifts",
      "Basic English communication skills",
    ],
    benefits: [
      "Modern employer dormitory accommodation provided",
      "Flight ticket & Hungarian work residence permit processing",
      "Shift bonuses, cafeteria meal subsidies & paid annual leave",
      "Processing time: 1–2 months",
    ],
    status: "open",
    image: "/images/work abroad (3).png",
  },
  {
    slug: "europe-work-mobility-finland",
    country: "Finland",
    countryFlagEmoji: "🇫🇮",
    title: "Commercial, Hotel & Residential Facility Cleaners — Finland",
    sector: "Domestic & Cleaning",
    type: "full-time",
    salary: "EUR 1,600 – EUR 2,200 / month",
    description:
      "Professional indoor facility cleaning, hotel housekeeping, and commercial hygiene maintenance roles in Helsinki, Espoo, and Tampere.",
    requirements: [
      "Valid international passport",
      "Prior experience in commercial cleaning, housekeeping, or facility maintenance",
      "Attention to detail and familiarity with modern vacuum and sanitation equipment",
      "Good English communication and clean police record",
    ],
    benefits: [
      "Accommodation arranged prior to arrival + flight package",
      "Nordic labor standards with paid overtime and holiday pay",
      "Full equipment, uniform & on-the-job safety training provided",
      "Processing time: 6–8 weeks",
    ],
    status: "open",
    image: "/images/Cleaning.png",
  },
  {
    slug: "europe-work-mobility-czech-republic",
    country: "Czech Republic",
    countryFlagEmoji: "🇨🇿",
    title: "Interior Lighting & Commercial Electrical Fitters — Czechia",
    sector: "Construction & Trades",
    type: "full-time",
    salary: "EUR 1,400 – EUR 2,000 / month",
    description:
      "Commercial building fit-out specialists needed in Prague and Brno for LED lighting installation, ceiling conduit routing, and panel board wiring.",
    requirements: [
      "Valid international passport",
      "Proven experience installing commercial lighting, fixtures, and distribution boards",
      "Comfort working on ladders and elevated interior platforms",
      "Basic English communication skills",
    ],
    benefits: [
      "Accommodation + return flight ticket included in package",
      "Confirmed Czech Employee Card / Type-D work visa support",
      "Full PPE, tools & health insurance provided by employer",
    ],
    status: "open",
    image: "/images/electrical work.png",
  },
  {
    slug: "europe-work-mobility-latvia",
    country: "Latvia",
    countryFlagEmoji: "🇱🇻",
    title: "Carpentry, Joinery & General Maintenance Workers — Latvia",
    sector: "Construction & Trades",
    type: "full-time",
    salary: "EUR 1,250 – EUR 1,850 / month",
    description:
      "Timber processing, interior carpentry, building renovation, and general facility maintenance positions in Riga and regional Latvian industrial parks.",
    requirements: [
      "Valid international passport",
      "Practical experience with carpentry, building maintenance, or hand tools",
      "Good physical health and readiness for European climate conditions",
      "Clean criminal record (Ghana Police CID)",
    ],
    benefits: [
      "Shared furnished accommodation & flight ticket included",
      "Confirmed Latvian work permit & Schengen residence rights",
      "Steady 40-hour workweek plus paid weekend overtime options",
    ],
    status: "open",
    image: "/images/work abroad (2).png",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PART 2: DUBAI, UAE & GCC FAST-TRACK DEPLOYMENTS
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "dubai-aviation-airport-operations",
    country: "United Arab Emirates",
    countryFlagEmoji: "🇦🇪",
    title: "Airport Ground Handling, Cargo Loaders & Cabin Crew Support — UAE",
    sector: "Logistics & Transport",
    type: "full-time",
    salary: "1,200 AED – 2,200 AED / month + Overtime",
    description:
      "Airport ground operations, baggage/cargo loading, aircraft cabin cleaning, and ramp support roles across major UAE aviation hubs (Dubai, Abu Dhabi & Sharjah).",
    requirements: [
      "Valid international passport (minimum 12 months validity)",
      "Strong physical fitness for airport ramp and cargo operations",
      "Willingness to work rotating day and night shifts",
      "Clean Ghana Police CID criminal record & GAMCA medical fitness",
    ],
    benefits: [
      "Aviation Loaders & Ramp Staff: 1,100–1,400 AED + Overtime (~GHS 4,200–5,500)",
      "Aircraft Cabin Cleaners: 1,100–1,300 AED + Overtime",
      "Aviation Security Guards: 2,000–2,400 AED + Overtime",
      "Free employer accommodation, airport shuttle & 2-year UAE Residence Visa",
    ],
    status: "open",
    featured: true,
    image: "/images/Airport view.png",
  },
  {
    slug: "dubai-security-services",
    country: "United Arab Emirates",
    countryFlagEmoji: "🇦🇪",
    title: "Corporate, Commercial & Mall Security Officers — Dubai & Abu Dhabi",
    sector: "Hospitality & Care",
    type: "full-time",
    salary: "2,000 AED – 3,220 AED / month + Overtime",
    description:
      "High-earning security guard contracts across corporate towers, luxury malls, hotels, and residential complexes in Dubai and Abu Dhabi.",
    requirements: [
      "Valid international passport",
      "Good physical fitness and professional bearing (minimum height standards apply)",
      "Fluent English speaking and writing skills",
      "Clean criminal record & readiness for SIRA/PSBD security licensing",
    ],
    benefits: [
      "Dubai Security Contracts: 2,000–2,500 AED (~GHS 6,800–8,200) + Overtime",
      "Abu Dhabi Security Contracts: 2,770–3,220 AED (~GHS 9,200–10,400) + Overtime",
      "Free accommodation, transport, uniform & medical insurance (meals on select sites)",
    ],
    status: "open",
    featured: true,
    image: "/images/Beautiful Dubai.png",
  },
  {
    slug: "dubai-cleaning-facility-management",
    country: "United Arab Emirates",
    countryFlagEmoji: "🇦🇪",
    title: "Hotel Housekeeping, Residential & Facility Cleaners — UAE",
    sector: "Domestic & Cleaning",
    type: "full-time",
    salary: "1,100 AED – 1,600 AED / month + Overtime",
    description:
      "Immediate 2–4 week fast-track deployments for commercial facility cleaners, luxury apartment housekeepers, laundry attendants, and hospitality stewards across Dubai.",
    requirements: [
      "Valid international passport",
      "Good physical health and neat grooming",
      "Willingness to work shifts in hotels, malls, or residential towers",
      "Basic English communication skills",
    ],
    benefits: [
      "100% tax-free base salary + guaranteed overtime hours",
      "Free air-conditioned staff accommodation & daily work transport",
      "2-year renewable UAE employment visa & medical card",
    ],
    status: "open",
    image: "/images/Cleaning (2).png",
  },
  {
    slug: "dubai-warehouse-logistics-construction",
    country: "United Arab Emirates",
    countryFlagEmoji: "🇦🇪",
    title: "Plumbing, Kitchen Fit-Out & Facility Maintenance Techs — UAE",
    sector: "Construction & Trades",
    type: "full-time",
    salary: "1,800 AED – 3,500 AED / month + Overtime",
    description:
      "Skilled facility maintenance technicians, domestic/commercial plumbers, appliance installers, and civil construction helpers for UAE real estate and contracting firms.",
    requirements: [
      "Valid international passport",
      "Practical trade experience in plumbing, facility maintenance, or construction",
      "Ability to troubleshoot piping, drainage, and mechanical fixtures",
      "GAMCA medical fitness clearance",
    ],
    benefits: [
      "Skilled Maintenance & Plumbers: 1,800–2,800 AED + Overtime",
      "Senior Supervisors / Camp Boss: 3,500–5,000 AED",
      "Free employer accommodation, site transport & medical coverage",
    ],
    status: "open",
    image: "/images/plumber work (2).png",
  },
  {
    slug: "dubai-driving-transportation",
    country: "United Arab Emirates",
    countryFlagEmoji: "🇦🇪",
    title: "Heavy-Duty Trailer Drivers, Bus Drivers & Delivery Fleet — GCC",
    sector: "Logistics & Transport",
    type: "full-time",
    salary: "2,500 AED – 3,500 AED / month + Trip Allowances",
    description:
      "Commercial transport and fleet driving openings across the UAE and Saudi Arabia for heavy-duty trailer drivers, staff bus drivers, and car/motorcycle delivery drivers.",
    requirements: [
      "Valid Ghanaian / International driving licence (relevant vehicle class)",
      "Valid international passport",
      "Minimum 2 years commercial or long-haul driving experience",
      "Clean driving and criminal record",
    ],
    benefits: [
      "Heavy Trailer / Long-Haul Drivers: 2,500–3,200 AED + Trip Allowances",
      "Car & Motorcycle Delivery Drivers: 2,500–3,500 AED / SAR",
      "Employer support for GCC driving licence conversion & accommodation",
    ],
    status: "open",
    image: "/images/UAE.png",
  },
  {
    slug: "germany-skilled-opportunity-card",
    country: "Germany",
    countryFlagEmoji: "🇩🇪",
    title: "Skilled Degree & Vocational Professionals (Chancenkarte) — Germany",
    sector: "IT & Technology",
    type: "full-time",
    salary: "EUR 2,500 – EUR 4,200 / month",
    description:
      "Germany's points-based Opportunity Card (Chancenkarte) pathway for Ghanaian university graduates and certified technical specialists in IT, engineering, healthcare, and logistics.",
    requirements: [
      "Recognized Bachelor's/Master's degree or 2+ year state-recognized vocational diploma",
      "Valid international passport",
      "English proficiency (B2+) or basic German (A1+)",
      "Blocked account or confirmed part-time German trial employment contract",
    ],
    benefits: [
      "12-month legal residence in Germany to secure full-time skilled employment",
      "Immediate 20 hrs/week work authorization + 2-week full-time trial work rights",
      "Direct in-country conversion to EU Blue Card or German Skilled Worker permit",
    ],
    status: "open",
    image: "/images/Germany.png",
  },
];

// Sectors KIA helps clients explore
export const jobSectors = [
  "Construction & Trades",
  "Logistics & Transport",
  "Domestic & Cleaning",
  "Hospitality & Care",
  "IT & Technology",
  "Healthcare Support",
  "Agriculture & Processing",
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
