import Link from "next/link";
import { Card } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";
import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { listMatches } from "@/lib/queries/matches";
import { formatKickoff } from "@/lib/utils/date";
import { deleteMatchAction } from "./actions";

export default async function AdminMatchesList() {
  const matches = await listMatches({ limit: 100 });

  return (
    <div className="space-y-6">
      <PageHeader
        title="การแข่งขัน"
        description={`ทั้งหมด ${matches.length} แมตช์`}
        action={{ href: "/admin/matches/new", label: "+ เพิ่มแมตช์" }}
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-3 py-2">วัน-เวลา</th>
                <th className="px-3 py-2 hidden md:table-cell">รายการ</th>
                <th className="px-3 py-2">คู่แข่ง</th>
                <th className="px-3 py-2 hidden sm:table-cell">H/A</th>
                <th className="px-3 py-2">สกอร์</th>
                <th className="px-3 py-2 hidden sm:table-cell">สถานะ</th>
                <th className="px-3 py-2 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m) => (
                <tr key={m.id} className="border-t border-gray-100">
                  <td className="px-3 py-2 whitespace-nowrap">{formatKickoff(m.kickoff_at)}</td>
                  <td className="px-3 py-2 hidden md:table-cell">{m.competition}</td>
                  <td className="px-3 py-2 font-medium">
                    {m.opponent}
                    <div className="sm:hidden mt-1 flex items-center gap-2 text-xs text-gray-500">
                      <span>{m.is_home ? "เหย้า" : "เยือน"}</span>
                      <Badge
                        variant={
                          m.status === "live"
                            ? "live"
                            : m.status === "finished"
                            ? "ft"
                            : m.status === "upcoming"
                            ? "upcoming"
                            : "default"
                        }
                      >
                        {m.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-3 py-2 hidden sm:table-cell">{m.is_home ? "เหย้า" : "เยือน"}</td>
                  <td className="px-3 py-2 font-bold whitespace-nowrap">
                    {m.status === "finished" || m.status === "live"
                      ? `${m.home_score ?? 0}-${m.away_score ?? 0}`
                      : "-"}
                  </td>
                  <td className="px-3 py-2 hidden sm:table-cell">
                    <Badge
                      variant={
                        m.status === "live"
                          ? "live"
                          : m.status === "finished"
                          ? "ft"
                          : m.status === "upcoming"
                          ? "upcoming"
                          : "default"
                      }
                    >
                      {m.status}
                    </Badge>
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-3">
                      <Link
                        href={`/admin/matches/${m.id}`}
                        className="text-nara-green hover:underline"
                      >
                        แก้ไข
                      </Link>
                      <DeleteButton
                        action={async () => {
                          "use server";
                          await deleteMatchAction(m.id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {matches.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-gray-500">
                    ยังไม่มีแมตช์
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
