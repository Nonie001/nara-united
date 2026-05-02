"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, Select } from "@/components/admin/FormField";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/shared/Button";
import type { Sponsor } from "@/types/database";

type Props = {
  initial?: Partial<Sponsor> & { id?: string };
  action: (id: string | null, fd: FormData) => Promise<void>;
};

export function SponsorForm({ initial, action }: Props) {
  const [logo, setLogo] = useState<string | null>(initial?.logo_url ?? null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  return (
    <form
      action={async (fd) => {
        if (logo) fd.set("logo_url", logo);
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
      <Field label="ชื่อสปอนเซอร์" required>
        <TextInput name="name" required defaultValue={initial?.name ?? ""} />
      </Field>
      <Field label="เว็บไซต์">
        <TextInput
          name="website_url"
          type="url"
          defaultValue={initial?.website_url ?? ""}
        />
      </Field>
      <Field label="ระดับ">
        <Select name="tier" defaultValue={initial?.tier ?? "partner"}>
          <option value="main">หลัก (Main)</option>
          <option value="official">ทางการ (Official)</option>
          <option value="partner">พันธมิตร (Partner)</option>
        </Select>
      </Field>
      <Field label="ลำดับการแสดง">
        <TextInput
          name="display_order"
          type="number"
          min={0}
          defaultValue={initial?.display_order ?? 0}
        />
      </Field>
      <div className="sm:col-span-2">
        <ImageUploader
          bucket="sponsors"
          defaultUrl={logo}
          onUploaded={setLogo}
          label="โลโก้"
        />
      </div>
      <div className="sm:col-span-2 flex items-center justify-between">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={initial?.is_active ?? true}
            className="h-4 w-4"
          />
          <span className="text-sm">แสดงผล (active)</span>
        </label>
        <Button type="submit" disabled={pending}>
          {pending ? "กำลังบันทึก..." : initial?.id ? "อัปเดต" : "เพิ่ม"}
        </Button>
      </div>
    </form>
  );
}
