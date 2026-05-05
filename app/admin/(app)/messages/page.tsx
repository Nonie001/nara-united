import { Card, CardBody } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";
import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { formatDateTH } from "@/lib/utils/date";
import {
  markMessageReadAction,
  deleteMessageAction,
} from "./actions";
import type { ContactMessage } from "@/types/database";

async function listMessages(): Promise<ContactMessage[]> {
  if (!isSupabaseConfigured()) return [];
  const sb = await createSupabaseServerClient();
  const { data } = await sb
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  return (data ?? []) as ContactMessage[];
}

export default async function AdminMessagesPage() {
  const messages = await listMessages();
  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="ข้อความติดต่อ"
        description={`ทั้งหมด ${messages.length} ข้อความ · ค้างอ่าน ${unread}`}
      />

      <div className="space-y-3">
        {messages.map((m) => (
          <Card key={m.id} className={m.is_read ? "" : "border-l-4 border-nara-gold"}>
            <CardBody>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold">{m.name}</h3>
                    {m.is_read ? null : <Badge variant="gold">ใหม่</Badge>}
                  </div>
                  <p className="text-sm text-gray-600 break-all">
                    <a href={`mailto:${m.email}`} className="hover:underline">
                      {m.email}
                    </a>
                    <span className="hidden sm:inline">{" · "}</span>
                    <span className="block sm:inline text-xs sm:text-sm">
                      {formatDateTH(m.created_at, "d MMM yyyy HH:mm")}
                    </span>
                  </p>
                  {m.subject ? (
                    <p className="mt-1 font-medium">หัวข้อ: {m.subject}</p>
                  ) : null}
                  <p className="mt-2 whitespace-pre-wrap text-sm break-words">{m.message}</p>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-2 shrink-0">
                  <form
                    action={async () => {
                      "use server";
                      await markMessageReadAction(m.id, !m.is_read);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-sm text-nara-green hover:underline"
                    >
                      {m.is_read ? "ทำเป็นยังไม่อ่าน" : "ทำเป็นอ่านแล้ว"}
                    </button>
                  </form>
                  <DeleteButton
                    action={async () => {
                      "use server";
                      await deleteMessageAction(m.id);
                    }}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
        {messages.length === 0 ? (
          <Card>
            <CardBody>
              <p className="text-center text-gray-500 py-8">ยังไม่มีข้อความ</p>
            </CardBody>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
