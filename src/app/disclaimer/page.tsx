import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/data/site";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Official advisory and regulatory disclaimer of KIA-Start Up Consult.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        kicker="Regulatory Notice"
        title="Disclaimer & Official Statement"
        description="Important information regarding government authorities, third-party institutions, and our advisory scope."
      />

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="rounded-2xl border border-amber-300 bg-amber-50/60 p-6 sm:p-8 text-amber-950 mb-10">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-amber-700 shrink-0" />
            <h2 className="font-display text-lg font-bold text-amber-950">Statutory Notice</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed">
            KIA-Start Up Consult is an independent private consultancy based in Ghana. We are not an
            embassy, consulate, visa issuing authority, or direct government agency. We do not guarantee
            visa approvals or university admissions, as those decisions rest entirely with official
            immigration officers and academic admissions committees.
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-sm leading-relaxed text-charcoal-soft">
          <div>
            <h3 className="font-display text-xl font-bold text-ink">1. No Guaranteed Visas</h3>
            <p className="mt-2">
              Any claims of &ldquo;guaranteed visas&rdquo; or &ldquo;100% embassy approval&rdquo; in the travel
              industry are deceptive. Our commitment is to ensure your application dossier is meticulously
              prepared, thoroughly vetted against official immigration guidelines, and positioned for the highest
              possible probability of success.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-ink">2. University &amp; Employer Autonomy</h3>
            <p className="mt-2">
              Admissions criteria, scholarship disbursements, and hiring decisions are the exclusive domain
              of respective academic institutions and hiring employers. KIA-Start Up Consult assists with
              strategic application positioning, document readiness, and communication advisory.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-ink">3. Consultation &amp; Advice</h3>
            <p className="mt-2">
              Guidance provided during discovery calls or consultations reflects current immigration policies
              at the time of discussion. Immigration regulations are subject to sudden sovereign changes by
              respective governments.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
