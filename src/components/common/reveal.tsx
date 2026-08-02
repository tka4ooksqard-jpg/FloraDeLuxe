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

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      node.dataset.revealed = "true";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        }
      },
      /* Softer bottom margin so short mobile viewports still trigger. */
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    /* Safety net: never leave content invisible if IO never fires. */
    const fallback = window.setTimeout(reveal, 2200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
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
