import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { MapPin, Mail, Phone, Clock, Building2, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import ContactForm from "@/components/ContactForm";
import { siteConfig, buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with KIA-Start Up Consult by phone, email, WhatsApp or enquiry form.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.address
  )}`;

  return (
    <>
      <TrackPageView eventName="contact_view" />

      <PageHero
        kicker="Contact"
        title="Start with a conversation."
        description="Reach us however works best for you — phone, email, WhatsApp, or the form below."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" aria-hidden />
                <div>
                  <p className="text-sm text-charcoal-soft">Phone</p>
                  <a href={`tel:${siteConfig.phoneLocalHref}`} className="focus-ring text-ink hover:text-gold-deep">
                    {siteConfig.phoneLocal}
                  </a>
                  <br />
                  <a href={`tel:${siteConfig.phoneIntlHref}`} className="focus-ring text-ink hover:text-gold-deep">
                    {siteConfig.phoneIntl}
                  </a>{" "}
                  <span className="text-sm text-charcoal-soft">(international)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" aria-hidden />
                <div>
                  <p className="text-sm text-charcoal-soft">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="focus-ring text-ink hover:text-gold-deep">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" aria-hidden />
                <div>
                  <p className="text-sm text-charcoal-soft">Office</p>
                  <p className="text-ink">{siteConfig.address}</p>
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring mt-1 inline-block text-sm font-semibold text-gold-deep underline underline-offset-4"
                  >
                    Get directions
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" aria-hidden />
                <div>
                  <p className="text-sm text-charcoal-soft">Business Hours</p>
                  <p className="text-ink">{siteConfig.businessHours}</p>
                  <p className="text-xs text-charcoal-soft mt-0.5">
                    WhatsApp &amp; International Partner Desk monitored 7 days a week
                  </p>
                </div>
              </div>
            </div>

            <a
              href={buildWhatsAppLink("Hi, I'd like to get in touch with KIA-Start Up Consult.")}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-8 inline-flex items-center justify-center rounded-xl bg-[#25D366] px-7 py-3.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-colors hover:brightness-95"
            >
              Chat on WhatsApp
            </a>

            {/* B2B Partnerships Box */}
            <div className="mt-8 rounded-2xl border border-line bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                <Building2 className="h-4 w-4 text-amber-600" />
                <span>Employer &amp; HR Agency Partnerships</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-charcoal-soft">
                Are you an international recruitment agency or employer looking to source vetted Ghanaian manpower for the GCC, Europe, or UK?
              </p>
              <Link
                href="/partners"
                className="focus-ring mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-amber-800"
              >
                <span>View Corporate Profile &amp; Manpower Capabilities</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <Suspense fallback={<div className="h-96 rounded-sm border border-line bg-white" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
