import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils/cn";

type Crumb = { label: string; href?: string };

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-gray-200 bg-white",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,#fdf6e3_0%,#ffffff_100%)] opacity-50"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-nara-gold/60 to-transparent"
      />
      <Container className="relative py-8 sm:py-10 lg:py-12">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav
            aria-label="breadcrumb"
            className="flex items-center gap-1 text-xs text-gray-500 mb-3"
          >
            {breadcrumbs.map((c, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <span key={`${c.label}-${i}`} className="inline-flex items-center gap-1">
                  {c.href && !last ? (
                    <Link
                      href={c.href}
                      className="hover:text-nara-gold-dark transition"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className={last ? "text-nara-ink font-semibold" : ""}>
                      {c.label}
                    </span>
                  )}
                  {!last ? (
                    <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
                  ) : null}
                </span>
              );
            })}
          </nav>
        ) : null}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            {eyebrow ? (
              <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-nara-gold-dark">
                {eyebrow}
              </div>
            ) : null}
            <h1 className="heading-display mt-1.5 text-3xl sm:text-4xl lg:text-5xl font-black text-nara-ink leading-[1]">
              {title}
            </h1>
            <span className="mt-3 block h-[3px] w-12 bg-nara-gold rounded-full" />
            {description ? (
              <p className="mt-4 max-w-2xl text-sm sm:text-base text-gray-600 leading-relaxed">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {actions}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
