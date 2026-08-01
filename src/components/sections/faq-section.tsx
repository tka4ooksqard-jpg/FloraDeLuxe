import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/content/faq";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { sceneImages } from "@/lib/content/scenes";

export function FaqSection({
  eyebrow = "FAQ",
  title = "Часті запитання",
  description = "Коротко про оплату, доставку, мінімальне замовлення та отримання прайсу.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-canvas-light relative">
      <div className="container-page section-y relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              id="faq-title"
              eyebrow={eyebrow}
              title={title}
              description={description}
            />

            <Reveal delay={100} className="mt-8">
              <div className="relative aspect-4/3 overflow-hidden rounded-[1.75rem]">
                <Image
                  src={sceneImages.faq.src}
                  alt={sceneImages.faq.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  className="object-cover object-center"
                />
              </div>
            </Reveal>

            <Reveal delay={140} className="mt-6">
              <div className="border-line bg-porcelain rounded-[var(--radius-card)] border p-6">
                <p className="text-graphite text-[0.9375rem] leading-relaxed">
                  Не знайшли відповідь? Менеджер оптового напрямку відповість у Telegram.
                </p>
                <TelegramCta
                  intent={telegramIntents.terms}
                  label={ctaLabels.telegramShort}
                  size="md"
                  className="mt-5"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <p>{item.answer}</p>
                    {item.action ? (
                      <a
                        href={item.action.href}
                        target={item.action.external ? "_blank" : undefined}
                        rel={item.action.external ? "noopener noreferrer" : undefined}
                        className="text-bordeaux hover:text-bordeaux-deep group/action mt-4 inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium transition-colors duration-300"
                      >
                        {item.action.label}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-300 group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5"
                        />
                        {item.action.external ? (
                          <span className="sr-only"> (відкриється в новій вкладці)</span>
                        ) : null}
                      </a>
                    ) : null}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
