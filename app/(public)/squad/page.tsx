import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import {
  PlayerCard,
  POSITION_LABEL,
} from "@/components/features/players/PlayerCard";
import { listPlayers } from "@/lib/queries/players";
import type { Position } from "@/types/database";

export const metadata: Metadata = {
  title: "รายชื่อนักเตะ",
};

export const revalidate = 300;

const ORDER: Position[] = ["GK", "DF", "MF", "FW"];

export default async function SquadPage() {
  const players = await listPlayers({ activeOnly: true });
  const grouped = ORDER.map((pos) => ({
    pos,
    items: players.filter((p) => p.position === pos),
  }));

  return (
    <Container className="py-8 sm:py-12 space-y-12">
      {grouped.map((g) => (
        <section key={g.pos}>
          <SectionTitle title={POSITION_LABEL[g.pos]} />
          {g.items.length === 0 ? (
            <p className="text-gray-500 text-sm">
              ยังไม่มีนักเตะในตำแหน่งนี้
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {g.items.map((p) => (
                <PlayerCard key={p.id} player={p} />
              ))}
            </div>
          )}
        </section>
      ))}
    </Container>
  );
}
