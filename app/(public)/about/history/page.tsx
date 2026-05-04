import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = { title: "ประวัติสโมสร" };

export default function HistoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Est. 2010"
        title="ประวัติสโมสร"
        description="เรื่องราวความเป็นมาของสโมสรนราธิวาส ยูไนเต็ด ตั้งแต่จุดเริ่มต้น"
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "เกี่ยวกับสโมสร", href: "/about" },
          { label: "ประวัติสโมสร" },
        ]}
      />

      <Container className="py-12 sm:py-16 max-w-3xl">
        <div className="space-y-6 leading-relaxed text-gray-800 text-[15px]">
          <p className="text-lg text-nara-ink font-medium leading-relaxed">
            สโมสรฟุตบอล Nara United (กอและพิฆาต) ก่อตั้งขึ้นในปี พ.ศ. 2553 (2010)
            ในจังหวัดนราธิวาส ด้วยเป้าหมายในการเป็นตัวแทนของชาวนราธิวาส
            ในการแข่งขันระดับประเทศ
          </p>
          <p>
            สโมสรเริ่มต้นจากการรวมตัวของกลุ่มผู้รักฟุตบอลในพื้นที่
            และพัฒนาขึ้นเรื่อยๆ จนกลายเป็นสโมสรอาชีพที่ได้รับการยอมรับในระดับภูมิภาค
          </p>
          <p className="text-gray-500 italic">
            (ข้อมูลฉบับเต็มจะถูกอัปเดตผ่านระบบหลังบ้านในเร็วๆ นี้)
          </p>
        </div>
      </Container>
    </>
  );
}
