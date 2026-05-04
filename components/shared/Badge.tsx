import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

type Variant =
  | "default"
  | "neutral"
  | "outline"
  | "gold"
  | "ink"
  | "live"
  | "upcoming"
  | "ft"
  | "win"
  | "draw"
  | "loss";

const variants: Record<Variant, string> = {
  default: "bg-gray-100 text-gray-700",
  neutral: "bg-gray-100 text-gray-700",
  outline: "border border-gray-300 bg-white text-gray-700",
  gold: "bg-nara-gold text-nara-ink",
  ink: "bg-nara-ink text-white",
  live: "bg-nara-red text-white animate-pulse",
  upcoming: "border border-nara-gold/60 bg-nara-gold/10 text-nara-gold-dark",
  ft: "bg-gray-700 text-white",
  win: "bg-win/15 text-win border border-win/30",
  draw: "bg-draw/15 text-[#a16207] border border-draw/30",
  loss: "bg-loss/10 text-loss border border-loss/30",
};

export function Badge({
  variant = "default",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] leading-5",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
