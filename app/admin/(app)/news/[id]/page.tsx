import { notFound } from "next/navigation";
import { Card, CardBody } from "@/components/shared/Card";
import { PageHeader } from "@/components/admin/PageHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NewsForm } from "../NewsForm";
import { updateNewsAction } from "../actions";
import type { News } from "@/types/database";

type Props = { params: Promise<{ id: string }> };

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;
  const sb = await createSupabaseServerClient();
  const { data } = await sb.from("news").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div>
      <PageHeader title="แก้ไขข่าว" />
      <Card>
        <CardBody>
          <NewsForm
            initial={data as News}
            action={async (fd) => {
              "use server";
              await updateNewsAction(id, fd);
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
