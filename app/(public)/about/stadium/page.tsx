import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardBody } from "@/components/shared/Card";
import { MapPin, Users, Trophy } from "lucide-react";

export const metadata: Metadata = { title: "สนามเหย้า" };

const FACTS = [
  { label: "ชื่อสนาม", value: "สนามกีฬากลางจังหวัดนราธิวาส", icon: Trophy },
  { label: "ความจุ", value: "~10,000 ที่นั่ง", icon: Users },
  { label: "ที่ตั้ง", value: "อ.เมือง จ.นราธิวาส", icon: MapPin },
];

export default function StadiumPage() {
  return (
    <>
      <PageHeader
        eyebrow="Home Ground"
        title="สนามเหย้า"
        description="สนามแข่งขันอย่างเป็นทางการของสโมสรนราธิวาส ยูไนเต็ด"
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "เกี่ยวกับสโมสร", href: "/about" },
          { label: "สนามเหย้า" },
        ]}
      />

      <Container className="py-12 sm:py-16 max-w-4xl">
        <div className="grid gap-4 sm:grid-cols-3">
          {FACTS.map((f) => (
            <Card key={f.label}>
              <CardBody>
                <f.icon className="h-5 w-5 text-nara-gold-dark" />
                <div className="mt-3 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
                  {f.label}
                </div>
                <div className="mt-1 text-base font-semibold text-nara-ink">
                  {f.value}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardBody>
            <h2 className="heading-display text-xl text-nara-ink">เกี่ยวกับสนาม</h2>
            <span className="mt-2 block h-[2px] w-10 bg-nara-gold rounded-full" />
            <p className="mt-4 text-sm leading-relaxed text-gray-700">
              สนามกีฬากลางจังหวัดนราธิวาสเป็นสนามแข่งขันหลักของสโมสร
              ตั้งอยู่ใจกลางเมืองนราธิวาส
              ด้วยความจุประมาณ 10,000 ที่นั่ง
              สามารถรองรับแฟนบอลและการแข่งขันระดับลีกได้อย่างเต็มรูปแบบ
            </p>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
