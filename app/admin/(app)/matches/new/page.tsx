import { Card, CardBody } from "@/components/shared/Card";
import { PageHeader } from "@/components/admin/PageHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { MatchForm } from "../MatchForm";
import { createMatchAction } from "../actions";
import type { Stadium } from "@/types/database";

async function listStadiums(): Promise<Stadium[]> {
  if (!isSupabaseConfigured()) return [];
  const sb = await createSupabaseServerClient();
  const { data } = await sb.from("stadiums").select("*").order("name_th");
  return (data ?? []) as Stadium[];
}

export default async function NewMatchPage() {
  const stadiums = await listStadiums();
  return (
    <div>
      <PageHeader title="เพิ่มแมตช์" />
      <Card>
        <CardBody>
          <MatchForm stadiums={stadiums} action={createMatchAction} />
        </CardBody>
      </Card>
    </div>
  );
}
