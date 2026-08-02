import Image from "next/image";

import { TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { sceneImages } from "@/lib/content/scenes";

/**
 * Public order CTA while server-side lead delivery is not connected.
 * The full LeadForm + submitLead stack stays in the repo for a later go-live.
 */
export function TelegramOrderCta() {
  return (
    <section
      id="order"
      aria-labelledby="order-cta-title"
      className="section-canvas-light relative scroll-mt-24"
    >
      <div className="container-hero section-y relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              id="order-cta-title"
              eyebrow="Замовлення"
              title="Готові зробити замовлення?"
              description="Отримайте актуальний прайс, уточніть наявність і оформіть замовлення безпосередньо в Telegram."
            />

            <Reveal delay={100} className="mt-8">
              <div className="group relative aspect-4/5 max-w-md overflow-hidden rounded-[1.75rem]">
                <Image
                  src={sceneImages.finalCta.src}
                  alt={sceneImages.finalCta.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 32vw"
                  className="media-grade media-zoom object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <div className="relative flex flex-col justify-center overflow-x-clip rounded-[1.75rem] border border-[rgba(35,7,13,0.08)] bg-[rgba(246,243,239,0.78)] p-5 shadow-soft backdrop-blur-[18px] sm:p-8">
              <p className="text-graphite text-[1.0625rem] leading-[1.75] font-medium">
                Напишіть менеджеру в Telegram — надішлемо прайс і узгодимо умови під ваш формат
                закупівлі.
              </p>

              <div className="mt-8">
                <TelegramCta
                  intent={telegramIntents.order}
                  label="Написати в Telegram"
                  size="lg"
                  className="w-full sm:w-auto"
                />
              </div>

              <p className="text-muted mt-5 text-[0.8125rem] leading-relaxed">
                Також можна написати з будь-якої кнопки «{ctaLabels.telegram}» на сайті.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
