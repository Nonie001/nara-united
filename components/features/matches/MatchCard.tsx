import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/shared/Badge";
import { Logo } from "@/components/shared/Logo";
import type { Match } from "@/types/database";
import { formatKickoff } from "@/lib/utils/date";

function score(m: Match) {
  if (m.home_score == null || m.away_score == null) return null;
  return m.is_home
    ? `${m.home_score} - ${m.away_score}`
    : `${m.away_score} - ${m.home_score}`;
}

function outcome(m: Match): "win" | "draw" | "loss" | null {
  if (m.status !== "finished" || m.home_score == null || m.away_score == null)
    return null;
  const ours = m.is_home ? m.home_score : m.away_score;
  const theirs = m.is_home ? m.away_score : m.home_score;
  if (ours > theirs) return "win";
  if (ours < theirs) return "loss";
  return "draw";
}

const statusToBadge = (s: Match["status"]) =>
  s === "live"
    ? { variant: "live" as const, label: "LIVE" }
    : s === "finished"
      ? { variant: "ft" as const, label: "FT" }
      : { variant: "upcoming" as const, label: "เร็วๆ นี้" };

export function MatchCard({ match }: { match: Match }) {
  const s = score(match);
  const o = outcome(match);
  const status = statusToBadge(match.status);

  const stripe =
    o === "win"
      ? "bg-win"
      : o === "loss"
        ? "bg-loss"
        : o === "draw"
          ? "bg-draw"
          : "bg-nara-gold";

  return (
    <Link
      href={`/fixtures/${match.id}`}
      className="card-lift group block relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${stripe} transition-all duration-300 group-hover:w-1.5`} />
      <div className="p-5 pl-6">
        <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500 mb-4">
          <span className="truncate">
            {match.competition}
            {match.round ? ` · ${match.round}` : ""}
          </span>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <TeamMini
            name={match.is_home ? "Nara United" : match.opponent}
            us={match.is_home}
            logo={match.is_home ? null : match.opponent_logo_url}
            align="end"
          />
          <div className="heading-display text-2xl sm:text-3xl font-black text-nara-ink px-2 transition-transform duration-300 group-hover:scale-105">
            {s ?? "vs"}
          </div>
          <TeamMini
            name={match.is_home ? match.opponent : "Nara United"}
            us={!match.is_home}
            logo={match.is_home ? match.opponent_logo_url : null}
            align="start"
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
          <span>{formatKickoff(match.kickoff_at)}</span>
          {o ? (
            <Badge variant={o}>
              {o === "win" ? "ชนะ" : o === "loss" ? "แพ้" : "เสมอ"}
            </Badge>
          ) : null}
        </div>
        {match.venue ? (
          <div className="mt-1 text-xs text-gray-500 truncate">
            📍 {match.venue}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

function TeamMini({
  name,
  us,
  logo,
  align,
}: {
  name: string;
  us: boolean;
  logo: string | null;
  align: "start" | "end";
}) {
  return (
    <div
      className={`flex items-center gap-2 ${align === "end" ? "justify-end" : "justify-start"}`}
    >
      {align === "end" ? (
        <span className="font-bold text-sm truncate text-nara-ink">{name}</span>
      ) : null}
      <span className="grid h-9 w-9 place-items-center rounded-full bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
        {us ? (
          <Logo size="sm" />
        ) : logo ? (
          <Image src={logo} alt="" width={28} height={28} className="object-contain" />
        ) : (
          <span className="text-xs font-bold text-gray-500">
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </span>
      {align === "start" ? (
        <span className="font-bold text-sm truncate text-nara-ink">{name}</span>
      ) : null}
    </div>
  );
}
