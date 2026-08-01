import { Check, Info } from "lucide-react";
import Image from "next/image";

import { cardSurface } from "@/components/common/card";
import { TelegramCta } from "@/components/common/cta";
import { IconCardGrid } from "@/components/common/icon-card-grid";
import { PageHero } from "@/components/common/page-hero";
import { Reveal } from "@/components/common/reveal";
import { RelatedPages } from "@/components/sections/quick-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { suppliersPage } from "@/lib/content/pages";
import { supplierNotice, supplierRegions } from "@/lib/content/suppliers";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Постачальники",
  description:
    "Географія поставок Flora de Luxe Kyiv OPT: Нідерланди, Еквадор, Україна та Вірменія. Регіони, з яких формується оптовий асортимент.",
  path: "/suppliers",
});

export default function SuppliersPage() {
  return (
    <>
      <PageHero
        intro={suppliersPage.intro}
        crumbs={[{ name: "Постачальники", path: "/suppliers" }]}
      >
        <TelegramCta
          intent={telegramIntents.supply}
          label={ctaLabels.currentSupply}
          size="lg"
        />
      </PageHero>

      <section aria-labelledby="supplier-benefits-title" className="relative bg-porcelain">
        <div aria-hidden="true" className="surface-glow absolute inset-0 opacity-50" />
        <div className="container-page section-y relative">
          <h2 id="supplier-benefits-title" className="sr-only">
            Переваги кількох напрямків
          </h2>
          <IconCardGrid items={suppliersPage.benefits} interactive />
        </div>
      </section>

      <section aria-labelledby="supplier-profiles-title" className="relative bg-cream/40">
        <div aria-hidden="true" className="surface-grain absolute inset-0" />
        <div className="container-page section-y relative">
          <h2 id="supplier-profiles-title" className="sr-only">
            Профілі регіонів
          </h2>

          <ul className="grid gap-14 lg:gap-20">
            {supplierRegions.map((region, index) => (
              <li key={region.code} id={region.code.toLowerCase()} className="scroll-mt-28">
                <Reveal>
                  <article
                    className={cn(
                      "grid items-center gap-8 lg:gap-14",
                      index % 2 === 0
                        ? "lg:grid-cols-[1.05fr_1fr]"
                        : "lg:grid-cols-[1fr_1.05fr]",
                    )}
                  >
                    <div
                      className={cn(
                        "relative aspect-4/3 overflow-hidden rounded-[var(--radius-card)] border border-line/70 shadow-media",
                        index % 2 === 0 ? "lg:order-1" : "lg:order-2",
                      )}
                    >
                      <Image
                        src={region.image.src}
                        alt={region.image.alt}
                        fill
                        priority={index === 0}
                        loading={index === 0 ? undefined : "lazy"}
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        className="media-grade media-zoom object-cover"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/10"
                      />
                      <span className="border-porcelain/25 bg-porcelain/12 text-porcelain absolute top-5 left-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.8125rem] font-medium tracking-[0.1em] backdrop-blur-md">
                        <span className="bg-brass-soft size-1.5 rounded-full" aria-hidden="true" />
                        {region.code}
                      </span>
                    </div>

                    <div className={cn(index % 2 === 0 ? "lg:order-2" : "lg:order-1")}>
                      <p className="type-eyebrow text-bordeaux">{region.tag}</p>
                      <h3 className="text-ink mt-4 text-[clamp(1.85rem,1.3rem+1.8vw,2.75rem)] leading-tight">
                        {region.country}
                      </h3>
                      <p className="text-muted mt-4 text-base leading-[1.75] font-medium">
                        {region.profile.summary}
                      </p>

                      <div className="mt-7 grid gap-6 sm:grid-cols-2">
                        <div>
                          <p className="type-eyebrow text-ink">Що надходить</p>
                          <ul className="mt-3 space-y-2">
                            {region.profile.flowers.map((flower) => (
                              <li
                                key={flower}
                                className="text-graphite flex items-start gap-2 text-[0.9375rem] font-medium leading-snug"
                              >
                                <Check
                                  className="text-bordeaux mt-1 size-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                                {flower}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="type-eyebrow text-ink">Переваги напрямку</p>
                          <ul className="mt-3 space-y-2">
                            {region.profile.advantages.map((item) => (
                              <li
                                key={item}
                                className="text-graphite flex items-start gap-2 text-[0.9375rem] font-medium leading-snug"
                              >
                                <Check
                                  className="text-bordeaux mt-1 size-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <p className="border-line bg-cream/60 type-caption text-muted mt-7 inline-flex rounded-full border px-4 py-2">
                        Частота: {region.profile.frequency}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={100} className="mt-14">
            <div
              className={cn(
                cardSurface,
                "flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between",
              )}
            >
              <p className="text-graphite flex items-start gap-3 text-[0.9375rem] leading-[1.7] font-medium">
                <Info className="text-bordeaux mt-0.5 size-5 shrink-0" aria-hidden="true" />
                {supplierNotice}
              </p>
              <TelegramCta
                intent={telegramIntents.supply}
                label={ctaLabels.currentSupply}
                size="lg"
                showIcon={false}
                className="shrink-0"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <RelatedPages current="/suppliers" />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Головна", path: "/" },
          { name: "Постачальники", path: "/suppliers" },
        ])}
      />
    </>
  );
}
