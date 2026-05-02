import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { Sponsor } from "@/types/database";

export async function listSponsors(): Promise<Sponsor[]> {
  if (!isSupabaseConfigured()) return [];
  const sb = await createSupabaseServerClient();
  const { data } = await sb
    .from("sponsors")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  return data ?? [];
}
