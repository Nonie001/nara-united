"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { slugify } from "@/lib/utils/slug";

const PlayerSchema = z.object({
  name_th: z.string().min(1, "กรุณากรอกชื่อ").max(200),
  jersey_number: z.coerce.number().int().min(0).max(99).optional().nullable(),
  position: z.enum(["GK", "DF", "MF", "FW"]),
  date_of_birth: z.string().optional().nullable(),
  nationality: z.string().max(100).optional().nullable(),
  height_cm: z.coerce.number().int().min(100).max(250).optional().nullable(),
  weight_kg: z.coerce.number().int().min(40).max(150).optional().nullable(),
  bio_th: z.string().max(5000).optional().nullable(),
  photo_url: z.string().url().optional().nullable(),
  is_active: z.coerce.boolean().optional(),
});

function parseFormData(formData: FormData) {
  const get = (k: string) => {
    const v = formData.get(k);
    return v === null || v === "" ? null : (v as string);
  };
  return PlayerSchema.parse({
    name_th: get("name_th"),
    jersey_number: get("jersey_number"),
    position: get("position"),
    date_of_birth: get("date_of_birth"),
    nationality: get("nationality"),
    height_cm: get("height_cm"),
    weight_kg: get("weight_kg"),
    bio_th: get("bio_th"),
    photo_url: get("photo_url"),
    is_active: get("is_active") === "on" || get("is_active") === "true",
  });
}

export async function createPlayerAction(formData: FormData) {
  await requireAdminSession();
  const data = parseFormData(formData);
  const sb = await createSupabaseServerClient();
  const slug = slugify(data.name_th) + "-" + Date.now().toString(36);
  const { error } = await sb.from("players").insert({ ...data, slug });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/players");
  revalidatePath("/squad");
  redirect("/admin/players");
}

export async function updatePlayerAction(id: string, formData: FormData) {
  await requireAdminSession();
  const data = parseFormData(formData);
  const sb = await createSupabaseServerClient();
  const { error } = await sb.from("players").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/players");
  revalidatePath(`/squad`);
  redirect("/admin/players");
}

export async function deletePlayerAction(id: string) {
  await requireAdminSession();
  const sb = await createSupabaseServerClient();
  const { error } = await sb.from("players").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/players");
  revalidatePath("/squad");
}
