import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  MessageCircle,
  PlaneTakeoff,
  Building2,
} from "lucide-react";
import TrackPageView from "@/components/TrackPageView";
import {
  jobs,
  jobTypeLabels,
  jobStatusLabels,
  jobStatusStyles,
} from "@/data/jobs";
import { siteConfig, buildWhatsAppLink } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) {
    return { title: "Job Opportunity Not Found" };
  }

  const title = `${job.title} (${job.country}) — ${job.salary ?? "Verified Placement"}`;
  const description =
    job.description ??
    `Apply for ${job.title} in ${job.country} through KIA-Start Up Consult. Verified international work placement with full visa and flight support.`;

  return {
    title,
    description,
    alternates: { canonical: `/jobs/${job.slug}` },
    openGraph: {
      title: `${job.countryFlagEmoji} ${job.title} | KIA-Start Up Consult`,
      description,
      type: "website",
      url: `/jobs/${job.slug}`,
      images: job.image
        ? [
            {
              url: job.image,
              width: 1200,
              height: 630,
              alt: `${job.title} in ${job.country}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.countryFlagEmoji} ${job.title}`,
      description,
      images: job.image ? [job.image] : undefined,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) notFound();

  const relatedJobs = jobs
    .filter((j) => j.slug !== job.slug && j.status === "open")
    .slice(0, 3);

  const jobJsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": `${siteConfig.siteUrl}/jobs/${job.slug}`,
    title: job.title,
    description:
      job.description ??
      `Verified overseas work placement opportunity in ${job.country} (${job.sector}).`,
    datePosted: "2026-10-01",
    validThrough: job.applicationDeadline ?? "2027-06-30",
    employmentType: job.type.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.siteUrl,
      logo: `${siteConfig.siteUrl}/images/kia-logo.jpeg`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: job.country,
      },
    },
    baseSalary: job.salary
      ? {
          "@type": "MonetaryAmount",
          currency: job.salary.includes("EUR") ? "EUR" : "AED",
          value: {
            "@type": "QuantitativeValue",
            description: job.salary,
          },
        }
      : undefined,
    jobBenefits: job.benefits?.join(", "),
    qualifications: job.requirements?.join(", "),
  };

  const whatsappApplyMsg = `Hello KIA-Start Up Consult, I want to apply for the ${job.title} (${job.country}) position${job.salary ? ` [${job.salary}]` : ""}. Please guide me on the next steps.`;

  return (
    <div className="bg-[#fafaf9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobJsonLd) }}
      />
      <TrackPageView eventName={`job_detail_${job.slug}`} />

      {/* Top Hero Banner with Photo Backdrop */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-[#0b0f17] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Link
            href="/jobs"
            className="focus-ring inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-amber-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Job Openings</span>
          </Link>

          <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${jobStatusStyles[job.status]}`}
                >
                  {jobStatusLabels[job.status]}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-amber-300">
                  {job.countryFlagEmoji} {job.country}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                  {job.sector}
                </span>
              </div>

              <h1 className="mt-4 font-display text-3xl leading-[1.1] font-bold text-white sm:text-4xl lg:text-5xl">
                {job.title}
              </h1>

              {job.salary && (
                <div className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-2.5 text-sm font-bold text-emerald-300">
                  <span>Compensation Package:</span>
                  <span className="text-white">{job.salary}</span>
                </div>
              )}

              {job.description && (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
                  {job.description}
                </p>
              )}
            </div>

            {/* Right Hero Photo Card */}
            <div className="lg:col-span-5">
              <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl sm:h-72">
                <Image
                  src={job.image ?? "/images/work abroad.png"}
                  alt={`${job.title} in ${job.country}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white">
                  <span className="inline-flex items-center gap-1.5 font-bold">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    {jobTypeLabels[job.type]}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-amber-300">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.country}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content + Sticky Application Sidebar */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left Column (7 cols): Package Benefits & Candidate Requirements */}
          <div className="space-y-8 lg:col-span-7">
            {/* Package Inclusions & Compensation Breakdown */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="rounded-3xl border border-line bg-white p-7 shadow-sm sm:p-8">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      Confirmed Placement Package
                    </span>
                    <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                      Roles, Salaries &amp; Benefits Included
                    </h2>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 border-t border-line/70 pt-5 text-sm text-charcoal">
                  {job.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 rounded-2xl border border-line/60 bg-slate-50/70 p-3.5 font-medium"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Candidate Eligibility & Document Checklist */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="rounded-3xl border border-line bg-white p-7 shadow-sm sm:p-8">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-800 ring-1 ring-amber-200">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                      Mandatory Dossier
                    </span>
                    <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                      Eligibility &amp; Document Requirements
                    </h2>
                  </div>
                </div>

                <ul className="mt-6 grid grid-cols-1 gap-3 border-t border-line/70 pt-5 sm:grid-cols-2">
                  {job.requirements.map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-2.5 rounded-2xl border border-line bg-[#fafaf9] p-3.5 text-xs font-semibold text-ink sm:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4-Stage Deployment Strip */}
            <div className="rounded-3xl border border-line bg-white p-7 shadow-sm sm:p-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                End-to-End Execution
              </span>
              <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
                How We Process Your Placement
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { step: "01", title: "Dossier & Trade Screening", tag: "Passport & Skill Audit" },
                  { step: "02", title: "Work Permit & Offer", tag: "Employer Confirmation" },
                  { step: "03", title: "Medical & Police CID", tag: "GAMCA / Embassy Clearance" },
                  { step: "04", title: "Visa & Flight Dispatch", tag: "Departure from Accra (ACC)" },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="flex items-center gap-3.5 rounded-2xl border border-line bg-[#fafaf9] p-4"
                  >
                    <span className="font-display text-2xl font-bold text-amber-600">{s.step}</span>
                    <div>
                      <p className="text-sm font-bold text-ink">{s.title}</p>
                      <p className="text-xs text-charcoal-soft">{s.tag}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Sticky Application & Advisory Card */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#0f172a] p-7 text-white shadow-2xl sm:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                <PlaneTakeoff className="h-3 w-3" />
                Direct Placement Desk
              </span>

              <h3 className="mt-4 font-display text-2xl font-bold text-white">
                Apply for {job.country} Placement
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Submit your application online or connect directly with our recruitment advisor on
                WhatsApp to verify your passport and trade documents.
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  href={`/contact?job=${job.slug}`}
                  className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 text-sm font-bold text-slate-950 shadow-lg transition-all hover:scale-[1.01] hover:bg-amber-300"
                >
                  <span>Complete Online Application</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href={buildWhatsAppLink(whatsappApplyMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-sm font-bold text-white shadow-md transition-all hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Fast-Track via WhatsApp</span>
                </a>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5 text-xs text-slate-300 space-y-2">
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Ghana Recruitment Desk:</span>
                  <a href={`tel:${siteConfig.phoneLocalHref}`} className="font-bold text-white">
                    {siteConfig.phoneLocal}
                  </a>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">UK International Desk:</span>
                  <a href={`tel:${siteConfig.phoneIntlHref}`} className="font-bold text-white">
                    {siteConfig.phoneIntl}
                  </a>
                </p>
              </div>
            </div>

            {/* B2B Employer Callout */}
            <div className="rounded-3xl border border-line bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                <Building2 className="h-4 w-4 text-amber-600" />
                <span>Are You an International Employer?</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-charcoal-soft">
                We supply pre-screened, trade-tested Ghanaian candidates in this category for GCC
                and European demand orders.
              </p>
              <Link
                href="/partners"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-ink underline decoration-amber-500 underline-offset-4 hover:text-amber-800"
              >
                <span>View B2B Manpower Profile</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Open Positions */}
        {relatedJobs.length > 0 && (
          <div className="mt-16 border-t border-line pt-14">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-ink">
                Other Active Placements
              </h2>
              <Link
                href="/jobs"
                className="text-xs font-bold text-amber-800 underline underline-offset-4 hover:text-ink"
              >
                View all openings →
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedJobs.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/jobs/${rel.slug}`}
                  className="glass-card-hover group flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-xs"
                >
                  <div>
                    <p className="text-xs font-bold text-amber-800">
                      {rel.countryFlagEmoji} {rel.country} &bull; {rel.sector}
                    </p>
                    <h3 className="mt-1 font-display text-base font-bold text-ink group-hover:text-amber-800">
                      {rel.title}
                    </h3>
                    {rel.salary && (
                      <p className="mt-2 inline-block rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                        {rel.salary}
                      </p>
                    )}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-ink group-hover:text-amber-800">
                    <span>Inspect Role</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
