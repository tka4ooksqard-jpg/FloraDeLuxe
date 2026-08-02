import { Check } from "lucide-react";

import { cardInteractive, cardSurface } from "@/components/common/card";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { storageAdvantages, storageCards } from "@/lib/content/storage";
import { cn } from "@/lib/utils";

export function StorageSection() {
  return (
    <section
      id="storage"
      aria-labelledby="storage-title"
      className="section-canvas-light relative"
    >
      <div className="container-hero section-y relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              id="storage-title"
              eyebrow="Умови зберігання та логістики"
              title="Від партії в прайсі до видачі клієнту"
              description="Оптові умови з офіційного прайсу: пачки та пучки, мінімальна сума замовлення, доставка по Києву та підтвердження наявності менеджером."
            />

            <Reveal delay={120} className="mt-9">
              <ul className="grid gap-y-3 sm:grid-cols-2 sm:gap-x-6">
                {storageAdvantages.map((advantage) => (
                  <li
                    key={advantage}
                    className="text-graphite flex items-start gap-2.5 text-[0.9375rem] font-medium leading-snug"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden="true" />
                    {advantage}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {storageCards.map((card, index) => (
              <li key={card.id}>
                <Reveal delay={index * 90} className="h-full">
                  <article
                    className={cn(cardSurface, cardInteractive, "group flex h-full flex-col p-6 sm:p-7")}
                  >
                    <span className="border-line grid size-11 place-items-center rounded-[14px] border bg-cream/60 text-brass transition-colors duration-500 group-hover:border-[rgba(213,175,99,0.35)]">
                      <Icon name={card.icon} className="size-5" />
                    </span>
                    <h3 className="font-display text-ink mt-5 text-[1.375rem] leading-tight font-normal tracking-[-0.015em]">
                      {card.title}
                    </h3>
                    <p className="text-muted mt-2.5 text-[0.9375rem] leading-[1.7] font-medium">
                      {card.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
