"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";

const StandingsSchema = z.object({
  season: z.string().min(1),
  team_name: z.string().min(1).max(120),
  position: z.coerce.number().int().min(1).max(100),
  played: z.coerce.number().int().min(0).default(0),
  won: z.coerce.number().int().min(0).default(0),
  drawn: z.coerce.number().int().min(0).default(0),
  lost: z.coerce.number().int().min(0).default(0),
  goals_for: z.coerce.number().int().min(0).default(0),
  goals_against: z.coerce.number().int().min(0).default(0),
  points: z.coerce.number().int().min(0).default(0),
  source: z.enum(["manual", "api"]).default("manual"),
});

function parse(fd: FormData) {
  const get = (k: string) => {
    const v = fd.get(k);
    return v === null || v === "" ? null : (v as string);
  };
  const data = StandingsSchema.parse({
    season: get("season"),
    team_name: get("team_name"),
    position: get("position"),
    played: get("played") ?? 0,
    won: get("won") ?? 0,
    drawn: get("drawn") ?? 0,
    lost: get("lost") ?? 0,
    goals_for: get("goals_for") ?? 0,
    goals_against: get("goals_against") ?? 0,
    points: get("points") ?? 0,
    source: (get("source") as "manual" | "api") ?? "manual",
  });
  return { ...data, goal_difference: data.goals_for - data.goals_against };
}

export async function upsertStandingAction(fd: FormData) {
  await requireAdminSession();
  const data = parse(fd);
  const sb = await createSupabaseServerClient();
  const { error } = await sb
    .from("standings")
    .upsert(data, { onConflict: "season,team_name" });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/standings");
  revalidatePath("/table");
  redirect("/admin/standings");
}

export async function deleteStandingAction(id: string) {
  await requireAdminSession();
  const sb = await createSupabaseServerClient();
  const { error } = await sb.from("standings").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/standings");
  revalidatePath("/table");
}

export async function syncStandingsFromApiAction(_season: string) {
  await requireAdminSession();
  // Stub — wire to lib/external/thai-league.ts in Phase 5
  throw new Error("ยังไม่ได้เปิดใช้การ sync จาก Thai League API");
}
