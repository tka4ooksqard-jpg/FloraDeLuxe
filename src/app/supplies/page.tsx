import { cardSurface } from "@/components/common/card";
import { TelegramCta } from "@/components/common/cta";
import { Icon } from "@/components/common/icon";
import { PageHero } from "@/components/common/page-hero";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { DeliveryDays } from "@/components/sections/delivery-days";
import { StorageSection } from "@/components/sections/storage-section";
import { SuppliersSection } from "@/components/sections/suppliers-section";
import { TermsSection } from "@/components/sections/terms-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { suppliesPage } from "@/lib/content/pages";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Поставки та логістика",
  description:
    "Регулярні дні поставок, відпуск пачками, доставка по Києву та умови з офіційного прайсу Flora de Luxe Kyiv OPT.",
  path: "/supplies",
});

export default function SuppliesPage() {
  return (
    <>
      <PageHero intro={suppliesPage.intro} crumbs={[{ name: "Поставки", path: "/supplies" }]}>
        <TelegramCta
          intent={telegramIntents.supply}
          label={ctaLabels.currentSupply}
          size="lg"
        />
      </PageHero>

      <section aria-labelledby="chain-title" className="bg-porcelain">
        <div className="container-page section-y">
          <SectionHeading
            id="chain-title"
            eyebrow="Шлях партії"
            title="П’ять етапів від прибуття до видачі"
            description="Кожен етап має одну мету — скоротити час, який квітка проводить поза належними умовами."
          />

          <ol className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-5">
            {suppliesPage.chain.map((step, index) => (
              <li key={step.id}>
                <Reveal delay={index * 80} className="h-full">
                  <article className={cn(cardSurface, "flex h-full flex-col p-6")}>
                    <div className="flex items-center justify-between">
                      <span className="border-line bg-cream/60 text-bordeaux grid size-11 place-items-center rounded-full border">
                        <Icon name={step.icon} className="size-5" />
                      </span>
                      <span className="text-line-strong font-display text-3xl leading-none">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-ink mt-5 text-lg leading-snug">{step.title}</h3>
                    <p className="text-muted mt-2.5 text-[0.875rem] leading-relaxed">
                      {step.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <DeliveryDays />

      <section aria-labelledby="logistics-title" className="bg-porcelain">
        <div className="container-page section-y">
          <SectionHeading
            id="logistics-title"
            eyebrow="Логістика"
            title="Доставка по Києву та самовивіз"
            description="Спосіб отримання обирає клієнт. В обох випадках замовлення комплектується після підтвердження наявності та оплати."
          />

          <ul className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-3">
            {suppliesPage.logistics.map((item, index) => (
              <li key={item.id}>
                <Reveal delay={index * 90} className="h-full">
                  <article className={cn(cardSurface, "flex h-full flex-col p-6 sm:p-7")}>
                    <h3 className="text-ink text-xl leading-snug">{item.title}</h3>
                    <p className="text-muted mt-3 text-[0.9375rem] leading-relaxed">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SuppliersSection />
      <StorageSection />
      <TermsSection />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Головна", path: "/" },
          { name: "Поставки", path: "/supplies" },
        ])}
      />
    </>
  );
}
