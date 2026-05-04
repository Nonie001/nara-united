import { cn } from "@/lib/utils/cn";
import type { Standing } from "@/types/database";

export function StandingsTable({
  rows,
  highlight = "Nara United",
}: {
  rows: Standing[];
  highlight?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
        ยังไม่มีข้อมูลตารางคะแนน
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-nara-ink text-white">
            <tr className="text-[11px] uppercase tracking-[0.15em]">
              <th className="px-3 py-3 text-left font-bold">#</th>
              <th className="px-3 py-3 text-left font-bold">ทีม</th>
              <th className="px-3 py-3 text-center font-bold">P</th>
              <th className="px-3 py-3 text-center font-bold">W</th>
              <th className="px-3 py-3 text-center font-bold">D</th>
              <th className="px-3 py-3 text-center font-bold">L</th>
              <th className="px-3 py-3 text-center font-bold">GF</th>
              <th className="px-3 py-3 text-center font-bold">GA</th>
              <th className="px-3 py-3 text-center font-bold">GD</th>
              <th className="px-3 py-3 text-center font-bold text-nara-gold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const me = r.team_name === highlight;
              return (
                <tr
                  key={r.id}
                  className={cn(
                    "border-t border-gray-100 transition",
                    me
                      ? "bg-nara-gold/15 font-semibold"
                      : "hover:bg-gray-50"
                  )}
                >
                  <td className={cn("px-3 py-2.5", me ? "text-nara-ink font-bold" : "text-gray-500")}>{r.position}</td>
                  <td className="px-3 py-2.5 text-nara-ink">
                    <span className="inline-flex items-center gap-2">
                      {me ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-nara-gold" />
                      ) : null}
                      {r.team_name}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center text-gray-700">{r.played}</td>
                  <td className="px-3 py-2.5 text-center text-gray-700">{r.won}</td>
                  <td className="px-3 py-2.5 text-center text-gray-700">{r.drawn}</td>
                  <td className="px-3 py-2.5 text-center text-gray-700">{r.lost}</td>
                  <td className="px-3 py-2.5 text-center text-gray-700">{r.goals_for}</td>
                  <td className="px-3 py-2.5 text-center text-gray-700">{r.goals_against}</td>
                  <td className="px-3 py-2.5 text-center text-gray-700">{r.goal_difference}</td>
                  <td className="px-3 py-2.5 text-center font-extrabold text-nara-ink">
                    {r.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
