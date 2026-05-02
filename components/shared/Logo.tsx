import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const sizeMap: Record<Size, number> = {
  xs: 24,
  sm: 32,
  md: 44,
  lg: 64,
  xl: 96,
  "2xl": 160,
};

export function Logo({
  size = "md",
  className,
  priority = false,
  glow = false,
}: {
  size?: Size;
  className?: string;
  priority?: boolean;
  glow?: boolean;
}) {
  const px = sizeMap[size];
  return (
    <span
      className={cn(
        "relative inline-block shrink-0",
        glow &&
          "drop-shadow-[0_0_24px_rgba(244,185,66,0.45)] sm:drop-shadow-[0_0_48px_rgba(244,185,66,0.55)]",
        className,
      )}
      style={{ width: px, height: px }}
    >
      <Image
        src="/logo_nara.png"
        alt="Nara United"
        fill
        sizes={`${px}px`}
        priority={priority}
        className="object-contain"
      />
    </span>
  );
}
