import { Card, CardBody } from "@/components/shared/Card";
import { PageHeader } from "@/components/admin/PageHeader";
import { PlayerForm } from "../PlayerForm";
import { createPlayerAction } from "../actions";

export default function NewPlayerPage() {
  return (
    <div>
      <PageHeader title="เพิ่มนักเตะ" />
      <Card>
        <CardBody>
          <PlayerForm action={createPlayerAction} />
        </CardBody>
      </Card>
    </div>
  );
}
