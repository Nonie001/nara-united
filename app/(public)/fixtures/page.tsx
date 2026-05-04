import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { MatchCard } from "@/components/features/matches/MatchCard";
import { listMatches } from "@/lib/queries/matches";

export const metadata: Metadata = { title: "โปรแกรมและผลการแข่งขัน" };
export const revalidate = 60;

export default async function FixturesPage() {
  const [upcoming, results] = await Promise.all([
    listMatches({ status: "upcoming" }),
    listMatches({ status: "finished", limit: 20 }),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Fixtures · Results"
        title="โปรแกรมและผลการแข่งขัน"
        description="ติดตามโปรแกรมแข่งขันถัดไปและผลการแข่งขันล่าสุดของสโมสร"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "โปรแกรม / ผล" }]}
      />

      <Container className="py-12 sm:py-16 space-y-14">
        <section>
          <SectionHead
            eyebrow="Upcoming"
            title="โปรแกรมถัดไป"
            count={upcoming.length}
          />
          {upcoming.length === 0 ? (
            <EmptyState text="ไม่มีโปรแกรมที่กำหนดไว้" />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          )}
        </section>

        <section>
          <SectionHead
            eyebrow="Results"
            title="ผลการแข่งขันที่ผ่านมา"
            count={results.length}
          />
          {results.length === 0 ? (
            <EmptyState text="ยังไม่มีผลการแข่งขัน" />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          )}
        </section>
      </Container>
    </>
  );
}

function SectionHead({
  eyebrow,
  title,
  count,
}: {
  eyebrow: string;
  title: string;
  count: number;
}) {
  return (
    <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-4">
      <div>
        <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-nara-gold-dark">
          {eyebrow}
        </div>
        <h2 className="heading-display mt-1 text-2xl sm:text-3xl text-nara-ink">
          {title}
        </h2>
      </div>
      <div className="text-sm text-gray-500">{count} แมตช์</div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
      {text}
    </div>
  );
}
