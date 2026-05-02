import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "@/components/shared/Logo";
import { MapPin, Mail, Phone } from "lucide-react";

const SOCIALS = [
  {
    label: "Facebook",
    href: "#",
    path: "M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.02h-2.54v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.8 8.43-4.93 8.43-9.93Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.38 2.13a5.87 5.87 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.87 5.87 0 0 0 2.13-1.38 5.87 5.87 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2C0 8 0 12 0 12s0 4 .5 5.8a3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 16 24 12 24 12s0-4-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z",
  },
  {
    label: "X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.16 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z",
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-20 overflow-hidden bg-nara-green-deeper text-white">
      <div aria-hidden className="absolute inset-0 bg-pitch-stripes opacity-60" />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-nara-green/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-nara-gold/10 blur-3xl"
      />

      <Container className="relative pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <Logo size="lg" glow />
              <div>
                <div className="heading-display text-2xl">NARA UNITED</div>
                <div className="text-[11px] tracking-[0.3em] text-nara-gold/80">
                  กอและพิฆาต
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              สโมสรฟุตบอลนราฯ ยูไนเต็ด — ก่อตั้งปี 2010
              ทีมแห่งศักดิ์ศรีและจิตวิญญาณของชาวนราธิวาส
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 hover:border-nara-gold hover:text-nara-gold hover:bg-nara-gold/10 transition"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-2">
            <h3 className="heading-display text-base text-nara-gold">สโมสร</h3>
            <span className="divider-gold mt-2 block" />
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link href="/about/history" className="hover:text-nara-gold">ประวัติสโมสร</Link></li>
              <li><Link href="/about/stadium" className="hover:text-nara-gold">สนามเหย้า</Link></li>
              <li><Link href="/about/staff" className="hover:text-nara-gold">ทีมงาน</Link></li>
              <li><Link href="/about" className="hover:text-nara-gold">เกี่ยวกับเรา</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="heading-display text-base text-nara-gold">ฟุตบอล</h3>
            <span className="divider-gold mt-2 block" />
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><Link href="/fixtures" className="hover:text-nara-gold">โปรแกรม/ผล</Link></li>
              <li><Link href="/squad" className="hover:text-nara-gold">รายชื่อนักเตะ</Link></li>
              <li><Link href="/table" className="hover:text-nara-gold">ตารางคะแนน</Link></li>
              <li><Link href="/news" className="hover:text-nara-gold">ข่าวสาร</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="heading-display text-base text-nara-gold">ติดต่อสโมสร</h3>
            <span className="divider-gold mt-2 block" />
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-nara-gold shrink-0" />
                <span>สนามกีฬากลางจังหวัดนราธิวาส อ.เมือง จ.นราธิวาส</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-nara-gold shrink-0" />
                <a href="mailto:contact@naraunited.fc" className="hover:text-nara-gold">
                  contact@naraunited.fc
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-nara-gold shrink-0" />
                <span>+66 (0) 73-XXX-XXXX</span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-nara-gold px-5 py-2.5 text-sm font-bold text-nara-green-deeper hover:bg-nara-gold-light transition shine-on-hover"
            >
              ส่งข้อความถึงสโมสร →
            </Link>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/10 bg-black/40">
        <Container className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between py-4 text-xs text-white/55">
          <span>© {year} Nara United Football Club. สงวนลิขสิทธิ์.</span>
          <span className="tracking-widest uppercase">
            Built with passion · Designed for victory
          </span>
        </Container>
      </div>
    </footer>
  );
}
