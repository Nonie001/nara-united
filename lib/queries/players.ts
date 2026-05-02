import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { Player, PlayerStats, Position } from "@/types/database";

export async function listPlayers(opts?: {
  position?: Position;
  activeOnly?: boolean;
}): Promise<Player[]> {
  if (!isSupabaseConfigured()) return [];
  const sb = await createSupabaseServerClient();
  let q = sb.from("players").select("*").order("jersey_number", {
    ascending: true,
    nullsFirst: false,
  });
  if (opts?.activeOnly !== false) q = q.eq("is_active", true);
  if (opts?.position) q = q.eq("position", opts.position);
  const { data } = await q;
  return data ?? [];
}

export async function getPlayerBySlug(
  slug: string
): Promise<{ player: Player; stats: PlayerStats[] } | null> {
  if (!isSupabaseConfigured()) return null;
  const sb = await createSupabaseServerClient();
  const { data: player } = await sb
    .from("players")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!player) return null;
  const { data: stats } = await sb
    .from("player_stats")
    .select("*")
    .eq("player_id", player.id)
    .order("season", { ascending: false });
  return { player, stats: stats ?? [] };
}
