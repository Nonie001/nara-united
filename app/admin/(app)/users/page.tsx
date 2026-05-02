import { Card } from "@/components/shared/Card";
import { PageHeader } from "@/components/admin/PageHeader";
import { requireAdminSession } from "@/lib/auth/session";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/env";
import { updateUserRoleAction } from "./actions";
import { formatDateTH } from "@/lib/utils/date";
import type { Profile } from "@/types/database";

async function listProfiles(): Promise<Profile[]> {
  if (!isSupabaseConfigured()) return [];
  const sb = createSupabaseAdminClient();
  const { data } = await sb
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as Profile[];
}

export default async function AdminUsersPage() {
  await requireAdminSession(["admin"]);
  const profiles = await listProfiles();

  return (
    <div className="space-y-6">
      <PageHeader
        title="ผู้ใช้งาน"
        description={`ทั้งหมด ${profiles.length} บัญชี (เฉพาะ admin เท่านั้น)`}
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-3 py-2">อีเมล</th>
                <th className="px-3 py-2">ชื่อ</th>
                <th className="px-3 py-2">บทบาท</th>
                <th className="px-3 py-2">สมัครเมื่อ</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id} className="border-t border-gray-100">
                  <td className="px-3 py-2 font-medium">{p.email ?? "-"}</td>
                  <td className="px-3 py-2">{p.full_name ?? "-"}</td>
                  <td className="px-3 py-2">
                    <form
                      action={async (fd) => {
                        "use server";
                        await updateUserRoleAction(p.id, fd.get("role") as string);
                      }}
                      className="flex items-center gap-2"
                    >
                      <select
                        name="role"
                        defaultValue={p.role}
                        className="rounded border border-gray-300 px-2 py-1 text-sm"
                      >
                        <option value="admin">admin</option>
                        <option value="editor">editor</option>
                        <option value="viewer">viewer</option>
                      </select>
                      <button
                        type="submit"
                        className="text-nara-green text-sm hover:underline"
                      >
                        บันทึก
                      </button>
                    </form>
                  </td>
                  <td className="px-3 py-2">{formatDateTH(p.created_at)}</td>
                </tr>
              ))}
              {profiles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-gray-500">
                    ยังไม่มีผู้ใช้
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div className="p-4 text-sm text-gray-600">
          <p>
            <strong>การสร้างผู้ใช้ใหม่:</strong> ไปที่ Supabase Dashboard →
            Authentication → Add user แล้วผู้ใช้จะปรากฏในตารางนี้โดยอัตโนมัติ (default role = viewer)
          </p>
        </div>
      </Card>
    </div>
  );
}
