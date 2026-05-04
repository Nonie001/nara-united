import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardBody } from "@/components/shared/Card";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "เกี่ยวกับสโมสร" };

const ITEMS = [
  {
    href: "/about/history",
    eyebrow: "01",
    title: "ประวัติสโมสร",
    desc: "เรื่องราวของสโมสรตั้งแต่ก่อตั้งเมื่อปี 2010 จนถึงปัจจุบัน",
  },
  {
    href: "/about/stadium",
    eyebrow: "02",
    title: "สนามเหย้า",
    desc: "ข้อมูลสนามเหย้า ความจุ และที่ตั้งของสโมสร",
  },
  {
    href: "/about/staff",
    eyebrow: "03",
    title: "ทีมงาน",
    desc: "ทีมผู้ฝึกสอน ผู้บริหาร และสตาฟทั้งหมดของสโมสร",
  },
];

export default function AboutIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Club"
        title="เกี่ยวกับ Nara United"
        description="ทำความรู้จักกับสโมสรนราธิวาส ยูไนเต็ด — ความเป็นมา สนามเหย้า และทีมงานเบื้องหลังความสำเร็จ"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "เกี่ยวกับสโมสร" }]}
      />

      <Container className="py-12 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((i) => (
            <Link key={i.href} href={i.href} className="group">
              <Card className="h-full transition hover:border-nara-gold hover:shadow-md">
                <CardBody className="flex h-full flex-col">
                  <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-nara-gold-dark">
                    {i.eyebrow}
                  </div>
                  <h3 className="heading-display mt-2 text-2xl text-nara-ink">
                    {i.title}
                  </h3>
                  <span className="mt-2 block h-[2px] w-8 bg-nara-gold rounded-full" />
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed flex-1">
                    {i.desc}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-nara-ink group-hover:text-nara-gold-dark transition">
                    อ่านต่อ
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
