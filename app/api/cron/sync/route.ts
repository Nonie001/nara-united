import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchThaiLeagueStandings } from "@/lib/external/thai-league";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  let secret: string;
  try {
    secret = env.cronSecret();
  } catch {
    return NextResponse.json({ error: "cron disabled" }, { status: 503 });
  }
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const season = url.searchParams.get("season") ?? "2025-26";

  try {
    const rows = await fetchThaiLeagueStandings(season);
    if (rows.length === 0) {
      return NextResponse.json({ ok: true, synced: 0 });
    }
    const sb = createSupabaseAdminClient();
    const payload = rows.map((r) => ({
      ...r,
      season,
      goal_difference: r.goals_for - r.goals_against,
      source: "api" as const,
    }));
    const { error } = await sb
      .from("standings")
      .upsert(payload, { onConflict: "season,team_name" });
    if (error) throw error;
    return NextResponse.json({ ok: true, synced: rows.length, season });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
