import Link from "next/link";
import { logoutAction } from "../actions";
import { requireAdminSession } from "@/lib/auth/session";
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
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "ภาพรวม", icon: LayoutDashboard },
  { href: "/admin/players", label: "นักเตะ", icon: Users },
  { href: "/admin/matches", label: "การแข่งขัน", icon: CalendarDays },
  { href: "/admin/news", label: "ข่าวสาร", icon: Newspaper },
  { href: "/admin/standings", label: "ตารางคะแนน", icon: ListOrdered },
  { href: "/admin/sponsors", label: "สปอนเซอร์", icon: Award },
  { href: "/admin/staff", label: "ทีมงาน", icon: Briefcase },
  { href: "/admin/messages", label: "ข้อความติดต่อ", icon: Inbox },
  { href: "/admin/users", label: "ผู้ใช้งาน", icon: UserCog, adminOnly: true },
] as const;

export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireAdminSession();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 bg-nara-green-dark text-white flex flex-col">
        <div className="p-4 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-nara-gold text-nara-green-dark font-black">
              N
            </span>
            <span className="font-display font-extrabold tracking-tight">
              NARA ADMIN
            </span>
          </Link>
        </div>
        <nav className="p-2 flex-1 overflow-y-auto" aria-label="admin">
          {NAV.filter((n) => !("adminOnly" in n) || profile.role === "admin").map(
            (n) => {
              const Icon = n.icon;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-nara-gold"
                >
                  <Icon className="h-4 w-4" />
                  {n.label}
                </Link>
              );
            }
          )}
        </nav>
        <div className="p-3 border-t border-white/10 text-xs">
          <div className="px-2 py-1">
            <div className="font-semibold truncate">
              {profile.full_name ?? profile.email}
            </div>
            <div className="text-white/60 uppercase">{profile.role}</div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="mt-2 flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              ออกจากระบบ
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-6 sm:p-8">{children}</main>
    </div>
  );
}
