import { Info } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { deliveryDays, deliveryDisclaimer, weekStrip } from "@/lib/content/delivery";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { sceneImages } from "@/lib/content/scenes";
import { cn } from "@/lib/utils";

const deliveryIndexes = new Set(deliveryDays.map((day) => day.weekIndex));

/** Unified luxury photoset — fresh arrival / logistics frame. */
const deliveryVisual = sceneImages.delivery;

const deliveryCopy = {
  eyebrow: "Графік поставок",
  titleLead: "Поставки",
  titleAccent: "тричі на тиждень",
  description:
    "Свіжі партії приїжджають кілька разів на тиждень. Це дає змогу планувати закупівлю наперед, тримати рівний асортимент на вітрині й не замовляти зайвого «про запас».",
  caption: "Пн · Вт · Пт — ритм, на який можна розраховувати",
} as const;

function DayCard({
  day,
  index,
  featured = false,
}: {
  day: (typeof deliveryDays)[number];
  index: number;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "delivery-card relative flex h-full flex-col",
        featured ? "delivery-card-feature p-8 sm:p-10 lg:p-12" : "p-7 sm:p-8",
      )}
    >
      <span className="text-[0.75rem] font-medium tracking-[0.2em] text-[#D5AF63] uppercase">
        {day.short}
      </span>
      <h3
        className={cn(
          "font-display mt-4 leading-[1.05] font-normal tracking-[-0.02em] text-[#F5EFE9]",
          featured
            ? "text-[clamp(2rem,1.5rem+1.6vw,2.75rem)]"
            : "text-[clamp(1.5rem,1.25rem+0.9vw,1.875rem)]",
        )}
      >
        {day.name}
      </h3>
      <p
        className={cn(
          "mt-4 font-normal text-[rgba(255,255,255,0.84)]",
          featured ? "max-w-[28rem] text-[1.0625rem] leading-[1.75]" : "text-[0.9375rem] leading-[1.7]",
        )}
      >
        {day.description}
      </p>
      <ul className={cn("mt-auto flex flex-wrap gap-2", featured ? "mt-10" : "mt-7")}>
        {day.focus.map((tag) => (
          <li
            key={tag}
            className="rounded-[14px] border border-[rgba(255,255,255,0.1)] px-3.5 py-1.5 text-[0.75rem] font-medium tracking-[0.04em] text-[rgba(255,255,255,0.68)]"
          >
            {tag}
          </li>
        ))}
      </ul>
      <span className="sr-only">{`Поставка ${index + 1}`}</span>
    </article>
  );
}

function DeliveryTimeline() {
  const nodes: ReactNode[] = [];

  weekStrip.forEach((day, index) => {
    const isDelivery = deliveryIndexes.has(day.index);
    nodes.push(
      <div key={day.index} className="flex flex-col items-center gap-2.5">
        <span
          className={cn(
            "rounded-full",
            isDelivery ? "size-2 bg-[#D5AF63]" : "size-1 bg-[rgba(255,255,255,0.22)]",
          )}
        />
        <span
          className={cn(
            "text-[0.6875rem] font-medium tracking-[0.16em] uppercase",
            isDelivery ? "text-[#D5AF63]" : "text-[rgba(255,255,255,0.32)]",
          )}
        >
          {day.short}
        </span>
      </div>,
    );

    if (index < weekStrip.length - 1) {
      nodes.push(
        <div
          key={`line-${day.index}`}
          aria-hidden="true"
          className="mb-6 h-px min-w-3 flex-1 bg-[rgba(255,255,255,0.1)]"
        />,
      );
    }
  });

  return (
    <div
      className="flex w-full max-w-md items-start"
      aria-label="Ритм поставок протягом тижня"
    >
      {nodes}
    </div>
  );
}

export function DeliveryDays() {
  const [featured, ...rest] = deliveryDays;

  return (
    <section
      id="delivery"
      aria-labelledby="delivery-title"
      className="on-dark section-canvas-dark seam-from-cream relative overflow-hidden text-porcelain"
    >
      {/*
        Depth only — painted into the section background, never over copy.
        A softer bordeaux wash in the first ~140px eases the cream → dark join.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 9rem at 50% 0%, #3b101a 0%, transparent 72%), radial-gradient(42rem 32rem at 88% 12%, rgb(213 175 99 / 0.06), transparent 62%)",
        }}
      />
      <div aria-hidden="true" className="delivery-grain absolute inset-0" />

      <div className="container-hero relative z-10 pt-12 pb-[7.5rem] md:pt-16 md:pb-36 xl:pt-20 xl:pb-[11.25rem]">
        {/* Editorial split: story + real warehouse photography. */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-20">
          <Reveal className="max-w-[540px]">
            <p className="flex items-center gap-3.5 text-[0.75rem] font-medium tracking-[0.2em] text-[#D5AF63] uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-[#D5AF63]/55" />
              {deliveryCopy.eyebrow}
            </p>

            <h2
              id="delivery-title"
              className="font-display mt-8 text-[clamp(2.75rem,1.7rem+3.6vw,4.5rem)] leading-[0.95] font-normal tracking-[-0.02em] text-[#F5EFE9] [font-kerning:normal]"
            >
              <span className="block">{deliveryCopy.titleLead}</span>
              <span className="mt-1 block font-light tracking-[-0.01em] text-[#D5AF63]">
                {deliveryCopy.titleAccent}
              </span>
            </h2>

            <p className="mt-11 text-[1.125rem] leading-[1.7] font-normal text-[rgba(255,255,255,0.84)]">
              {deliveryCopy.description}
            </p>

            <p className="mt-5 text-[0.8125rem] font-medium tracking-[0.04em] text-[rgba(255,255,255,0.48)]">
              {deliveryCopy.caption}
            </p>

            <div className="mt-10">
              <DeliveryTimeline />
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="delivery-photo relative aspect-4/5 overflow-hidden shadow-[0_28px_64px_-36px_rgb(0_0_0_/_0.55)] lg:aspect-3/4">
              <Image
                src={deliveryVisual.src}
                alt={deliveryVisual.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="media-grade object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(120deg,rgb(35_7_13_/_0.35)_0%,transparent_45%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_40%,transparent_45%,rgb(18_7_10_/_0.45)_100%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(50%_40%_at_70%_30%,rgb(213_175_99_/_0.12),transparent_70%)] mix-blend-soft-light"
              />
            </div>
          </Reveal>
        </div>

        {/* Asymmetric day story — one dominant day, two supporting. */}
        <div className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-2 lg:gap-6">
          <Reveal delay={80} className="h-full">
            <DayCard day={featured} index={0} featured />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
            {rest.map((day, index) => (
              <Reveal key={day.id} delay={140 + index * 90} className="h-full">
                <DayCard day={day} index={index + 1} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={180} className="mt-14 md:mt-16">
          <div className="hero-glass flex flex-col gap-5 overflow-hidden rounded-[26px] px-6 py-5 sm:px-8 sm:py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <p className="flex items-start gap-3.5 text-[0.9375rem] leading-[1.65] font-medium text-[rgba(255,255,255,0.88)]">
              <Info className="mt-0.5 size-5 shrink-0 text-[#D5AF63]" aria-hidden="true" />
              {deliveryDisclaimer}
            </p>
            <TelegramCta
              intent={telegramIntents.supply}
              label={ctaLabels.currentSupply}
              variant="light"
              size="lg"
              className="h-12 min-h-12 shrink-0 px-6 text-[0.875rem] sm:px-7"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
