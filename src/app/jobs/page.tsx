import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { AlertTriangle, Building2, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import JobsExplorer from "@/components/JobsExplorer";
import TalentRegistrySection from "@/components/TalentRegistrySection";
import { jobs } from "@/data/jobs";
import { siteConfig, buildWhatsAppLink } from "@/data/site";

export const metadata: Metadata = {
  title: "International Job Opportunities | Work Abroad from Ghana",
  description:
    "Explore verified international job opportunities in Europe and beyond. KIA-Start Up Consult helps Ghanaians find and apply for work abroad — with accommodation, flights, and placement included.",
  keywords: [
    "Work Abroad Ghana",
    "Jobs in Europe for Ghanaians",
    "International Job Opportunities Ghana",
    "Jobs in Lithuania for Ghanaians",
    "Jobs in Poland for Ghanaians",
    "Overseas Jobs Ghana",
    "Employment Abroad Ghana",
    "KIA Start Up Consult Jobs",
  ],
  alternates: { canonical: "/jobs" },
  openGraph: {
    title: "International Job Opportunities | KIA-Start Up Consult",
    description:
      "Verified work opportunities abroad for Ghanaians — with accommodation, flight tickets, and confirmed placements in Europe and beyond.",
    type: "website",
    url: "/jobs",
  },
};

const siteUrl = "https://travels.kiastartupconsult.com";

const jobsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "International Job Opportunities — KIA-Start Up Consult",
  description:
    "Verified overseas work opportunities for Ghanaians, including accommodation, flights, and confirmed placements.",
  url: `${siteUrl}/jobs`,
  numberOfItems: jobs.filter((j) => j.status === "open").length,
  itemListElement: jobs
    .filter((j) => j.status === "open")
    .map((job, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "JobPosting",
        "@id": `${siteUrl}/jobs#${job.slug}`,
        title: job.title,
        description: job.description ?? `Work placement opportunity in ${job.country}.`,
        hiringOrganization: {
          "@type": "Organization",
          name: "KIA-Start Up Consult",
          sameAs: siteUrl,
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressCountry: job.country,
          },
        },
        employmentType: job.type.toUpperCase().replace("-", "_"),
        baseSalary: job.salary
          ? {
              "@type": "MonetaryAmount",
              currency: job.salary.startsWith("EUR") ? "EUR" : "GHS",
              value: {
                "@type": "QuantitativeValue",
                description: job.salary,
              },
            }
          : undefined,
        validThrough: job.applicationDeadline ?? undefined,
        jobBenefits: job.benefits?.join(", "),
        qualifications: job.requirements?.join(", "),
      },
    })),
};


export default function JobsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobsJsonLd) }}
      />
      <TrackPageView eventName="jobs_page_view" />

      <PageHero
        kicker="Job Opportunities"
        title="Find your next international role."
        description="We list verified work opportunities abroad and guide Ghanaians through the full application process — from understanding requirements to submitting a strong application."
        primaryCta={{
          label: "Talk to an Advisor",
          href: buildWhatsAppLink(
            "Hi, I'd like to ask about current job opportunities."
          ),
          external: true,
        }}
        secondaryCta={{ label: "For Employers & HR Agencies", href: "/partners" }}
      />

      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <div className="h-96 animate-pulse rounded-2xl border border-line bg-white" />
          </div>
        }
      >
        <JobsExplorer />
      </Suspense>

      {/* Global Talent & Trade Registry Intake */}
      <TalentRegistrySection />

      {/* B2B Partner Strip */}
      <section className="border-y border-slate-800 bg-[#0f172a] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 sm:px-8 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Building2 className="h-4 w-4" />
              <span>International Employers &amp; Recruitment Agencies</span>
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
              Need vetted Ghanaian candidates for your GCC or European demand orders?
            </h2>
          </div>
          <Link
            href="/partners"
            className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold text-slate-950 shadow-sm transition-all hover:bg-amber-300"
          >
            <span>Explore B2B Manpower Partnerships</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="flex items-start gap-3 rounded-sm border border-line bg-white p-6">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-brick"
              aria-hidden
            />
            <div>
              <h2 className="font-display text-lg text-ink">Important</h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">
                KIA-Start Up Consult provides guidance, documentation support
                and application assistance. We do not guarantee employment, and
                we never fabricate employers, vacancies or salaries. Hiring
                decisions are made by the employer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 lg:py-20">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Don&rsquo;t see the right role?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-charcoal-soft">
            New opportunities come in regularly. Talk to an advisor and we'll
            let you know as soon as something matching your profile is
            available.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={buildWhatsAppLink(
                "Hi, I'd like to know about upcoming job opportunities."
              )}
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
