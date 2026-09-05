"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles } from "lucide-react";
import { journeyOptions, buildWhatsAppLink, trackEvent } from "@/data/site";

const allOptions = [
  ...journeyOptions,
  {
    emoji: "💬",
    label: "Talk to an Advisor",
    href: buildWhatsAppLink("Hi, I'd like to speak with an advisor."),
    external: true,
  },
];

export default function StartJourneyButton({
  className,
  children,
  onOpenChange,
}: {
  className?: string;
  children?: ReactNode;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const firstOptionRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = (nextOpen: boolean) => {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    firstOptionRef.current?.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          handleOpen(true);
          trackEvent("start_journey_click", { location: "guided_flow" });
        }}
        className={className}
      >
        {children ?? (
          <span className="inline-flex items-center justify-center gap-2">
            Start Your Journey
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </span>
        )}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="What are you planning?"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto animate-modal-backdrop"
            onClick={() => handleOpen(false)}
          >
            <div
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto my-auto rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-2xl animate-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-line/70 pb-4 sm:pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-900 border border-amber-200/50 mb-1.5">
                    <Sparkles className="h-3 w-3 text-amber-600" />
                    <span>Start Your Journey</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                    What are you planning?
                  </h2>
                  <p className="mt-1 text-xs text-charcoal-soft">
                    Select an objective to be guided to the right consultation team.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpen(false)}
                  aria-label="Close dialog"
                  className="focus-ring flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-charcoal transition-colors hover:bg-slate-200 hover:text-ink shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {allOptions.map((option, i) => (
                  <a
                    key={option.label}
                    ref={i === 0 ? firstOptionRef : undefined}
                    href={option.href}
                    target={"external" in option && option.external ? "_blank" : undefined}
                    rel={"external" in option && option.external ? "noopener noreferrer" : undefined}
                    onClick={() => {
                      handleOpen(false);
                      trackEvent("journey_option_click", { option: option.label });
                    }}
                    className="focus-ring group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-line/80 bg-slate-50/70 p-4 text-center text-xs font-bold text-ink transition-all hover:border-amber-400 hover:bg-white hover:shadow-md hover:scale-[1.03] active:scale-[0.98]"
                  >
                    <span className="text-3xl transition-transform group-hover:scale-110" aria-hidden>
                      {option.emoji}
                    </span>
                    <span className="group-hover:text-amber-800 transition-colors">
                      {option.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
