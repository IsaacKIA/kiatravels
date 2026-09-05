import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Kwame Asante",
    role: "Nursing Professional",
    destination: "United Kingdom 🇬🇧",
    initials: "KA",
    avatarBg: "bg-amber-500",
    rating: 5,
    quote:
      "KIA Consult guided me through every step of my NHS skilled worker visa. From document preparation to interview coaching — they were with me the entire journey. I'm now working in Manchester and loving it!",
    tag: "Skilled Worker Visa",
    tagColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    name: "Abena Boateng",
    role: "Computer Science Student",
    destination: "Canada 🇨🇦",
    initials: "AB",
    avatarBg: "bg-blue-600",
    rating: 5,
    quote:
      "I didn't believe studying in Canada was possible for me financially. KIA showed me DLI scholarship opportunities I had no idea about. I got my study permit in 7 weeks and started at Humber College last September.",
    tag: "Study Permit + PGWP",
    tagColor: "bg-blue-50 text-blue-800 border-blue-200",
  },
  {
    name: "Emmanuel Acheampong",
    role: "Software Engineer",
    destination: "Germany 🇩🇪",
    initials: "EA",
    avatarBg: "bg-emerald-600",
    rating: 5,
    quote:
      "The Chancenkarte process was complex and intimidating. KIA broke it down into clear steps, reviewed all my documents twice, and I got my Opportunity Card approved on the first submission. 100% worth it.",
    tag: "Chancenkarte Approved",
    tagColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
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
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24 sm:py-32">
      {/* Ambient background */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-blue-400/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            Real Success Stories
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Lives changed.{" "}
            <span className="gradient-text-gold">Dreams achieved.</span>
          </h2>
          <p className="mt-4 text-base text-charcoal-soft leading-relaxed">
            Over 500 Ghanaians have trusted KIA Consult to guide them to the world&rsquo;s most
            sought-after destinations. Here are a few of their stories.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              className="testimonial-card relative flex flex-col justify-between p-7"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-6 text-slate-100">
                <Quote className="h-10 w-10 fill-slate-100 text-slate-100" />
              </div>

              <div>
                {/* Rating */}
                <StarRating count={t.rating} />

                {/* Quote text */}
                <blockquote className="mt-4 text-sm leading-relaxed text-charcoal-soft">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${t.avatarBg} ring-2 ring-white shadow-sm`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{t.name}</p>
                    <p className="text-[11px] text-charcoal-soft">{t.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-charcoal-soft uppercase tracking-wider">
                    Now in
                  </p>
                  <p className="text-xs font-semibold text-charcoal">{t.destination}</p>
                </div>
              </div>

              {/* Pathway tag */}
              <div className="mt-3">
                <span
                  className={`inline-block rounded-md border px-2.5 py-1 text-[10px] font-bold ${t.tagColor}`}
                >
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate trust signal */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-line/60 bg-white/70 px-8 py-6 backdrop-blur-sm">
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-ink">4.9<span className="text-amber-500">/5</span></p>
            <div className="mt-1 flex justify-center">
              <StarRating count={5} />
            </div>
            <p className="mt-1 text-[11px] text-charcoal-soft">Average Rating</p>
          </div>
          <div className="hidden h-10 w-px bg-line sm:block" />
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-ink">500<span className="text-amber-500">+</span></p>
            <p className="mt-1 text-[11px] text-charcoal-soft">Applicants Guided</p>
          </div>
          <div className="hidden h-10 w-px bg-line sm:block" />
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-ink">98<span className="text-amber-500">%</span></p>
            <p className="mt-1 text-[11px] text-charcoal-soft">Guidance Accuracy</p>
          </div>
          <div className="hidden h-10 w-px bg-line sm:block" />
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-ink">15<span className="text-amber-500">+</span></p>
            <p className="mt-1 text-[11px] text-charcoal-soft">Countries Served</p>
          </div>
        </div>
      </div>
    </section>
  );
}
