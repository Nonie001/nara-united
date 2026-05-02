"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { slugify } from "@/lib/utils/slug";

const NewsSchema = z.object({
  title_th: z.string().min(3).max(300),
  slug: z.string().max(300).optional().nullable(),
  category: z.enum([
    "match",
    "transfer",
    "community",
    "announcement",
    "interview",
  ]),
  excerpt_th: z.string().max(500).optional().nullable(),
  cover_url: z.string().url().optional().nullable(),
  content_json: z.string().optional().nullable(),
  content_html: z.string().optional().nullable(),
  is_published: z.coerce.boolean().optional(),
});

function parse(fd: FormData) {
  const get = (k: string) => {
    const v = fd.get(k);
    return v === null || v === "" ? null : (v as string);
  };
  const data = NewsSchema.parse({
    title_th: get("title_th"),
    slug: get("slug"),
    category: get("category"),
    excerpt_th: get("excerpt_th"),
    cover_url: get("cover_url"),
    content_json: get("content_json"),
    content_html: get("content_html"),
    is_published: get("is_published") === "on" || get("is_published") === "true",
  });
  return {
    ...data,
    slug: data.slug && data.slug.length > 0 ? data.slug : slugify(data.title_th),
    content_json: data.content_json ? JSON.parse(data.content_json) : null,
  };
}

export async function createNewsAction(fd: FormData) {
  const profile = await requireAdminSession();
  const data = parse(fd);
  const sb = await createSupabaseServerClient();
  const { error } = await sb.from("news").insert({
    ...data,
    author_id: profile.id,
    published_at: data.is_published ? new Date().toISOString() : null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/news");
  revalidatePath("/news");
  redirect("/admin/news");
}

export async function updateNewsAction(id: string, fd: FormData) {
  await requireAdminSession();
  const data = parse(fd);
  const sb = await createSupabaseServerClient();

  // Determine published_at flip
  const { data: existing } = await sb
    .from("news")
    .select("is_published, published_at")
    .eq("id", id)
    .maybeSingle();

  const update: Record<string, unknown> = { ...data };
  if (data.is_published && !existing?.is_published) {
    update.published_at = new Date().toISOString();
  }

  const { error } = await sb.from("news").update(update).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/news");
  revalidatePath(`/news/${data.slug}`);
  revalidatePath("/news");
  redirect("/admin/news");
}

export async function deleteNewsAction(id: string) {
  await requireAdminSession();
  const sb = await createSupabaseServerClient();
  const { error } = await sb.from("news").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/news");
  revalidatePath("/news");
}
