import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/shared/Badge";
import { Card, CardBody } from "@/components/shared/Card";
import { getPlayerBySlug } from "@/lib/queries/players";
import { POSITION_LABEL } from "@/components/features/players/PlayerCard";
import { formatDateTH } from "@/lib/utils/date";
import { ChevronLeft } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPlayerBySlug(slug);
  if (!data) return { title: "ไม่พบนักเตะ" };
  return { title: data.player.name_th };
}

export default async function PlayerDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getPlayerBySlug(slug);
  if (!data) notFound();
  const { player, stats } = data;

  return (
    <>
      <PageHeader
        eyebrow={POSITION_LABEL[player.position]}
        title={player.name_th}
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "รายชื่อนักเตะ", href: "/squad" },
          { label: player.name_th },
        ]}
      />

      <Container className="py-10 sm:py-14 space-y-8">
        <Link
          href="/squad"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-nara-ink transition"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          กลับรายชื่อนักเตะ
        </Link>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-gray-900 via-nara-ink to-black border border-gray-200">
            {player.photo_url ? (
              <Image
                src={player.photo_url}
                alt={player.name_th}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-white/30 heading-display text-7xl">
                {player.name_th.slice(0, 1)}
              </div>
            )}
            {player.jersey_number != null ? (
              <div className="absolute top-3 left-3 grid h-12 w-12 place-items-center rounded-md bg-nara-gold text-nara-ink font-black heading-display text-xl shadow-lg">
                {player.jersey_number}
              </div>
            ) : null}
          </div>

          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <Badge variant="gold">{POSITION_LABEL[player.position]}</Badge>
              {player.jersey_number != null ? (
                <span className="heading-display text-3xl text-nara-gold-dark">
                  #{player.jersey_number}
                </span>
              ) : null}
            </div>
            <h1 className="heading-display text-4xl sm:text-5xl font-black text-nara-ink">
              {player.name_th}
            </h1>

            <Card>
              <CardBody>
                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase text-nara-gold-dark mb-4">
                  ข้อมูลนักเตะ
                </h2>
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <Fact label="สัญชาติ" value={player.nationality ?? "-"} />
                  <Fact
                    label="วันเกิด"
                    value={
                      player.date_of_birth
                        ? formatDateTH(player.date_of_birth)
                        : "-"
                    }
                  />
                  <Fact
                    label="ส่วนสูง"
                    value={player.height_cm ? `${player.height_cm} ซม.` : "-"}
                  />
                  <Fact
                    label="น้ำหนัก"
                    value={player.weight_kg ? `${player.weight_kg} กก.` : "-"}
                  />
                </dl>
              </CardBody>
            </Card>

            {player.bio_th ? (
              <Card>
                <CardBody>
                  <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase text-nara-gold-dark mb-3">
                    ประวัติ
                  </h2>
                  <p className="text-sm leading-relaxed whitespace-pre-line text-gray-700">
                    {player.bio_th}
                  </p>
                </CardBody>
              </Card>
            ) : null}
          </div>
        </div>

        {stats.length > 0 ? (
          <Card>
            <CardBody className="!p-0">
              <div className="px-5 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase text-nara-gold-dark">
                  สถิติการเล่น
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-nara-ink text-white text-[11px] uppercase tracking-[0.15em]">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold">ฤดูกาล</th>
                      <th className="px-4 py-3 text-center font-bold">ลงสนาม</th>
                      <th className="px-4 py-3 text-center font-bold">ประตู</th>
                      <th className="px-4 py-3 text-center font-bold">แอสซิสต์</th>
                      <th className="px-4 py-3 text-center font-bold">เหลือง</th>
                      <th className="px-4 py-3 text-center font-bold">แดง</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.map((s) => (
                      <tr
                        key={s.id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 font-semibold text-nara-ink">
                          {s.season}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-700">
                          {s.appearances}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-700">
                          {s.goals}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-700">
                          {s.assists}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-700">
                          {s.yellow_cards}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-700">
                          {s.red_cards}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        ) : null}
      </Container>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-nara-ink">{value}</dd>
    </div>
  );
}
