import Image from "next/image";

import { cardSurface } from "@/components/common/card";
import { InternalCta, TelegramCta } from "@/components/common/cta";
import { Icon } from "@/components/common/icon";
import { PageHero } from "@/components/common/page-hero";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { GallerySection } from "@/components/sections/gallery-section";
import { HowToOrder } from "@/components/sections/how-to-order";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { aboutPage } from "@/lib/content/pages";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Про компанію",
  description:
    "Flora de Luxe Kyiv OPT — оптовий напрямок квіткової компанії у Києві. Регулярні поставки, доставка по місту та актуальний прайс у Telegram для B2B-клієнтів.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero intro={aboutPage.intro} crumbs={[{ name: "Про нас", path: "/about" }]}>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <TelegramCta intent={telegramIntents.terms} label={ctaLabels.telegramShort} size="lg" />
          <InternalCta
            href="/supplies"
            label="Як влаштовані поставки"
            variant="outline"
            size="lg"
          />
        </div>
      </PageHero>

      <section aria-labelledby="story-title" className="bg-porcelain">
        <div className="container-page section-y">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                id="story-title"
                eyebrow="Історія"
                title="Від роздрібної мережі до оптового напрямку"
              />

              <div className="mt-8 space-y-5">
                {aboutPage.story.map((paragraph, index) => (
                  <Reveal key={paragraph.slice(0, 24)} delay={index * 80}>
                    <p className="text-muted text-[1.0625rem] leading-relaxed">{paragraph}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={100}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative col-span-2 aspect-4/3 overflow-hidden rounded-[var(--radius-card)]">
                  <Image
                    src={aboutPage.images.hall.src}
                    alt={aboutPage.images.hall.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative col-span-2 aspect-16/10 overflow-hidden rounded-[var(--radius-card)] sm:col-span-1 sm:aspect-4/5">
                  <Image
                    src={aboutPage.images.craft.src}
                    alt={aboutPage.images.craft.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className={cn(
                    cardSurface,
                    "col-span-2 flex flex-col justify-center p-6 sm:col-span-1",
                  )}
                >
                  <p className="font-display text-ink text-[1.5rem] leading-tight">
                    Прайс і наявність — у Telegram
                  </p>
                  <p className="text-muted mt-3 text-[0.875rem] leading-relaxed">
                    Тому ми говоримо про графік поставок, пачки та підтвердження наявності, а не про
                    гучні гарантії.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="bg-cream/50">
        <div className="container-page section-y">
          <SectionHeading
            id="principles-title"
            eyebrow="Принципи"
            title="Три речі, за якими нас перевіряють"
            description="Оптовий клієнт повертається не через рекламу, а через передбачуваність."
          />

          <ul className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-3">
            {aboutPage.principles.map((principle, index) => (
              <li key={principle.id}>
                <Reveal delay={index * 90} className="h-full">
                  <article className={cn(cardSurface, "flex h-full flex-col p-6 sm:p-7")}>
                    <span className="border-line bg-cream/60 text-bordeaux grid size-11 place-items-center rounded-full border">
                      <Icon name={principle.icon} className="size-5" />
                    </span>
                    <h3 className="text-ink mt-5 text-xl leading-snug">{principle.title}</h3>
                    <p className="text-muted mt-2.5 text-[0.9375rem] leading-relaxed">
                      {principle.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GallerySection />
      <ReviewsSection />
      <HowToOrder />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Головна", path: "/" },
          { name: "Про нас", path: "/about" },
        ])}
      />
    </>
  );
}
