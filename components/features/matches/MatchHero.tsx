import Image from "next/image";
import Link from "next/link";
import type { Match } from "@/types/database";
import { formatKickoff } from "@/lib/utils/date";
import { Logo } from "@/components/shared/Logo";
import { Countdown } from "./Countdown";
import { Calendar, MapPin, Trophy } from "lucide-react";

export function MatchHero({ match }: { match: Match | null }) {
  if (!match) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-nara-green-dark/40 bg-gradient-to-br from-nara-green via-nara-green-dark to-nara-green-deeper text-white p-10 text-center">
        <div aria-hidden className="absolute inset-0 bg-pitch-stripes" />
        <div aria-hidden className="absolute inset-0 bg-noise opacity-50" />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.3em] text-nara-gold">
            Next Fixture
          </div>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">
            ยังไม่มีโปรแกรมแข่งขันถัดไป
          </h2>
          <p className="mt-2 text-white/70">โปรดติดตามการประกาศจากสโมสร</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-nara-green-deeper via-nara-green-dark to-nara-black text-white shadow-2xl shadow-nara-green-deeper/40">
      <div aria-hidden className="absolute inset-0 bg-pitch-stripes" />
      <div aria-hidden className="absolute inset-0 bg-noise opacity-40" />
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-nara-gold/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-nara-green/40 blur-3xl"
      />

      <div className="relative p-6 sm:p-10 lg:p-12">
        {/* Top meta */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-nara-gold/40 bg-nara-gold/10 px-3 py-1 text-[11px] font-bold tracking-[0.3em] uppercase text-nara-gold">
            <Trophy className="h-3 w-3" />
            เกมต่อไป
          </div>
          <div className="text-xs sm:text-sm text-white/70 inline-flex items-center gap-2">
            <Calendar className="h-4 w-4 text-nara-gold" />
            {formatKickoff(match.kickoff_at)}
          </div>
        </div>

        {/* Competition name */}
        <div className="mt-2 text-center text-[11px] sm:text-xs tracking-[0.3em] uppercase text-white/60">
          {match.competition}
          {match.round ? ` · ${match.round}` : ""}
        </div>

        {/* Teams */}
        <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8">
          {/* Home (us if is_home, else opponent) */}
          <TeamSide
            name={match.is_home ? "Nara United" : match.opponent}
            logo={match.is_home ? "us" : match.opponent_logo_url}
            home
          />

          <div className="text-center">
            <div className="heading-display text-3xl sm:text-5xl text-white/40 tracking-widest">
              VS
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
              {match.is_home ? "เหย้า" : "เยือน"}
            </div>
          </div>

          <TeamSide
            name={match.is_home ? match.opponent : "Nara United"}
            logo={match.is_home ? match.opponent_logo_url : "us"}
          />
        </div>

        {/* Countdown */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="text-[10px] tracking-[0.4em] uppercase text-white/50">
            Kick-off in
          </div>
          <Countdown target={match.kickoff_at} />
        </div>

        {/* Footer info */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-6">
          {match.venue ? (
            <div className="inline-flex items-center gap-2 text-sm text-white/75">
              <MapPin className="h-4 w-4 text-nara-gold" />
              {match.venue}
            </div>
          ) : <span />}
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/fixtures/${match.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-nara-gold px-5 py-2.5 text-sm font-bold text-nara-green-deeper hover:bg-nara-gold-light transition shine-on-hover"
            >
              รายละเอียดแมตช์ →
            </Link>
            <Link
              href="/fixtures"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/85 hover:border-nara-gold hover:text-nara-gold transition"
            >
              โปรแกรมทั้งหมด
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
  home,
}: {
  name: string;
  logo: string | null | "us";
  home?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center text-center ${home ? "" : ""}`}>
      <div className="relative h-20 w-20 sm:h-28 sm:w-28">
        <div
          aria-hidden
          className="absolute inset-0 rounded-full bg-white/5 backdrop-blur border border-white/10"
        />
        <div className="relative h-full w-full grid place-items-center p-2">
          {logo === "us" ? (
            <Logo size="xl" className="!w-full !h-full" />
          ) : logo ? (
            <Image
              src={logo}
              alt={name}
              fill
              className="object-contain p-3"
              sizes="112px"
            />
          ) : (
            <span className="heading-display text-3xl text-white/80">
              {name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 heading-display text-base sm:text-xl font-bold tracking-wide max-w-[140px] truncate">
        {name}
      </div>
    </div>
  );
}
