"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TextInput, TextArea, Select } from "@/components/admin/FormField";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Button, LinkButton } from "@/components/shared/Button";
import type { News } from "@/types/database";

type Props = {
  initial?: Partial<News>;
  action: (fd: FormData) => Promise<void>;
};

export function NewsForm({ initial, action }: Props) {
  const [cover, setCover] = useState<string | null>(
    initial?.cover_url ?? null
  );
  const [json, setJson] = useState<unknown>(initial?.content_json ?? null);
  const [html, setHtml] = useState<string>(initial?.content_html ?? "");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  return (
    <form
      action={async (fd) => {
        if (cover) fd.set("cover_url", cover);
        fd.set("content_json", JSON.stringify(json ?? {}));
        fd.set("content_html", html);
        setPending(true);
        try {
          await action(fd);
        } finally {
          setPending(false);
          router.refresh();
        }
      }}
      className="grid gap-6"
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <ImageUploader
            bucket="news"
            defaultUrl={cover}
            onUploaded={setCover}
            label="รูปหน้าปก"
          />
        </div>

        <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="หัวข้อข่าว" required>
              <TextInput
                name="title_th"
                required
                defaultValue={initial?.title_th ?? ""}
              />
            </Field>
          </div>
          <Field label="Slug (เว้นว่างเพื่อสร้างอัตโนมัติ)">
            <TextInput name="slug" defaultValue={initial?.slug ?? ""} />
          </Field>
          <Field label="หมวดหมู่" required>
            <Select name="category" defaultValue={initial?.category ?? "announcement"}>
              <option value="match">แมตช์</option>
              <option value="transfer">ตลาดซื้อขาย</option>
              <option value="community">ชุมชน</option>
              <option value="announcement">ประกาศ</option>
              <option value="interview">สัมภาษณ์</option>
            </Select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="สรุปข่าว (excerpt)">
              <TextArea name="excerpt_th" rows={2} defaultValue={initial?.excerpt_th ?? ""} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name="is_published"
                defaultChecked={initial?.is_published ?? false}
                className="h-4 w-4"
              />
              <span className="text-sm">เผยแพร่ทันที</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">เนื้อหา</label>
        <RichTextEditor
          defaultJson={json}
          onChange={(j, h) => {
            setJson(j);
            setHtml(h);
          }}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "กำลังบันทึก..." : "บันทึก"}
        </Button>
        <LinkButton href="/admin/news" variant="ghost">
          ยกเลิก
        </LinkButton>
      </div>
    </form>
  );
}
