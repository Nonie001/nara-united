"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, TextArea } from "@/components/admin/FormField";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/shared/Button";
import type { Staff } from "@/types/database";

type Props = {
  initial?: Partial<Staff> & { id?: string };
  action: (id: string | null, fd: FormData) => Promise<void>;
};

export function StaffForm({ initial, action }: Props) {
  const [photo, setPhoto] = useState<string | null>(initial?.photo_url ?? null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  return (
    <form
      action={async (fd) => {
        if (photo) fd.set("photo_url", photo);
        setPending(true);
        try {
          await action(initial?.id ?? null, fd);
        } finally {
          setPending(false);
          router.refresh();
        }
      }}
      className="grid gap-3 sm:grid-cols-2"
    >
      <Field label="ชื่อ-นามสกุล" required>
        <TextInput name="name_th" required defaultValue={initial?.name_th ?? ""} />
      </Field>
      <Field label="ตำแหน่ง" required>
        <TextInput name="role_th" required defaultValue={initial?.role_th ?? ""} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="ประวัติย่อ">
          <TextArea name="bio_th" rows={3} defaultValue={initial?.bio_th ?? ""} />
        </Field>
      </div>
      <Field label="ลำดับการแสดง">
        <TextInput
          name="display_order"
          type="number"
          min={0}
          defaultValue={initial?.display_order ?? 0}
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
          <span className="text-sm">แสดงผล (active)</span>
        </label>
      </div>
      <div className="sm:col-span-2">
        <ImageUploader
          bucket="staff"
          defaultUrl={photo}
          onUploaded={setPhoto}
          label="รูปโปรไฟล์"
        />
      </div>
      <div className="sm:col-span-2 flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? "กำลังบันทึก..." : initial?.id ? "อัปเดต" : "เพิ่ม"}
        </Button>
      </div>
    </form>
  );
}
