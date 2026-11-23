import { CheckCircle2, AlertCircle } from "lucide-react";
import { whatWeDo, whatWeDontControl } from "@/data/site";

export default function TrustTransparency() {
  return (
    <section className="border-y border-line bg-gradient-to-b from-[#fafaf9] to-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-800">
            Statutory Governance &amp; Transparency
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Good guidance starts with honesty.
          </h2>
          <p className="mt-4 text-base text-charcoal-soft">
            We operate with complete clarity. Here is exactly what our advisory and documentation
            team executes versus statutory decisions reserved for sovereign authorities.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* What We Execute Card */}
          <div className="glass-card-hover relative rounded-2xl border border-emerald-200/80 bg-white p-7 shadow-md sm:p-9">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  Our Accountable Scope
                </span>
                <h3 className="font-display text-2xl font-bold text-ink">
                  What KIA-Start Up Consult Executes
                </h3>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
              </span>
            </div>

            <ul className="mt-6 space-y-3.5">
              {whatWeDo.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-charcoal"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Don't Control Card */}
          <div className="glass-card-hover relative rounded-2xl border border-rose-200/80 bg-white p-7 shadow-md sm:p-9">
            <div className="flex items-center justify-between border-b border-rose-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
                  Sovereign &amp; Institutional Prerogatives
                </span>
                <h3 className="font-display text-2xl font-bold text-ink">
                  What No Agency Can Guarantee
                </h3>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                <AlertCircle className="h-5 w-5" />
              </span>
            </div>

            <ul className="mt-6 space-y-3.5">
              {whatWeDontControl.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-charcoal"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-xl border border-rose-200/50 bg-rose-50/60 p-4 text-xs leading-relaxed text-rose-900">
              <strong>Compliance Notice:</strong> We do not sell visas or forge bank statements and
              certificates. Our value lies in building legitimate, verified files that withstand
              strict consular and employer scrutiny.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
