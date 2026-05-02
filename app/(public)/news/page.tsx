import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { NewsCard } from "@/components/features/news/NewsCard";
import { listNews } from "@/lib/queries/news";

export const metadata: Metadata = { title: "ข่าวสาร" };
export const revalidate = 60;

export default async function NewsListPage() {
  const { items } = await listNews({ limit: 18 });

  return (
    <Container className="py-8 sm:py-12">
      <SectionTitle title="ข่าวสารทั้งหมด" />
      {items.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีข่าวสาร</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
      )}
    </Container>
  );
}
