"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, ExternalLink, Layers, CheckCircle2 } from "lucide-react";
import type { InsightArticle } from "@/data/insights";

interface Props {
  articles: InsightArticle[];
}

type FilterMode =
  | "all"
  | "canada-series"
  | "Work Abroad"
  | "Visa Advisory"
  | "Study Abroad"
  | "Travel Advice";

export default function InsightsExplorer({ articles }: Props) {
  const [filter, setFilter] = useState<FilterMode>("all");

  const canadaSeries = articles
    .filter((a) => a.series?.id === "canada-express-entry-masterclass")
    .sort((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0));

  const displayedArticles =
    filter === "all"
      ? articles
      : filter === "canada-series"
      ? canadaSeries
      : articles.filter((a) => a.category === filter);

  const filterTabs: { id: FilterMode; label: string; count: number; highlight?: boolean }[] = [
    { id: "all", label: "All Guides", count: articles.length },
    {
      id: "canada-series",
      label: "🇨🇦 Canada Express Entry 12-Part Series",
      count: canadaSeries.length,
      highlight: true,
    },
    {
      id: "Work Abroad",
      label: "Work Abroad",
      count: articles.filter((a) => a.category === "Work Abroad").length,
    },
    {
      id: "Visa Advisory",
      label: "Visa Advisory",
      count: articles.filter((a) => a.category === "Visa Advisory").length,
    },
    {
      id: "Study Abroad",
      label: "Study Abroad",
      count: articles.filter((a) => a.category === "Study Abroad").length,
    },
    {
      id: "Travel Advice",
      label: "Travel Advice",
      count: articles.filter((a) => a.category === "Travel Advice").length,
    },
  ];

  return (
    <div className="mb-16">
      {/* Dedicated Canada 12-Part Series Spotlight Banner */}
      <div className="mb-12 overflow-hidden rounded-3xl border border-slate-800 bg-[#0b0f17] p-7 text-white shadow-2xl sm:p-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <div className="inline-flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-amber-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-950">
                🇨🇦 12-Part Verifiable Advisory Series
              </span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                100% Fact-Checked Against IRCC Canada.ca
              </span>
            </div>

            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Canada Express Entry Category-Based Selection: Step-by-Step Guide for Ghanaians
            </h3>

            <p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
              We broke down Canada&apos;s official category-based draws into 12 easy-to-follow guides covering the 67-point FSW gate, Teachers, Nurses &amp; Pharmacists, Medical Doctors, Skilled Trades, STEM Engineers, the French NCLC 7 shortcut, WES/MCC ECA verification, and IRCC-compliant NOC reference letters.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              type="button"
              onClick={() => setFilter(filter === "canada-series" ? "all" : "canada-series")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3.5 text-xs font-bold text-slate-950 shadow-lg transition hover:bg-amber-300"
            >
              <Layers className="h-4 w-4" />
              <span>
                {filter === "canada-series"
                  ? "Showing All 12 Parts Below"
                  : "Explore All 12 Parts in Order"}
              </span>
            </button>
            <a
              href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations/category-based-selection.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-[11px] font-semibold text-slate-200 transition hover:bg-white/10"
            >
              <span>Verify Official IRCC Source</span>
              <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
            </a>
          </div>
        </div>

        {/* Quick 12-Part Step Strip */}
        <div className="mt-7 grid grid-cols-1 gap-2.5 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {canadaSeries.map((item) => (
            <Link
              key={item.slug}
              href={`/insights/${item.slug}`}
              className="group flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-amber-400/50 hover:bg-white/10"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-400/20 text-[11px] font-bold text-amber-300">
                {item.series?.part}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-300/90">
                  Part {item.series?.part} of {item.series?.totalParts}
                </p>
                <p className="mt-0.5 line-clamp-2 text-xs font-bold text-white group-hover:text-amber-200">
                  {item.title.replace(/^Part \d+:\s*/, "")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Category & Series Filter Bar */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {filter === "canada-series"
              ? "Canada Express Entry 12-Part Masterclass (In Order)"
              : "All Verified Advisory Guides"}
          </h3>
          <p className="mt-1 text-xs text-charcoal-soft">
            Practical, verifiable answers to real immigration, NOC, ECA, and visa documentation questions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition ${
                  active
                    ? "bg-ink text-white shadow-md"
                    : tab.highlight
                    ? "border border-amber-400/60 bg-amber-50 text-amber-950 hover:bg-amber-100"
                    : "border border-line bg-white text-charcoal hover:bg-slate-50"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Magazine Cards Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayedArticles.map((article) => (
          <article
            key={article.slug}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div>
              {/* Magazine Cover Photo Header */}
              <Link
                href={`/insights/${article.slug}`}
                className="relative block h-48 w-full overflow-hidden bg-slate-900"
              >
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                {article.series && (
                  <div className="absolute left-4 top-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-sm">
                      🇨🇦 Part {article.series.part} of {article.series.totalParts}
                    </span>
                  </div>
                )}

                <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-xs">
                  <span className="rounded-full bg-white/95 px-3 py-1 font-bold text-slate-900 shadow-sm backdrop-blur-sm">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-slate-950/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                    <Clock className="h-3 w-3 text-amber-400" />
                    {article.readTime}
                  </span>
                </div>
              </Link>

              <div className="p-6 pb-2">
                {article.series && (
                  <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-800">
                    {article.series.phase}
                  </p>
                )}

                <h4 className="font-display text-lg font-bold leading-snug tracking-tight text-ink">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="transition-colors hover:text-amber-800"
                  >
                    {article.title}
                  </Link>
                </h4>

                <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-charcoal-soft">
                  {article.excerpt}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-amber-200/40 bg-amber-50/60 px-2 py-0.5 text-[10px] font-medium text-amber-900"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mx-6 mb-6 mt-5 flex items-center justify-between border-t border-line/70 pt-4">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {article.officialSourceUrl ? "IRCC Verified" : article.publishedAt}
              </span>
              <Link
                href={`/insights/${article.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700"
              >
                <span>Read Guide</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
