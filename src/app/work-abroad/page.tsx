import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import EmptyState from "@/components/EmptyState";
import OpportunityCard from "@/components/OpportunityCard";
import { opportunities, sectorsExplored, workAbroadProcess } from "@/data/work-abroad";
import { siteConfig, buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Work Abroad from Ghana",
  description:
    "Guidance on international employment opportunities, requirements and the application process for Ghanaians looking to work abroad.",
  alternates: { canonical: "/work-abroad" },
};

export default function WorkAbroadPage() {
  return (
    <>
      <TrackPageView eventName="work_abroad_view" />

      <PageHero
        kicker="Work Abroad"
        title="Build your global career."
        description="We help you understand what's genuinely involved in working abroad — the sectors, the requirements, the process and what to prepare for — so you can move forward with clear eyes."
        primaryCta={{ label: "Talk to an Advisor", href: buildWhatsAppLink("Hi, I'd like to know more about Work Abroad opportunities."), external: true }}
        secondaryCta={{ label: "Send an Enquiry", href: "/contact?service=work-abroad" }}
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Categories we help you explore</h2>
        <p className="mt-3 max-w-2xl text-sm text-charcoal-soft">
          These are general categories people ask us about — not a list of current vacancies.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {sectorsExplored.map((sector) => (
            <span
              key={sector}
              className="rounded-sm border border-line bg-white px-4 py-2 text-sm text-charcoal"
            >
              {sector}
            </span>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">How the process works</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {workAbroadProcess.map((step, i) => (
              <div key={step.title}>
                <span className="font-display text-2xl text-gold-deep">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Current opportunities</h2>
        <div className="mt-8">
          {opportunities.length === 0 ? (
            <EmptyState
              title="No live opportunities right now"
              description="We don't have any verified openings posted at the moment. Talk to an advisor and we'll let you know what's genuinely available for your background."
              ctaLabel="Talk to an Advisor"
              ctaHref={buildWhatsAppLink("Hi, are there any Work Abroad opportunities available right now?")}
            />
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {opportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.slug} opportunity={opportunity} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="flex items-start gap-3 rounded-sm border border-line bg-white p-6">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brick" aria-hidden />
            <div>
              <h2 className="font-display text-lg text-ink">Important</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                KIA-Start Up Consult provides guidance, documentation support and application
                assistance. We do not guarantee employment, and we never fabricate employers,
                vacancies or salaries. Hiring decisions are made by employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 lg:py-20">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Ready to explore your options?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-charcoal-soft">
            Start with a conversation. We&rsquo;ll tell you honestly what&rsquo;s involved.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={buildWhatsAppLink("Hi, I'd like to know more about Work Abroad opportunities.")}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center justify-center rounded-sm bg-ink px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-ink-deep"
            >
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.phoneLocalHref}`}
              className="focus-ring inline-flex items-center justify-center rounded-sm border border-ink/20 px-7 py-3.5 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-paper"
            >
              Call {siteConfig.phoneLocal}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
