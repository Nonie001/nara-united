import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import Link from "next/link";

export const metadata: Metadata = { title: "ตั๋วเข้าชม" };

const TIERS = [
  {
    zone: "อัฒจันทร์หลัก (Main Stand)",
    price: 150,
    desc: "นั่งหลังประตูที่นั่งดีที่สุด มีหลังคากันฝน",
    color: "bg-nara-gold/10 border-nara-gold",
    badge: "bg-nara-gold text-nara-green-deeper",
    tag: "ยอดนิยม",
  },
  {
    zone: "อัฒจันทร์ข้าง (Side Stand)",
    price: 80,
    desc: "มุมมองด้านข้างสนาม เหมาะสำหรับแฟนบอลที่อยากใกล้ชิด",
    color: "border-white/20",
    badge: null,
    tag: null,
  },
  {
    zone: "โซนเยาวชน (Under 12)",
    price: 0,
    desc: "เด็กอายุต่ำกว่า 12 ปี เข้าชมฟรีทุกนัด",
    color: "border-nara-green-light/40",
    badge: "bg-nara-green-light/80 text-white",
    tag: "ฟรี",
  },
];

export default function TicketsPage() {
  return (
    <div className="bg-nara-green-deeper text-white min-h-screen">
      {/* Hero strip */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden
          className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0_60px,rgba(244,185,66,0.04)_60px_62px)]"
        />
        <Container className="relative py-12 sm:py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-nara-gold/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-nara-gold mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-nara-red animate-pulse" />
              ฤดูกาล 2025/26
            </div>
            <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl font-black">
              ตั๋วเข้าชม
            </h1>
            <p className="mt-4 text-white/70 text-sm sm:text-base max-w-lg">
              ซื้อตั๋วและมาร่วมเชียร์กอและพิฆาตที่สนามกีฬากลางจังหวัดนราธิวาส
              พร้อมกับแฟนบอลกว่าหมื่นคน
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-12 sm:py-16">
        {/* Ticket tiers */}
        <SectionTitle invert eyebrow="Ticket Prices" title="ราคาตั๋ว" />
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {TIERS.map((t) => (
            <div
              key={t.zone}
              className={`relative rounded-xl border bg-white/5 backdrop-blur p-6 ${t.color}`}
            >
              {t.tag && (
                <span
                  className={`absolute -top-3 left-4 rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-widest ${t.badge}`}
                >
                  {t.tag}
                </span>
              )}
              <div className="text-white/60 text-sm">{t.zone}</div>
              <div className="heading-display mt-3 text-4xl text-nara-gold">
                {t.price === 0 ? "ฟรี" : `฿${t.price}`}
              </div>
              <p className="mt-3 text-sm text-white/65 leading-relaxed">
                {t.desc}
              </p>
            </div>
          ))}
        </div>

        {/* How to buy */}
        <div className="mt-12">
          <SectionTitle invert eyebrow="How to Buy" title="วิธีซื้อตั๋ว" />
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "🏢",
                title: "ที่สำนักงานสโมสร",
                desc: "เปิดทำการวันจันทร์–ศุกร์ เวลา 09:00–17:00 น. ที่สนามกีฬากลางจังหวัดนราธิวาส",
              },
              {
                icon: "🎫",
                title: "ที่ประตูสนาม",
                desc: "จำหน่ายตั๋ว ณ วันแข่งขัน ตั้งแต่ 2 ชั่วโมงก่อนเตะ — มาเร็วเพื่อหลีกเลี่ยงคิวยาว",
              },
            ].map((m) => (
              <div
                key={m.title}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <span className="text-3xl">{m.icon}</span>
                <div>
                  <div className="font-bold text-nara-gold">{m.title}</div>
                  <p className="mt-1 text-sm text-white/65 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Match schedule CTA */}
        <div className="mt-12 rounded-2xl border border-nara-gold/30 bg-nara-gold/5 p-6 sm:p-8 text-center">
          <div className="text-nara-gold font-bold text-lg">
            ดูโปรแกรมนัดเหย้าถัดไป
          </div>
          <p className="mt-2 text-sm text-white/65">
            ตรวจสอบวันแข่งขันก่อนมาซื้อตั๋ว
          </p>
          <Link
            href="/fixtures"
            className="mt-5 inline-flex items-center gap-2 rounded-sm bg-nara-gold px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-nara-green-deeper hover:bg-nara-gold-light transition"
          >
            ดูโปรแกรมทั้งหมด →
          </Link>
        </div>

        {/* Contact */}
        <div className="mt-8 text-center text-sm text-white/50">
          สอบถามข้อมูลเพิ่มเติม ติดต่อ{" "}
          <Link href="/contact" className="text-nara-gold hover:underline">
            ฝ่ายประชาสัมพันธ์สโมสร
          </Link>
        </div>
      </Container>
    </div>
  );
}
