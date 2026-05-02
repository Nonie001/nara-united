import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/shared/Badge";
import { getNewsBySlug } from "@/lib/queries/news";
import { CATEGORY_LABEL } from "@/components/features/news/NewsCard";
import { formatDateTH } from "@/lib/utils/date";

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
    <article className="py-8 sm:py-12">
      <Container className="max-w-3xl">
        <Badge variant="gold">{CATEGORY_LABEL[news.category]}</Badge>
        <h1 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold text-nara-green-dark leading-tight">
          {news.title_th}
        </h1>
        {news.published_at ? (
          <div className="mt-3 text-sm text-gray-500">
            {formatDateTH(news.published_at, "d MMMM yyyy")}
          </div>
        ) : null}

        {news.cover_url ? (
          <div className="relative aspect-[16/9] mt-6 rounded-xl overflow-hidden">
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
          <p className="mt-6 text-lg text-gray-700 font-medium leading-relaxed">
            {news.excerpt_th}
          </p>
        ) : null}

        {news.content_html ? (
          <div
            className="mt-6 prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-nara-green-dark prose-a:text-nara-green"
            dangerouslySetInnerHTML={{ __html: news.content_html }}
          />
        ) : null}
      </Container>
    </article>
  );
}
