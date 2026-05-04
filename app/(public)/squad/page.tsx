import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  PlayerCard,
  POSITION_LABEL,
} from "@/components/features/players/PlayerCard";
import { listPlayers } from "@/lib/queries/players";
import type { Position } from "@/types/database";

export const metadata: Metadata = { title: "รายชื่อนักเตะ" };

export const revalidate = 300;

const ORDER: Position[] = ["GK", "DF", "MF", "FW"];
const POSITION_SHORT: Record<Position, string> = {
  GK: "GK",
  DF: "DF",
  MF: "MF",
  FW: "FW",
};

export default async function SquadPage() {
  const players = await listPlayers({ activeOnly: true });
  const grouped = ORDER.map((pos) => ({
    pos,
    items: players.filter((p) => p.position === pos),
  }));

  return (
    <>
      <PageHeader
        eyebrow="First Team"
        title="รายชื่อนักเตะ"
        description={`นักเตะทีมชุดใหญ่ฤดูกาลปัจจุบันทั้งหมด ${players.length} คน`}
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "รายชื่อนักเตะ" }]}
      />

      <Container className="py-12 sm:py-16 space-y-14">
        {grouped.map((g) => (
          <section key={g.pos}>
            <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-4">
              <div>
                <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-nara-gold-dark">
                  Position · {POSITION_SHORT[g.pos]}
                </div>
                <h2 className="heading-display mt-1 text-2xl sm:text-3xl text-nara-ink">
                  {POSITION_LABEL[g.pos]}
                </h2>
              </div>
              <div className="text-sm text-gray-500">{g.items.length} คน</div>
            </div>
            {g.items.length === 0 ? (
              <p className="text-gray-500 text-sm">ยังไม่มีนักเตะในตำแหน่งนี้</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {g.items.map((p) => (
                  <PlayerCard key={p.id} player={p} />
                ))}
              </div>
            )}
          </section>
        ))}
      </Container>
    </>
  );
}
