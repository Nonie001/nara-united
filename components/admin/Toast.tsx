"use client";

import { useEffect, useState } from "react";

export function Toast() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === "toast" && typeof e.data.message === "string") {
        setMsg(e.data.message);
        setTimeout(() => setMsg(null), 3000);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!msg) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-md bg-nara-green-dark text-white px-4 py-2 shadow-lg">
      {msg}
    </div>
  );
}
