import { cardSurface } from "@/components/common/card";
import { CategoryCard } from "@/components/common/category-card";
import { InternalCta, TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { categories } from "@/lib/content/categories";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

export function CategoriesSection() {
  return (
    <section
      id="assortment"
      aria-labelledby="assortment-title"
      className="section-canvas-light seam-from-dark relative"
    >
      <div className="container-hero section-y relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="assortment-title"
            eyebrow="Асортимент"
            title="Категорії, з яких формується замовлення"
            description="Робочі групи позицій для щоденного продажу, подій та авторської флористики. Конкретні сорти й обсяги залежать від поточної поставки."
          />
          <Reveal delay={100} className="shrink-0">
            <InternalCta
              href="/assortment"
              label={ctaLabels.assortment}
              variant="outline"
              size="lg"
            />
          </Reveal>
        </div>

        {/* Editorial rhythm: two wide tiles, then a row of three. */}
        <ul className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-6">
          {categories.map((category, index) => {
            const wide = index < 2;
            return (
              <li
                key={category.slug}
                className={cn(wide ? "lg:col-span-3" : "lg:col-span-2")}
              >
                <Reveal delay={80 + (index % 3) * 80} className="h-full">
                  <CategoryCard category={category} wide={wide} />
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={160} className="mt-10">
          <div
            className={cn(
              cardSurface,
              "flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between",
            )}
          >
            <p className="text-muted max-w-2xl text-[0.9375rem] leading-[1.7] font-medium">
              Ціни не публікуються на сайті — вони змінюються від поставки до поставки. Актуальний
              прайс і наявність надсилає менеджер в оптовому Telegram.
            </p>
            <TelegramCta
              intent={telegramIntents.price}
              label={ctaLabels.price}
              size="lg"
              variant="primary"
              showIcon={false}
              className="shrink-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
