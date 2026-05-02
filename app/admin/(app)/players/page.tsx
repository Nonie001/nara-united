import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";
import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { listPlayers } from "@/lib/queries/players";
import { POSITION_LABEL } from "@/components/features/players/PlayerCard";
import { deletePlayerAction } from "./actions";

export default async function AdminPlayersList() {
  const players = await listPlayers({ activeOnly: false });

  return (
    <div className="space-y-6">
      <PageHeader
        title="นักเตะ"
        description={`ทั้งหมด ${players.length} คน`}
        action={{ href: "/admin/players/new", label: "+ เพิ่มนักเตะ" }}
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-3 py-2">รูป</th>
                <th className="px-3 py-2">เบอร์</th>
                <th className="px-3 py-2">ชื่อ</th>
                <th className="px-3 py-2">ตำแหน่ง</th>
                <th className="px-3 py-2">สถานะ</th>
                <th className="px-3 py-2 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-3 py-2">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                      {p.photo_url ? (
                        <Image
                          src={p.photo_url}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-3 py-2 font-bold">
                    {p.jersey_number ?? "-"}
                  </td>
                  <td className="px-3 py-2 font-medium">{p.name_th}</td>
                  <td className="px-3 py-2">{POSITION_LABEL[p.position]}</td>
                  <td className="px-3 py-2">
                    <Badge variant={p.is_active ? "win" : "default"}>
                      {p.is_active ? "active" : "inactive"}
                    </Badge>
                  </td>
                  <td className="px-3 py-2 text-right space-x-3">
                    <Link
                      href={`/admin/players/${p.id}`}
                      className="text-nara-green hover:underline"
                    >
                      แก้ไข
                    </Link>
                    <DeleteButton
                      action={async () => {
                        "use server";
                        await deletePlayerAction(p.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
              {players.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center text-gray-500">
                    ยังไม่มีนักเตะ
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
