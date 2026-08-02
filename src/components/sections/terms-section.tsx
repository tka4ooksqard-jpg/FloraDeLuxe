import { Info } from "lucide-react";

import { cardSurface } from "@/components/common/card";
import { TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { cooperationNotice, cooperationTerms } from "@/lib/content/home";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

export function TermsSection() {
  return (
    <section
      id="terms"
      aria-labelledby="terms-title"
      className="section-canvas-light seam-to-dark relative scroll-mt-24"
    >
      <div className="container-hero section-y relative z-10">
        <SectionHeading
          id="terms-title"
          eyebrow="Умови співпраці"
          title="Прозорі умови без дрібного шрифту"
          description="Основні цифри, які потрібні, щоб оцінити співпрацю ще до першого замовлення."
        />

        <Reveal delay={100} className="mt-12">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {cooperationTerms.map((term) => (
              <div key={term.id} className={cn(cardSurface, "flex flex-col gap-2 p-6 sm:p-7")}>
                <dt className="text-[0.75rem] font-medium tracking-[0.18em] text-brass-ink uppercase">
                  {term.label}
                </dt>
                <dd className="font-display text-ink text-[clamp(1.25rem,0.95rem+1.1vw,1.75rem)] leading-tight font-normal tracking-[-0.015em] break-words">
                  {term.value}
                  <span className="type-caption text-muted mt-2 block font-sans font-medium tracking-normal normal-case">
                    {term.hint}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={140} className="mt-8">
          <div
            className={cn(
              cardSurface,
              "flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between",
            )}
          >
            <p className="text-graphite flex items-start gap-3 text-[0.9375rem] leading-[1.7] font-medium">
              <Info className="mt-0.5 size-5 shrink-0 text-brass" aria-hidden="true" />
              {cooperationNotice}
            </p>
            <TelegramCta
              intent={telegramIntents.terms}
              label={ctaLabels.telegram}
              size="lg"
              className="shrink-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
