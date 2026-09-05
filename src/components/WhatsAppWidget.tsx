"use client";

import { useState } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { buildWhatsAppLink, whatsappMenuOptions, trackEvent } from "@/data/site";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with KIA-Start Up Consult on WhatsApp"
          className="w-[320px] overflow-hidden rounded-2xl border border-line/80 bg-white shadow-2xl backdrop-blur-xl"
        >
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 px-5 py-4 text-white">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-200">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-radar absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Online &bull; Instant Advisory
              </span>
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            </div>
            <p className="mt-1 font-display text-base font-bold leading-snug">
              Welcome to KIA Consult 👋
            </p>
            <p className="mt-0.5 text-xs text-emerald-100">
              Select a category to start chatting with an advisor directly:
            </p>
          </div>

          <ul className="divide-y divide-line/60 max-h-[360px] overflow-y-auto">
            {whatsappMenuOptions.map((option) => (
              <li key={option.label}>
                <a
                  href={buildWhatsAppLink(option.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("whatsapp_click", { location: "widget_menu", topic: option.label })
                  }
                  className="focus-ring flex items-center gap-3 px-4 py-3 text-xs font-semibold text-charcoal transition-colors hover:bg-emerald-50/60 hover:text-emerald-950"
                >
                  <span className="text-base" aria-hidden>{option.emoji}</span>
                  <span>{option.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative">
        {/* Pulsing ring indicator */}
        {!open && (
          <span className="pulse-radar pointer-events-none absolute -inset-1 rounded-full bg-emerald-400/50" />
        )}

        <button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            if (!open) trackEvent("whatsapp_click", { location: "floating_button" });
          }}
          aria-expanded={open}
          aria-label={open ? "Close WhatsApp menu" : "Chat on WhatsApp"}
          className="focus-ring relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all hover:scale-110 active:scale-95"
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
