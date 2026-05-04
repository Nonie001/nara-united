import Image from "next/image";
import Link from "next/link";
import type { Player } from "@/types/database";

const POSITION_LABEL: Record<Player["position"], string> = {
  GK: "ผู้รักษาประตู",
  DF: "กองหลัง",
  MF: "กองกลาง",
  FW: "กองหน้า",
};

const POSITION_SHORT: Record<Player["position"], string> = {
  GK: "GK",
  DF: "DF",
  MF: "MF",
  FW: "FW",
};

export function PlayerCard({ player }: { player: Player }) {
  return (
    <Link href={`/squad/${player.slug}`} className="group block">
      <div className="card-lift relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-b from-gray-900 via-nara-ink to-black aspect-[3/4] shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
        {/* subtle pattern */}
        <div aria-hidden className="absolute inset-0 bg-pitch-stripes opacity-40" />

        {/* huge jersey number watermark */}
        {player.jersey_number != null ? (
          <div
            aria-hidden
            className="absolute -right-4 -bottom-6 heading-display text-[180px] sm:text-[220px] leading-none font-black text-white/[0.05] select-none transition-transform duration-700 group-hover:scale-110 group-hover:text-nara-gold/[0.12]"
          >
            {player.jersey_number}
          </div>
        ) : null}

        {/* photo */}
        {player.photo_url ? (
          <Image
            src={player.photo_url}
            alt={player.name_th}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover object-top transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-white/25 heading-display text-7xl">
            {player.name_th.slice(0, 1)}
          </div>
        )}

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

        {/* top-left: jersey badge */}
        {player.jersey_number != null ? (
          <div className="absolute top-3 left-3 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-md bg-nara-gold text-nara-ink font-black heading-display text-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
            {player.jersey_number}
          </div>
        ) : null}

        {/* top-right: position chip */}
        <div className="absolute top-3 right-3 rounded-md border border-white/15 bg-black/50 backdrop-blur px-2 py-1 text-[10px] font-bold tracking-[0.2em] text-nara-gold">
          {POSITION_SHORT[player.position]}
        </div>

        {/* bottom: name */}
        <div className="absolute bottom-0 inset-x-0 p-4 text-white">
          <div className="text-[10px] tracking-[0.3em] uppercase text-nara-gold/85">
            {POSITION_LABEL[player.position]}
          </div>
          <div className="mt-1 heading-display text-xl sm:text-2xl font-bold leading-tight truncate">
            {player.name_th}
          </div>
          <div className="mt-2 h-0.5 w-8 bg-nara-gold transition-all duration-300 group-hover:w-16" />
        </div>
      </div>
    </Link>
  );
}

export { POSITION_LABEL };
