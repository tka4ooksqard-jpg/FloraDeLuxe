import { Info } from "lucide-react";

import { cardDark, cardDarkInteractive } from "@/components/common/card";
import { TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { deliveryDays, deliveryDisclaimer, weekStrip } from "@/lib/content/delivery";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

const deliveryIndexes = new Set(deliveryDays.map((day) => day.weekIndex));

export function DeliveryDays() {
  return (
    <section id="delivery" aria-labelledby="delivery-title" className="on-dark bg-ink text-porcelain">
      <div className="container-page section-y">
        <SectionHeading
          id="delivery-title"
          eyebrow="Графік"
          tone="dark"
          title="Регулярні дні поставок"
          description="Свіжі партії приїжджають кілька разів на тиждень. Це дає змогу планувати закупівлю наперед, тримати рівний асортимент на вітрині й не замовляти зайвого «про запас»."
        />

        {/* Week strip: the gaps between delivery days carry as much meaning as the days themselves. */}
        <Reveal delay={120} className="mt-14">
          <ol className="grid grid-cols-7 gap-1.5 sm:gap-3" aria-label="Тиждень поставок">
            {weekStrip.map((day) => {
              const isDelivery = deliveryIndexes.has(day.index);
              return (
                <li
                  key={day.index}
                  className={cn(
                    "flex aspect-4/5 flex-col items-center justify-center gap-2 rounded-[var(--radius-tile)] border sm:aspect-3/2",
                    isDelivery
                      ? "border-brass/60 bg-brass/15 text-porcelain"
                      : "border-porcelain/10 bg-porcelain/[0.03] text-porcelain/35",
                  )}
                >
                  <span className="text-xs font-semibold tracking-[0.14em] uppercase sm:text-sm">
                    {day.short}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "rounded-full transition-colors",
                      isDelivery ? "bg-brass-soft size-1.5" : "bg-porcelain/20 size-1",
                    )}
                  />
                  <span className="sr-only">
                    {isDelivery ? "день поставки" : "без поставки"}
                  </span>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <ol className="mt-6 grid gap-4 md:mt-8 md:grid-cols-3 md:gap-5">
          {deliveryDays.map((day, index) => (
            <li key={day.id}>
              <Reveal delay={index * 110} className="h-full">
                <article
                  className={cn(
                    cardDark,
                    cardDarkInteractive,
                    "relative flex h-full flex-col p-6 sm:p-7",
                  )}
                >
                  <span className="text-brass-soft/70 text-xs font-semibold tracking-[0.2em] uppercase">
                    {`0${index + 1}`}
                  </span>

                  <h3 className="text-porcelain mt-4 text-[1.75rem] leading-tight">{day.name}</h3>

                  <p className="text-porcelain/65 mt-3 text-[0.9375rem] leading-relaxed">
                    {day.description}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {day.focus.map((tag) => (
                      <li
                        key={tag}
                        className="border-porcelain/15 text-porcelain/70 rounded-full border px-3 py-1 text-[0.75rem] tracking-wide"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={140} className="mt-10">
          <div className="border-porcelain/12 flex flex-col gap-6 rounded-[var(--radius-card)] border border-dashed p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-porcelain/70 flex items-start gap-3 text-[0.9375rem] leading-relaxed">
              <Info className="text-brass-soft mt-0.5 size-5 shrink-0" aria-hidden="true" />
              {deliveryDisclaimer}
            </p>
            <TelegramCta
              intent={telegramIntents.supply}
              label={ctaLabels.currentSupply}
              variant="light"
              size="lg"
              className="shrink-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
