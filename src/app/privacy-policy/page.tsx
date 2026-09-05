import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and client data handling practices at KIA-Start Up Consult.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        kicker="Legal & Transparency"
        title="Privacy Policy"
        description="How KIA-Start Up Consult collects, protects, and handles your personal information throughout your application and advisory journey."
      />

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="prose prose-slate max-w-none space-y-8 text-sm leading-relaxed text-charcoal-soft">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">1. Information We Collect</h2>
            <p className="mt-2">
              We collect information that you provide directly to us when inquiring about or engaging
              our services. This includes personal identifiers (such as your name, email, phone
              number, passport details, educational transcripts, curriculum vitae, and travel preferences).
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">2. How We Use Your Data</h2>
            <p className="mt-2">
              Your information is used strictly to evaluate your visa and admission eligibility, prepare
              travel and application dossiers, facilitate direct communication, and provide accurate
              guidance. We never sell or lease your personal information to third-party marketers.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">3. Data Security & Confidentiality</h2>
            <p className="mt-2">
              All personal documents, bank statements, and credentials entrusted to KIA-Start Up Consult
              are handled under strict confidentiality protocols. Documents are accessible solely by
              authorized advisors managing your application file.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">4. Contact Us</h2>
            <p className="mt-2">
              If you have any questions regarding your data or wish to request data removal, please
              contact our privacy officer at{" "}
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
