import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = { title: "ประวัติสโมสร" };

export default function HistoryPage() {
  return (
    <Container className="py-8 sm:py-12 max-w-3xl">
      <h1 className="font-display text-4xl font-extrabold text-nara-green-dark">
        ประวัติสโมสร
      </h1>
      <p className="mt-2 text-gray-500">ก่อตั้ง Est. 2010</p>

      <div className="mt-8 space-y-4 leading-relaxed text-gray-800">
        <p>
          สโมสรฟุตบอล Nara United (กอและพิฆาต) ก่อตั้งขึ้นในปี พ.ศ. 2553
          (2010) ในจังหวัดนราธิวาส โดยมีเป้าหมายเพื่อพัฒนาวงการฟุตบอลในพื้นที่
          และเป็นตัวแทนของชาวนราธิวาสในการแข่งขันระดับประเทศ
        </p>
        <p>
          (เพิ่มประวัติฉบับเต็มผ่านระบบหลังบ้านในอนาคต)
        </p>
      </div>
    </Container>
  );
}
