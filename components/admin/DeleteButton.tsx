"use client";

import { useTransition } from "react";

export function DeleteButton({
  action,
  confirmLabel = "ยืนยันการลบ?",
}: {
  action: () => Promise<void>;
  confirmLabel?: string;
}) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(confirmLabel)) start(action);
      }}
      className="text-nara-red hover:underline text-sm disabled:opacity-50"
    >
      {pending ? "กำลังลบ..." : "ลบ"}
    </button>
  );
}
