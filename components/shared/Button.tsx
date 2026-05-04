import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "ink";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold uppercase tracking-[0.08em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-nara-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Primary = solid gold (signature CTA)
  primary:
    "bg-nara-gold text-nara-ink hover:bg-nara-gold-light shadow-sm",
  // Secondary = solid dark (formal corporate)
  secondary:
    "bg-nara-ink text-white hover:bg-black",
  // Outline = neutral on light bg
  outline:
    "border border-gray-300 bg-white text-nara-ink hover:border-nara-gold hover:text-nara-gold-dark",
  // Subtle text-style action
  ghost:
    "text-nara-ink hover:bg-nara-ink/5",
  danger:
    "bg-nara-red text-white hover:bg-red-700",
  ink:
    "bg-nara-ink text-white hover:bg-black",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  size?: Size;
};

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
