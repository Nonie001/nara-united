import Image from "next/image";
import { Card, CardBody } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";
import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { StaffForm } from "./StaffForm";
import { upsertStaffAction, deleteStaffAction } from "./actions";
import type { Staff } from "@/types/database";

async function listAllStaff(): Promise<Staff[]> {
  if (!isSupabaseConfigured()) return [];
  const sb = await createSupabaseServerClient();
  const { data } = await sb
    .from("staff")
    .select("*")
    .order("display_order");
  return (data ?? []) as Staff[];
}

export default async function AdminStaffPage() {
  const staff = await listAllStaff();

  return (
    <div className="space-y-6">
      <PageHeader title="ทีมงาน" description={`ทั้งหมด ${staff.length} คน`} />

      <Card>
        <CardBody>
          <h2 className="font-display font-bold mb-3">เพิ่มทีมงานใหม่</h2>
          <StaffForm action={upsertStaffAction} />
        </CardBody>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {staff.map((s) => (
          <Card key={s.id}>
            <CardBody>
              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-full overflow-hidden bg-gray-100">
                  {s.photo_url ? (
                    <Image
                      src={s.photo_url}
                      alt={s.name_th}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold">{s.name_th}</h3>
                    <Badge variant={s.is_active ? "win" : "default"}>
                      {s.is_active ? "active" : "inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{s.role_th}</p>
                  <p className="text-xs text-gray-500">ลำดับ: {s.display_order}</p>
                </div>
                <DeleteButton
                  action={async () => {
                    "use server";
                    await deleteStaffAction(s.id);
                  }}
                />
              </div>
              <details className="mt-3">
                <summary className="text-sm text-nara-green cursor-pointer">
                  แก้ไข
                </summary>
                <div className="mt-3">
                  <StaffForm initial={s} action={upsertStaffAction} />
                </div>
              </details>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
