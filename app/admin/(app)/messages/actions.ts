"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";

export async function markMessageReadAction(id: string, isRead: boolean) {
  await requireAdminSession();
  const sb = await createSupabaseServerClient();
  const { error } = await sb
    .from("contact_messages")
    .update({ is_read: isRead })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessageAction(id: string) {
  await requireAdminSession(["admin"]);
  const sb = await createSupabaseServerClient();
  const { error } = await sb.from("contact_messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
