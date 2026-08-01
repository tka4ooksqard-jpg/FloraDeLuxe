import Link from "next/link";
import type { CSSProperties } from "react";

import { CtaArrow, TelegramCta } from "@/components/common/cta";
import { Icon } from "@/components/common/icon";
import { HeroVisual } from "@/components/sections/hero-visual";
import { Button } from "@/components/ui/button";
import { hero, heroHighlights } from "@/lib/content/home";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";

const rise = (delay: number) => ({ "--hero-delay": `${delay}ms` }) as CSSProperties;

const heroCtaBase =
  "h-14 min-h-14 w-full rounded-[14px] text-[0.9375rem] font-semibold shadow-[0_12px_32px_-20px_rgb(8_2_4_/_0.45)] transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_20px_40px_-24px_rgb(8_2_4_/_0.55)] sm:w-auto";

export function Hero() {
  return (
    <section className="on-dark bg-bordeaux-deep relative isolate overflow-x-clip lg:min-h-[920px]">
      <div aria-hidden="true" className="hero-atmosphere absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-wine-glow absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="hero-title-glow pointer-events-none absolute -top-[10%] -left-[15%] -z-10 h-[120%] w-[85%]"
      />
      <div aria-hidden="true" className="hero-field-blend absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-bokeh absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-grain absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-vignette absolute inset-0 -z-10" />

      <div className="container-hero relative z-10 flex min-h-[34rem] flex-col pt-24 pb-16 sm:min-h-[38rem] lg:min-h-[920px] lg:pt-24 lg:pb-24">
        <div className="flex flex-1 flex-col justify-center lg:max-w-[40%] lg:pr-6 lg:pb-20 xl:max-w-[38%]">
          <div className="relative flex max-w-[580px] flex-col lg:max-w-[600px]">
            <p
              style={rise(0)}
              className="hero-rise flex items-center gap-3.5 text-[0.75rem] font-medium tracking-[0.2em] text-[#D5AF63] uppercase"
            >
              <span aria-hidden="true" className="h-px w-8 shrink-0 bg-[#D5AF63]/55" />
              {hero.eyebrow}
            </p>

            <h1
              style={rise(140)}
              className="hero-rise font-display mt-8 max-w-[600px] text-[clamp(2.875rem,1.8rem+3.8vw,4.75rem)] leading-[0.95] font-normal tracking-[-0.02em] text-[#F5EFE9] [font-kerning:normal]"
            >
              <span className="block">{hero.titleLead}</span>
              {hero.titleAccent.map((line) => (
                <span
                  key={line}
                  className="mt-1 block font-light tracking-[-0.01em] text-[#D5AF63] not-italic"
                >
                  {line}
                </span>
              ))}
            </h1>

            <div
              style={rise(280)}
              className="hero-rise mt-11 max-w-[540px] space-y-5 text-[1.125rem] leading-[1.8] font-normal text-[rgba(255,255,255,0.84)]"
            >
              {hero.subtitle.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div
              style={rise(420)}
              className="hero-rise mt-11 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <TelegramCta
                intent={telegramIntents.order}
                size="lg"
                className={`${heroCtaBase} px-9 sm:min-w-[17.5rem] sm:px-10`}
              />
              <TelegramCta
                intent={telegramIntents.price}
                label={ctaLabels.price}
                variant="light"
                size="lg"
                showIcon={false}
                className={`${heroCtaBase} px-5 sm:px-6 hover:shadow-[0_0_0_1px_rgb(213_175_99_/_0.25),0_16px_36px_-24px_rgb(213_175_99_/_0.3)]`}
              />
            </div>

            <div style={rise(540)} className="hero-rise mt-10">
              <Button
                asChild
                variant="linkGold"
                size="lg"
                className="group/button min-h-11 gap-4 px-0 text-[0.9375rem] font-medium tracking-[0.02em] text-[rgba(255,255,255,0.78)] transition-colors duration-500 ease-[var(--ease-soft)] hover:text-[#D5AF63]"
              >
                <Link href="/assortment" className="inline-flex items-center">
                  <span
                    aria-hidden="true"
                    className="mr-4 h-px w-16 shrink-0 bg-[#D5AF63]/50 transition-[width,background-color] duration-500 ease-[var(--ease-soft)] group-hover/button:w-24 group-hover/button:bg-[#D5AF63]/80 sm:w-20"
                  />
                  {ctaLabels.assortment}
                  <CtaArrow className="ml-1 size-3.5 text-[#D5AF63] transition-transform duration-500 ease-[var(--ease-soft)] group-hover/button:translate-x-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Overlaps the photo bottom — panel sits on the still like a landing UI layer. */}
        <ul
          style={rise(680)}
          className="hero-rise hero-glass relative z-20 mt-12 grid min-h-[7.5rem] content-center overflow-hidden rounded-[26px] sm:grid-cols-2 lg:mt-8 lg:min-h-[8rem] lg:grid-cols-4"
        >
          {heroHighlights.map((highlight) => (
            <li
              key={highlight.id}
              className="flex items-center gap-4 px-6 py-8 sm:px-7 sm:py-9 lg:px-6 xl:px-7"
            >
              <Icon name={highlight.icon} className="size-[1.375rem] shrink-0 text-[#D5AF63]" />
              <span className="text-[0.9375rem] leading-snug font-medium text-[rgba(255,255,255,0.92)] sm:text-base">
                {highlight.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/*
        Larger photo field — breaks past the top-right edge and tucks under
        the glass panel so it reads as part of the interface, not a picture box.
      */}
      <HeroVisual className="relative z-[1] mt-2 h-[72vw] max-h-[28rem] w-full lg:absolute lg:-top-8 lg:right-[-3%] lg:bottom-[-2.5rem] lg:z-0 lg:mt-0 lg:h-auto lg:max-h-none lg:w-[66%]" />
    </section>
  );
}
