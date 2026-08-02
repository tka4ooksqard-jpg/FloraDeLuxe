import Link from "next/link";

import { CtaArrow } from "@/components/common/cta";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { aboutBrief, bridgeTrust } from "@/lib/content/home";
import { cn } from "@/lib/utils";

/**
 * Compact bridge after Hero / QuickNav — reinforces B2B trust, then eases
 * into the dark Delivery chapter. Not an About page.
 */
export function IntroSection() {
  return (
    <section
      aria-labelledby="intro-title"
      className="bridge-motion section-canvas-light seam-to-dark relative overflow-hidden"
    >
      <div className="container-hero relative z-10 pt-1 pb-12 sm:pb-14 md:pt-2 md:pb-16">
        <div className="grid max-w-[60rem] items-end gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 xl:gap-12">
          <Reveal>
            <p className="flex items-center gap-3.5 text-[0.75rem] font-medium tracking-[0.2em] text-brass uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-brass/55" />
              {aboutBrief.eyebrow}
            </p>
            <h2
              id="intro-title"
              className="font-display mt-6 text-[clamp(2.15rem,1.35rem+2.6vw,3.35rem)] leading-[1.02] font-normal tracking-[-0.025em] text-ink"
            >
              {aboutBrief.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="max-w-[18rem] space-y-0 text-[1.0625rem] leading-[1.55] font-medium tracking-[-0.01em] text-ink/80 lg:ml-auto lg:text-right">
              {aboutBrief.aside.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-5 lg:text-right">
              <Link
                href="/about"
                className="group/button inline-flex min-h-11 items-center gap-2 px-0 py-2 text-[0.875rem] font-medium tracking-[0.02em] text-bordeaux transition-colors duration-500 ease-[var(--ease-soft)] hover:text-brass"
              >
                {aboutBrief.linkLabel}
                <CtaArrow className="size-3.5 text-brass" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="mt-9 md:mt-10">
          <ul
            className={cn(
              "flex flex-wrap items-stretch gap-x-0 gap-y-6 rounded-[1.75rem] px-5 py-6 sm:px-7 sm:py-7",
              "border border-[rgba(35,7,13,0.08)] bg-[rgba(246,243,239,0.55)] shadow-soft backdrop-blur-[22px]",
            )}
            aria-label="Ключові переваги співпраці"
          >
            {bridgeTrust.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  "flex w-full min-w-0 basis-full items-start gap-3.5 sm:min-w-[11rem] sm:flex-1 sm:basis-[calc(50%-1rem)] lg:basis-0",
                  index === 0
                    ? "sm:pr-6 lg:pr-8"
                    : "border-[rgba(35,7,13,0.08)] sm:border-l sm:px-6 lg:px-8",
                )}
              >
                <Icon name={item.icon} className="mt-0.5 size-[1.125rem] shrink-0 text-brass" />
                <div className="min-w-0">
                  <p className="font-display text-[1.3rem] leading-tight font-normal tracking-[-0.015em] text-ink">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-[0.875rem] leading-snug font-medium text-muted">
                    {item.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
