import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardBody } from "@/components/shared/Card";
import { listStaff } from "@/lib/queries/staff";

export const metadata: Metadata = { title: "ทีมงาน" };
export const revalidate = 300;

export default async function StaffPage() {
  const staff = await listStaff();
  return (
    <>
      <PageHeader
        eyebrow="Our People"
        title="ทีมงานและผู้ฝึกสอน"
        description="พบกับทีมเบื้องหลังความสำเร็จของ Nara United"
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "เกี่ยวกับสโมสร", href: "/about" },
          { label: "ทีมงาน" },
        ]}
      />

      <Container className="py-12 sm:py-16">
        {staff.length === 0 ? (
          <p className="text-gray-500">ยังไม่มีข้อมูลทีมงาน</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {staff.map((s) => (
              <Card key={s.id} className="card-lift">
                <div className="relative aspect-[4/5] bg-gray-100">
                  {s.photo_url ? (
                    <Image
                      src={s.photo_url}
                      alt={s.name_th}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-gray-300 heading-display text-6xl">
                      {s.name_th.slice(0, 1)}
                    </div>
                  )}
                </div>
                <CardBody>
                  <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-nara-gold-dark">
                    {s.role_th}
                  </div>
                  <div className="mt-1 heading-display text-lg text-nara-ink truncate">
                    {s.name_th}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
