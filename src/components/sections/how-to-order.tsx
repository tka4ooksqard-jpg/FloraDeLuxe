import Image from "next/image";

import { TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { orderSteps } from "@/lib/content/home";
import { telegramIntents } from "@/lib/content/navigation";
import { sceneImages } from "@/lib/content/scenes";

export function HowToOrder() {
  return (
    <section
      id="how-to-order"
      aria-labelledby="how-to-order-title"
      className="on-dark section-canvas-dark relative text-porcelain"
    >
      <div className="container-page section-y relative">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <SectionHeading
            id="how-to-order-title"
            eyebrow="Як замовити"
            tone="dark"
            title="Чотири кроки до першої поставки"
            description="Процес однаковий і для першого замовлення, і для регулярних закупівель."
            className="[&>span]:text-[#D5AF63]"
          />
          <Reveal delay={80} className="relative aspect-4/3 overflow-hidden rounded-[1.75rem]">
            <Image
              src={sceneImages.telegram.src}
              alt={sceneImages.telegram.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {orderSteps.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 100}>
                <div className="relative pt-2">
                  <span
                    aria-hidden="true"
                    className="mb-6 block h-px w-12 bg-[#D5AF63]/45"
                  />
                  <span className="font-display text-[2.5rem] leading-none text-[#D5AF63]/85">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-porcelain mt-4 text-xl leading-snug font-normal">
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

        <Reveal delay={140} className="mt-16">
          <TelegramCta
            intent={telegramIntents.order}
            size="lg"
            variant="light"
            className="h-14 rounded-[14px] px-8"
          />
        </Reveal>
      </div>
    </section>
  );
}
