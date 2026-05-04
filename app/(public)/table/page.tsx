import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
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
    <>
      <PageHeader
        eyebrow={`Season ${CURRENT_SEASON}`}
        title="ตารางคะแนน"
        description="ตารางคะแนน สถิติ และดาวซัลโวประจำฤดูกาลปัจจุบัน"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "ตารางคะแนน" }]}
      />

      <Container className="py-12 sm:py-16 space-y-14">
        <section>
          <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-4">
            <div>
              <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-nara-gold-dark">
                League Table
              </div>
              <h2 className="heading-display mt-1 text-2xl sm:text-3xl text-nara-ink">
                ตารางคะแนน {CURRENT_SEASON}
              </h2>
            </div>
          </div>
          <StandingsTable rows={standings} />
        </section>

        <section>
          <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-4">
            <div>
              <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-nara-gold-dark">
                Top Scorers
              </div>
              <h2 className="heading-display mt-1 text-2xl sm:text-3xl text-nara-ink">
                ดาวซัลโว
              </h2>
            </div>
          </div>
          {topScorers.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
              ยังไม่มีข้อมูลดาวซัลโว
            </div>
          ) : (
            <Card>
              <CardBody className="!p-0">
                <ol className="divide-y divide-gray-100">
                  {topScorers.map((p, i) => (
                    <li
                      key={p.player_id}
                      className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span
                          className={
                            i === 0
                              ? "grid h-9 w-9 place-items-center rounded-md bg-nara-gold text-nara-ink heading-display text-lg shadow-sm"
                              : "grid h-9 w-9 place-items-center rounded-md bg-gray-100 text-nara-ink heading-display text-lg"
                          }
                        >
                          {i + 1}
                        </span>
                        <span className="font-semibold text-nara-ink truncate">
                          {p.name_th}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="heading-display text-2xl font-black text-nara-ink">
                          {p.goals}
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
                          ประตู
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardBody>
            </Card>
          )}
        </section>
      </Container>
    </>
  );
}
