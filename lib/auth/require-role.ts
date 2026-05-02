import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { Role } from "@/types/database";

export async function getCurrentUserWithRole() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .eq("id", user.id)
    .single();

  return profile ?? null;
}

export async function requireRole(allowed: Role[]) {
  const profile = await getCurrentUserWithRole();
  if (!profile || !allowed.includes(profile.role)) {
    throw new Error("Unauthorized");
  }
  return profile;
}
