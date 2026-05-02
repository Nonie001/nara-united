"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";

const SponsorSchema = z.object({
  name: z.string().min(1).max(200),
  logo_url: z.string().url(),
  website_url: z.string().url().optional().nullable(),
  tier: z.enum(["main", "official", "partner"]),
  display_order: z.coerce.number().int().min(0).default(0),
  is_active: z.coerce.boolean().optional(),
});

function parse(fd: FormData) {
  const get = (k: string) => {
    const v = fd.get(k);
    return v === null || v === "" ? null : (v as string);
  };
  return SponsorSchema.parse({
    name: get("name"),
    logo_url: get("logo_url"),
    website_url: get("website_url"),
    tier: get("tier") as "main" | "official" | "partner",
    display_order: get("display_order") ?? 0,
    is_active: get("is_active") === "on" || get("is_active") === "true",
  });
}

export async function upsertSponsorAction(id: string | null, fd: FormData) {
  await requireAdminSession();
  const data = parse(fd);
  const sb = await createSupabaseServerClient();
  const { error } = id
    ? await sb.from("sponsors").update(data).eq("id", id)
    : await sb.from("sponsors").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/sponsors");
  revalidatePath("/");
}

export async function deleteSponsorAction(id: string) {
  await requireAdminSession();
  const sb = await createSupabaseServerClient();
  const { error } = await sb.from("sponsors").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/sponsors");
  revalidatePath("/");
}
