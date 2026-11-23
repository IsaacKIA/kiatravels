"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  MessageCircle,
  Globe2,
  Briefcase,
  GraduationCap,
  FileCheck,
  Plane,
  Compass,
  Building2,
  ArrowRight,
  ArrowUpRight,
  PhoneCall,
  Home,
  Info,
  BookOpen,
} from "lucide-react";
import { services, aboutMenu, siteConfig, trackEvent } from "@/data/site";
import { useDisclosure } from "@/hooks/useDisclosure";
import StartJourneyButton from "@/components/StartJourneyButton";

const serviceIcons: Record<string, typeof Briefcase> = {
  "work-abroad": Briefcase,
  "study-abroad": GraduationCap,
  "visa-assistance": FileCheck,
  "flight-booking": Plane,
  "travel-tourism": Compass,
};

const serviceBadges: Record<string, string> = {
  "work-abroad": "Europe & GCC",
  "study-abroad": "2026/27 Intakes",
  "visa-assistance": "98% Accuracy",
  "flight-booking": "Group & Direct",
  "travel-tourism": "Tours & DMC",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(60);

  const headerRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [servicesOpen, setServicesOpen] = useDisclosure(servicesRef);
  const [aboutOpen, setAboutOpen] = useDisclosure(aboutRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setMenuTop(Math.max(0, Math.round(rect.bottom)));
      }
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    if (!mobileOpen && headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setMenuTop(Math.max(0, Math.round(rect.bottom)));
    }
    setMobileOpen((v) => !v);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [mobileOpen]);

  return (
    <>
      {/* Top Executive Announcement Bar */}
      <div className="relative z-50 border-b border-slate-800 bg-[#0f172a] px-4 py-2 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="pulse-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="truncate font-medium text-slate-300">
              <strong className="text-amber-400">Active Mandates:</strong> Europe &amp; GCC Work
              Placements &bull; 2026/2027 University Admissions &bull; Global Travel &amp; DMC
            </span>
          </div>

          <div className="hidden items-center gap-5 sm:flex shrink-0">
            <a
              href={`tel:${siteConfig.phoneLocalHref}`}
              className="flex items-center gap-1.5 text-slate-300 transition-colors hover:text-white"
            >
              <PhoneCall className="h-3 w-3 text-amber-400" />
              <span>{siteConfig.phoneLocal}</span>
            </a>
            <span className="text-slate-700">|</span>
            <Link
              href="/partners"
              className="flex items-center gap-1 font-semibold text-amber-400 transition-colors hover:text-amber-300"
            >
              <Building2 className="h-3.5 w-3.5" />
              <span>B2B &amp; Institutional Partners →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Glassmorphic Main Navbar */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-[70] transition-all duration-300 ${
          scrolled
            ? "floating-nav py-2.5 shadow-lg backdrop-blur-xl"
            : "border-b border-line/60 bg-white/85 py-3.5 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="focus-ring group flex items-center gap-3 rounded-xl"
            aria-label="KIA-Start Up Consult home"
          >
            <Image
              src="/images/kia-logo.jpeg"
              alt="KIA-Start Up Consult"
              width={168}
              height={70}
              className="h-9 w-auto transition-transform group-hover:scale-105 sm:h-10"
              priority
            />
            <div className="hidden border-l border-line pl-3 xl:block">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-ink">
                KIA-Start Up Consult
              </span>
              <span className="block text-[10px] font-medium text-charcoal-soft">
                Global Careers, Study &amp; Travel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <Link
              href="/"
              className="focus-ring rounded-lg px-3.5 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-slate-100 hover:text-ink"
            >
              Home
            </Link>

            {/* Services Rich Mega-Menu */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                className="focus-ring flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-slate-100 hover:text-ink"
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-500 transition-transform ${
                    servicesOpen ? "rotate-180 text-ink" : ""
                  }`}
                  aria-hidden
                />
              </button>

              {servicesOpen && (
                <div className="animate-dropdown-in absolute left-0 top-full z-50 mt-2 w-[620px] max-w-[calc(100vw-3rem)] rounded-2xl border border-line bg-white/98 p-6 shadow-2xl backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between border-b border-line/70 pb-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      Global Mobility, Education &amp; Travel Practices
                    </p>
                    <div className="flex items-center gap-3">
                      <Link
                        href="/jobs"
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-600"
                      >
                        <span>Active Job Listings</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                      <span className="text-line">|</span>
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-1 text-xs font-bold text-charcoal hover:text-amber-700"
                      >
                        <span>All Services</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {services.map((service) => {
                      const Icon = serviceIcons[service.slug] || Briefcase;
                      const badge = serviceBadges[service.slug];

                      return (
                        <Link
                          key={service.slug}
                          href={service.href}
                          onClick={() => setServicesOpen(false)}
                          className="group flex items-start gap-3.5 rounded-xl border border-transparent p-3 transition-all hover:border-line hover:bg-slate-50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800 transition-transform group-hover:scale-110 group-hover:bg-ink group-hover:text-white">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-ink transition-colors group-hover:text-amber-800">
                                {service.title}
                              </h4>
                              {badge && (
                                <span className="rounded-md bg-amber-100/80 px-1.5 py-0.5 text-[9px] font-bold text-amber-900">
                                  {badge}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-xs text-charcoal-soft line-clamp-1">
                              {service.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}

                    {/* 6th Mega-Menu Card: B2B Institutional Partnerships */}
                    <Link
                      href="/partners"
                      onClick={() => setServicesOpen(false)}
                      className="group flex items-start gap-3.5 rounded-xl border border-slate-800 bg-[#0f172a] p-3 text-white transition-all hover:bg-slate-900"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-950 transition-transform group-hover:scale-110">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white group-hover:text-amber-300">
                            B2B Partnerships
                          </h4>
                          <span className="rounded-md bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-bold text-amber-300">
                            Corporate Desk
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-300 line-clamp-1">
                          Manpower supply, university admissions &amp; Ghana DMC.
                        </p>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent p-3.5">
                    <div>
                      <p className="text-xs font-bold text-ink">
                        Unsure which visa or career pathway fits your profile?
                      </p>
                      <p className="text-[11px] text-charcoal-soft">
                        Use our interactive 3-step Eligibility &amp; Pathway Assessment tool.
                      </p>
                    </div>
                    <a
                      href="/#matcher"
                      onClick={() => setServicesOpen(false)}
                      className="rounded-lg bg-ink px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-charcoal"
                    >
                      Assess Eligibility →
                    </a>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/jobs"
              className="focus-ring rounded-lg px-3.5 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-slate-100 hover:text-ink"
            >
              Jobs
            </Link>

            <Link
              href="/partners"
              className="focus-ring rounded-lg px-3.5 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-slate-100 hover:text-ink"
            >
              Partners (B2B)
            </Link>

            {/* About Dropdown */}
            <div
              ref={aboutRef}
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                type="button"
                onClick={() => setAboutOpen((v) => !v)}
                aria-expanded={aboutOpen}
                aria-haspopup="true"
                className="focus-ring flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-slate-100 hover:text-ink"
              >
                <span>About</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-500 transition-transform ${
                    aboutOpen ? "rotate-180 text-ink" : ""
                  }`}
                  aria-hidden
                />
              </button>

              {aboutOpen && (
                <div className="animate-dropdown-in absolute left-0 top-full z-50 mt-2 w-60 rounded-2xl border border-line bg-white p-2.5 shadow-2xl backdrop-blur-xl">
                  <ul className="space-y-0.5">
                    {aboutMenu.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setAboutOpen(false)}
                          className="focus-ring block rounded-lg px-3 py-2 text-xs font-semibold text-charcoal transition-colors hover:bg-slate-100 hover:text-ink"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link
              href="/insights"
              className="focus-ring rounded-lg px-3.5 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-slate-100 hover:text-ink"
            >
              Insights
            </Link>

            <Link
              href="/contact"
              className="focus-ring rounded-lg px-3.5 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-slate-100 hover:text-ink"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: "navbar" })}
              aria-label="Chat on WhatsApp"
              className="focus-ring group relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm transition-all hover:scale-105 hover:bg-emerald-600"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="pulse-radar absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400" />
            </a>

            <StartJourneyButton className="focus-ring shimmer-btn group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:scale-105 active:scale-95" />
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl p-2 text-ink transition-colors hover:bg-slate-100 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={toggleMobileMenu}
          >
            {mobileOpen ? <X className="h-6 w-6 text-ink" /> : <Menu className="h-6 w-6 text-ink" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Down Menu Sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="animate-modal-backdrop fixed inset-0 bg-slate-950/45 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          <div
            className="animate-stamp-in fixed inset-x-0 bottom-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-white shadow-2xl"
            style={{ top: `${menuTop}px` }}
          >
            <div className="h-[2px] shrink-0 bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500" />

            <nav className="flex-1 space-y-2 p-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-bold text-ink transition-colors hover:bg-slate-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <Home className="h-4 w-4" />
                </div>
                <span>Home</span>
              </Link>

              {/* Mobile Services Accordion */}
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between p-3.5 text-left text-base font-bold text-ink transition-colors hover:bg-slate-100/70"
                  aria-expanded={mobileServicesOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-900">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <span>Services &amp; Practices</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
                      mobileServicesOpen ? "rotate-180 text-ink" : ""
                    }`}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="space-y-1.5 border-t border-slate-200/70 bg-white p-2">
                    <Link
                      href="/jobs"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-xl bg-emerald-50 px-3.5 py-2.5 text-xs font-bold text-emerald-900 transition-colors hover:bg-emerald-100"
                    >
                      <span>Active Overseas Job Openings</span>
                      <ArrowRight className="h-3.5 w-3.5 text-emerald-800" />
                    </Link>

                    {services.map((service) => {
                      const Icon = serviceIcons[service.slug] || Briefcase;
                      const badge = serviceBadges[service.slug];

                      return (
                        <Link
                          key={service.slug}
                          href={service.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between rounded-xl p-2.5 transition-colors hover:bg-slate-50"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-800">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-ink">{service.title}</p>
                              <p className="text-[11px] text-charcoal-soft line-clamp-1">
                                {service.description}
                              </p>
                            </div>
                          </div>
                          {badge && (
                            <span className="ml-2 shrink-0 rounded bg-amber-100/80 px-2 py-0.5 text-[9px] font-bold text-amber-900">
                              {badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile B2B Partnerships */}
              <Link
                href="/partners"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#0f172a] p-3.5 text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-slate-950">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white">
                      B2B &amp; Institutional Partners
                    </span>
                    <span className="block text-[11px] text-slate-300">
                      Workforce, Universities &amp; Ghana DMC
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-amber-400" />
              </Link>

              {/* Mobile Explore Countries */}
              <a
                href="/#destinations"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-blue-200/70 bg-gradient-to-r from-blue-50 to-indigo-50/60 p-3.5 text-base font-bold text-blue-900"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <Globe2 className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-blue-950">
                      Explore 15+ Destinations
                    </span>
                    <span className="block text-[11px] font-medium text-blue-700/80">
                      UK, Canada, Germany, UAE &amp; Europe
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-blue-600" />
              </a>

              {/* Mobile Insights */}
              <Link
                href="/insights"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-amber-200/70 bg-gradient-to-r from-amber-50 to-orange-50/60 p-3.5 text-base font-bold text-amber-950"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 text-white">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-amber-950">
                      Insights &amp; Guides
                    </span>
                    <span className="block text-[11px] font-medium text-amber-800/80">
                      Work permits, proof of funds &amp; visa advice
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-amber-600" />
              </Link>

              {/* Mobile About Accordion */}
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setMobileAboutOpen((v) => !v)}
                  className="flex w-full items-center justify-between p-3.5 text-left text-base font-bold text-ink"
                  aria-expanded={mobileAboutOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200 text-slate-800">
                      <Info className="h-4 w-4" />
                    </div>
                    <span>About KIA</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
                      mobileAboutOpen ? "rotate-180 text-ink" : ""
                    }`}
                  />
                </button>

                {mobileAboutOpen && (
                  <div className="space-y-1 border-t border-slate-200/70 bg-white p-2">
                    {aboutMenu.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-charcoal hover:bg-slate-100 hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-2xl p-3.5 text-base font-bold text-ink hover:bg-slate-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-900">
                  <PhoneCall className="h-4 w-4" />
                </div>
                <span>Contact Us</span>
              </Link>
            </nav>

            <div className="shrink-0 space-y-3 border-t border-line/80 bg-slate-50 p-5">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "mobile_menu" })}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat on WhatsApp (Online)</span>
              </a>

              <StartJourneyButton
                className="shimmer-btn group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-md transition-all"
                onOpenChange={(open) => {
                  if (open) setMobileOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
