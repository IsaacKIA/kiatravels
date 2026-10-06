// Central, CMS-ready site content. Replace with a real data source
// (headless CMS / database) later without touching component code.

export const siteConfig = {
  name: "KIA-Start Up Consult",
  tagline: "Your Partner in Global Careers.",
  phoneLocal: "+233 (0)24 133 2246",
  phoneLocalHref: "+233241332246",
  phoneIntl: "+44 7859 215186",
  phoneIntlHref: "+447859215186",
  whatsappNumber: "233241332246", // used for wa.me links, no + or spaces
  email: "info@kiastartupconsult.com",
  address: "Ajumako – Techiman Road, Adjacent DCE's Bangalore",
  siteUrl: "https://travels.kiastartupconsult.com",
};

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
];

export type ServiceSummary = {
  slug: string;
  index: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
};

export const services: ServiceSummary[] = [
  {
    slug: "work-abroad",
    index: "01",
    title: "Work Abroad",
    description:
      "Explore international employment opportunities and take the next step toward your global career.",
    ctaLabel: "Explore Work Abroad",
    href: "/work-abroad",
  },
  {
    slug: "study-abroad",
    index: "02",
    title: "Study Abroad",
    description:
      "Discover education pathways and get guidance on your international study journey.",
    ctaLabel: "Explore Study Abroad",
    href: "/study-abroad",
  },
  {
    slug: "visa-assistance",
    index: "03",
    title: "Visa Assistance",
    description:
      "Get practical support with your visa application journey and documentation.",
    ctaLabel: "Get Visa Assistance",
    href: "/visa-assistance",
  },
  {
    slug: "flight-booking",
    index: "04",
    title: "Flight Booking",
    description:
      "Get assistance planning and booking flights for your international journey.",
    ctaLabel: "Plan My Flight",
    href: "/flight-booking",
  },
  {
    slug: "travel-tourism",
    index: "05",
    title: "Travel & Tourism",
    description:
      "Plan your next international journey with professional travel support.",
    ctaLabel: "Plan My Trip",
    href: "/travel-tourism",
  },
];

export const servicesMenu = {
  opportunities: services.filter((s) => ["work-abroad", "study-abroad"].includes(s.slug)),
  travelMobility: services.filter((s) =>
    ["visa-assistance", "flight-booking", "travel-tourism"].includes(s.slug)
  ),
};

export const aboutMenu: NavLink[] = [
  { label: "Who We Are", href: "/about" },
  { label: "Our Approach", href: "/about#approach" },
  { label: "Why KIA", href: "/about#values" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// Options shown in the "Start Your Journey" guided flow.
export const journeyOptions = [
  { emoji: "🌍", label: "Work Abroad", href: "/contact?service=work-abroad" },
  { emoji: "🎓", label: "Study Abroad", href: "/contact?service=study-abroad" },
  { emoji: "✈️", label: "Travel", href: "/contact?service=travel-tourism" },
  { emoji: "🛂", label: "Visa Assistance", href: "/contact?service=visa-assistance" },
  { emoji: "🧳", label: "Flight Booking", href: "/flight-booking" },
] as const;

export const howItWorks = [
  {
    step: "01",
    title: "Tell us your goal",
    description:
      "Start with a conversation about where you want to go and what you're working toward.",
  },
  {
    step: "02",
    title: "Get guidance",
    description:
      "We walk you through the real process — requirements, timelines and what to expect.",
  },
  {
    step: "03",
    title: "Prepare",
    description:
      "We help you get your documentation and application in order, properly.",
  },
  {
    step: "04",
    title: "Move forward",
    description: "You apply, travel or enrol — with a clear understanding of each step taken.",
  },
];

export const whyKia = [
  {
    title: "Personal guidance",
    description: "We start with your goals.",
  },
  {
    title: "Clear process",
    description: "Understand what comes next.",
  },
  {
    title: "Global focus",
    description: "Explore opportunities beyond Ghana.",
  },
  {
    title: "One place",
    description: "Career, education and travel support.",
  },
  {
    title: "Responsive support",
    description: "Connect with our team when you need guidance.",
  },
];

export const whatWeDo = [
  "Opportunity information",
  "Guidance",
  "Documentation support",
  "Application assistance",
  "Travel assistance",
  "Consultation",
];

export const whatWeDontControl = [
  "Government visa decisions",
  "Employer hiring decisions",
  "University admission decisions",
];

export const whatsappMenuOptions = [
  { emoji: "🌍", label: "Work Abroad", message: "Hi, I'd like to know more about Work Abroad opportunities." },
  { emoji: "🎓", label: "Study Abroad", message: "Hi, I'd like to know more about Study Abroad." },
  { emoji: "🛂", label: "Visa Assistance", message: "Hi, I'd like help with Visa Assistance." },
  { emoji: "✈️", label: "Flight Booking", message: "Hi, I'd like help booking a flight." },
  { emoji: "🌴", label: "Travel & Tourism", message: "Hi, I'd like to plan a trip." },
  { emoji: "💬", label: "Talk to an Advisor", message: "Hi, I'd like to speak with an advisor." },
];

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Simple client-side analytics hook point. Swap the console.log for a real
// analytics provider (GA4, Plausible, etc.) without touching call sites.
export function trackEvent(eventName: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  console.log("[analytics]", eventName, payload ?? {});
}
