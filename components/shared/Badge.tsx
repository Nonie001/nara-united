import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

type Variant =
  | "live"
  | "upcoming"
  | "ft"
  | "win"
  | "draw"
  | "loss"
  | "default"
  | "gold";

const variants: Record<Variant, string> = {
  live: "bg-nara-red text-white animate-pulse",
  upcoming: "bg-nara-green text-white",
  ft: "bg-gray-700 text-white",
  win: "bg-win text-white",
  draw: "bg-draw text-white",
  loss: "bg-loss text-white",
  default: "bg-gray-200 text-gray-800",
  gold: "bg-nara-gold text-nara-green-dark",
};

export function Badge({
  variant = "default",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
