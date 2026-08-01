import { Check, Info } from "lucide-react";

import { cardSurface } from "@/components/common/card";
import { CategoryCard } from "@/components/common/category-card";
import { TelegramCta } from "@/components/common/cta";
import { PageHero } from "@/components/common/page-hero";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { DeliveryDays } from "@/components/sections/delivery-days";
import { JsonLd } from "@/components/seo/json-ld";
import { categories } from "@/lib/content/categories";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { assortmentPage } from "@/lib/content/pages";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Асортимент",
  description:
    "Категорії оптового асортименту Flora de Luxe Kyiv OPT: троянди, хризантеми, екзотика, зелень і сезонні квіти. Наявність та ціни підтверджує менеджер у Telegram.",
  path: "/assortment",
});

export default function AssortmentPage() {
  return (
    <>
      <PageHero
        intro={assortmentPage.intro}
        crumbs={[{ name: "Асортимент", path: "/assortment" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <TelegramCta intent={telegramIntents.price} label={ctaLabels.price} size="lg" />
          <TelegramCta
            intent={telegramIntents.supply}
            label={ctaLabels.currentSupply}
            variant="outline"
            size="lg"
            showIcon={false}
          />
        </div>
      </PageHero>

      <section aria-labelledby="categories-title" className="bg-porcelain">
        <div className="container-page section-y">
          <h2 id="categories-title" className="sr-only">
            Категорії асортименту
          </h2>

          <ul className="grid gap-10 lg:gap-14">
            {categories.map((category, index) => (
              <li
                key={category.slug}
                id={category.slug}
                className="scroll-mt-28"
              >
                <Reveal>
                  <article
                    className={cn(
                      "grid gap-6 lg:gap-10",
                      index % 2 === 0
                        ? "lg:grid-cols-[1.1fr_1fr]"
                        : "lg:grid-cols-[1fr_1.1fr]",
                    )}
                  >
                    <div className={cn(index % 2 === 0 ? "lg:order-1" : "lg:order-2")}>
                      <CategoryCard
                        category={category}
                        variant="detail"
                        wide
                        priority={index === 0}
                      />
                    </div>

                    <div
                      className={cn(
                        "flex flex-col justify-center",
                        index % 2 === 0 ? "lg:order-2" : "lg:order-1",
                      )}
                    >
                      <span className="type-eyebrow text-bordeaux">
                        {String(index + 1).padStart(2, "0")} · Категорія
                      </span>
                      <h3 className="text-ink mt-4 text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)] leading-tight">
                        {category.name}
                      </h3>
                      <p className="text-muted mt-4 text-[1.0625rem] leading-relaxed">
                        {category.description}
                      </p>

                      <ul className="mt-6 space-y-3">
                        {category.details.map((detail) => (
                          <li
                            key={detail}
                            className="text-graphite flex items-start gap-2.5 text-[0.9375rem] leading-relaxed"
                          >
                            <Check className="text-bordeaux mt-1 size-4 shrink-0" aria-hidden="true" />
                            {detail}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7">
                        <TelegramCta
                          intent={telegramIntents.category(category.name)}
                          label={ctaLabels.availability}
                          variant="outline"
                          showIcon={false}
                        />
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={100} className="mt-14">
            <div className={cn(cardSurface, "flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between")}>
              <p className="text-graphite flex items-start gap-3 text-[0.9375rem] leading-relaxed">
                <Info className="text-bordeaux mt-0.5 size-5 shrink-0" aria-hidden="true" />
                {assortmentPage.priceNotice}
              </p>
              <TelegramCta
                intent={telegramIntents.price}
                label={ctaLabels.price}
                size="lg"
                showIcon={false}
                className="shrink-0"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="audience-title" className="bg-cream/50">
        <div className="container-page section-y">
          <SectionHeading
            id="audience-title"
            eyebrow="Для кого"
            title="З ким ми працюємо"
            description="Оптовий напрямок орієнтований на бізнес, для якого квіти — робочий матеріал, а не разова покупка."
          />

          <Reveal delay={100} className="mt-10">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {assortmentPage.audience.map((item) => (
                <li
                  key={item}
                  className="border-line bg-porcelain text-graphite rounded-[var(--radius-tile)] border px-5 py-4 text-[0.9375rem] leading-snug"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <DeliveryDays />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Головна", path: "/" },
          { name: "Асортимент", path: "/assortment" },
        ])}
      />
    </>
  );
}
