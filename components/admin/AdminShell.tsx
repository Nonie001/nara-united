"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Newspaper,
  ListOrdered,
  Award,
  Briefcase,
  Inbox,
  UserCog,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type AdminNavItem = {
  href: string;
  label: string;
  iconKey: keyof typeof ICONS;
  adminOnly?: boolean;
};

const ICONS = {
  dashboard: LayoutDashboard,
  players: Users,
  matches: CalendarDays,
  news: Newspaper,
  standings: ListOrdered,
  sponsors: Award,
  staff: Briefcase,
  messages: Inbox,
  users: UserCog,
} as const;

export const ADMIN_NAV: AdminNavItem[] = [
  { href: "/admin", label: "ภาพรวม", iconKey: "dashboard" },
  { href: "/admin/players", label: "นักเตะ", iconKey: "players" },
  { href: "/admin/matches", label: "การแข่งขัน", iconKey: "matches" },
  { href: "/admin/news", label: "ข่าวสาร", iconKey: "news" },
  { href: "/admin/standings", label: "ตารางคะแนน", iconKey: "standings" },
  { href: "/admin/sponsors", label: "สปอนเซอร์", iconKey: "sponsors" },
  { href: "/admin/staff", label: "ทีมงาน", iconKey: "staff" },
  { href: "/admin/messages", label: "ข้อความติดต่อ", iconKey: "messages" },
  { href: "/admin/users", label: "ผู้ใช้งาน", iconKey: "users", adminOnly: true },
];

type Profile = {
  email: string;
  full_name: string | null;
  role: string;
};

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

function SidebarContent({
  items,
  profile,
  logoutAction,
  onNavigate,
}: {
  items: AdminNavItem[];
  profile: Profile;
  logoutAction: () => void | Promise<void>;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col bg-nara-ink text-white">
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-nara-gold/40 to-transparent"
      />
      <div className="p-5 border-b border-white/10">
        <Link
          href="/admin"
          onClick={onNavigate}
          className="flex items-center gap-2.5"
        >
          <span className="grid h-9 w-9 place-items-center rounded-md bg-nara-gold text-nara-ink font-black heading-display">
            N
          </span>
          <div>
            <div className="heading-display tracking-wide">NARA ADMIN</div>
            <div className="text-[9px] uppercase tracking-[0.3em] text-nara-gold">
              Console
            </div>
          </div>
        </Link>
      </div>
      <nav className="p-2 flex-1 overflow-y-auto" aria-label="admin">
        {items.map((n) => {
          const Icon = ICONS[n.iconKey];
          const active = isActive(pathname, n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                active
                  ? "bg-white/5 text-nara-gold"
                  : "text-white/80 hover:bg-white/5 hover:text-nara-gold",
              )}
            >
              <Icon className="h-4 w-4" />
              {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/10 text-xs">
        <div className="px-2 py-1">
          <div className="font-semibold truncate text-white">
            {profile.full_name ?? profile.email}
          </div>
          <div className="text-nara-gold/80 uppercase tracking-[0.2em] text-[10px] mt-0.5">
            {profile.role}
          </div>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="mt-2 flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition"
          >
            <LogOut className="h-4 w-4" />
            ออกจากระบบ
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminShell({
  profile,
  logoutAction,
  children,
}: {
  profile: Profile;
  logoutAction: () => void | Promise<void>;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock scroll while drawer open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const items = ADMIN_NAV.filter(
    (n) => !n.adminOnly || profile.role === "admin",
  );

  const currentLabel =
    items.find((n) => isActive(pathname, n.href))?.label ?? "Admin";

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="relative hidden lg:flex w-64 shrink-0 border-r border-white/10">
        <SidebarContent
          items={items}
          profile={profile}
          logoutAction={logoutAction}
        />
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <aside className="relative h-full w-72 max-w-[85vw] shadow-2xl animate-fade-in-right">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="ปิดเมนู"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent
              items={items}
              profile={profile}
              logoutAction={logoutAction}
              onNavigate={() => setOpen(false)}
            />
          </aside>
        </div>
      ) : null}

      <div className="flex-1 min-w-0 flex flex-col bg-[#fafaf7]">
        {/* Mobile topbar */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center gap-3 border-b border-gray-200 bg-white/95 backdrop-blur px-4 h-14">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="เปิดเมนู"
            className="grid h-10 w-10 -ml-2 place-items-center rounded-md text-nara-ink hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link
            href="/admin"
            className="flex items-center gap-2 font-display font-extrabold tracking-tight text-nara-ink"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-nara-gold text-nara-ink font-black heading-display text-sm">
              N
            </span>
            <span className="text-sm">NARA ADMIN</span>
          </Link>
          <span className="ml-auto text-xs font-semibold text-gray-500 truncate">
            {currentLabel}
          </span>
        </div>

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
