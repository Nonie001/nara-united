import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { Match } from "@/types/database";

export async function getNextMatch(): Promise<Match | null> {
  if (!isSupabaseConfigured()) return null;
  const sb = await createSupabaseServerClient();
  const { data } = await sb
    .from("matches")
    .select("*")
    .in("status", ["upcoming", "live"])
    .order("kickoff_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return data ?? null;
}

export async function getLatestResult(): Promise<Match | null> {
  if (!isSupabaseConfigured()) return null;
  const sb = await createSupabaseServerClient();
  const { data } = await sb
    .from("matches")
    .select("*")
    .eq("status", "finished")
    .order("kickoff_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ?? null;
}

export async function listMatches(opts?: {
  season?: string;
  competition?: string;
  status?: Match["status"];
  limit?: number;
}): Promise<Match[]> {
  if (!isSupabaseConfigured()) return [];
  const sb = await createSupabaseServerClient();
  let q = sb.from("matches").select("*").order("kickoff_at", { ascending: false });
  if (opts?.season) q = q.eq("season", opts.season);
  if (opts?.competition) q = q.eq("competition", opts.competition);
  if (opts?.status) q = q.eq("status", opts.status);
  if (opts?.limit) q = q.limit(opts.limit);
  const { data } = await q;
  return data ?? [];
}

export async function getMatchById(id: string): Promise<Match | null> {
  if (!isSupabaseConfigured()) return null;
  const sb = await createSupabaseServerClient();
  const { data } = await sb
    .from("matches")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data ?? null;
}

export async function listSeasons(): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  const sb = await createSupabaseServerClient();
  const { data } = await sb
    .from("matches")
    .select("season")
    .order("season", { ascending: false });
  return Array.from(new Set((data ?? []).map((r) => r.season)));
}
