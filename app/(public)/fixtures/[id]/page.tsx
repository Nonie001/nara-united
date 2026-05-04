import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/shared/Badge";
import { Card, CardBody } from "@/components/shared/Card";
import { getMatchById } from "@/lib/queries/matches";
import { formatKickoff } from "@/lib/utils/date";
import { ChevronLeft } from "lucide-react";

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
    <>
      <PageHeader
        eyebrow={match.competition}
        title={`Nara United vs ${match.opponent}`}
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "โปรแกรม / ผล", href: "/fixtures" },
          { label: `vs ${match.opponent}` },
        ]}
      />

      <Container className="py-10 sm:py-14 space-y-6">
        <Link
          href="/fixtures"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-nara-ink transition"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          กลับโปรแกรมแข่งขัน
        </Link>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-nara-ink via-[#101a13] to-black text-white p-8 sm:p-12 text-center border border-white/10 shadow-xl">
          <div aria-hidden className="absolute inset-0 bg-pitch-stripes opacity-50" />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nara-gold/70 to-transparent"
          />
          <div className="relative">
            <Badge variant="gold" className="mb-4">
              {match.competition}
            </Badge>
            <div className="grid grid-cols-3 items-center gap-4 mt-6">
              <div className="heading-display text-lg sm:text-2xl">
                {match.is_home ? "Nara United" : match.opponent}
              </div>
              <div className="heading-display text-5xl sm:text-7xl font-black tracking-wider">
                {score}
              </div>
              <div className="heading-display text-lg sm:text-2xl">
                {match.is_home ? match.opponent : "Nara United"}
              </div>
            </div>
            <div className="mt-7 text-xs sm:text-sm text-white/75 tracking-wide">
              {formatKickoff(match.kickoff_at)} • {match.venue ?? "-"}
            </div>
          </div>
        </div>

        <Card>
          <CardBody>
            <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase text-nara-gold-dark">
              ข้อมูลการแข่งขัน
            </h2>
            <span className="mt-2 block h-[2px] w-10 bg-nara-gold rounded-full" />
            <dl className="mt-5 grid sm:grid-cols-2 gap-5 text-sm">
              <Fact label="รายการ" value={match.competition} />
              <Fact label="ฤดูกาล" value={match.season} />
              <Fact label="สถานที่" value={match.venue ?? "-"} />
              <Fact label="สถานะ" value={match.status} />
              {match.attendance != null ? (
                <Fact
                  label="ผู้เข้าชม"
                  value={match.attendance.toLocaleString("th-TH")}
                />
              ) : null}
            </dl>
          </CardBody>
        </Card>
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
