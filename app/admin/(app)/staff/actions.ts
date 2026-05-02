"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";

const StaffSchema = z.object({
  name_th: z.string().min(1).max(200),
  role_th: z.string().min(1).max(120),
  bio_th: z.string().max(2000).optional().nullable(),
  photo_url: z.string().url().optional().nullable(),
  display_order: z.coerce.number().int().min(0).default(0),
  is_active: z.coerce.boolean().optional(),
});

function parse(fd: FormData) {
  const get = (k: string) => {
    const v = fd.get(k);
    return v === null || v === "" ? null : (v as string);
  };
  return StaffSchema.parse({
    name_th: get("name_th"),
    role_th: get("role_th"),
    bio_th: get("bio_th"),
    photo_url: get("photo_url"),
    display_order: get("display_order") ?? 0,
    is_active: get("is_active") === "on" || get("is_active") === "true",
  });
}

export async function upsertStaffAction(id: string | null, fd: FormData) {
  await requireAdminSession();
  const data = parse(fd);
  const sb = await createSupabaseServerClient();
  const { error } = id
    ? await sb.from("staff").update(data).eq("id", id)
    : await sb.from("staff").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/staff");
  revalidatePath("/about/staff");
}

export async function deleteStaffAction(id: string) {
  await requireAdminSession();
  const sb = await createSupabaseServerClient();
  const { error } = await sb.from("staff").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/staff");
  revalidatePath("/about/staff");
}
