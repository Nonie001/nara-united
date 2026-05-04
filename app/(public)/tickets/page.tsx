import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardBody } from "@/components/shared/Card";
import { LinkButton } from "@/components/shared/Button";
import { Building2, Ticket, Calendar, Mail } from "lucide-react";

export const metadata: Metadata = { title: "ตั๋วเข้าชม" };

const TIERS = [
  {
    zone: "อัฒจันทร์หลัก",
    zoneEn: "Main Stand",
    price: 150,
    desc: "นั่งหลังประตูที่นั่งดีที่สุด มีหลังคากันฝน",
    tag: "ยอดนิยม",
    featured: true,
  },
  {
    zone: "อัฒจันทร์ข้าง",
    zoneEn: "Side Stand",
    price: 80,
    desc: "มุมมองด้านข้างสนาม เหมาะสำหรับแฟนบอลที่อยากใกล้ชิด",
    tag: null,
    featured: false,
  },
  {
    zone: "โซนเยาวชน",
    zoneEn: "Under 12",
    price: 0,
    desc: "เด็กอายุต่ำกว่า 12 ปี เข้าชมฟรีทุกนัด",
    tag: "ฟรี",
    featured: false,
  },
] as const;

const CHANNELS = [
  {
    icon: Building2,
    title: "ที่สำนักงานสโมสร",
    desc: "เปิดทำการวันจันทร์–ศุกร์ เวลา 09:00–17:00 น. ณ สนามกีฬากลางจังหวัดนราธิวาส",
  },
  {
    icon: Ticket,
    title: "ที่ประตูสนาม",
    desc: "จำหน่ายตั๋ว ณ วันแข่งขัน ตั้งแต่ 2 ชั่วโมงก่อนเตะ — มาเร็วเพื่อหลีกเลี่ยงคิวยาว",
  },
] as const;

export default function TicketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Match Day Tickets"
        title="ตั๋วเข้าชม"
        description="ซื้อตั๋วและมาร่วมเชียร์กอและพิฆาตที่สนามกีฬากลางจังหวัดนราธิวาส พร้อมกับแฟนบอลกว่าหมื่นคนในทุกนัดเหย้า"
        breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "ตั๋วเข้าชม" }]}
      />

      <Container className="py-12 sm:py-16">
        {/* Pricing */}
        <section>
          <div className="mb-6">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-nara-gold-dark">
              Ticket Prices
            </div>
            <h2 className="heading-display mt-1.5 text-2xl sm:text-3xl text-nara-ink">
              ราคาตั๋วฤดูกาล 2025/26
            </h2>
            <span className="mt-3 block h-[3px] w-12 bg-nara-gold rounded-full" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {TIERS.map((t) => (
              <Card
                key={t.zone}
                className={
                  t.featured
                    ? "relative border-nara-gold/60 ring-1 ring-nara-gold/30"
                    : "relative"
                }
              >
                {t.featured ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-nara-gold/0 via-nara-gold to-nara-gold/0"
                  />
                ) : null}
                {t.tag ? (
                  <span
                    className={
                      "absolute -top-2.5 left-5 rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] " +
                      (t.featured
                        ? "bg-nara-gold text-nara-ink"
                        : "bg-nara-ink text-white")
                    }
                  >
                    {t.tag}
                  </span>
                ) : null}
                <CardBody className="sm:!p-7">
                  <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-nara-gold-dark">
                    {t.zoneEn}
                  </div>
                  <div className="mt-1 text-base font-semibold text-nara-ink">
                    {t.zone}
                  </div>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="heading-display text-4xl text-nara-ink">
                      {t.price === 0 ? "ฟรี" : `฿${t.price}`}
                    </span>
                    {t.price > 0 ? (
                      <span className="text-xs text-gray-500">/ ที่นั่ง</span>
                    ) : null}
                  </div>
                  <span className="mt-4 block h-px w-full bg-gray-200" />
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                    {t.desc}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* How to buy */}
        <section className="mt-14">
          <div className="mb-6">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-nara-gold-dark">
              How to Buy
            </div>
            <h2 className="heading-display mt-1.5 text-2xl sm:text-3xl text-nara-ink">
              วิธีซื้อตั๋ว
            </h2>
            <span className="mt-3 block h-[3px] w-12 bg-nara-gold rounded-full" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {CHANNELS.map((m) => {
              const Icon = m.icon;
              return (
                <Card key={m.title}>
                  <CardBody className="sm:!p-6">
                    <div className="flex gap-4">
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-nara-ink text-nara-gold">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-nara-ink">{m.title}</div>
                        <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14">
          <Card className="border-nara-gold/40">
            <CardBody className="sm:!p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-nara-gold/15 text-nara-gold-dark">
                    <Calendar className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="text-[11px] font-bold tracking-[0.25em] uppercase text-nara-gold-dark">
                      Next Home Match
                    </div>
                    <div className="heading-display mt-1 text-xl text-nara-ink">
                      ดูโปรแกรมนัดเหย้าถัดไป
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      ตรวจสอบวันแข่งขันก่อนมาซื้อตั๋วที่หน้าโปรแกรมแข่งขัน
                    </p>
                  </div>
                </div>
                <LinkButton href="/fixtures" variant="primary" size="md">
                  ดูโปรแกรมทั้งหมด
                </LinkButton>
              </div>
            </CardBody>
          </Card>
        </section>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Mail className="h-4 w-4 text-gray-400" />
          สอบถามเพิ่มเติม ติดต่อ
          <a
            href="/contact"
            className="text-nara-gold-dark font-semibold hover:underline"
          >
            ฝ่ายประชาสัมพันธ์สโมสร
          </a>
        </div>
      </Container>
    </>
  );
}
