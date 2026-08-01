import { Info } from "lucide-react";

import { TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { cooperationNotice, cooperationTerms } from "@/lib/content/home";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";

export function TermsSection() {
  return (
    <section id="terms" aria-labelledby="terms-title" className="relative scroll-mt-24 bg-porcelain">
      <div aria-hidden="true" className="surface-grain absolute inset-0" />
      <div className="container-page section-y relative">
        <SectionHeading
          id="terms-title"
          eyebrow="Умови співпраці"
          title="Прозорі умови без дрібного шрифту"
          description="Основні цифри, які потрібні, щоб оцінити співпрацю ще до першого замовлення."
        />

        <Reveal delay={100} className="mt-12">
          <dl className="border-line grid overflow-hidden rounded-[var(--radius-card)] border sm:grid-cols-2 lg:grid-cols-4">
            {cooperationTerms.map((term) => (
              <div
                key={term.id}
                className="border-line bg-cream/40 flex flex-col gap-2 border-b p-6 last:border-b-0 sm:p-7 sm:not-nth-[2n]:border-r sm:nth-last-[-n+2]:border-b-0 lg:not-last:border-r lg:border-b-0"
              >
                <dt className="text-muted text-[0.6875rem] font-semibold tracking-[0.18em] uppercase">
                  {term.label}
                </dt>
                {/* Clamped rather than fixed: the Telegram handle is long and must not overflow at 320px. */}
                <dd className="font-display text-ink text-[clamp(1.25rem,0.95rem+1.1vw,1.75rem)] leading-tight break-words">
                  {term.value}
                </dd>
                <p className="text-muted mt-auto pt-2 text-[0.8125rem] leading-relaxed">
                  {term.hint}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={140} className="mt-8">
          <div className="border-line bg-cream/50 flex flex-col gap-5 rounded-[var(--radius-card)] border p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-graphite flex items-start gap-3 text-[0.9375rem] leading-relaxed">
              <Info className="text-bordeaux mt-0.5 size-5 shrink-0" aria-hidden="true" />
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
