import { Card, CardBody } from "@/components/shared/Card";
import { PageHeader } from "@/components/admin/PageHeader";
import { NewsForm } from "../NewsForm";
import { createNewsAction } from "../actions";

export default function NewArticlePage() {
  return (
    <div>
      <PageHeader title="เขียนข่าวใหม่" />
      <Card>
        <CardBody>
          <NewsForm action={createNewsAction} />
        </CardBody>
      </Card>
    </div>
  );
}
