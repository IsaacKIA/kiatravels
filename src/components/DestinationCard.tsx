import Image from "next/image";
import { ArrowUpRight, Clock, GraduationCap, CheckCircle2 } from "lucide-react";
import type { Destination } from "@/data/study-abroad";
import { buildWhatsAppLink } from "@/data/site";

const destinationVisuals: Record<
  string,
  {
    image: string;
    pswBadge: string;
    badgeColor: string;
    processing: string;
    intake: string;
    perks: string[];
  }
> = {
  uk: {
    image: "/images/University Campus.png",
    pswBadge: "2-Year Graduate Work Visa",
    badgeColor: "bg-amber-500 text-white",
    processing: "3–6 Weeks",
    intake: "Sept & Jan Intakes",
    perks: ["WAEC C6+ English Waiver", "20 hrs/wk Work Rights", "Fast CAS Issuance"],
  },
  canada: {
    image: "/images/University area view.png",
    pswBadge: "Up to 3-Year PGWP",
    badgeColor: "bg-red-600 text-white",
    processing: "6–10 Weeks",
    intake: "Sept, Jan & May",
    perks: ["Direct PR Express Entry Points", "Co-Op Paid Internships", "Spouse Work Options"],
  },
  usa: {
    image: "/images/University.png",
    pswBadge: "3-Year STEM OPT Work",
    badgeColor: "bg-indigo-600 text-white",
    processing: "4–8 Weeks",
    intake: "Fall & Spring",
    perks: ["Partial Merit Scholarships", "F-1 Interview Coaching", "Top Research Campuses"],
  },
};

export default function DestinationCard({ destination }: { destination: Destination }) {
  const visual = destinationVisuals[destination.slug] ?? {
    image: "/images/Study Abroad.png",
    pswBadge: "Post-Study Work Route",
    badgeColor: "bg-blue-600 text-white",
    processing: "4–8 Weeks",
    intake: "Fall & Spring",
    perks: ["English-Taught Degrees", "Part-Time Work Allowed", "Full Visa Support"],
  };

  return (
    <div className="photo-card-glow group flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white shadow-md">
      <div>
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={visual.image}
            alt={destination.country}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="photo-card-img object-cover"
          />
          <div className="photo-card-overlay absolute inset-0" />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold shadow-md ${visual.badgeColor}`}
            >
              {visual.pswBadge}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow-md backdrop-blur-md">
              {destination.flagEmoji}
            </span>
          </div>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
              {visual.intake}
            </p>
            <h3 className="font-display text-2xl font-bold text-white">
              {destination.country}
            </h3>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-2.5 rounded-2xl border border-line/60 bg-slate-50/80 p-3 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-amber-600" />
              <div>
                <p className="text-[10px] font-bold uppercase text-charcoal-soft">Visa Time</p>
                <p className="font-bold text-ink">{visual.processing}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 shrink-0 text-blue-600" />
              <div>
                <p className="text-[10px] font-bold uppercase text-charcoal-soft">Intakes</p>
                <p className="font-bold text-ink">{visual.intake}</p>
              </div>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {visual.perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2 text-xs font-semibold text-charcoal"
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line/60 px-6 py-4">
        <a
          href={buildWhatsAppLink(
            `Hi KIA-Start Up Consult, I'd like guidance on studying in ${destination.country}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3 text-xs font-bold text-white transition-all hover:bg-charcoal"
        >
          <span>Apply for {destination.country}</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
