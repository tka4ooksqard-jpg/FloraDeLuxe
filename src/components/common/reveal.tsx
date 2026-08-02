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

const observers = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver() {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const done = observers.get(entry.target);
          if (done) {
            done();
            observers.delete(entry.target);
            sharedObserver?.unobserve(entry.target);
          }
        }
      },
      /* Softer bottom margin so short mobile viewports still trigger. */
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
  }
  return sharedObserver;
}

/**
 * Fades content in once it scrolls into view.
 *
 * Uses one shared IntersectionObserver for all instances. The transition lives
 * in CSS (`.reveal`); prefers-reduced-motion and noscript keep content visible.
 */
export function Reveal({ children, className, delay = 0, as }: RevealProps) {
  const Component = as ?? "div";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      node.dataset.revealed = "true";
    };

    const observer = getSharedObserver();
    if (!observer) {
      reveal();
      return;
    }

    observers.set(node, reveal);
    observer.observe(node);
    /* Safety net: never leave content invisible if IO never fires. */
    const fallback = window.setTimeout(reveal, 2200);

    return () => {
      observers.delete(node);
      observer.unobserve(node);
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
