import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import type { News, NewsCategory } from "@/types/database";

export async function listNews(opts?: {
  category?: NewsCategory;
  limit?: number;
  page?: number;
  publishedOnly?: boolean;
}): Promise<{ items: News[]; total: number }> {
  if (!isSupabaseConfigured()) return { items: [], total: 0 };
  const sb = await createSupabaseServerClient();
  const limit = opts?.limit ?? 9;
  const page = opts?.page ?? 1;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let q = sb
    .from("news")
    .select("*", { count: "exact" })
    .order("published_at", { ascending: false, nullsFirst: false });
  if (opts?.publishedOnly !== false) q = q.eq("is_published", true);
  if (opts?.category) q = q.eq("category", opts.category);

  const { data, count } = await q.range(from, to);
  return { items: data ?? [], total: count ?? 0 };
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  if (!isSupabaseConfigured()) return null;
  const sb = await createSupabaseServerClient();
  const { data } = await sb
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  return data ?? null;
}
