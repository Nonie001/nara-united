import { notFound } from "next/navigation";
import { Card, CardBody } from "@/components/shared/Card";
import { PageHeader } from "@/components/admin/PageHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PlayerForm } from "../PlayerForm";
import { updatePlayerAction } from "../actions";
import type { Player } from "@/types/database";

type Props = { params: Promise<{ id: string }> };

export default async function EditPlayerPage({ params }: Props) {
  const { id } = await params;
  const sb = await createSupabaseServerClient();
  const { data } = await sb.from("players").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const player = data as Player;

  return (
    <div>
      <PageHeader title={`แก้ไข: ${player.name_th}`} />
      <Card>
        <CardBody>
          <PlayerForm
            initial={player}
            action={async (formData) => {
              "use server";
              await updatePlayerAction(id, formData);
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
