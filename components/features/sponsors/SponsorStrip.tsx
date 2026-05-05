import Image from "next/image";
import type { Sponsor } from "@/types/database";

export function SponsorStrip({ sponsors }: { sponsors: Sponsor[] }) {
  if (sponsors.length === 0) return null;

  const items = [...sponsors, ...sponsors];

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white py-7 sm:py-10 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nara-gold/60 to-transparent"
      />
      <div className="text-center mb-7">
        <div className="text-[11px] font-bold tracking-[0.4em] uppercase text-nara-gold-dark">
          Official Partners
        </div>
        <h3 className="heading-display mt-1.5 text-2xl text-nara-ink">
          พาร์ทเนอร์ของเรา
        </h3>
        <span className="mt-2 inline-block h-[2px] w-10 rounded-full bg-nara-gold" />
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10"
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10"
        />

        <div className="flex w-max items-center gap-6 sm:gap-10 lg:gap-12 animate-marquee">
          {items.map((s, i) => {
            const inner = s.logo_url ? (
              <Image
                src={s.logo_url}
                alt={s.name}
                width={140}
                height={70}
                className="object-contain h-9 sm:h-12 w-auto opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition"
              />
            ) : (
              <span className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm font-semibold whitespace-nowrap">
                {s.name}
              </span>
            );
            const key = `${s.id}-${i}`;
            return s.website_url ? (
              <a
                key={key}
                href={s.website_url}
                target="_blank"
                rel="noopener"
                className="shrink-0"
              >
                {inner}
              </a>
            ) : (
              <div key={key} className="shrink-0">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
