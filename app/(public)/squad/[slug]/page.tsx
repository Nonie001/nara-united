import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/shared/Badge";
import { Card, CardBody } from "@/components/shared/Card";
import { getPlayerBySlug } from "@/lib/queries/players";
import { POSITION_LABEL } from "@/components/features/players/PlayerCard";
import { formatDateTH } from "@/lib/utils/date";

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
    <Container className="py-8 sm:py-12 space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-nara-green">
          {player.photo_url ? (
            <Image
              src={player.photo_url}
              alt={player.name_th}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-white/40 text-7xl">
              {player.name_th.slice(0, 1)}
            </div>
          )}
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="gold">{POSITION_LABEL[player.position]}</Badge>
            {player.jersey_number != null ? (
              <span className="font-display text-4xl font-black text-nara-green-dark">
                #{player.jersey_number}
              </span>
            ) : null}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-nara-green-dark">
            {player.name_th}
          </h1>

          <Card>
            <CardBody>
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500">สัญชาติ</dt>
                  <dd className="font-semibold">
                    {player.nationality ?? "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">วันเกิด</dt>
                  <dd className="font-semibold">
                    {player.date_of_birth
                      ? formatDateTH(player.date_of_birth)
                      : "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">ส่วนสูง</dt>
                  <dd className="font-semibold">
                    {player.height_cm ? `${player.height_cm} ซม.` : "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">น้ำหนัก</dt>
                  <dd className="font-semibold">
                    {player.weight_kg ? `${player.weight_kg} กก.` : "-"}
                  </dd>
                </div>
              </dl>
            </CardBody>
          </Card>

          {player.bio_th ? (
            <Card>
              <CardBody>
                <h2 className="font-display text-lg font-bold mb-2">ประวัติ</h2>
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {player.bio_th}
                </p>
              </CardBody>
            </Card>
          ) : null}
        </div>
      </div>

      {stats.length > 0 ? (
        <Card>
          <CardBody>
            <h2 className="font-display text-lg font-bold mb-3">สถิติ</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-3 py-2 text-left">ฤดูกาล</th>
                    <th className="px-3 py-2 text-center">ลงสนาม</th>
                    <th className="px-3 py-2 text-center">ประตู</th>
                    <th className="px-3 py-2 text-center">แอสซิสต์</th>
                    <th className="px-3 py-2 text-center">เหลือง</th>
                    <th className="px-3 py-2 text-center">แดง</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((s) => (
                    <tr key={s.id} className="border-t border-gray-100">
                      <td className="px-3 py-2 font-semibold">{s.season}</td>
                      <td className="px-3 py-2 text-center">{s.appearances}</td>
                      <td className="px-3 py-2 text-center">{s.goals}</td>
                      <td className="px-3 py-2 text-center">{s.assists}</td>
                      <td className="px-3 py-2 text-center">{s.yellow_cards}</td>
                      <td className="px-3 py-2 text-center">{s.red_cards}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      ) : null}
    </Container>
  );
}
