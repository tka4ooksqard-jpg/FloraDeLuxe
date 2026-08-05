"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { brandLogo } from "@/lib/brand-logo";
import { hero } from "@/lib/content/home";
import { cn } from "@/lib/utils";

/**
 * Full-bleed hero photograph for the right column — no frame, no card.
 * Soft radial dissolve + cinematic grade; ken-burns is CSS-only.
 * Scroll parallax is deliberately slight (~10%) so the still moves slower than copy.
 */
export function HeroVisual({ className }: { className?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    /* Skip parallax work on phones/tablets — saves main-thread; layout unchanged. */
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    let frame = 0;
    let offsetX = 0;
    let offsetY = 0;
    let scrollY = 0;

    const apply = () => {
      frame = 0;
      node.style.setProperty("--hero-px", `${offsetX.toFixed(2)}px`);
      node.style.setProperty("--hero-py", `${(offsetY + scrollY).toFixed(2)}px`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      offsetX = -(event.clientX / window.innerWidth - 0.5) * 8;
      offsetY = -(event.clientY / window.innerHeight - 0.5) * 5;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const handleScroll = () => {
      // ~10% of scroll distance, capped so it stays editorial, not theatrical.
      scrollY = Math.min(window.scrollY * 0.1, 140);
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    handleScroll();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={cn("hero-media-mask relative overflow-hidden", className)}>
      <div ref={frameRef} className="hero-parallax absolute -inset-[3%]">
        <div className="hero-media-in absolute inset-0">
          <div className="hero-kenburns absolute inset-0">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              fetchPriority="high"
              placeholder="blur"
              blurDataURL={hero.image.blurDataURL}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="hero-photo-grade object-cover object-[center_28%] lg:object-[center_36%]"
            />

            <div
              aria-hidden="true"
              className="hero-brand-sign pointer-events-none absolute top-[16%] right-[20%] z-[1] hidden w-[170px] md:block lg:w-[220px]"
            >
              <Image
                src={brandLogo.src}
                alt=""
                width={brandLogo.width}
                height={brandLogo.height}
                sizes="220px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="hero-media-veil-mobile absolute inset-0 lg:hidden"
      />
      <div aria-hidden="true" className="hero-media-veil absolute inset-0 hidden lg:block" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(38%_34%_at_72%_38%,rgb(213_175_99_/_0.16),transparent_70%)] mix-blend-soft-light"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(28%_26%_at_78%_30%,rgb(255_230_190_/_0.1),transparent_65%)] mix-blend-screen"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_100%_at_70%_48%,transparent_52%,rgb(18_7_10_/_0.26)_100%)]"
      />
    </div>
  );
}
