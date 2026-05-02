import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Card, CardBody } from "@/components/shared/Card";

export const metadata: Metadata = { title: "สนามเหย้า" };

export default function StadiumPage() {
  return (
    <Container className="py-8 sm:py-12 max-w-3xl">
      <h1 className="font-display text-4xl font-extrabold text-nara-green-dark">
        สนามเหย้า
      </h1>
      <Card className="mt-6">
        <CardBody>
          <dl className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500">ชื่อสนาม</dt>
              <dd className="font-semibold">สนามกีฬากลางจังหวัดนราธิวาส</dd>
            </div>
            <div>
              <dt className="text-gray-500">ความจุ</dt>
              <dd className="font-semibold">~10,000 ที่นั่ง</dd>
            </div>
            <div>
              <dt className="text-gray-500">ที่ตั้ง</dt>
              <dd className="font-semibold">อ.เมือง จ.นราธิวาส</dd>
            </div>
          </dl>
        </CardBody>
      </Card>
    </Container>
  );
}
