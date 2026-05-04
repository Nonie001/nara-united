import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/shared/Badge";
import { getNewsBySlug } from "@/lib/queries/news";
import { CATEGORY_LABEL } from "@/components/features/news/NewsCard";
import { formatDateTH } from "@/lib/utils/date";
import { ChevronLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = await getNewsBySlug(slug);
  if (!n) return { title: "ไม่พบข่าว" };
  return {
    title: n.title_th,
    description: n.excerpt_th ?? undefined,
    openGraph: {
      title: n.title_th,
      description: n.excerpt_th ?? undefined,
      images: n.cover_url ? [n.cover_url] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  if (!news) notFound();

  return (
    <article className="py-10 sm:py-14">
      <Container className="max-w-3xl">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-nara-ink transition"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          กลับหน้าข่าว
        </Link>

        <div className="mt-5">
          <Badge variant="gold">{CATEGORY_LABEL[news.category]}</Badge>
        </div>
        <h1 className="mt-3 heading-display text-3xl sm:text-5xl font-black text-nara-ink leading-[1.05]">
          {news.title_th}
        </h1>
        <span className="mt-4 block h-[3px] w-12 bg-nara-gold rounded-full" />
        {news.published_at ? (
          <div className="mt-4 text-xs font-semibold tracking-[0.18em] uppercase text-gray-500">
            {formatDateTH(news.published_at, "d MMMM yyyy")}
          </div>
        ) : null}

        {news.cover_url ? (
          <div className="relative aspect-[16/9] mt-7 rounded-xl overflow-hidden border border-gray-200">
            <Image
              src={news.cover_url}
              alt={news.title_th}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        {news.excerpt_th ? (
          <p className="mt-7 text-lg text-nara-ink font-medium leading-relaxed border-l-4 border-nara-gold pl-5">
            {news.excerpt_th}
          </p>
        ) : null}

        {news.content_html ? (
          <div
            className="mt-7 prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-nara-ink prose-a:text-nara-gold-dark prose-a:no-underline hover:prose-a:underline prose-strong:text-nara-ink"
            dangerouslySetInnerHTML={{ __html: news.content_html }}
          />
        ) : null}
      </Container>
    </article>
  );
}
