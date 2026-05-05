import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import type { Match } from "@/types/database";
import { Logo } from "@/components/shared/Logo";
import { Countdown } from "./Countdown";
import { MapPin, ArrowRight, Ticket, Clock } from "lucide-react";

export function MatchHero({ match }: { match: Match | null }) {
  if (!match) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-nara-gold to-transparent"
        />
        <div className="text-[10px] uppercase tracking-[0.3em] text-nara-gold-dark font-bold">
          Next Fixture
        </div>
        <h2 className="heading-display mt-2 text-xl sm:text-2xl text-nara-ink">
          ยังไม่มีโปรแกรมแข่งขันถัดไป
        </h2>
      </div>
    );
  }

  const homeName = match.is_home ? "Nara United" : match.opponent;
  const homeLogo = match.is_home ? "us" : match.opponent_logo_url;
  const awayName = match.is_home ? match.opponent : "Nara United";
  const awayLogo = match.is_home ? match.opponent_logo_url : "us";

  const kickoff = new Date(match.kickoff_at);
  const day = format(kickoff, "d", { locale: th });
  const month = format(kickoff, "MMM", { locale: th });
  const weekday = format(kickoff, "EEEE", { locale: th });
  const time = format(kickoff, "HH:mm", { locale: th });

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-nara-ink via-[#0d1812] to-black text-white shadow-xl">
      {/* decorations */}
      <div aria-hidden className="absolute inset-0 bg-pitch-stripes opacity-40" />
      <div aria-hidden className="absolute inset-0 bg-noise opacity-20" />
      <div
        aria-hidden
        className="absolute -top-24 -right-20 h-56 w-56 rounded-full bg-nara-gold/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 h-56 w-56 rounded-full bg-nara-green/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nara-gold/70 to-transparent"
      />

      {/* Header strip */}
      <div className="relative flex items-center justify-between gap-2 border-b border-white/5 bg-black/30 px-4 py-2.5 sm:px-5">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-nara-gold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nara-gold opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-nara-gold" />
          </span>
          เกมต่อไป
        </span>
        <span className="truncate text-[10px] sm:text-xs text-white/65 tracking-wide">
          {match.competition}
          {match.round ? ` · ${match.round}` : ""}
        </span>
      </div>

      {/* Body */}
      <div className="relative px-4 py-5 sm:px-6 sm:py-6">
        {/* Date hero block */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg border border-nara-gold/30 bg-nara-gold/10 px-3 py-1.5 sm:px-4 sm:py-2 min-w-[64px]">
            <span className="heading-display text-2xl sm:text-3xl font-bold text-nara-gold leading-none">
              {day}
            </span>
            <span className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-widest text-nara-gold/80">
              {month}
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/55">
              {weekday}
            </span>
            <span className="mt-0.5 inline-flex items-center gap-1 text-sm sm:text-base font-bold text-white">
              <Clock className="h-3.5 w-3.5 text-nara-gold" />
              {time} น.
            </span>
          </div>
        </div>

        {/* Teams row */}
        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          <TeamSide name={homeName} logo={homeLogo} />

          <div className="flex flex-col items-center gap-1.5 px-1">
            <span className="heading-display text-2xl sm:text-3xl font-bold text-white/25 tracking-widest leading-none">
              VS
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white/55">
              {match.is_home ? "เหย้า" : "เยือน"}
            </span>
          </div>

          <TeamSide name={awayName} logo={awayLogo} />
        </div>

        {/* Countdown */}
        <div className="mt-5 flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-3">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/40">
            Kick-off in
          </span>
          <Countdown target={match.kickoff_at} />
        </div>

        {/* Venue */}
        {match.venue && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-white/65">
            <MapPin className="h-3.5 w-3.5 text-nara-gold shrink-0" />
            <span className="truncate">{match.venue}</span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:items-stretch">
          <Link
            href={`/fixtures/${match.id}`}
            className="group inline-flex items-center justify-center gap-1.5 rounded-md bg-nara-gold px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-nara-ink hover:bg-nara-gold-light transition sm:flex-1"
          >
            รายละเอียด
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          {match.is_home ? (
            <Link
              href="/tickets"
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-nara-gold/40 bg-nara-gold/5 px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-nara-gold hover:bg-nara-gold/15 transition"
            >
              <Ticket className="h-3.5 w-3.5" />
              ซื้อตั๋ว
            </Link>
          ) : (
            <Link
              href="/fixtures"
              className="inline-flex items-center justify-center rounded-md border border-white/15 px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-white/80 hover:border-nara-gold hover:text-nara-gold transition"
            >
              ทั้งหมด
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function TeamSide({
  name,
  logo,
}: {
  name: string;
  logo: string | null | "us";
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center min-w-0">
      <div className="relative h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 grid place-items-center overflow-hidden ring-1 ring-inset ring-white/5">
        {logo === "us" ? (
          <Logo size="lg" className="!w-11 !h-11 sm:!w-16 sm:!h-16" />
        ) : logo ? (
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain p-2.5"
            sizes="(max-width: 640px) 64px, 96px"
          />
        ) : (
          <span className="heading-display text-lg sm:text-2xl text-white/80">
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <div
        className="heading-display text-[11px] sm:text-sm font-bold leading-tight max-w-full line-clamp-2 px-1"
        title={name}
      >
        {name}
      </div>
    </div>
  );
}
