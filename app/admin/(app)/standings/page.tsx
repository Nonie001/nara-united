import Link from "next/link";
import { Card, CardBody } from "@/components/shared/Card";
import { PageHeader } from "@/components/admin/PageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { listStandings } from "@/lib/queries/standings";
import { Field, TextInput, Select } from "@/components/admin/FormField";
import { Button } from "@/components/shared/Button";
import {
  upsertStandingAction,
  deleteStandingAction,
} from "./actions";

const CURRENT_SEASON = "2025-26";

type Props = { searchParams: Promise<{ season?: string }> };

export default async function AdminStandingsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const season = sp.season ?? CURRENT_SEASON;
  const rows = await listStandings(season);

  return (
    <div className="space-y-6">
      <PageHeader title="ตารางคะแนน" description={`ฤดูกาล ${season}`} />

      <Card>
        <CardBody>
          <h2 className="font-display font-bold mb-3">เพิ่ม/แก้ไขทีม</h2>
          <form action={upsertStandingAction} className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            <Field label="ฤดูกาล" required>
              <TextInput name="season" required defaultValue={season} />
            </Field>
            <Field label="ชื่อทีม" required>
              <TextInput name="team_name" required />
            </Field>
            <Field label="อันดับ" required>
              <TextInput name="position" type="number" min={1} required />
            </Field>
            <Field label="แหล่งข้อมูล">
              <Select name="source" defaultValue="manual">
                <option value="manual">manual</option>
                <option value="api">api</option>
              </Select>
            </Field>
            <Field label="แข่ง">
              <TextInput name="played" type="number" min={0} defaultValue={0} />
            </Field>
            <Field label="ชนะ">
              <TextInput name="won" type="number" min={0} defaultValue={0} />
            </Field>
            <Field label="เสมอ">
              <TextInput name="drawn" type="number" min={0} defaultValue={0} />
            </Field>
            <Field label="แพ้">
              <TextInput name="lost" type="number" min={0} defaultValue={0} />
            </Field>
            <Field label="ได้">
              <TextInput name="goals_for" type="number" min={0} defaultValue={0} />
            </Field>
            <Field label="เสีย">
              <TextInput name="goals_against" type="number" min={0} defaultValue={0} />
            </Field>
            <Field label="คะแนน">
              <TextInput name="points" type="number" min={0} defaultValue={0} />
            </Field>
            <div className="flex items-end col-span-2 sm:col-span-3 md:col-span-1">
              <Button type="submit" className="w-full">
                บันทึก / Upsert
              </Button>
            </div>
          </form>
          <p className="text-xs text-gray-500 mt-2">
            * Upsert ตาม (ฤดูกาล + ชื่อทีม) — บันทึกซ้ำเพื่ออัปเดต
          </p>
        </CardBody>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">ทีม</th>
                <th className="px-3 py-2 hidden sm:table-cell">P</th>
                <th className="px-3 py-2 hidden md:table-cell">W</th>
                <th className="px-3 py-2 hidden md:table-cell">D</th>
                <th className="px-3 py-2 hidden md:table-cell">L</th>
                <th className="px-3 py-2 hidden lg:table-cell">GF</th>
                <th className="px-3 py-2 hidden lg:table-cell">GA</th>
                <th className="px-3 py-2">Pts</th>
                <th className="px-3 py-2 hidden md:table-cell">Source</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-gray-100">
                  <td className="px-3 py-2">{r.position}</td>
                  <td className="px-3 py-2 font-medium">{r.team_name}</td>
                  <td className="px-3 py-2 hidden sm:table-cell">{r.played}</td>
                  <td className="px-3 py-2 hidden md:table-cell">{r.won}</td>
                  <td className="px-3 py-2 hidden md:table-cell">{r.drawn}</td>
                  <td className="px-3 py-2 hidden md:table-cell">{r.lost}</td>
                  <td className="px-3 py-2 hidden lg:table-cell">{r.goals_for}</td>
                  <td className="px-3 py-2 hidden lg:table-cell">{r.goals_against}</td>
                  <td className="px-3 py-2 font-bold">{r.points}</td>
                  <td className="px-3 py-2 hidden md:table-cell">{r.source}</td>
                  <td className="px-3 py-2 text-right">
                    <DeleteButton
                      action={async () => {
                        "use server";
                        await deleteStandingAction(r.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-3 py-8 text-center text-gray-500">
                    ยังไม่มีข้อมูล —{" "}
                    <Link
                      href="?season=2024-25"
                      className="text-nara-green underline"
                    >
                      ลองดูฤดูกาลอื่น
                    </Link>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
