import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { Reveal } from "@/components/shared/Reveal";
import { HeroBanner } from "@/components/features/hero/HeroBanner";
import { MatchHero } from "@/components/features/matches/MatchHero";
import { MatchCard } from "@/components/features/matches/MatchCard";
import { NewsCard } from "@/components/features/news/NewsCard";
import { SponsorStrip } from "@/components/features/sponsors/SponsorStrip";
import {
  getNextMatch,
  getLatestResult,
} from "@/lib/queries/matches";
import { listNews } from "@/lib/queries/news";
import { listSponsors } from "@/lib/queries/sponsors";
import Link from "next/link";
import { Newspaper, Users, Calendar, Trophy } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [nextMatch, latestResult, news, sponsors] = await Promise.all([
    getNextMatch(),
    getLatestResult(),
    listNews({ limit: 7 }),
    listSponsors(),
  ]);

  const featured = news.items[0];
  const rest = news.items.slice(1, 5);

  return (
    <div className="bg-white">
      {/* HERO */}
      <HeroBanner />

      {/* MATCH HERO + LATEST RESULT */}
      <Container className="-mt-10 sm:-mt-16 relative z-10 pb-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal direction="up" className="lg:col-span-2">
            <MatchHero match={nextMatch} />
          </Reveal>
          <Reveal direction="right" delay={150} className="flex flex-col">
            <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 h-full flex flex-col">
              <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-nara-green">
                Latest Result
              </div>
              <h3 className="heading-display mt-2 text-2xl text-nara-green-deeper">
                ผลล่าสุด
              </h3>
              <span className="divider-gold mt-2 block" />

              <div className="mt-5 flex-1">
                {latestResult ? (
                  <MatchCard match={latestResult} />
                ) : (
                  <div className="grid place-items-center text-center text-sm text-gray-500 h-full min-h-[160px] rounded-xl border border-dashed border-gray-300">
                    ยังไม่มีผลการแข่งขัน
                  </div>
                )}
              </div>

              <Link
                href="/fixtures"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-nara-green-deeper px-5 py-2.5 text-sm font-bold text-white hover:bg-nara-green-dark transition shine-on-hover"
              >
                ดูผลการแข่งขันทั้งหมด →
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* QUICK LINKS */}
      <Container className="pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Calendar, label: "โปรแกรมแข่งขัน", desc: "ทุกแมตช์ประจำฤดูกาล", href: "/fixtures" },
            { Icon: Users, label: "นักเตะของเรา", desc: "พบกับทีมชุดใหญ่", href: "/squad" },
            { Icon: Newspaper, label: "ข่าวสาร", desc: "อัปเดตล่าสุดจากสโมสร", href: "/news" },
            { Icon: Trophy, label: "ตารางคะแนน", desc: "อันดับและสถิติลีก", href: "/table" },
          ].map(({ Icon, label, desc, href }, i) => (
            <Reveal key={href} direction="up" delay={i * 100}>
              <Link
                href={href}
                className="group card-lift relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 block h-full"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-nara-gold via-nara-gold to-nara-green-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-nara-green-deeper text-nara-gold transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="mt-4 heading-display text-lg text-nara-green-deeper">
                  {label}
                </div>
                <p className="mt-1 text-sm text-gray-500">{desc}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-nara-green group-hover:translate-x-1 transition-transform">
                  เพิ่มเติม <span className="icon-bounce">→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* NEWS — dark section */}
      <section className="relative overflow-hidden bg-nara-green-deeper text-white py-16 sm:py-24">
        <div aria-hidden className="absolute inset-0 bg-pitch-stripes" />
        <div aria-hidden className="absolute inset-0 bg-noise opacity-40" />
        <div
          aria-hidden
          className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-nara-green/40 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-nara-gold/10 blur-3xl"
        />

        <Container className="relative">
          <SectionTitle
            invert
            eyebrow="Latest News"
            title="ข่าวสารล่าสุด"
            href="/news"
          />

          {news.items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center text-white/60">
              ยังไม่มีข่าวสาร
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-3 lg:auto-rows-fr">
              {featured ? (
                <Reveal direction="scale" className="lg:col-span-2 lg:row-span-2">
                  <NewsCard item={featured} featured />
                </Reveal>
              ) : null}
              {rest.map((n, i) => (
                <Reveal key={n.id} direction="up" delay={i * 100 + 100}>
                  <NewsCard item={n} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CTA stripe */}
      <section className="relative overflow-hidden bg-nara-gold text-nara-green-deeper animate-beam-sweep">
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_30%_50%,rgba(13,92,46,0.12),transparent_60%)]"
        />
        <Container className="relative py-12 sm:py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-nara-green-deeper/70">
                Join the family
              </div>
              <h3 className="heading-display mt-2 text-3xl sm:text-4xl">
                เป็นส่วนหนึ่งของกอและพิฆาต
              </h3>
              <p className="mt-2 max-w-xl text-sm sm:text-base text-nara-green-deeper/80">
                ติดตามข่าวสาร ติดต่อสโมสร หรือร่วมเป็นพาร์ทเนอร์อย่างเป็นทางการ
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-nara-green-deeper px-6 py-3 font-bold text-white hover:bg-nara-black transition shine-on-hover"
              >
                ติดต่อสโมสร →
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-nara-green-deeper px-6 py-3 font-bold text-nara-green-deeper hover:bg-nara-green-deeper hover:text-nara-gold transition"
              >
                รู้จักเรา
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* SPONSORS */}
      <Container className="py-16">
        <SponsorStrip sponsors={sponsors} />
      </Container>
    </div>
  );
}
