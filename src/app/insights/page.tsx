import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, Calendar, ArrowRight, CheckCircle2, MessageCircle, Sparkles, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPageView from "@/components/TrackPageView";
import { insightArticles } from "@/data/insights";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Travel & Career Insights | Visa Guides & Work Abroad Advice",
  description:
    "Authoritative guides, visa application tips, work permit requirements in Poland & Lithuania, proof of funds advice, and scam prevention for Ghanaians traveling abroad.",
  keywords: [
    "Ghana Travel Blog",
    "Poland Work Permit Ghana",
    "Lithuania Work Permit Guide",
    "Schengen Visa Requirements Accra",
    "Proof of Funds Visa Ghana",
    "Avoid Visa Scams Ghana",
    "Study in UK vs Canada Ghana",
    "KIA Start Up Consult Insights",
  ],
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Travel & Career Insights | KIA-Start Up Consult",
    description:
      "Expert travel and career advice for Ghanaians. Realistic guidance on European work permits, visa documentation, proof of funds, and study abroad.",
    type: "website",
    url: "/insights",
  },
};

const siteUrl = "https://travels.kiastartupconsult.com";

const insightsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "KIA-Start Up Consult Insights & Guides",
  description:
    "Practical, verified travel, visa, and overseas career advice tailored for Ghanaians.",
  url: `${siteUrl}/insights`,
  publisher: {
    "@type": "Organization",
    name: "KIA-Start Up Consult",
    url: siteUrl,
    logo: `${siteUrl}/images/kia-logo.jpeg`,
  },
  blogPost: insightArticles.map((article) => ({
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    url: `${siteUrl}/insights/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.lastUpdated,
    author: {
      "@type": "Organization",
      name: article.author.name,
    },
  })),
};

export default function InsightsPage() {
  const featured = insightArticles[0];
  const remaining = insightArticles.slice(1);

  return (
    <>
      <TrackPageView eventName="insights_view" payload={{ page: "insights" }} />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(insightsJsonLd) }}
      />

      <PageHero
        kicker="Knowledge & Advisory Hub"
        title="Travel & Career Insights"
        description="Honest, realistic advice on European work permits, embassy documentation, proof of funds, and international study for Ghanaians."
      />

      <main className="bg-sand-light/40 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          {/* Trust Banner */}
          <div className="mb-12 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/50 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-ink">Verified, Legal, and Scam-Free Advice</h2>
                  <p className="text-xs text-charcoal-soft">
                    All guides are written and reviewed by licensed immigration and international mobility advisors.
                  </p>
                </div>
              </div>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hi KIA Consult, I have a specific question regarding my travel or visa plans.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Ask an Advisor</span>
              </a>
            </div>
          </div>

          {/* Featured Cornerstone Article */}
          {featured && (
            <section className="mb-14">
              <div className="group relative overflow-hidden rounded-3xl border border-line bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-8">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 uppercase tracking-wider">
                          Featured Guide
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-charcoal">
                          {featured.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="h-3.5 w-3.5" />
                          {featured.readTime}
                        </span>
                      </div>

                      <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-3xl leading-snug">
                        <Link href={`/insights/${featured.slug}`} className="hover:text-amber-800 transition-colors">
                          {featured.title}
                        </Link>
                      </h2>

                      <p className="mt-4 text-sm leading-relaxed text-charcoal-soft sm:text-base">
                        {featured.excerpt}
                      </p>

                      {/* Key highlights bullets */}
                      <div className="mt-6 space-y-2 rounded-2xl bg-slate-50 p-4 border border-line/60">
                        <p className="text-xs font-bold uppercase tracking-wider text-charcoal">What you will learn:</p>
                        <ul className="space-y-1.5">
                          {featured.keyTakeaways.slice(0, 3).map((takeaway, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-charcoal leading-relaxed">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line/70 pt-6">
                      <div className="text-xs text-slate-500">
                        <span>By {featured.author.name}</span>
                        <span className="mx-2">•</span>
                        <span>{featured.publishedAt}</span>
                      </div>

                      <Link
                        href={`/insights/${featured.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-charcoal hover:translate-x-0.5"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Visual sidebar banner */}
                  <div className="relative flex flex-col justify-center bg-gradient-to-br from-ink via-slate-900 to-amber-950 p-8 text-white lg:col-span-4">
                    <div className="space-y-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm text-amber-400">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold">Ready to take the next step?</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Don&apos;t navigate complex visa forms alone. Our team reviews your qualifications and matches you with verified European employers.
                      </p>
                      <a
                        href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(featured.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold text-ink shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Chat About Poland &amp; Lithuania</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Grid of Other Articles */}
          <div className="mb-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  Latest Essential Guides
                </h3>
                <p className="text-xs text-charcoal-soft mt-1">
                  Practical answers to real immigration and documentation questions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {remaining.map((article) => (
                <article
                  key={article.slug}
                  className="flex flex-col justify-between rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-charcoal">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h4 className="mt-4 text-lg font-bold tracking-tight text-ink leading-snug">
                      <Link href={`/insights/${article.slug}`} className="hover:text-amber-800 transition-colors">
                        {article.title}
                      </Link>
                    </h4>

                    <p className="mt-3 text-xs leading-relaxed text-charcoal-soft line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-amber-50/60 px-2 py-0.5 text-[10px] font-medium text-amber-900 border border-amber-200/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-line/70 pt-4">
                    <span className="text-[11px] text-slate-400">
                      {article.publishedAt}
                    </span>
                    <Link
                      href={`/insights/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Bottom Consultation Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-ink via-slate-900 to-amber-950 p-8 sm:p-12 text-center text-white shadow-2xl">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Need personalized advice for your journey?
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every applicant&apos;s background, work history, and financial situation is unique. Speak directly with a verified consultant at our Techiman office or over WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hi KIA Consult, I read your insights guides and would like to book a 1-on-1 consultation.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Book 1-on-1 Consultation on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                <span>Visit Our Office in Techiman</span>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
