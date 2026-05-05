import Link from "next/link";
import { Card } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";
import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { listNews } from "@/lib/queries/news";
import { CATEGORY_LABEL } from "@/components/features/news/NewsCard";
import { formatDateTH } from "@/lib/utils/date";
import { deleteNewsAction } from "./actions";

export default async function AdminNewsList() {
  const { items, total } = await listNews({ limit: 100, publishedOnly: false });

  return (
    <div className="space-y-6">
      <PageHeader
        title="ข่าวสาร"
        description={`ทั้งหมด ${total} ข่าว`}
        action={{ href: "/admin/news/new", label: "+ เขียนข่าวใหม่" }}
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-3 py-2">หัวข้อ</th>
                <th className="px-3 py-2 hidden md:table-cell">หมวดหมู่</th>
                <th className="px-3 py-2">สถานะ</th>
                <th className="px-3 py-2 hidden sm:table-cell">เผยแพร่</th>
                <th className="px-3 py-2 hidden sm:table-cell">ดู</th>
                <th className="px-3 py-2 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {items.map((n) => (
                <tr key={n.id} className="border-t border-gray-100">
                  <td className="px-3 py-2 font-medium max-w-[16rem] sm:max-w-md truncate">
                    {n.title_th}
                    <div className="md:hidden mt-0.5 text-xs font-normal text-gray-500">
                      {CATEGORY_LABEL[n.category]}
                    </div>
                  </td>
                  <td className="px-3 py-2 hidden md:table-cell">{CATEGORY_LABEL[n.category]}</td>
                  <td className="px-3 py-2">
                    <Badge variant={n.is_published ? "win" : "default"}>
                      {n.is_published ? "เผยแพร่แล้ว" : "ฉบับร่าง"}
                    </Badge>
                  </td>
                  <td className="px-3 py-2 hidden sm:table-cell whitespace-nowrap">
                    {n.published_at ? formatDateTH(n.published_at) : "-"}
                  </td>
                  <td className="px-3 py-2 hidden sm:table-cell">{n.views ?? 0}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-3">
                      <Link
                        href={`/admin/news/${n.id}`}
                        className="text-nara-green hover:underline"
                      >
                        แก้ไข
                      </Link>
                      <DeleteButton
                        action={async () => {
                          "use server";
                          await deleteNewsAction(n.id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center text-gray-500">
                    ยังไม่มีข่าว
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
