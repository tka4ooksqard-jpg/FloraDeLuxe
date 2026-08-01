"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { hero } from "@/lib/content/home";
import { cn } from "@/lib/utils";

/** Peak parallax travel in pixels. Deliberately small — it should be felt, not seen. */
const PARALLAX_RANGE = 9;

/**
 * The hero image column.
 *
 * The picture is never framed: a multi-stop mask dissolves its edges into the
 * bordeaux field, so there is no border, no card shadow and no visible corner
 * anywhere. Client-side only because of the pointer parallax, which ignores
 * touch input and readers who ask for reduced motion.
 */
export function HeroVisual({ className }: { className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let offsetX = 0;
    let offsetY = 0;

    const apply = () => {
      frame = 0;
      node.style.setProperty("--hero-px", `${offsetX.toFixed(2)}px`);
      node.style.setProperty("--hero-py", `${offsetY.toFixed(2)}px`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      // Touch and pen would drag the image around under the finger.
      if (event.pointerType !== "mouse") return;
      // Offset against the pointer, which reads as depth rather than drag.
      offsetX = -(event.clientX / window.innerWidth - 0.5) * 2 * PARALLAX_RANGE;
      offsetY = -(event.clientY / window.innerHeight - 0.5) * 2 * PARALLAX_RANGE * 0.6;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={cn("hero-media-mask relative overflow-hidden", className)}>
      {/* Oversized so the parallax never uncovers an edge. */}
      <div ref={frameRef} className="hero-parallax absolute -inset-4">
        <div className="hero-media-in absolute inset-0">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            blurDataURL={hero.image.blurDataURL}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Tints the inner edge toward the page colour so the seam disappears. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-[linear-gradient(to_top,rgb(19_5_8_/_0.72),transparent_46%)]",
          "lg:bg-[linear-gradient(to_right,rgb(19_5_8_/_0.85),rgb(19_5_8_/_0.12)_26%,transparent_48%)]",
        )}
      />
    </div>
  );
}
