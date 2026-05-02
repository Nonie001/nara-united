import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Card, CardBody } from "@/components/shared/Card";
import { listStaff } from "@/lib/queries/staff";

export const metadata: Metadata = { title: "ทีมงาน" };
export const revalidate = 300;

export default async function StaffPage() {
  const staff = await listStaff();
  return (
    <Container className="py-8 sm:py-12">
      <SectionTitle title="ทีมงานและผู้ฝึกสอน" />
      {staff.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีข้อมูลทีมงาน</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((s) => (
            <Card key={s.id}>
              <div className="relative aspect-[4/3] bg-gray-100">
                {s.photo_url ? (
                  <Image
                    src={s.photo_url}
                    alt={s.name_th}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-gray-300 text-4xl">
                    👤
                  </div>
                )}
              </div>
              <CardBody>
                <div className="text-xs text-nara-green font-semibold uppercase">
                  {s.role_th}
                </div>
                <div className="font-display text-lg font-bold">
                  {s.name_th}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
