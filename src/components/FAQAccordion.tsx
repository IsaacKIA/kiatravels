"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { FaqItem } from "@/data/faq";

export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-soft"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpenIndex(null);
          }}
          placeholder="Search questions..."
          aria-label="Search frequently asked questions"
          className="focus-ring w-full rounded-sm border border-line bg-white py-3 pl-10 pr-4 text-sm text-ink outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-charcoal-soft">
          No questions match &ldquo;{query}&rdquo;. Try a different search, or{" "}
          <a href="/contact" className="focus-ring font-semibold text-gold-deep underline underline-offset-4">
            ask us directly
          </a>
          .
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {filtered.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="focus-ring flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-base text-ink sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-charcoal-soft transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <div id={`faq-panel-${i}`} className="pb-5 pr-8">
                    <p className="text-sm leading-relaxed text-charcoal-soft">{item.answer}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
