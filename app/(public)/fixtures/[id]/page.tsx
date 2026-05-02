import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/shared/Badge";
import { Card, CardBody } from "@/components/shared/Card";
import { getMatchById } from "@/lib/queries/matches";
import { formatKickoff } from "@/lib/utils/date";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const m = await getMatchById(id);
  if (!m) return { title: "ไม่พบแมตช์" };
  return {
    title: `Nara United vs ${m.opponent}`,
    description: `${m.competition} • ${formatKickoff(m.kickoff_at)}`,
  };
}

export default async function MatchDetailPage({ params }: Props) {
  const { id } = await params;
  const match = await getMatchById(id);
  if (!match) notFound();

  const score =
    match.home_score != null && match.away_score != null
      ? match.is_home
        ? `${match.home_score} - ${match.away_score}`
        : `${match.away_score} - ${match.home_score}`
      : "vs";

  return (
    <Container className="py-8 sm:py-12 space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-nara-green to-nara-green-dark text-white p-8 text-center">
        <Badge variant="gold" className="mb-3">
          {match.competition}
        </Badge>
        <div className="grid grid-cols-3 items-center gap-4 mt-4">
          <div className="font-display text-xl font-bold">
            {match.is_home ? "Nara United" : match.opponent}
          </div>
          <div className="font-display text-5xl sm:text-7xl font-black">
            {score}
          </div>
          <div className="font-display text-xl font-bold">
            {match.is_home ? match.opponent : "Nara United"}
          </div>
        </div>
        <div className="mt-6 text-sm text-white/80">
          {formatKickoff(match.kickoff_at)} • {match.venue ?? "-"}
        </div>
      </div>

      <Card>
        <CardBody>
          <h2 className="font-display text-xl font-bold mb-3">
            ข้อมูลการแข่งขัน
          </h2>
          <dl className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-gray-500">รายการ</dt>
              <dd className="font-medium">{match.competition}</dd>
            </div>
            <div>
              <dt className="text-gray-500">ฤดูกาล</dt>
              <dd className="font-medium">{match.season}</dd>
            </div>
            <div>
              <dt className="text-gray-500">สถานที่</dt>
              <dd className="font-medium">{match.venue ?? "-"}</dd>
            </div>
            <div>
              <dt className="text-gray-500">สถานะ</dt>
              <dd className="font-medium">{match.status}</dd>
            </div>
            {match.attendance != null ? (
              <div>
                <dt className="text-gray-500">ผู้เข้าชม</dt>
                <dd className="font-medium">
                  {match.attendance.toLocaleString("th-TH")}
                </dd>
              </div>
            ) : null}
          </dl>
        </CardBody>
      </Card>
    </Container>
  );
}
