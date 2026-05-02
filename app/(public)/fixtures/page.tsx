import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MatchCard } from "@/components/features/matches/MatchCard";
import { listMatches } from "@/lib/queries/matches";

export const metadata: Metadata = {
  title: "โปรแกรมและผลการแข่งขัน",
};

export const revalidate = 60;

export default async function FixturesPage() {
  const [upcoming, results] = await Promise.all([
    listMatches({ status: "upcoming" }),
    listMatches({ status: "finished", limit: 20 }),
  ]);

  return (
    <Container className="py-8 sm:py-12 space-y-12">
      <section>
        <SectionTitle title="โปรแกรมถัดไป" />
        {upcoming.length === 0 ? (
          <p className="text-gray-500">ไม่มีโปรแกรมที่กำหนดไว้</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionTitle title="ผลการแข่งขันที่ผ่านมา" />
        {results.length === 0 ? (
          <p className="text-gray-500">ยังไม่มีผลการแข่งขัน</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}
