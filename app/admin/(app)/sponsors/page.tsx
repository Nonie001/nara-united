import Image from "next/image";
import { Card, CardBody } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";
import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { SponsorForm } from "./SponsorForm";
import {
  upsertSponsorAction,
  deleteSponsorAction,
} from "./actions";
import type { Sponsor } from "@/types/database";

async function listAllSponsors(): Promise<Sponsor[]> {
  if (!isSupabaseConfigured()) return [];
  const sb = await createSupabaseServerClient();
  const { data } = await sb
    .from("sponsors")
    .select("*")
    .order("tier")
    .order("display_order");
  return (data ?? []) as Sponsor[];
}

export default async function AdminSponsorsPage() {
  const sponsors = await listAllSponsors();

  return (
    <div className="space-y-6">
      <PageHeader title="สปอนเซอร์" description={`ทั้งหมด ${sponsors.length} ราย`} />

      <Card>
        <CardBody>
          <h2 className="font-display font-bold mb-3">เพิ่มสปอนเซอร์ใหม่</h2>
          <SponsorForm action={upsertSponsorAction} />
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {sponsors.map((s) => (
          <Card key={s.id}>
            <CardBody>
              <div className="flex gap-4 items-start">
                <div className="relative h-20 w-20 bg-gray-50 rounded">
                  {s.logo_url ? (
                    <Image
                      src={s.logo_url}
                      alt={s.name}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold truncate">{s.name}</h3>
                    <Badge variant="gold">{s.tier}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{s.website_url}</p>
                  <p className="text-xs text-gray-500">ลำดับ: {s.display_order}</p>
                </div>
                <DeleteButton
                  action={async () => {
                    "use server";
                    await deleteSponsorAction(s.id);
                  }}
                />
              </div>
              <details className="mt-3">
                <summary className="text-sm text-nara-green cursor-pointer">
                  แก้ไข
                </summary>
                <div className="mt-3">
                  <SponsorForm initial={s} action={upsertSponsorAction} />
                </div>
              </details>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
