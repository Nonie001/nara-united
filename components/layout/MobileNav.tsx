"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils/cn";

type NavLink = { href: string; label: string };

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="เปิดเมนู"
        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white hover:bg-nara-gold/20 hover:border-nara-gold/60 transition"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-nara-green-deeper text-white shadow-2xl flex flex-col animate-fade-in-right">
            <div
              aria-hidden
              className="absolute inset-0 bg-pitch-stripes opacity-50 pointer-events-none"
            />
            <div className="relative flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Logo size="sm" />
                <div>
                  <div className="heading-display text-lg leading-none">
                    NARA UNITED
                  </div>
                  <div className="text-[10px] tracking-[0.25em] text-nara-gold/80 mt-1">
                    เมนู
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="ปิดเมนู"
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="relative flex flex-col p-3 gap-1" aria-label="หลัก">
              {links.map((l, i) => {
                const active =
                  l.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={{ animationDelay: `${i * 50 + 100}ms` }}
                    className={cn(
                      "group animate-fade-in-right rounded-lg px-4 py-3 text-base font-semibold transition flex items-center justify-between",
                      active
                        ? "bg-nara-gold text-nara-green-deeper"
                        : "text-white/85 hover:bg-white/5 hover:text-nara-gold hover:translate-x-1",
                    )}
                  >
                    {l.label}
                    <span aria-hidden className="opacity-50 icon-bounce">→</span>
                  </Link>
                );
              })}
            </nav>
            <div className="relative mt-auto p-5 border-t border-white/10 text-xs text-white/55 tracking-widest uppercase">
              Est. 2010 · กอและพิฆาต
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
