import Image from "next/image";

import { cardMedia, cardSurface } from "@/components/common/card";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { SupplyMap } from "@/components/sections/supply-map";
import {
  supplierAdvantages,
  supplierRegions,
  supplyLogistics,
  supplyMapCaption,
  type SupplyFeature,
} from "@/lib/content/suppliers";
import { cn } from "@/lib/utils";

/** Shared surface for every panel in the geography story column. */
const storyPanel = cn(cardSurface, "p-5 sm:p-6");

const storyTitleClass =
  "text-ink text-[1.0625rem] font-semibold tracking-tight sm:text-[1.125rem]";

/** Compact country badge that reads as a flag mark without drawing flags. */
function RegionMark({ code }: { code: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-porcelain/25 bg-porcelain/12 px-2.5 py-1",
        "backdrop-blur-md",
      )}
    >
      <span className="bg-brass-soft size-1.5 rounded-full" />
      <span className="text-porcelain text-[0.6875rem] font-semibold tracking-[0.16em]">{code}</span>
    </span>
  );
}

function FeatureItem({ item }: { item: SupplyFeature }) {
  return (
    <li
      className={cn(
        "group border-line/80 bg-cream/30 flex items-start gap-3 rounded-[var(--radius-tile)] border px-3.5 py-3",
        "transition-[transform,box-shadow,border-color,background-color] duration-500 ease-[var(--ease-soft)]",
        "hover:-translate-y-0.5 hover:border-line-strong hover:bg-porcelain hover:shadow-soft",
      )}
    >
      <span
        className={cn(
          "border-line bg-porcelain text-bordeaux grid size-10 shrink-0 place-items-center rounded-full border",
          "transition-[color,border-color,background-color] duration-500 ease-[var(--ease-soft)]",
          "group-hover:border-bordeaux/35 group-hover:bg-cream group-hover:text-brass",
        )}
      >
        <Icon name={item.icon} className="size-4" />
      </span>
      <span className="min-w-0 pt-0.5">
        <span className="text-ink block text-[0.875rem] leading-snug font-semibold tracking-tight">
          {item.title}
        </span>
        <span className="text-muted mt-1 block text-[0.8125rem] leading-relaxed">
          {item.description}
        </span>
      </span>
    </li>
  );
}

export function SuppliersSection() {
  return (
    <section id="suppliers" aria-labelledby="suppliers-title" className="relative bg-cream/40">
      <div aria-hidden="true" className="surface-glow absolute inset-0" />
      <div aria-hidden="true" className="surface-grain absolute inset-0" />

      <div className="container-page section-y relative">
        <SectionHeading
          id="suppliers-title"
          eyebrow="Географія поставок"
          title="Квіти з найкращих флористичних регіонів"
          description="Асортимент формується з кількох напрямків — це дає ширший вибір сортів і стабільніше наповнення партій протягом року."
        />

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          {/* Left column: one story — where / how / why. Right column untouched. */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col gap-4">
              <div className={storyPanel}>
                <SupplyMap />
                <p className="text-muted mt-3.5 text-center text-[0.8125rem] leading-relaxed">
                  {supplyMapCaption}
                </p>
              </div>

              <div className={storyPanel}>
                <h3 className={storyTitleClass}>{supplyLogistics.title}</h3>
                <ul className="mt-4 grid gap-2.5">
                  {supplyLogistics.items.map((item) => (
                    <FeatureItem key={item.id} item={item} />
                  ))}
                </ul>
              </div>

              <div className={storyPanel}>
                <h3 className={storyTitleClass}>{supplierAdvantages.title}</h3>
                <ul className="mt-4 grid grid-cols-2 gap-2.5">
                  {supplierAdvantages.items.map((item) => (
                    <li
                      key={item.id}
                      className={cn(
                        "group border-line/80 bg-cream/30 flex flex-col rounded-[var(--radius-tile)] border px-3.5 py-3.5",
                        "transition-[transform,box-shadow,border-color,background-color] duration-500 ease-[var(--ease-soft)]",
                        "hover:-translate-y-0.5 hover:border-line-strong hover:bg-porcelain hover:shadow-soft",
                      )}
                    >
                      <span
                        className={cn(
                          "border-line bg-porcelain text-bordeaux grid size-9 place-items-center rounded-full border",
                          "transition-[color,border-color,background-color] duration-500 ease-[var(--ease-soft)]",
                          "group-hover:border-bordeaux/35 group-hover:bg-cream group-hover:text-brass",
                        )}
                      >
                        <Icon name={item.icon} className="size-3.5" />
                      </span>
                      <span className="text-ink mt-3 text-[0.8125rem] leading-snug font-semibold tracking-tight">
                        {item.title}
                      </span>
                      <span className="text-muted mt-1.5 text-[0.75rem] leading-relaxed">
                        {item.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-3.5">
            {supplierRegions.map((region, index) => {
              const isLead = index === 0;
              const isArmenia = region.code === "AM";

              return (
                <li key={region.code} className={cn(isLead && "sm:col-span-2")}>
                  <Reveal delay={index * 80} className="h-full">
                    <article
                      className={cn(
                        cardMedia,
                        "h-full",
                        isLead
                          ? "aspect-16/10 sm:aspect-[2.2/1]"
                          : isArmenia
                            ? "aspect-[4/5.2] sm:aspect-[3/4]"
                            : "aspect-4/5",
                      )}
                    >
                      <Image
                        src={region.image.src}
                        alt={region.image.alt}
                        fill
                        loading="lazy"
                        sizes={
                          isLead
                            ? "(max-width: 1024px) 100vw, 40vw"
                            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                        }
                        className="object-cover"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/10 transition-opacity duration-500 group-hover:opacity-95"
                      />

                      <div className="absolute inset-x-0 top-0 flex justify-between p-4 sm:p-5">
                        <RegionMark code={region.code} />
                        <span className="text-porcelain/70 text-[0.75rem] tracking-wide">
                          {region.tag}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        <h3 className="text-porcelain font-display text-[1.625rem] leading-tight sm:text-[1.875rem]">
                          {region.country}
                        </h3>
                        <p className="text-porcelain/75 mt-2 max-w-md text-[0.9375rem] leading-relaxed">
                          {region.description}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
