import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Card, CardBody } from "@/components/shared/Card";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "ติดต่อสโมสร" };

export default function ContactPage() {
  return (
    <Container className="py-8 sm:py-12">
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-nara-green-dark">
        ติดต่อสโมสร
      </h1>
      <p className="mt-2 text-gray-600">
        ส่งข้อความถึงเรา ทีมงานจะติดต่อกลับโดยเร็วที่สุด
      </p>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              <ContactForm />
            </CardBody>
          </Card>
        </div>
        <div>
          <Card>
            <CardBody className="space-y-3 text-sm">
              <div>
                <div className="text-gray-500">ที่ตั้ง</div>
                <div className="font-medium">จ.นราธิวาส ประเทศไทย</div>
              </div>
              <div>
                <div className="text-gray-500">อีเมล</div>
                <div className="font-medium">contact@naraunited.example</div>
              </div>
              <div>
                <div className="text-gray-500">โซเชียลมีเดีย</div>
                <div className="font-medium">Facebook / Instagram</div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
}
