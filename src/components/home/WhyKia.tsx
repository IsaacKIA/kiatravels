import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const showcaseTiles = [
  {
    title: "Skilled Trades & Engineering",
    subtitle: "Electricians, Plumbers, Welders & Engineers",
    image: "/images/electrical works.png",
    href: "/work-abroad",
    span: "lg:col-span-2",
  },
  {
    title: "Campus & Group Study",
    subtitle: "UK, Canada, USA & EU Universities",
    image: "/images/Group study.png",
    href: "/study-abroad",
    span: "lg:col-span-1",
  },
  {
    title: "Direct Aviation & Boarding",
    subtitle: "Student, Workforce & Corporate Flights",
    image: "/images/flight boarding.png",
    href: "/flight-booking",
    span: "lg:col-span-1",
  },
  {
    title: "Ghana Heritage & Global Tours",
    subtitle: "Dubai Holidays & Inbound Ghana DMC",
    image: "/images/Ghana Culture.png",
    href: "/travel-tourism",
    span: "lg:col-span-2",
  },
];

export default function WhyKia() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            The KIA Advantage
          </span>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Real people. Real placements.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-bold text-charcoal">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Ghana HQ &amp; UK Desk
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            End-to-End Visa &amp; Flights
          </span>
        </div>
      </div>

      {/* 4-Tile Photographic Bento Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {showcaseTiles.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className={`photo-card-glow group relative h-72 overflow-hidden rounded-3xl border border-line shadow-lg ${tile.span}`}
          >
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              className="photo-card-img object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/25 to-transparent" />

            <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-md backdrop-blur-md transition-transform group-hover:scale-110 group-hover:bg-amber-400">
              <ArrowUpRight className="h-5 w-5" />
            </div>

            <div className="absolute bottom-5 left-6 right-6 text-white">
              <p className="text-xs font-semibold text-amber-300">{tile.subtitle}</p>
              <h3 className="mt-0.5 font-display text-2xl font-bold text-white sm:text-3xl">
                {tile.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
