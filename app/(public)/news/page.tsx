import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { NewsCard } from "@/components/features/news/NewsCard";
import { listNews } from "@/lib/queries/news";

export const metadata: Metadata = { title: "ข่าวสาร" };
export const revalidate = 60;

export default async function NewsListPage() {
  const { items } = await listNews({ limit: 18 });

  return (
    <>
      <PageHeader
        eyebrow="Latest News"
        title="ข่าวสารทั้งหมด"
        description="อัปเดตข่าวสาร แมตช์เดย์ และความเคลื่อนไหวล่าสุดจาก Nara United"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "ข่าวสาร" }]}
      />

      <Container className="py-12 sm:py-16">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
            ยังไม่มีข่าวสารในขณะนี้
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
