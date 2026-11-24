import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

type Cta = { label: string; href: string; external?: boolean };

function resolveHeroVisual(kicker?: string): { image: string; badge: string; caption: string } {
  const k = (kicker ?? "").toLowerCase();
  if (k.includes("study")) {
    return {
      image: "/images/Study Abroad.png",
      badge: "UK • Canada • USA • EU",
      caption: "2–3 Year Post-Study Work Routes",
    };
  }
  if (k.includes("work") || k.includes("job")) {
    return {
      image: "/images/work abroad.png",
      badge: "Europe & GCC Placements",
      caption: "Verified Employer Work Permits",
    };
  }
  if (k.includes("travel") || k.includes("dmc") || k.includes("tour")) {
    return {
      image: "/images/Visit Ghana.png",
      badge: "Outbound & Visit Ghana DMC",
      caption: "Heritage Circuits & Global Holidays",
    };
  }
  if (k.includes("visa") || k.includes("consular")) {
    return {
      image: "/images/visa.png",
      badge: "98% Dossier Accuracy",
      caption: "Embassy-Compliant Preparation",
    };
  }
  if (k.includes("flight") || k.includes("aviation")) {
    return {
      image: "/images/flight boarding.png",
      badge: "Kotoka Intl (ACC) Hub",
      caption: "Student, Group & Direct Fares",
    };
  }
  if (k.includes("insight") || k.includes("knowledge")) {
    return {
      image: "/images/University Campus.png",
      badge: "Advisory & Regulatory Guides",
      caption: "Scam-Free Legal Pathways",
    };
  }
  if (k.includes("about")) {
    return {
      image: "/images/Ghana Culture.png",
      badge: "Ghana HQ & UK Desk",
      caption: "Trusted Global Mobility Partner",
    };
  }
  if (k.includes("contact")) {
    return {
      image: "/images/Airport view.png",
      badge: "Mon–Sat • 8AM – 6PM GMT",
      caption: "Direct Ghana & UK Advisory Desks",
    };
  }
  return {
    image: "/images/engineer.png",
    badge: "KIA-Start Up Consult",
    caption: "Work, Study, Visas & Global Travel",
  };
}

export default function PageHero({
  kicker,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
}: {
  kicker?: string;
  title: string;
  description: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  image?: string;
}) {
  const visual = resolveHeroVisual(kicker);
  const heroImg = image ?? visual.image;

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-[#0b0f17] py-14 text-white sm:py-20">
      {/* Subtle Luxury Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Column (7 cols): Crisp Typography & Actions */}
          <div className="lg:col-span-7">
            {kicker && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span>{kicker}</span>
              </div>
            )}

            <h1 className="font-display text-[2.3rem] leading-[1.08] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.3rem]">
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {description}
            </p>

            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    target={primaryCta.external ? "_blank" : undefined}
                    rel={primaryCta.external ? "noopener noreferrer" : undefined}
                    className="focus-ring group inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-bold tracking-wide text-slate-950 shadow-lg transition-all hover:scale-[1.02] hover:bg-amber-300 active:scale-95"
                  >
                    <span>{primaryCta.label}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    target={secondaryCta.external ? "_blank" : undefined}
                    rel={secondaryCta.external ? "noopener noreferrer" : undefined}
                    className="focus-ring inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold tracking-wide text-white backdrop-blur-sm transition-all hover:border-amber-400/60 hover:bg-white/10"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Framed Luxury Visual Card */}
          <div className="lg:col-span-5">
            <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900 shadow-2xl">
              <div className="relative h-60 w-full sm:h-68">
                <Image
                  src={heroImg}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17]/90 via-[#0b0f17]/20 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-md">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    {visual.badge}
                  </span>
                </div>

                <div className="absolute bottom-4 left-5 right-5">
                  <p className="font-display text-lg font-bold text-white">{visual.caption}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
