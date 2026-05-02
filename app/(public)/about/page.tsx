import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Card, CardBody } from "@/components/shared/Card";
import Link from "next/link";

export const metadata: Metadata = { title: "เกี่ยวกับสโมสร" };

export default function AboutIndexPage() {
  const items = [
    { href: "/about/history", title: "ประวัติสโมสร", desc: "เรื่องราวของสโมสรตั้งแต่ก่อตั้งปี 2010" },
    { href: "/about/stadium", title: "สนามเหย้า", desc: "ข้อมูลและที่ตั้งของสนามเหย้า" },
    { href: "/about/staff", title: "ทีมงาน", desc: "ทีมผู้ฝึกสอนและสตาฟ" },
  ];
  return (
    <Container className="py-8 sm:py-12">
      <SectionTitle title="เกี่ยวกับ Nara United" />
      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((i) => (
          <Link key={i.href} href={i.href}>
            <Card className="h-full hover:shadow-md transition">
              <CardBody>
                <h3 className="font-display text-xl font-bold text-nara-green-dark">
                  {i.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{i.desc}</p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
