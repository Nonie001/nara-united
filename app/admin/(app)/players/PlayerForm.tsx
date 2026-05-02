"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, TextArea, Select } from "@/components/admin/FormField";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button, LinkButton } from "@/components/shared/Button";
import type { Player } from "@/types/database";

type Props = {
  initial?: Partial<Player>;
  action: (formData: FormData) => Promise<void>;
};

export function PlayerForm({ initial, action }: Props) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    initial?.photo_url ?? null
  );
  const [pending, setPending] = useState(false);
  const router = useRouter();

  return (
    <form
      action={async (fd) => {
        if (photoUrl) fd.set("photo_url", photoUrl);
        setPending(true);
        try {
          await action(fd);
        } finally {
          setPending(false);
          router.refresh();
        }
      }}
      className="grid gap-6 md:grid-cols-3"
    >
      <div className="md:col-span-1">
        <ImageUploader
          bucket="players"
          defaultUrl={photoUrl}
          onUploaded={setPhotoUrl}
          label="รูปโปรไฟล์"
        />
      </div>

      <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
        <Field label="ชื่อ-นามสกุล" required>
          <TextInput
            name="name_th"
            required
            defaultValue={initial?.name_th ?? ""}
          />
        </Field>
        <Field label="เบอร์เสื้อ">
          <TextInput
            name="jersey_number"
            type="number"
            min={0}
            max={99}
            defaultValue={initial?.jersey_number ?? ""}
          />
        </Field>
        <Field label="ตำแหน่ง" required>
          <Select name="position" defaultValue={initial?.position ?? "MF"}>
            <option value="GK">ผู้รักษาประตู (GK)</option>
            <option value="DF">กองหลัง (DF)</option>
            <option value="MF">กองกลาง (MF)</option>
            <option value="FW">กองหน้า (FW)</option>
          </Select>
        </Field>
        <Field label="สัญชาติ">
          <TextInput
            name="nationality"
            defaultValue={initial?.nationality ?? "ไทย"}
          />
        </Field>
        <Field label="วันเกิด">
          <TextInput
            name="date_of_birth"
            type="date"
            defaultValue={initial?.date_of_birth ?? ""}
          />
        </Field>
        <Field label="ส่วนสูง (ซม.)">
          <TextInput
            name="height_cm"
            type="number"
            defaultValue={initial?.height_cm ?? ""}
          />
        </Field>
        <Field label="น้ำหนัก (กก.)">
          <TextInput
            name="weight_kg"
            type="number"
            defaultValue={initial?.weight_kg ?? ""}
          />
        </Field>
        <div className="flex items-end">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={initial?.is_active ?? true}
              className="h-4 w-4"
            />
            <span className="text-sm">นักเตะปัจจุบัน (active)</span>
          </label>
        </div>

        <div className="sm:col-span-2">
          <Field label="ประวัติ">
            <TextArea
              name="bio_th"
              rows={5}
              defaultValue={initial?.bio_th ?? ""}
            />
          </Field>
        </div>

        <div className="sm:col-span-2 flex gap-2">
          <Button type="submit" disabled={pending}>
            {pending ? "กำลังบันทึก..." : "บันทึก"}
          </Button>
          <LinkButton href="/admin/players" variant="ghost">
            ยกเลิก
          </LinkButton>
        </div>
      </div>
    </form>
  );
}
