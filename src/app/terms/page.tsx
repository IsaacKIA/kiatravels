import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions of advisory services with KIA-Start Up Consult.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        kicker="Legal & Transparency"
        title="Terms of Service"
        description="Terms, conditions, and understanding of our professional consultation and travel advisory services."
      />

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="prose prose-slate max-w-none space-y-8 text-sm leading-relaxed text-charcoal-soft">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">1. Nature of Services</h2>
            <p className="mt-2">
              KIA-Start Up Consult provides independent educational, employment, and travel guidance.
              Our services encompass document vetting, CV structuring, admission applications, flight
              itinerary planning, and procedural visa advisory.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">2. Advisory Role & Authority Boundaries</h2>
            <p className="mt-2">
              Clients expressly acknowledge that KIA-Start Up Consult is an advisory consultancy and not
              a sovereign embassy, high commission, or university admissions board. All final visa issuance,
              entry clearances, and employment hiring decisions reside solely with the relevant sovereign
              authorities and institutions.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">3. Client Obligations</h2>
            <p className="mt-2">
              Clients agree to provide genuine, authentic, and accurate documentation. KIA-Start Up Consult
              does not condone or participate in document fabrication, fraudulent statements, or illicit
              entry schemes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">4. Governing Law</h2>
            <p className="mt-2">
              These terms are governed by the laws of the Republic of Ghana. For queries, reach us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="font-bold text-ink underline">
                {siteConfig.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
