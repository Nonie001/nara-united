"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, Select } from "@/components/admin/FormField";
import { Button, LinkButton } from "@/components/shared/Button";
import type { Match, Stadium } from "@/types/database";

type Props = {
  initial?: Partial<Match>;
  stadiums: Stadium[];
  action: (formData: FormData) => Promise<void>;
};

function toDateTimeLocal(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 16);
}

export function MatchForm({ initial, stadiums, action }: Props) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  return (
    <form
      action={async (fd) => {
        setPending(true);
        try {
          await action(fd);
        } finally {
          setPending(false);
          router.refresh();
        }
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <Field label="ฤดูกาล" required>
        <TextInput name="season" required defaultValue={initial?.season ?? "2025-26"} />
      </Field>
      <Field label="รายการแข่งขัน" required>
        <TextInput
          name="competition"
          required
          defaultValue={initial?.competition ?? "Thai League 3"}
        />
      </Field>
      <Field label="รอบ/นัดที่">
        <TextInput name="round" defaultValue={initial?.round ?? ""} />
      </Field>
      <Field label="วันและเวลา" required>
        <TextInput
          name="kickoff_at"
          type="datetime-local"
          required
          defaultValue={toDateTimeLocal(initial?.kickoff_at)}
        />
      </Field>
      <Field label="คู่แข่ง" required>
        <TextInput name="opponent" required defaultValue={initial?.opponent ?? ""} />
      </Field>
      <Field label="โลโก้คู่แข่ง (URL)">
        <TextInput
          name="opponent_logo_url"
          type="url"
          defaultValue={initial?.opponent_logo_url ?? ""}
        />
      </Field>
      <Field label="สนาม">
        <Select name="stadium_id" defaultValue={initial?.stadium_id ?? ""}>
          <option value="">— เลือกสนาม —</option>
          {stadiums.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name_th}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="เหย้า / เยือน">
        <Select
          name="is_home"
          defaultValue={String(initial?.is_home ?? true)}
        >
          <option value="true">เหย้า (Home)</option>
          <option value="false">เยือน (Away)</option>
        </Select>
      </Field>
      <Field label="สถานะ" required>
        <Select name="status" defaultValue={initial?.status ?? "upcoming"}>
          <option value="upcoming">ยังไม่แข่ง</option>
          <option value="live">กำลังแข่ง</option>
          <option value="finished">จบแล้ว</option>
          <option value="postponed">เลื่อน/ยกเลิก</option>
        </Select>
      </Field>
      <Field label="External ID (สำหรับ sync)">
        <TextInput name="external_id" defaultValue={initial?.external_id ?? ""} />
      </Field>
      <Field label="คะแนนเหย้า">
        <TextInput
          name="home_score"
          type="number"
          min={0}
          defaultValue={initial?.home_score ?? ""}
        />
      </Field>
      <Field label="คะแนนเยือน">
        <TextInput
          name="away_score"
          type="number"
          min={0}
          defaultValue={initial?.away_score ?? ""}
        />
      </Field>

      <div className="sm:col-span-2 flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "กำลังบันทึก..." : "บันทึก"}
        </Button>
        <LinkButton href="/admin/matches" variant="ghost">
          ยกเลิก
        </LinkButton>
      </div>
    </form>
  );
}
