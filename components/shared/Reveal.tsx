"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale" | "fade";

type Props = {
  children: ReactNode;
  /** Animation direction */
  direction?: Direction;
  /** Delay in ms */
  delay?: number;
  /** Element to render */
  as?: ElementType;
  /** Extra className */
  className?: string;
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
  /** Trigger only once (default true) */
  once?: boolean;
};

const baseClass: Record<Direction, string> = {
  up: "reveal",
  left: "reveal reveal-left",
  right: "reveal reveal-right",
  scale: "reveal reveal-scale",
  fade: "reveal",
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
  threshold = 0.15,
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  const TagComponent = Tag as ElementType;

  return (
    <TagComponent
      ref={ref}
      className={`${baseClass[direction]} ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </TagComponent>
  );
}
