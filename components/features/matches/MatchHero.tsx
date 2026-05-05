import Image from "next/image";
import Link from "next/link";
import type { Match } from "@/types/database";
import { formatKickoff } from "@/lib/utils/date";
import { Logo } from "@/components/shared/Logo";
import { Countdown } from "./Countdown";
import { Calendar, MapPin, Trophy, ArrowRight } from "lucide-react";

export function MatchHero({ match }: { match: Match | null }) {
  if (!match) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 sm:p-10 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-nara-gold to-transparent"
        />
        <div className="text-[11px] uppercase tracking-[0.3em] text-nara-gold-dark font-bold">
          Next Fixture
        </div>
        <h2 className="heading-display mt-3 text-2xl sm:text-4xl text-nara-ink">
          ยังไม่มีโปรแกรมแข่งขันถัดไป
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          โปรดติดตามการประกาศจากสโมสร
        </p>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-nara-ink via-[#101a13] to-black text-white shadow-xl">
      <div aria-hidden className="absolute inset-0 bg-pitch-stripes opacity-60" />
      <div aria-hidden className="absolute inset-0 bg-noise opacity-30" />
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-nara-gold/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nara-gold/70 to-transparent"
      />

      <div className="relative p-4 sm:p-8 lg:p-12">
        {/* Top meta — centered stack on mobile */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-1.5 rounded-md border border-nara-gold/40 bg-nara-gold/10 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-nara-gold">
            <Trophy className="h-3 w-3" />
            เกมต่อไป
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/70">
            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-nara-gold shrink-0" />
            <span className="truncate">{formatKickoff(match.kickoff_at)}</span>
          </div>
        </div>

        {/* Competition name */}
        <div className="mt-3 sm:mt-2 text-center text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/55">
          {match.competition}
          {match.round ? ` · ${match.round}` : ""}
        </div>

        {/* Teams */}
        <div className="mt-6 sm:mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-8">
          <TeamSide
            name={match.is_home ? "Nara United" : match.opponent}
            logo={match.is_home ? "us" : match.opponent_logo_url}
          />

          <div className="text-center px-1">
            <div className="heading-display text-2xl sm:text-5xl text-white/30 tracking-widest">
              VS
            </div>
            <div className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/40">
              {match.is_home ? "เหย้า" : "เยือน"}
            </div>
          </div>

          <TeamSide
            name={match.is_home ? match.opponent : "Nara United"}
            logo={match.is_home ? match.opponent_logo_url : "us"}
          />
        </div>

        {/* Countdown */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3 sm:gap-4">
          <div className="text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/45">
            Kick-off in
          </div>
          <Countdown target={match.kickoff_at} />
        </div>

        {/* Footer info */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-5 sm:pt-6">
          {match.venue ? (
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/75 min-w-0">
              <MapPin className="h-4 w-4 text-nara-gold shrink-0" />
              <span className="truncate">{match.venue}</span>
            </div>
          ) : <span className="hidden sm:block" />}
          <div className="grid w-full max-w-xs grid-cols-2 gap-2 sm:w-auto sm:max-w-none sm:flex sm:flex-wrap">
            <Link
              href={`/fixtures/${match.id}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-nara-gold px-3 sm:px-5 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-nara-ink hover:bg-nara-gold-light transition"
            >
              รายละเอียด
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/fixtures"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-3 sm:px-5 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-white/85 hover:border-nara-gold hover:text-nara-gold transition"
            >
              ทั้งหมด
            </Link>
          </div>
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
    <div className="flex flex-col items-center text-center min-w-0">
      <div className="relative h-16 w-16 sm:h-28 sm:w-28">
        <div
          aria-hidden
          className="absolute inset-0 rounded-full bg-white/5 backdrop-blur border border-white/10"
        />
        <div className="relative h-full w-full grid place-items-center p-1.5 sm:p-2">
          {logo === "us" ? (
            <Logo size="xl" className="!w-full !h-full" />
          ) : logo ? (
            <Image
              src={logo}
              alt={name}
              fill
              className="object-contain p-2 sm:p-3"
              sizes="(max-width: 640px) 64px, 112px"
            />
          ) : (
            <span className="heading-display text-xl sm:text-3xl text-white/80">
              {name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
      </div>
      <div className="mt-2 sm:mt-3 heading-display text-xs sm:text-xl font-bold tracking-wide max-w-full truncate w-full px-1">
        {name}
      </div>
    </div>
  );
}
