"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/auth/session";

const RoleSchema = z.enum(["admin", "editor", "viewer"]);

export async function updateUserRoleAction(userId: string, role: string) {
  await requireAdminSession(["admin"]);
  const parsed = RoleSchema.parse(role);
  const sb = createSupabaseAdminClient();
  const { error } = await sb
    .from("profiles")
    .update({ role: parsed })
    .eq("id", userId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/users");
}
