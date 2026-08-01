import { InternalCta, TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { contactConfig } from "@/lib/contact-config";
import { finalCta, orderSteps } from "@/lib/content/home";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";

/**
 * Closing conversion band. The ordering steps are shown in their short form so
 * the home page answers "how do I order?" without carrying the full section.
 */
export function FinalCta() {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-title"
      className="on-dark bg-bordeaux-deep text-porcelain"
    >
      <div className="container-page section-y">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <SectionHeading
              id="final-cta-title"
              tone="dark"
              eyebrow={finalCta.eyebrow}
              title={finalCta.title}
              description={finalCta.description}
            />

            <Reveal delay={120} className="mt-9">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TelegramCta
                  intent={telegramIntents.price}
                  label={ctaLabels.price}
                  size="lg"
                  variant="light"
                  showIcon={false}
                />
                <TelegramCta intent={telegramIntents.order} size="lg" variant="onDark" />
              </div>

              <p className="text-porcelain/55 mt-6 text-[0.875rem] leading-relaxed">
                Або зателефонуйте:{" "}
                <a
                  href={`tel:${contactConfig.phoneHref}`}
                  className="text-porcelain/85 hover:text-porcelain underline-offset-4 transition-colors duration-300 hover:underline"
                >
                  {contactConfig.phone.value}
                </a>
              </p>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <ol className="border-porcelain/15 divide-porcelain/12 divide-y rounded-[var(--radius-card)] border">
              {orderSteps.map((step, index) => (
                <li key={step.id} className="flex items-start gap-4 px-5 py-5 sm:px-6">
                  <span
                    aria-hidden="true"
                    className="text-brass-soft/80 font-display w-8 shrink-0 text-2xl leading-none"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-porcelain/85 text-[0.9375rem] leading-snug">
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-6">
              <InternalCta
                href="/supplies#how-to-order"
                label="Детальніше про процес замовлення"
                variant="onDark"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
