import Image from "next/image";

import { TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { orderSteps } from "@/lib/content/home";
import { telegramIntents } from "@/lib/content/navigation";
import { sceneImages } from "@/lib/content/scenes";

export function HowToOrder() {
  return (
    <section
      id="how-to-order"
      aria-labelledby="how-to-order-title"
      className="on-dark section-canvas-dark seam-from-cream relative overflow-hidden text-porcelain"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 9rem at 50% 0%, #3b101a 0%, transparent 72%), radial-gradient(42rem 32rem at 88% 12%, rgb(213 175 99 / 0.06), transparent 62%)",
        }}
      />
      <div aria-hidden="true" className="delivery-grain absolute inset-0" />

      <div className="container-hero section-y relative z-10">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal className="max-w-[540px]">
            <p className="flex items-center gap-3.5 text-[0.75rem] font-medium tracking-[0.2em] text-[#D5AF63] uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-[#D5AF63]/55" />
              Як замовити
            </p>
            <h2
              id="how-to-order-title"
              className="font-display mt-8 text-[clamp(2.35rem,1.5rem+2.8vw,3.75rem)] leading-[0.98] font-normal tracking-[-0.02em] text-[#F5EFE9]"
            >
              Чотири кроки до першої поставки
            </h2>
            <p className="mt-8 text-[1.125rem] leading-[1.75] font-normal text-[rgba(255,255,255,0.84)]">
              Процес однаковий і для першого замовлення, і для регулярних закупівель.
            </p>
          </Reveal>

          <Reveal delay={120} className="relative aspect-4/3 overflow-hidden rounded-[1.75rem]">
            <Image
              src={sceneImages.telegram.src}
              alt={sceneImages.telegram.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="media-grade object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(160deg,rgb(35_7_13_/_0.28)_0%,transparent_48%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_40%,transparent_48%,rgb(18_7_10_/_0.4)_100%)]"
            />
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {orderSteps.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={80 + index * 80}>
                <div className="relative pt-2">
                  <span
                    aria-hidden="true"
                    className="mb-6 block h-px w-12 bg-[#D5AF63]/45"
                  />
                  <span className="font-display text-[2.5rem] leading-none text-[#D5AF63]/85">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-4 text-xl leading-snug font-normal tracking-[-0.015em] text-[#F5EFE9]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-[1.7] font-normal text-[rgba(255,255,255,0.84)]">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={200} className="mt-16">
          <TelegramCta
            intent={telegramIntents.order}
            size="lg"
            variant="light"
            className="h-14 px-8"
          />
        </Reveal>
      </div>
    </section>
  );
}
