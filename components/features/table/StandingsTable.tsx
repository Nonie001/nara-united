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
      <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        ยังไม่มีข้อมูลตารางคะแนน
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-nara-green text-white">
          <tr>
            <th className="px-3 py-2 text-left">#</th>
            <th className="px-3 py-2 text-left">ทีม</th>
            <th className="px-3 py-2 text-center">P</th>
            <th className="px-3 py-2 text-center">W</th>
            <th className="px-3 py-2 text-center">D</th>
            <th className="px-3 py-2 text-center">L</th>
            <th className="px-3 py-2 text-center">GF</th>
            <th className="px-3 py-2 text-center">GA</th>
            <th className="px-3 py-2 text-center">GD</th>
            <th className="px-3 py-2 text-center font-bold">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.id}
              className={cn(
                "border-t border-gray-100",
                r.team_name === highlight
                  ? "bg-nara-gold/20 font-semibold"
                  : "hover:bg-gray-50"
              )}
            >
              <td className="px-3 py-2 text-gray-500">{r.position}</td>
              <td className="px-3 py-2">{r.team_name}</td>
              <td className="px-3 py-2 text-center">{r.played}</td>
              <td className="px-3 py-2 text-center">{r.won}</td>
              <td className="px-3 py-2 text-center">{r.drawn}</td>
              <td className="px-3 py-2 text-center">{r.lost}</td>
              <td className="px-3 py-2 text-center">{r.goals_for}</td>
              <td className="px-3 py-2 text-center">{r.goals_against}</td>
              <td className="px-3 py-2 text-center">{r.goal_difference}</td>
              <td className="px-3 py-2 text-center font-bold text-nara-green-dark">
                {r.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
