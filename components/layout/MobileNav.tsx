"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils/cn";

type NavLink = { href: string; label: string };

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="เปิดเมนู"
        aria-expanded={open}
        className="grid h-10 w-10 place-items-center rounded-full border border-nara-gold/40 bg-nara-gold/10 text-nara-gold hover:bg-nara-gold hover:text-nara-green-deeper transition"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-[200] lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="เมนูหลัก"
            >
              {/* Backdrop */}
              <button
                type="button"
                aria-label="ปิดเมนู"
                onClick={() => setOpen(false)}
                className="absolute inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-md animate-fade-in"
              />

              {/* Drawer */}
              <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-hidden bg-nara-green-deeper text-white shadow-2xl animate-fade-in-right">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-pitch-stripes opacity-40 pointer-events-none"
                />
                <div
                  aria-hidden
                  className="absolute -top-32 -right-20 h-72 w-72 rounded-full bg-nara-gold/10 blur-3xl pointer-events-none"
                />
                <div
                  aria-hidden
                  className="absolute -bottom-40 -left-20 h-72 w-72 rounded-full bg-nara-green/30 blur-3xl pointer-events-none"
                />

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-black/20 px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <Logo size="sm" />
                    <div className="min-w-0">
                      <div className="heading-display text-base leading-none truncate">
                        NARA UNITED
                      </div>
                      <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-nara-gold/80">
                        Menu
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="ปิดเมนู"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:border-nara-gold/60 hover:bg-nara-gold/20"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Links */}
                <nav
                  className="relative z-10 flex-1 overflow-y-auto px-3 py-4"
                  aria-label="หลัก"
                >
                  <ul className="flex flex-col gap-1">
                    {links.map((l, i) => {
                      const active =
                        l.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(l.href);
                      return (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={() => setOpen(false)}
                            style={{ animationDelay: `${i * 40 + 80}ms` }}
                            className={cn(
                              "group flex animate-fade-in-right items-center justify-between gap-3 rounded-lg px-4 py-3 text-base font-semibold transition",
                              active
                                ? "bg-nara-gold text-nara-green-deeper shadow-md"
                                : "text-white/85 hover:bg-white/5 hover:text-nara-gold",
                            )}
                          >
                            <span className="truncate">{l.label}</span>
                            <ArrowRight
                              className={cn(
                                "h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5",
                                active ? "opacity-90" : "opacity-40",
                              )}
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Footer */}
                <div className="relative z-10 border-t border-white/10 bg-black/30 px-5 py-4">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-nara-gold/70">
                    Est. 2010
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white/90">
                    สโมสรฟุตบอลนราธิวาส ยูไนเต็ด
                  </div>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-nara-gold px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-nara-green-deeper transition hover:bg-nara-gold-light"
                  >
                    ติดต่อสโมสร
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
