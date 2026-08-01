import { Clock, MapPin, Navigation, Phone, Send } from "lucide-react";

import { cardSurface } from "@/components/common/card";
import { TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { ContactMap } from "@/components/sections/contact-map";
import { Button } from "@/components/ui/button";
import { contactConfig } from "@/lib/contact-config";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

const rowClass = "flex items-start gap-4 py-5";
const iconClass = "border-line bg-cream/60 text-bordeaux grid size-10 shrink-0 place-items-center rounded-full border";
const labelClass = "text-muted text-[0.6875rem] font-semibold tracking-[0.18em] uppercase";
const valueClass = "text-ink mt-1.5 text-[1.0625rem] leading-snug";

export function ContactSection({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="bg-cream/50">
      <div className="container-page section-y">
        {withHeading ? (
          <SectionHeading
            id="contacts-title"
            eyebrow="Контакти"
            title="Зв’язатися з оптовим напрямком"
            description="Найшвидший спосіб отримати прайс і перевірити наявність — написати в оптовий Telegram."
          />
        ) : (
          <h2 id="contacts-title" className="sr-only">
            Контакти
          </h2>
        )}

        <div
          className={cn(
            "grid items-stretch gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8",
            withHeading && "mt-12",
          )}
        >
          <Reveal className="h-full">
            <div className={cn(cardSurface, "h-full p-6 sm:p-8")}>
              <p className="font-display text-ink text-[1.75rem] leading-tight">
                {contactConfig.legalName}
              </p>

              <dl className="divide-line mt-6 divide-y">
                <div className={rowClass}>
                  <span className={iconClass}>
                    <MapPin className="size-4.5" aria-hidden="true" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <dt className={labelClass}>Адреса</dt>
                    <dd className={valueClass}>{contactConfig.address}</dd>
                  </div>
                </div>

                <div className={rowClass}>
                  <span className={iconClass}>
                    <Send className="size-4.5" aria-hidden="true" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <dt className={labelClass}>Telegram опту</dt>
                    <dd className={valueClass}>
                      <a
                        href={contactConfig.telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-bordeaux inline-flex min-h-9 items-center transition-colors duration-300"
                      >
                        {contactConfig.telegramHandle}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className={rowClass}>
                  <span className={iconClass}>
                    <Phone className="size-4.5" aria-hidden="true" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <dt className={labelClass}>Телефон</dt>
                    <dd className={valueClass}>
                      <a
                        href={`tel:${contactConfig.phoneHref}`}
                        className="hover:text-bordeaux inline-flex min-h-9 items-center transition-colors duration-300"
                      >
                        {contactConfig.phone.value}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className={rowClass}>
                  <span className={iconClass}>
                    <Clock className="size-4.5" aria-hidden="true" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <dt className={labelClass}>Графік роботи</dt>
                    <dd className="text-muted mt-1.5 text-[1.0625rem] leading-snug">
                      {contactConfig.workingHours.value}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TelegramCta
                  intent={telegramIntents.order}
                  label={ctaLabels.telegramShort}
                  size="lg"
                />
                <Button asChild variant="outline" size="lg">
                  <a href={`tel:${contactConfig.phoneHref}`}>
                    <Phone aria-hidden="true" />
                    {ctaLabels.call}
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={contactConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation aria-hidden="true" />
                    {ctaLabels.route}
                    <span className="sr-only"> (відкриється в новій вкладці)</span>
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="h-full">
            <ContactMap />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
