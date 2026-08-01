import { TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { orderSteps } from "@/lib/content/home";
import { telegramIntents } from "@/lib/content/navigation";

export function HowToOrder() {
  return (
    <section
      id="how-to-order"
      aria-labelledby="how-to-order-title"
      className="on-dark bg-forest text-porcelain"
    >
      <div className="container-page section-y">
        <SectionHeading
          id="how-to-order-title"
          eyebrow="Як замовити"
          tone="dark"
          title="Чотири кроки до першої поставки"
          description="Процес однаковий і для першого замовлення, і для регулярних закупівель."
        />

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {orderSteps.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 100}>
                <div className="border-porcelain/20 relative border-t pt-6">
                  {/* Connector dot sitting on the rule, echoing a progress track. */}
                  <span
                    aria-hidden="true"
                    className="bg-brass-soft absolute -top-1 left-0 size-2 rounded-full"
                  />
                  <span className="text-brass-soft/80 font-display text-[2.5rem] leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-porcelain mt-4 text-xl leading-snug">{step.title}</h3>
                  <p className="text-porcelain/65 mt-2.5 text-[0.9375rem] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={140} className="mt-14">
          <TelegramCta intent={telegramIntents.order} size="lg" variant="light" />
        </Reveal>
      </div>
    </section>
  );
}
