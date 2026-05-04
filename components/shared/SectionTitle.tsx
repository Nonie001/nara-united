import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function SectionTitle({
  eyebrow,
  title,
  href,
  hrefLabel = "ดูทั้งหมด",
  className,
  invert,
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-4 mb-5 sm:mb-7",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <div
            className={cn(
              "text-[11px] font-bold tracking-[0.3em] uppercase",
              invert ? "text-nara-gold/80" : "text-nara-gold-dark",
            )}
          >
            {eyebrow}
          </div>
        ) : null}
        <h2
          className={cn(
            "heading-display mt-1 text-2xl sm:text-3xl font-black leading-[1]",
            invert ? "text-white" : "text-nara-ink",
          )}
        >
          {title}
        </h2>
        <span className="mt-2.5 block h-[2px] w-10 rounded-full bg-nara-gold" />
      </div>
      {href ? (
        <Link
          href={href}
          className={cn(
            "shrink-0 group inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase",
            invert
              ? "text-nara-gold hover:text-nara-gold-light"
              : "text-nara-ink hover:text-nara-gold-dark",
          )}
        >
          {hrefLabel}
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      ) : null}
    </div>
  );
}
