import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Card, CardBody } from "@/components/shared/Card";
import { StandingsTable } from "@/components/features/table/StandingsTable";
import { listStandings, listTopScorers } from "@/lib/queries/standings";

export const metadata: Metadata = { title: "ตารางคะแนน" };
export const revalidate = 60;

const CURRENT_SEASON = "2025-26";

export default async function TablePage() {
  const [standings, topScorers] = await Promise.all([
    listStandings(CURRENT_SEASON),
    listTopScorers(CURRENT_SEASON, 5),
  ]);

  return (
    <Container className="py-8 sm:py-12 space-y-12">
      <section>
        <SectionTitle title={`ตารางคะแนน ${CURRENT_SEASON}`} />
        <StandingsTable rows={standings} />
      </section>

      <section>
        <SectionTitle title="ดาวซัลโว" />
        {topScorers.length === 0 ? (
          <p className="text-gray-500">ยังไม่มีข้อมูล</p>
        ) : (
          <Card>
            <CardBody>
              <ol className="divide-y divide-gray-100">
                {topScorers.map((p, i) => (
                  <li
                    key={p.player_id}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-nara-gold text-nara-green-dark font-bold">
                        {i + 1}
                      </span>
                      <span className="font-medium">{p.name_th}</span>
                    </div>
                    <span className="font-display text-xl font-extrabold text-nara-green-dark">
                      {p.goals}
                    </span>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        )}
      </section>
    </Container>
  );
}
