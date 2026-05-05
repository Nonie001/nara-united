"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const total = Math.floor(ms / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds, done: ms === 0 };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export function Countdown({ target }: { target: string }) {
  const [t, setT] = useState(() => diff(new Date(target).getTime()));

  useEffect(() => {
    const id = setInterval(() => setT(diff(new Date(target).getTime())), 1000);
    return () => clearInterval(id);
  }, [target]);

  const items = [
    { v: t.days, l: "วัน" },
    { v: t.hours, l: "ชม." },
    { v: t.minutes, l: "นาที" },
    { v: t.seconds, l: "วินาที" },
  ];

  if (t.done) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-nara-red/20 border border-nara-red/40 px-4 py-2 text-sm font-bold text-nara-red">
        <span className="h-2 w-2 rounded-full bg-nara-red live-dot" />
        เริ่มแล้ว
      </div>
    );
  }

  return (
    <div
      className="grid w-full max-w-xs sm:max-w-none sm:inline-grid grid-cols-4 gap-1.5 sm:gap-3"
      role="timer"
      aria-label="นับถอยหลังสู่การแข่งขัน"
    >
      {items.map((it) => (
        <div
          key={it.l}
          className="rounded-lg border border-white/10 bg-black/30 backdrop-blur px-1.5 py-2 sm:px-3 text-center sm:min-w-[60px]"
        >
          <div className="heading-display text-xl sm:text-3xl text-nara-gold tabular-nums">
            {pad(it.v)}
          </div>
          <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-white/60">
            {it.l}
          </div>
        </div>
      ))}
    </div>
  );
}
