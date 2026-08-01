import Link from "next/link";
import type { CSSProperties } from "react";

import { CtaArrow, TelegramCta } from "@/components/common/cta";
import { Icon } from "@/components/common/icon";
import { HeroVisual } from "@/components/sections/hero-visual";
import { Button } from "@/components/ui/button";
import { hero, heroHighlights } from "@/lib/content/home";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";

/**
 * Staged entrance. Unlike the rest of the page the hero does not wait for an
 * intersection observer — it is above the fold, so the motion is pure CSS and
 * runs on first paint even before hydration.
 */
const rise = (delay: number) => ({ "--hero-delay": `${delay}ms` }) as CSSProperties;

/** Hero-only button motion; the shared variants stay untouched. */
const ctaMotion =
  "shadow-[0_20px_45px_-22px_rgb(12_4_7_/_0.95)] hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-100";

export function Hero() {
  return (
    <section className="on-dark bg-bordeaux-deep relative isolate overflow-hidden">
      {/* Depth stack: atmosphere, defocused orbs, grain, vignette. */}
      <div aria-hidden="true" className="hero-atmosphere absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-bokeh absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-grain absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-vignette absolute inset-0 -z-10" />

      <div className="container-page relative z-10 flex min-h-[30rem] flex-col justify-center pt-20 pb-14 md:pt-28 lg:min-h-[clamp(56.25rem,92svh,59.375rem)] lg:pb-20">
        <div className="max-w-2xl lg:max-w-[33rem] xl:max-w-[40rem]">
          <p
            style={rise(0)}
            className="hero-rise text-brass-soft text-[0.6875rem] font-semibold tracking-[0.24em] uppercase sm:text-xs"
          >
            {hero.eyebrow}
          </p>

          <h1
            style={rise(90)}
            className="hero-rise text-porcelain mt-6 text-[clamp(2.4rem,1.3rem+4.6vw,5.25rem)] leading-[1.03]"
          >
            {hero.titleLead}
            <span className="text-rose-soft/90 block italic">{hero.titleAccent}</span>
          </h1>

          <p
            style={rise(180)}
            className="hero-rise text-porcelain/90 mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] tracking-wide sm:text-base"
          >
            {hero.tagline.split(". ").map((part, index) => (
              <span key={part} className="flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden="true" className="bg-brass-soft/60 size-1 rounded-full" />
                ) : null}
                {part.replace(/\.$/, "")}
              </span>
            ))}
          </p>

          <p
            style={rise(250)}
            className="hero-rise text-porcelain/70 mt-5 max-w-xl text-base leading-relaxed sm:text-[1.0625rem]"
          >
            {hero.subtitle}
          </p>

          <div
            style={rise(330)}
            className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <TelegramCta
              intent={telegramIntents.price}
              label={ctaLabels.price}
              variant="light"
              size="lg"
              showIcon={false}
              className={ctaMotion}
            />
            <TelegramCta intent={telegramIntents.order} size="lg" className={ctaMotion} />
            <Button asChild variant="onDark" size="lg" className={ctaMotion}>
              <Link href="/assortment">
                {ctaLabels.assortment}
                <CtaArrow />
              </Link>
            </Button>
          </div>
        </div>

        {/* Frosted bar across the full width — it deliberately crosses the image. */}
        <ul
          style={rise(430)}
          className="hero-rise border-porcelain/25 bg-porcelain/10 mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border shadow-[0_24px_60px_-36px_rgb(0_0_0_/_0.65)] backdrop-blur-2xl sm:grid-cols-2 lg:mt-24 lg:grid-cols-4"
        >
          {heroHighlights.map((highlight) => (
            <li
              key={highlight.id}
              className="bg-bordeaux-deep/25 flex items-center gap-3 px-5 py-4"
            >
              <Icon name={highlight.icon} className="text-brass-soft size-5 shrink-0" />
              <span className="text-porcelain/85 text-[0.875rem] leading-snug">
                {highlight.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/*
        Sits after the copy in the DOM so it lands below it on narrow screens,
        and is lifted into the right-hand column from `lg`.
      */}
      <HeroVisual className="h-[82vw] max-h-[26rem] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:max-h-none lg:w-[48%] xl:w-[50%]" />
    </section>
  );
}
