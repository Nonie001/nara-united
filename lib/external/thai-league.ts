import "server-only";
import { env } from "@/lib/env";

export type ThaiLeagueStandingRow = {
  position: number;
  team_name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  points: number;
};

/**
 * Stub fetcher. Replace `path` and parsing logic when integrating with the
 * actual Thai League API. Reads base URL + bearer token from env.
 */
export async function fetchThaiLeagueStandings(
  season: string
): Promise<ThaiLeagueStandingRow[]> {
  const base = env.thaiLeagueApiBase();
  const key = env.thaiLeagueApiKey();
  const url = `${base}/standings?season=${encodeURIComponent(season)}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${key}` },
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Thai League API error: ${res.status}`);
  }
  const data = (await res.json()) as { standings?: ThaiLeagueStandingRow[] };
  return data.standings ?? [];
}
