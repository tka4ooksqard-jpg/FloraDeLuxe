"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds, applied through a CSS custom property. */
  delay?: number;
  as?: ElementType;
};

/**
 * Fades content in once it scrolls into view.
 *
 * The transition itself lives in CSS (`.reveal`), which is also where
 * `prefers-reduced-motion` disables it. The observer flips a data attribute on
 * the DOM node directly instead of going through React state — there is nothing
 * to re-render, and it keeps long pages from queueing dozens of state updates.
 */
export function Reveal({ children, className, delay = 0, as }: RevealProps) {
  const Component = as ?? "div";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.dataset.revealed = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.dataset.revealed = "true";
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      data-revealed="false"
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </Component>
  );
}
