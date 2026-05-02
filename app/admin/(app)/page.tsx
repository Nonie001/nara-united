import Link from "next/link";
import { Card, CardBody } from "@/components/shared/Card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

async function counts() {
  if (!isSupabaseConfigured()) return null;
  const sb = await createSupabaseServerClient();
  const [players, matches, news, messages] = await Promise.all([
    sb.from("players").select("*", { count: "exact", head: true }),
    sb
      .from("matches")
      .select("*", { count: "exact", head: true })
      .eq("status", "upcoming"),
    sb
      .from("news")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true),
    sb
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false),
  ]);
  return {
    players: players.count ?? 0,
    upcoming: matches.count ?? 0,
    news: news.count ?? 0,
    unread: messages.count ?? 0,
  };
}

export default async function AdminDashboard() {
  const c = await counts();

  const tiles = [
    { label: "นักเตะทั้งหมด", value: c?.players ?? 0, href: "/admin/players" },
    { label: "แมตช์ที่กำลังจะมาถึง", value: c?.upcoming ?? 0, href: "/admin/matches" },
    { label: "ข่าวเผยแพร่แล้ว", value: c?.news ?? 0, href: "/admin/news" },
    {
      label: "ข้อความค้างอ่าน",
      value: c?.unread ?? 0,
      href: "/admin/messages",
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold text-nara-green-dark">
          ภาพรวมระบบ
        </h1>
        <p className="text-sm text-gray-600">ยินดีต้อนรับเข้าสู่หลังบ้าน Nara United</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((t) => (
          <Link key={t.href} href={t.href}>
            <Card className="hover:shadow-md transition">
              <CardBody>
                <div className="text-sm text-gray-500">{t.label}</div>
                <div className="mt-1 font-display text-3xl font-extrabold text-nara-green-dark">
                  {t.value.toLocaleString("th-TH")}
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {!c ? (
        <Card>
          <CardBody>
            <p className="text-sm text-gray-700">
              ⚠ ยังไม่ได้เชื่อมต่อ Supabase — ดูคู่มือที่{" "}
              <code>supabase/README.md</code> เพื่อเริ่มต้น
            </p>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
