import Image from "next/image";

import { cardMedia, cardSurface } from "@/components/common/card";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { SupplyMap } from "@/components/sections/supply-map";
import {
  supplierRegions,
  supplyLogistics,
  supplyMapCaption,
} from "@/lib/content/suppliers";
import { sceneImages } from "@/lib/content/scenes";
import { cn } from "@/lib/utils";

/** Quiet country mark — metal chip, not a UI pill cluster. */
function RegionMark({ code }: { code: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.14em] text-[#D5AF63] uppercase"
    >
      <span className="h-px w-5 bg-[#D5AF63]/50" />
      {code}
    </span>
  );
}

export function SuppliersSection() {
  return (
    <section
      id="suppliers"
      aria-labelledby="suppliers-title"
      className="section-canvas-light relative"
    >
      <div className="container-hero section-y relative z-10">
        <SectionHeading
          id="suppliers-title"
          eyebrow="Географія поставок"
          title="Квіти з найкращих флористичних регіонів"
          description="Асортимент формується з кількох напрямків — це дає ширший вибір сортів і стабільніше наповнення партій протягом року."
        />

        <div className="mt-14 grid min-w-0 grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
          <Reveal className="h-full min-w-0">
            <div className="flex h-full min-w-0 flex-col gap-5">
              <div className="group relative aspect-16/10 overflow-hidden rounded-[1.75rem]">
                <Image
                  src={sceneImages.import.src}
                  alt={sceneImages.import.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="media-grade media-zoom object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent"
                />
              </div>

              <div className={cn(cardSurface, "min-w-0 overflow-hidden p-5 sm:p-6")}>
                <div className="w-full max-w-full overflow-hidden">
                  <SupplyMap />
                </div>
                <p className="type-caption text-muted mt-3.5 text-center">{supplyMapCaption}</p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {supplyLogistics.items.map((item) => (
                  <li key={item.id} className="flex items-start gap-3 px-1 py-1">
                    <Icon name={item.icon} className="mt-0.5 size-4 shrink-0 text-brass" />
                    <span className="min-w-0">
                      <span className="text-ink block text-[0.875rem] leading-snug font-semibold">
                        {item.title}
                      </span>
                      <span className="type-caption text-muted mt-1 block">{item.description}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <ul className="grid min-w-0 grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
            {supplierRegions.map((region, index) => {
              const isLead = index === 0;
              const isArmenia = region.code === "AM";

              return (
                <li key={region.code} className={cn("min-w-0", isLead && "sm:col-span-2")}>
                  <Reveal delay={index * 80} className="h-full min-w-0">
                    <article
                      className={cn(
                        cardMedia,
                        "h-full w-full max-w-full",
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
                            ? "(max-width: 1024px) 100vw, 42vw"
                            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                        }
                        className="media-grade media-zoom object-cover"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/5"
                      />

                      <div className="absolute inset-x-0 top-0 flex justify-between p-4 sm:p-5">
                        <RegionMark code={region.code} />
                        <span className="text-[0.75rem] font-medium tracking-[0.08em] text-[rgba(245,239,233,0.7)]">
                          {region.tag}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        <h3 className="font-display text-[1.625rem] leading-tight font-normal tracking-[-0.015em] text-[#F5EFE9] sm:text-[1.875rem]">
                          {region.country}
                        </h3>
                        <p className="mt-2 max-w-md text-[0.9375rem] leading-[1.65] font-medium text-[rgba(245,239,233,0.86)]">
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
