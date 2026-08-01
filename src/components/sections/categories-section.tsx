import { CategoryCard } from "@/components/common/category-card";
import { InternalCta, TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { categories } from "@/lib/content/categories";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

export function CategoriesSection() {
  return (
    <section id="assortment" aria-labelledby="assortment-title" className="relative bg-porcelain">
      <div aria-hidden="true" className="surface-grain absolute inset-0" />
      <div className="container-page section-y relative">
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
                <Reveal delay={(index % 3) * 90} className="h-full">
                  <CategoryCard category={category} wide={wide} />
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={120} className="mt-10">
          <div className="border-line bg-cream/50 flex flex-col gap-5 rounded-[var(--radius-card)] border p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-muted max-w-2xl text-[0.9375rem] leading-relaxed">
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
