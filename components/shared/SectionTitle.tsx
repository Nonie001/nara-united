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
        "flex items-end justify-between gap-4 mb-6 sm:mb-8",
        className,
      )}
    >
      <div>
        {eyebrow ? (
          <div
            className={cn(
              "text-[11px] font-bold tracking-[0.3em] uppercase",
              invert ? "text-nara-gold/80" : "text-nara-green",
            )}
          >
            {eyebrow}
          </div>
        ) : null}
        <h2
          className={cn(
            "heading-display mt-1 text-3xl sm:text-4xl font-black",
            invert ? "text-white" : "text-nara-green-deeper",
          )}
        >
          {title}
        </h2>
        <span className="divider-gold mt-3 block transition-all duration-500 hover:w-24" />
      </div>
      {href ? (
        <Link
          href={href}
          className={cn(
            "shrink-0 group inline-flex items-center gap-2 text-sm font-bold tracking-wide uppercase",
            invert
              ? "text-nara-gold hover:text-nara-gold-light"
              : "text-nara-green hover:text-nara-green-dark",
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
