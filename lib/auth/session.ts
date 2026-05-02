import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { Role } from "@/types/database";

export type SessionProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: Role;
};

export async function getSessionProfile(): Promise<SessionProfile | null> {
  if (!isSupabaseConfigured()) return null;
  const sb = await createSupabaseServerClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) return null;
  const { data } = await sb
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .maybeSingle();
  return (data as SessionProfile | null) ?? null;
}

export async function requireAdminSession(allowed: Role[] = ["admin", "editor"]) {
  const profile = await getSessionProfile();
  if (!profile) redirect("/admin/login");
  if (!allowed.includes(profile.role)) {
    redirect("/admin/login?error=forbidden");
  }
  return profile!;
}
