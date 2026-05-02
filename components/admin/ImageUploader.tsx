"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Props = {
  bucket: "players" | "news" | "sponsors" | "staff";
  defaultUrl?: string | null;
  onUploaded: (url: string) => void;
  label?: string;
};

export function ImageUploader({
  bucket,
  defaultUrl,
  onUploaded,
  label = "อัปโหลดรูป",
}: Props) {
  const [url, setUrl] = useState<string | null>(defaultUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    start(async () => {
      try {
        const sb = createSupabaseBrowserClient();
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await sb.storage
          .from(bucket)
          .upload(path, file, { contentType: file.type });
        if (upErr) throw upErr;
        const { data } = sb.storage.from(bucket).getPublicUrl(path);
        setUrl(data.publicUrl);
        onUploaded(data.publicUrl);
        router.refresh();
      } catch (err) {
        setError((err as Error).message);
      }
    });
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          className="h-32 w-32 object-cover rounded-md border border-gray-200"
        />
      ) : (
        <div className="h-32 w-32 rounded-md border border-dashed border-gray-300 grid place-items-center text-gray-400 text-3xl">
          📷
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleChange} disabled={pending} />
      {pending ? <p className="text-xs text-gray-500">กำลังอัปโหลด...</p> : null}
      {error ? <p className="text-xs text-nara-red">{error}</p> : null}
    </div>
  );
}
