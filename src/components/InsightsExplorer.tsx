"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import type { InsightArticle } from "@/data/insights";

interface Props {
  articles: InsightArticle[];
}

type FilterMode =
  | "all"
  | "Work Abroad"
  | "Visa Advisory"
  | "Study Abroad"
  | "Travel Advice";

export default function InsightsExplorer({ articles }: Props) {
  const [filter, setFilter] = useState<FilterMode>("all");

  const displayedArticles =
    filter === "all"
      ? articles
      : articles.filter((a) => a.category === filter);

  const filterTabs: { id: FilterMode; label: string; count: number }[] = [
    { id: "all", label: "All Guides", count: articles.length },
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
      {/* Clean Category Filter Bar */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Latest Essential Guides
          </h3>
          <p className="mt-1 text-xs text-charcoal-soft">
            Practical, verifiable answers to real immigration, work permit, and documentation questions.
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

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
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                {article.officialSourceUrl ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Official Source Verified</span>
                  </>
                ) : (
                  article.publishedAt
                )}
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
