import { Check } from "lucide-react";

import { cardSurface } from "@/components/common/card";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { storageAdvantages, storageCards } from "@/lib/content/storage";
import { cn } from "@/lib/utils";

export function StorageSection() {
  return (
    <section id="storage" aria-labelledby="storage-title" className="relative bg-porcelain">
      <div aria-hidden="true" className="surface-glow absolute inset-0 opacity-70" />
      <div className="container-page section-y relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              id="storage-title"
              eyebrow="Умови роботи"
              title="Від партії в прайсі до видачі клієнту"
              description="Оптові умови з офіційного прайсу: пачки та пучки, мінімальна сума замовлення, доставка по Києву та підтвердження наявності менеджером."
            />

            <Reveal delay={120} className="mt-9">
              <ul className="grid gap-y-3 sm:grid-cols-2 sm:gap-x-6">
                {storageAdvantages.map((advantage) => (
                  <li key={advantage} className="text-graphite flex items-start gap-2.5 text-[0.9375rem]">
                    <Check className="text-bordeaux mt-0.5 size-4 shrink-0" aria-hidden="true" />
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
                    className={cn(
                      cardSurface,
                      "hover:border-line-strong hover:shadow-lift group flex h-full flex-col p-6 hover:-translate-y-0.5",
                    )}
                  >
                    <span className="border-line bg-cream/60 text-bordeaux grid size-11 place-items-center rounded-full border transition-colors duration-500 group-hover:border-transparent group-hover:bg-bordeaux group-hover:text-porcelain">
                      <Icon name={card.icon} className="size-5" />
                    </span>
                    <h3 className="text-ink mt-5 text-xl leading-tight">{card.title}</h3>
                    <p className="text-muted mt-2.5 text-[0.9375rem] leading-relaxed">
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
