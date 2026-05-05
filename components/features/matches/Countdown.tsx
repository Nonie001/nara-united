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
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  });

  useEffect(() => {
    setMounted(true);
    const update = () => setT(diff(new Date(target).getTime()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!mounted) {
    return (
      <div
        className="inline-flex items-baseline gap-1.5 font-mono tabular-nums opacity-40"
        aria-hidden
      >
        <span className="text-lg sm:text-xl font-bold text-nara-gold leading-none">
          --:--:--:--
        </span>
      </div>
    );
  }

  if (t.done) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-nara-red/20 border border-nara-red/40 px-3 py-1 text-xs font-bold text-nara-red">
        <span className="h-1.5 w-1.5 rounded-full bg-nara-red live-dot" />
        เริ่มแล้ว
      </div>
    );
  }

  const items = [
    { v: t.days, l: "D" },
    { v: t.hours, l: "H" },
    { v: t.minutes, l: "M" },
    { v: t.seconds, l: "S" },
  ];

  return (
    <div
      className="inline-flex items-baseline gap-1.5 font-mono tabular-nums"
      role="timer"
      aria-label="นับถอยหลังสู่การแข่งขัน"
    >
      {items.map((it, i) => (
        <span key={it.l} className="inline-flex items-baseline gap-0.5">
          <span className="text-lg sm:text-xl font-bold text-nara-gold leading-none">
            {pad(it.v)}
          </span>
          <span className="text-[10px] uppercase text-white/45 leading-none">
            {it.l}
          </span>
          {i < items.length - 1 && (
            <span className="text-white/20 text-sm leading-none ml-0.5">:</span>
          )}
        </span>
      ))}
    </div>
  );
}
