import { Inbox } from "lucide-react";
import Link from "next/link";

export default function EmptyState({
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-sm border border-dashed border-line bg-white px-6 py-16 text-center">
      <Inbox className="h-8 w-8 text-charcoal-soft" aria-hidden />
      <h3 className="mt-4 font-display text-lg text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-charcoal-soft">{description}</p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="focus-ring mt-6 inline-flex items-center justify-center rounded-sm bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-deep"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
