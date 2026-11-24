import Image from "next/image";
import { Star, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    name: "Kwame Asante",
    role: "Nursing Professional",
    destination: "Manchester, UK 🇬🇧",
    initials: "KA",
    avatarBg: "bg-amber-500",
    image: "/images/Travel Abroad (2).png",
    rating: 5,
    quote:
      "KIA Consult guided me through every step of my UK Skilled Worker visa. From document preparation to interview coaching — I'm now working in Manchester.",
    tag: "UK Skilled Worker Visa",
  },
  {
    name: "Abena Boateng",
    role: "Computer Science Student",
    destination: "Toronto, Canada 🇨🇦",
    initials: "AB",
    avatarBg: "bg-blue-600",
    image: "/images/Student.png",
    rating: 5,
    quote:
      "KIA audited my sponsor bank statement and matched me to a DLI college with a 3-year PGWP pathway. My Canadian study permit was approved in 7 weeks.",
    tag: "Canada Study Permit + PGWP",
  },
  {
    name: "Emmanuel Acheampong",
    role: "Mechanical & Systems Engineer",
    destination: "Berlin, Germany 🇩🇪",
    initials: "EA",
    avatarBg: "bg-emerald-600",
    image: "/images/Germany.png",
    rating: 5,
    quote:
      "The German Chancenkarte process was intimidating. KIA broke it down clearly, audited every certificate twice, and my Opportunity Card was approved on first submission.",
    tag: "Germany Chancenkarte",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
      <div className="pointer-events-none absolute top-0 left-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-blue-400/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span>Verified Client Outcomes</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Real approvals.{" "}
            <span className="gradient-text-gold">Global careers.</span>
          </h2>
        </div>

        {/* Photo-Backed Testimonial Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="photo-card-glow group flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white shadow-lg"
            >
              <div>
                {/* Real Photo Cover */}
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={t.image}
                    alt={`${t.name} — ${t.destination}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="photo-card-img object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/25 to-transparent" />

                  <div className="absolute top-3.5 left-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      <CheckCircle2 className="h-3 w-3" />
                      {t.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-bold text-amber-300">{t.destination}</span>
                    <StarRating count={t.rating} />
                  </div>
                </div>

                {/* Quote Body */}
                <div className="p-6">
                  <blockquote className="text-sm leading-relaxed text-charcoal">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
              </div>

              {/* Footer Attribution */}
              <div className="flex items-center gap-3 border-t border-line/60 bg-slate-50/70 px-6 py-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${t.avatarBg} ring-2 ring-white shadow-sm`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-ink">{t.name}</p>
                  <p className="text-[11px] font-medium text-charcoal-soft">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
