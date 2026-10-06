import Link from "next/link";
import Image from "next/image";
import { services, siteConfig } from "@/data/site";
import { PhoneCall, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";

// Social media SVG icons (inline — no extra dependency)
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconTikTok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const socialLinks = [
  {
    href: "https://www.instagram.com/kia_startup_consult/",
    label: "Instagram",
    Icon: IconInstagram,
  },
  {
    href: "https://www.facebook.com/kiastartup",
    label: "Facebook",
    Icon: IconFacebook,
  },
  {
    href: "https://www.linkedin.com/company/kia-start-up-consult",
    label: "LinkedIn",
    Icon: IconLinkedIn,
  },
  {
    href: "https://www.tiktok.com/@kia_startup_consult",
    label: "TikTok",
    Icon: IconTikTok,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-[#0a0a0a] text-white">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="pointer-events-none absolute top-0 right-1/4 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Mission */}
          <div className="space-y-5">
            <Link href="/" className="inline-block focus-ring rounded-xl">
              <Image
                src="/images/kia-logo.jpeg"
                alt="KIA-Start Up Consult"
                width={168}
                height={70}
                className="h-10 w-auto rounded-xl bg-white/10 p-1 backdrop-blur-sm"
              />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Practical guidance for international careers, university study abroad, and travel —
              delivering honest, transparent consultation from Ghana to the world.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 px-3.5 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-600/30 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span>Direct WhatsApp Advisor</span>
            </a>

            {/* Social Media Links */}
            <div>
              <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                Follow Us
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="social-icon-link focus-ring"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-amber-400">
              Services &amp; Routes
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    className="focus-ring hover:text-amber-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{s.title}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-amber-400">
              Company &amp; Legal
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/about" className="focus-ring hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/insights" className="focus-ring hover:text-amber-400 font-semibold transition-colors text-amber-300">
                  Insights &amp; Guides
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="focus-ring hover:text-white transition-colors">
                  Job Opportunities
                </Link>
              </li>
              <li>
                <Link href="/contact" className="focus-ring hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="focus-ring hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link
                  href="/privacy-policy"
                  className="focus-ring hover:text-white transition-colors text-slate-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="focus-ring hover:text-white transition-colors text-slate-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="focus-ring hover:text-white transition-colors text-slate-400"
                >
                  Official Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display text-xs uppercase tracking-widest text-amber-400">
              Consultation Office
            </h3>
            <ul className="mt-4 space-y-3.5 text-xs text-slate-300">
              <li>
                <a
                  href={`tel:${siteConfig.phoneLocalHref}`}
                  className="focus-ring flex items-center gap-2 hover:text-amber-400 transition-colors"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>{siteConfig.phoneLocal} (Ghana)</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneIntlHref}`}
                  className="focus-ring flex items-center gap-2 hover:text-amber-400 transition-colors"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>{siteConfig.phoneIntl} (UK/Intl)</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="focus-ring flex items-center gap-2 hover:text-amber-400 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400 leading-relaxed pt-1">
                <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} KIA-Start Up Consult. All rights reserved. Registered
            in Ghana.
          </p>
          <p className="text-[11px] text-slate-500 max-w-md">
            Visa, admission, and employment outcomes are determined exclusively by official sovereign
            embassies, academic institutions, and employers.
          </p>
        </div>
      </div>
    </footer>
  );
}
