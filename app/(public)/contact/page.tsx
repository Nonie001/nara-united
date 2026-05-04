import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardBody } from "@/components/shared/Card";
import { ContactForm } from "./ContactForm";
import { MapPin, Mail } from "lucide-react";

export const metadata: Metadata = { title: "ติดต่อสโมสร" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="ติดต่อสโมสร"
        description="ส่งข้อความถึงเรา ทีมงานจะติดต่อกลับโดยเร็วที่สุดในเวลาทำการ"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "ติดต่อสโมสร" }]}
      />

      <Container className="py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardBody className="sm:!p-8">
                <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase text-nara-gold-dark">
                  Send a Message
                </h2>
                <h3 className="heading-display mt-1 text-2xl text-nara-ink">
                  ส่งข้อความถึงเรา
                </h3>
                <span className="mt-2 block h-[2px] w-10 bg-nara-gold rounded-full" />
                <div className="mt-6">
                  <ContactForm />
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="space-y-4">
            <Card>
              <CardBody>
                <h3 className="text-[11px] font-bold tracking-[0.25em] uppercase text-nara-gold-dark mb-4">
                  ข้อมูลติดต่อ
                </h3>
                <ul className="space-y-4 text-sm">
                  <ContactRow icon={MapPin} label="ที่ตั้ง">
                    สนามกีฬากลางจังหวัดนราธิวาส
                    <br />
                    อ.เมือง จ.นราธิวาส
                  </ContactRow>
                  <ContactRow icon={Mail} label="อีเมล">
                    <a
                      href="mailto:contact@naraunited.fc"
                      className="hover:text-nara-gold-dark transition"
                    >
                      contact@naraunited.fc
                    </a>
                  </ContactRow>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h3 className="text-[11px] font-bold tracking-[0.25em] uppercase text-nara-gold-dark mb-4">
                  ช่องทางโซเชียล
                </h3>
                <div className="flex items-center gap-2">
                  <SocialBtn
                    label="Facebook"
                    path="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.02h-2.54v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.8 8.43-4.93 8.43-9.93Z"
                  />
                  <SocialBtn
                    label="Instagram"
                    path="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.38 2.13a5.87 5.87 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.87 5.87 0 0 0 2.13-1.38 5.87 5.87 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z"
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-nara-gold/15 text-nara-gold-dark">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">
          {label}
        </div>
        <div className="mt-0.5 text-nara-ink font-medium leading-relaxed">
          {children}
        </div>
      </div>
    </li>
  );
}

function SocialBtn({ label, path }: { label: string; path: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-md border border-gray-300 text-gray-600 hover:border-nara-gold hover:text-nara-gold-dark hover:bg-nara-gold/5 transition"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d={path} />
      </svg>
    </a>
  );
}
