"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";

const MatchSchema = z.object({
  season: z.string().min(1).max(20),
  competition: z.string().min(1).max(100),
  round: z.string().max(50).optional().nullable(),
  kickoff_at: z.string().min(1, "กรุณาระบุวันและเวลาแข่ง"),
  opponent: z.string().min(1).max(120),
  opponent_logo_url: z.string().url().optional().nullable(),
  is_home: z.coerce.boolean(),
  stadium_id: z.string().uuid().optional().nullable(),
  status: z.enum(["upcoming", "live", "finished", "postponed"]),
  home_score: z.coerce.number().int().min(0).optional().nullable(),
  away_score: z.coerce.number().int().min(0).optional().nullable(),
  external_id: z.string().max(100).optional().nullable(),
});

function parse(fd: FormData) {
  const get = (k: string) => {
    const v = fd.get(k);
    return v === null || v === "" ? null : (v as string);
  };
  return MatchSchema.parse({
    season: get("season"),
    competition: get("competition"),
    round: get("round"),
    kickoff_at: new Date(get("kickoff_at") as string).toISOString(),
    opponent: get("opponent"),
    opponent_logo_url: get("opponent_logo_url"),
    is_home: get("is_home") === "true" || get("is_home") === "on",
    stadium_id: get("stadium_id"),
    status: get("status") as "upcoming" | "live" | "finished" | "postponed",
    home_score: get("home_score"),
    away_score: get("away_score"),
    external_id: get("external_id"),
  });
}

export async function createMatchAction(fd: FormData) {
  await requireAdminSession();
  const data = parse(fd);
  const sb = await createSupabaseServerClient();
  const { error } = await sb.from("matches").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/matches");
  revalidatePath("/fixtures");
  revalidatePath("/");
  redirect("/admin/matches");
}

export async function updateMatchAction(id: string, fd: FormData) {
  await requireAdminSession();
  const data = parse(fd);
  const sb = await createSupabaseServerClient();
  const { error } = await sb.from("matches").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/matches");
  revalidatePath(`/fixtures/${id}`);
  revalidatePath("/fixtures");
  revalidatePath("/");
  redirect("/admin/matches");
}

export async function deleteMatchAction(id: string) {
  await requireAdminSession();
  const sb = await createSupabaseServerClient();
  const { error } = await sb.from("matches").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/matches");
  revalidatePath("/fixtures");
}
