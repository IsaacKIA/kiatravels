"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  MessageCircle,
  Sparkles,
  Globe2,
  Briefcase,
  GraduationCap,
  FileCheck,
  Plane,
  Compass,
  ArrowRight,
  PhoneCall,
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
  "work-abroad": "UK & Germany",
  "study-abroad": "Fall 2026",
  "visa-assistance": "98% Success",
  "flight-booking": "Best Fares",
  "travel-tourism": "Custom Trips",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(0);

  const headerRef = useRef<HTMLElement>(null);
  const announcementRef = useRef<HTMLDivElement>(null);
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

  // Measure true header bottom for mobile menu positioning
  useEffect(() => {
    const measure = () => {
      const announcementH = announcementRef.current?.offsetHeight ?? 0;
      const headerH = headerRef.current?.offsetHeight ?? 0;
      setMenuTop(announcementH + headerH);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [scrolled]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Top Ticker / Live Announcement Ribbon */}
      <div ref={announcementRef} className="relative z-50 bg-[#0f172a] px-4 py-2 text-white border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="pulse-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="truncate font-medium text-slate-300">
              <strong className="text-amber-400">Intakes Open:</strong> Fall 2026/2027 University Admissions &amp; Global Work Visas
            </span>
          </div>

          <div className="hidden items-center gap-5 sm:flex shrink-0">
            <a
              href={`tel:${siteConfig.phoneLocalHref}`}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <PhoneCall className="h-3 w-3 text-amber-400" />
              <span>{siteConfig.phoneLocal}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Sparkles className="h-3 w-3" />
              <span>Free 15-min Consultation</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Glassmorphic Main Navbar */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "floating-nav py-2.5 shadow-lg backdrop-blur-xl"
            : "bg-white/80 py-3.5 backdrop-blur-md border-b border-line/60"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="focus-ring flex items-center gap-3 rounded-xl group"
            aria-label="KIA-Start Up Consult home"
          >
            <Image
              src="/images/kia-logo.jpeg"
              alt="KIA-Start Up Consult"
              width={168}
              height={70}
              className="h-9 w-auto sm:h-10 transition-transform group-hover:scale-105"
              priority
            />
            <span className="hidden xl:inline-block rounded-full border border-amber-500/20 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 tracking-wide">
              Global Careers &amp; Travel
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <Link
              href="/"
              className="focus-ring rounded-lg px-3.5 py-2 text-sm font-semibold text-charcoal hover:bg-slate-100 hover:text-ink transition-colors"
            >
              Home
            </Link>

            {/* Services Dropdown with Rich Mega-Menu */}
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
                className="focus-ring flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-charcoal hover:bg-slate-100 hover:text-ink transition-colors"
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
                <div className="absolute left-0 top-full z-50 mt-2 w-[600px] max-w-[calc(100vw-3rem)] rounded-2xl border border-line bg-white/98 p-6 shadow-2xl backdrop-blur-xl animate-dropdown-in">
                  <div className="mb-4 flex items-center justify-between border-b border-line/70 pb-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      Our Specialized Travel &amp; Career Pathways
                    </p>
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="text-xs font-bold text-charcoal hover:text-amber-700 flex items-center gap-1"
                    >
                      <span>All Services</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
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
                          className="group flex items-start gap-3.5 rounded-xl p-3 hover:bg-slate-50 transition-all border border-transparent hover:border-line"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-800 transition-transform group-hover:scale-110 group-hover:bg-ink group-hover:text-white">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-ink group-hover:text-amber-800 transition-colors">
                                {service.title}
                              </h4>
                              {badge && (
                                <span className="rounded bg-amber-100/70 px-1.5 py-0.5 text-[9px] font-bold text-amber-900">
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
                  </div>

                  <div className="mt-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent p-3.5 border border-amber-500/20 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-ink">Not sure where to start?</p>
                      <p className="text-[11px] text-charcoal-soft">Take our 60-second pathway matcher below.</p>
                    </div>
                    <a
                      href="/#matcher"
                      onClick={() => setServicesOpen(false)}
                      className="rounded-lg bg-ink px-3 py-1.5 text-xs font-bold text-white hover:bg-charcoal transition-colors"
                    >
                      Find Pathway →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Quick Link to Destination Explorer */}
            <a
              href="/#destinations"
              className="focus-ring flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-charcoal hover:bg-slate-100 hover:text-ink transition-colors"
            >
              <Globe2 className="h-4 w-4 text-blue-600" />
              <span>Explore Countries</span>
            </a>

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
                className="focus-ring flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-charcoal hover:bg-slate-100 hover:text-ink transition-colors"
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
                <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-2xl border border-line bg-white p-2.5 shadow-2xl backdrop-blur-xl animate-dropdown-in">
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
              href="/contact"
              className="focus-ring rounded-lg px-3.5 py-2 text-sm font-semibold text-charcoal hover:bg-slate-100 hover:text-ink transition-colors"
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
              className="focus-ring group relative flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm transition-all hover:bg-emerald-600 hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="pulse-radar absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400" />
            </a>

            <StartJourneyButton className="focus-ring shimmer-btn group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:scale-105 active:scale-95" />
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="focus-ring rounded-xl p-2 text-ink hover:bg-slate-100 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Slide-Out Menu */}
        {mobileOpen && (
          <div
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col bg-white lg:hidden overflow-y-auto"
            style={{ top: menuTop }}
          >
            {/* Gradient accent top border */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent shrink-0" />
            <nav className="flex flex-1 flex-col gap-1 p-5">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-bold text-ink hover:bg-slate-50"
              >
                Home
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-bold text-ink hover:bg-slate-50"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 transition-transform ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div className="ml-4 space-y-1 border-l-2 border-amber-200 pl-3 py-1">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={s.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-charcoal hover:bg-slate-100"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Explore Countries Link */}
              <a
                href="/#destinations"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-bold text-blue-700 bg-blue-50/60"
              >
                <Globe2 className="h-5 w-5" />
                <span>Explore 15+ Countries</span>
              </a>

              {/* Mobile About Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileAboutOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-bold text-ink hover:bg-slate-50"
                >
                  <span>About</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 transition-transform ${
                      mobileAboutOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileAboutOpen && (
                  <div className="ml-4 space-y-1 border-l-2 border-slate-200 pl-3 py-1">
                    {aboutMenu.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-charcoal hover:bg-slate-100"
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
                className="rounded-xl px-4 py-3 text-base font-bold text-ink hover:bg-slate-50"
              >
                Contact
              </Link>
            </nav>

            <div className="border-t border-line p-5 space-y-3 bg-slate-50">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "mobile_menu" })}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-bold text-white shadow-md"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat on WhatsApp</span>
              </a>
              <StartJourneyButton
                className="shimmer-btn group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-md"
                onOpenChange={(open) => {
                  if (open) setMobileOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
