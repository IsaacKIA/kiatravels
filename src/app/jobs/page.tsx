import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import EmptyState from "@/components/EmptyState";
import JobCard from "@/components/JobCard";
import { jobs, jobSectors, type JobStatus } from "@/data/jobs";
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


const statusTabs: { label: string; value: JobStatus | "all" }[] = [
  { label: "All Listings", value: "all" },
  { label: "Active", value: "open" },
  { label: "Opening Soon", value: "upcoming" },
  { label: "Closed", value: "closed" },
];

export default function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; sector?: string }>;
}) {
  // searchParams is a Promise in Next.js 16 App Router — read synchronously
  // via React's use() or simply pass through; for static rendering we read
  // directly. Next.js 16 makes searchParams async; unwrap inline:
  return <JobsContent />;
}

// Separate component so we can keep the page export clean for metadata
function JobsContent() {
  const openCount = jobs.filter((j) => j.status === "open").length;

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
        secondaryCta={{ label: "Send an Enquiry", href: "/contact?service=work-abroad" }}
      />

      {/* Sector pills */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-charcoal-soft">
            Sectors we cover
          </p>
          <div className="flex flex-wrap gap-2">
            {jobSectors.map((sector) => (
              <span
                key={sector}
                className="rounded-full border border-line bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-charcoal"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Current openings
            </h2>
            {openCount > 0 && (
              <p className="mt-1 text-sm text-charcoal-soft">
                {openCount} active listing{openCount !== 1 ? "s" : ""} available right now
              </p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {jobs.length === 0 ? (
            <EmptyState
              title="No live opportunities right now"
              description="We don't have any verified openings posted at the moment. Talk to an advisor and we'll let you know what's genuinely available for your background and goals."
              ctaLabel="Talk to an Advisor"
              ctaHref={buildWhatsAppLink(
                "Hi, are there any job opportunities available right now?"
              )}
            />
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </div>
          )}
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
