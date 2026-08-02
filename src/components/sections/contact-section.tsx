import { Clock, MapPin, Navigation, Phone, Send } from "lucide-react";
import Image from "next/image";

import { cardSurface } from "@/components/common/card";
import { TelegramCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { ContactMap } from "@/components/sections/contact-map";
import { Button } from "@/components/ui/button";
import { contactConfig } from "@/lib/contact-config";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { sceneImages } from "@/lib/content/scenes";
import { cn } from "@/lib/utils";

const rowClass = "flex items-start gap-4 py-5";
const iconClass =
  "border-line bg-cream/60 text-brass grid size-10 shrink-0 place-items-center rounded-[14px] border";
const labelClass = "text-[0.75rem] font-medium tracking-[0.18em] text-brass uppercase";
const valueClass = "text-ink mt-1.5 text-base leading-snug font-medium sm:text-[1.0625rem]";

export function ContactSection({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section
      id="contacts"
      aria-labelledby="contacts-title"
      className="section-canvas-light seam-to-dark relative"
    >
      <div className="container-hero section-y relative z-10">
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
              <p className="font-display text-ink text-[clamp(1.375rem,1.1rem+1.2vw,1.75rem)] leading-tight font-normal tracking-[-0.015em] break-words">
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
                        className="hover:text-brass inline-flex min-h-11 items-center break-all transition-colors duration-500 ease-[var(--ease-soft)]"
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
                        className="hover:text-brass inline-flex min-h-11 items-center break-all transition-colors duration-500 ease-[var(--ease-soft)]"
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
                    <dd className="text-muted mt-1.5 text-base leading-snug font-medium sm:text-[1.0625rem]">
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
                  className="w-full sm:w-auto"
                />
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <a href={`tel:${contactConfig.phoneHref}`}>
                    <Phone aria-hidden="true" />
                    {ctaLabels.call}
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <a href={contactConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation aria-hidden="true" />
                    {ctaLabels.route}
                    <span className="sr-only"> (відкриється в новій вкладці)</span>
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="flex h-full flex-col gap-5">
            <div className="group relative aspect-16/10 overflow-hidden rounded-[1.75rem]">
              <Image
                src={sceneImages.contacts.src}
                alt={sceneImages.contacts.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="media-grade media-zoom object-cover object-[50%_40%]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent"
              />
            </div>
            <ContactMap />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
