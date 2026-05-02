"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { href: "/", label: "หน้าแรก" },
  { href: "/fixtures", label: "โปรแกรม/ผล" },
  { href: "/squad", label: "ผู้เล่น" },
  { href: "/news", label: "ข่าวสาร" },
  { href: "/table", label: "ตารางคะแนน" },
  { href: "/about", label: "เกี่ยวกับ" },
  { href: "/contact", label: "ติดต่อ" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-nara-green-deeper/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/10"
          : "bg-gradient-to-b from-nara-green-deeper/95 via-nara-green-dark/85 to-nara-green-dark/40 backdrop-blur-sm",
      )}
    >
      <div className="hidden md:block bg-black/30 border-b border-white/5 text-[11px] text-white/60 animate-fade-in-down">
        <Container className="flex h-7 items-center justify-between">
          <span className="tracking-widest uppercase text-nara-gold/80">
            Nara United FC · Est. 2010
          </span>
          <span className="tracking-widest">
            กอและพิฆาต · ทีมแห่งจิตวิญญาณ
          </span>
        </Container>
      </div>

      <Container className="flex h-16 sm:h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-3 font-display font-extrabold tracking-tight text-white shine-on-hover rounded-md pr-2 animate-fade-in-left"
        >
          <Logo size="md" priority className="transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110" />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="heading-display text-xl sm:text-2xl text-white">
              NARA UNITED
            </span>
            <span className="text-[10px] tracking-[0.3em] text-nara-gold/90 mt-1">
              กอและพิฆาต
            </span>
          </span>
        </Link>

        <nav
          className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-black/30 backdrop-blur px-1 py-1 animate-fade-in-down delay-100"
          aria-label="หลัก"
        >
          {NAV_LINKS.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-semibold transition",
                  active
                    ? "bg-nara-gold text-nara-green-deeper shadow"
                    : "text-white/85 hover:text-nara-gold hover:-translate-y-px",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 animate-fade-in-right">
          <Link
            href="/fixtures"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-nara-gold/60 px-4 py-2 text-sm font-bold text-nara-gold hover:bg-nara-gold hover:text-nara-green-deeper transition shine-on-hover group"
          >
            ตั๋วเข้าชม
            <span aria-hidden className="icon-bounce">→</span>
          </Link>
          <div className="lg:hidden">
            <MobileNav links={[...NAV_LINKS]} />
          </div>
        </div>
      </Container>
    </header>
  );
}

export { NAV_LINKS };
