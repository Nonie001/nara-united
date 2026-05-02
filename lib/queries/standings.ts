import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { Standing } from "@/types/database";

export async function listStandings(season?: string): Promise<Standing[]> {
  if (!isSupabaseConfigured()) return [];
  const sb = await createSupabaseServerClient();
  let q = sb.from("standings").select("*").order("position", { ascending: true });
  if (season) q = q.eq("season", season);
  const { data } = await q;
  return data ?? [];
}

export async function listTopScorers(
  season: string,
  limit = 5
): Promise<Array<{ player_id: string; name_th: string; goals: number }>> {
  if (!isSupabaseConfigured()) return [];
  const sb = await createSupabaseServerClient();
  const { data } = await sb
    .from("player_stats")
    .select("player_id, goals, season, players!inner(name_th)")
    .eq("season", season)
    .order("goals", { ascending: false })
    .limit(limit);
  // The join shape from supabase-js: players is an object
  return (data ?? []).map((r: unknown) => {
    const row = r as { player_id: string; goals: number; players: { name_th: string } };
    return {
      player_id: row.player_id,
      goals: row.goals,
      name_th: row.players?.name_th ?? "",
    };
  });
}
