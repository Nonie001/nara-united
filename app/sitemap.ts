import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { listMatches } from "@/lib/queries/matches";
import { listPlayers } from "@/lib/queries/players";
import { listNews } from "@/lib/queries/news";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.siteUrl();
  const staticRoutes = [
    "",
    "/fixtures",
    "/squad",
    "/news",
    "/table",
    "/about",
    "/about/history",
    "/about/stadium",
    "/about/staff",
    "/contact",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));

  const [matches, players, news] = await Promise.all([
    listMatches({ limit: 50 }).catch(() => []),
    listPlayers({ activeOnly: true }).catch(() => []),
    listNews({ limit: 50 }).then((r) => r.items).catch(() => []),
  ]);

  return [
    ...staticRoutes,
    ...matches.map((m) => ({
      url: `${base}/fixtures/${m.id}`,
      lastModified: new Date(m.updated_at),
    })),
    ...players.map((p) => ({
      url: `${base}/squad/${p.slug}`,
      lastModified: new Date(p.updated_at),
    })),
    ...news.map((n) => ({
      url: `${base}/news/${n.slug}`,
      lastModified: new Date(n.updated_at),
    })),
  ];
}
