import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Info,
  Lightbulb,
  MessageCircle,
  ShieldCheck,
  Building2,
  Phone,
  ExternalLink,
  Layers,
} from "lucide-react";
import TrackPageView from "@/components/TrackPageView";
import { insightArticles, type InsightArticle } from "@/data/insights";
import { siteConfig } from "@/data/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insightArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = insightArticles.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Article Not Found | KIA-Start Up Consult" };
  }

  const siteUrl = "https://travels.kiastartupconsult.com";
  const url = `${siteUrl}/insights/${article.slug}`;

  return {
    title: `${article.title} | KIA-Start Up Consult`,
    description: article.excerpt,
    keywords: article.tags,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url,
      publishedTime: article.publishedAt,
      modifiedTime: article.lastUpdated,
      authors: [article.author.name],
      tags: article.tags,
      images: [{ url: article.coverImage, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = insightArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const siteUrl = "https://travels.kiastartupconsult.com";
  const articleUrl = `${siteUrl}/insights/${article.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    headline: article.title,
    description: article.excerpt,
    image: `${siteUrl}${encodeURI(article.coverImage)}`,
    datePublished: article.publishedAt,
    dateModified: article.lastUpdated,
    author: {
      "@type": "Organization",
      name: article.author.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "KIA-Start Up Consult",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/kia-logo.jpeg`,
      },
    },
    keywords: article.tags.join(", "),
  };

  const seriesArticles = article.series
    ? insightArticles
        .filter((a) => a.series?.id === article.series?.id)
        .sort((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0))
    : [];

  const prevInSeries = article.series
    ? seriesArticles.find((a) => a.series?.part === (article.series?.part ?? 0) - 1)
    : undefined;

  const nextInSeries = article.series
    ? seriesArticles.find((a) => a.series?.part === (article.series?.part ?? 0) + 1)
    : undefined;

  const relatedArticles = insightArticles
    .filter((a) => a.slug !== article.slug && (!article.series || a.series?.id === article.series.id))
    .slice(0, 2);

  return (
    <>
      <TrackPageView eventName="insight_read" payload={{ slug: article.slug }} />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="bg-sand-light/30 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* Back Link */}
          <Link
            href="/insights"
            className="group mb-8 inline-flex items-center gap-2 text-xs font-bold text-amber-900 transition hover:text-amber-700"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
            <span>Back to All Insights &amp; Guides</span>
          </Link>

          {/* Article Header */}
          <header className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
            <div className="relative h-60 w-full bg-slate-900 sm:h-80">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-amber-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-sm">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  Updated {article.lastUpdated}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl lg:text-4xl">
                {article.title}
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-charcoal-soft sm:text-base">
                {article.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line/70 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                    KIA
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink">{article.author.name}</p>
                    <p className="text-[11px] text-slate-500">{article.author.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {article.officialSourceUrl && (
                    <a
                      href={article.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-900 transition hover:bg-emerald-100"
                    >
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                      <span>Official IRCC Source (Canada.ca)</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hi KIA Consult, I am inquiring about the article: "${article.title}"`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Discuss With Advisor</span>
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* 12-Part Series Progress & Navigator Banner */}
          {article.series && seriesArticles.length > 0 && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-[#0b0f17] p-6 text-white shadow-xl sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2">
                  <span className="rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-950">
                    🇨🇦 Part {article.series.part} of {article.series.totalParts}
                  </span>
                  <span className="text-xs font-semibold text-amber-300">
                    {article.series.phase}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                  <Layers className="h-3.5 w-3.5 text-amber-400" />
                  <span>{article.series.name}</span>
                </span>
              </div>

              {/* Next / Previous Part Buttons */}
              {(prevInSeries || nextInSeries) && (
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {prevInSeries ? (
                    <Link
                      href={`/insights/${prevInSeries.slug}`}
                      className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-amber-400/50 hover:bg-white/10"
                    >
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
                        Previous: Part {prevInSeries.series?.part}
                      </span>
                      <span className="mt-1 line-clamp-1 text-xs font-bold text-white group-hover:text-amber-300">
                        {prevInSeries.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextInSeries && (
                    <Link
                      href={`/insights/${nextInSeries.slug}`}
                      className="group flex flex-col justify-between rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-right transition hover:border-amber-400 hover:bg-amber-400/20"
                    >
                      <span className="inline-flex items-center justify-end gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                        Next: Part {nextInSeries.series?.part}
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                      </span>
                      <span className="mt-1 line-clamp-1 text-xs font-bold text-white group-hover:text-amber-200">
                        {nextInSeries.title}
                      </span>
                    </Link>
                  )}
                </div>
              )}

              {/* Compact 12-Part Pills */}
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                {seriesArticles.map((item) => {
                  const isCurrent = item.slug === article.slug;
                  return (
                    <Link
                      key={item.slug}
                      href={`/insights/${item.slug}`}
                      title={item.title}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                        isCurrent
                          ? "bg-amber-400 text-slate-950 shadow-sm"
                          : "border border-white/10 bg-white/5 text-slate-300 hover:border-amber-400/40 hover:text-white"
                      }`}
                    >
                      Part {item.series?.part}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Key Takeaways Box */}
          <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-50/60 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-amber-900">
              <Lightbulb className="h-5 w-5 text-amber-700" />
              <h2 className="text-sm font-bold uppercase tracking-wider">Key Takeaways at a Glance</h2>
            </div>
            <ul className="mt-4 space-y-2.5">
              {article.keyTakeaways.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Main Body Content */}
          <div className="mt-8 space-y-10 rounded-3xl border border-line bg-white p-6 sm:p-10 shadow-sm">
            {article.content.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl border-b border-line/60 pb-3">
                  {section.sectionTitle}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm leading-relaxed text-charcoal sm:text-base">
                    {p}
                  </p>
                ))}

                {section.bulletPoints && (
                  <ul className="my-4 space-y-2 rounded-xl bg-slate-50 p-5 border border-line/60">
                    {section.bulletPoints.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-charcoal leading-relaxed">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.alert && (
                  <div
                    className={`my-4 rounded-2xl p-5 border text-xs sm:text-sm leading-relaxed ${
                      section.alert.type === "warning"
                        ? "border-rose-200 bg-rose-50 text-rose-900"
                        : section.alert.type === "important"
                        ? "border-blue-200 bg-blue-50 text-blue-900"
                        : "border-emerald-200 bg-emerald-50 text-emerald-900"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-1.5">
                      {section.alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-rose-600" />}
                      {section.alert.type === "important" && <ShieldCheck className="h-4 w-4 text-blue-600" />}
                      {section.alert.type === "tip" && <Info className="h-4 w-4 text-emerald-600" />}
                      <span>{section.alert.title}</span>
                    </div>
                    <p>{section.alert.message}</p>
                  </div>
                )}
              </section>
            ))}

            {/* In-Article Conversion Card */}
            <div className="rounded-2xl bg-gradient-to-br from-ink to-slate-900 p-6 sm:p-8 text-white shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <span className="rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-bold text-amber-400">
                    Professional Advisory
                  </span>
                  <h3 className="mt-2 text-lg sm:text-xl font-bold">
                    Need Guidance Tailored to Your Profile?
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 max-w-lg leading-relaxed">
                    Avoid delays and expensive mistakes. Have your CV, bank statement, or visa file vetted by our certified team before submission.
                  </p>
                </div>

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(article.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-xs font-bold text-ink shadow-md transition hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat With Our Team</span>
                </a>
              </div>
            </div>

            {/* Tags */}
            <div className="border-t border-line/70 pt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Topic Tags</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-charcoal hover:bg-slate-200 transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Transparency Disclaimer */}
            <div className="rounded-xl border border-line bg-slate-50 p-4 text-[11px] text-slate-500 leading-relaxed">
              <strong>Regulatory Notice:</strong> KIA-Start Up Consult provides legitimate educational, career advisory, and documentation support services. We do not sell visas or forge government documents. Final visa decisions rest solely with the respective sovereign embassy and consular authorities.
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold tracking-tight text-ink mb-6">
                Related Advisory Guides
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/insights/${rel.slug}`}
                    className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 430px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                      <span className="absolute bottom-3 left-4 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-900">
                        {rel.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h4 className="font-display text-sm font-bold text-ink transition group-hover:text-amber-800 line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="mt-2 text-xs text-charcoal-soft line-clamp-2">
                        {rel.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{rel.readTime}</span>
                        <span className="font-bold text-amber-900 group-hover:underline">Read →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>
    </>
  );
}
