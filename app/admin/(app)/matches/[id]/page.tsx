import { notFound } from "next/navigation";
import { Card, CardBody } from "@/components/shared/Card";
import { PageHeader } from "@/components/admin/PageHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MatchForm } from "../MatchForm";
import { updateMatchAction } from "../actions";
import type { Match, Stadium } from "@/types/database";

type Props = { params: Promise<{ id: string }> };

export default async function EditMatchPage({ params }: Props) {
  const { id } = await params;
  const sb = await createSupabaseServerClient();
  const [{ data: match }, { data: stadiums }] = await Promise.all([
    sb.from("matches").select("*").eq("id", id).maybeSingle(),
    sb.from("stadiums").select("*").order("name_th"),
  ]);
  if (!match) notFound();

  return (
    <div>
      <PageHeader title="แก้ไขแมตช์" />
      <Card>
        <CardBody>
          <MatchForm
            initial={match as Match}
            stadiums={(stadiums ?? []) as Stadium[]}
            action={async (fd) => {
              "use server";
              await updateMatchAction(id, fd);
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
