"use client";

import { Printer } from "lucide-react";
import { trackEvent } from "@/data/site";

export default function PrintProfileButton() {
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent("company_profile_print_pdf");
        window.print();
      }}
      className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-amber-400 hover:bg-white/15 print:hidden"
    >
      <Printer className="h-4 w-4 text-amber-400" />
      <span>Save Corporate Profile (PDF)</span>
    </button>
  );
}
