import type { Metadata } from "next";

import { InternalCta, TelegramCta } from "@/components/common/cta";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";

export const metadata: Metadata = {
  title: "Сторінку не знайдено",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-porcelain">
      <div className="container-page flex min-h-[60svh] flex-col justify-center py-20">
        <p className="type-eyebrow text-bordeaux">
          Помилка 404
        </p>
        <h1 className="mt-5 max-w-2xl text-[clamp(2rem,1.3rem+3vw,3.5rem)] leading-[1.08]">
          Такої сторінки не існує
        </h1>
        <p className="text-muted mt-5 max-w-xl text-[1.0625rem] leading-relaxed">
          Можливо, адресу введено з помилкою або сторінку було переміщено. Поверніться на головну
          або напишіть менеджеру — він швидко підкаже потрібне.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <InternalCta href="/" label="На головну" size="lg" />
          <InternalCta
            href="/assortment"
            label={ctaLabels.assortment}
            variant="outline"
            size="lg"
          />
          <TelegramCta intent={telegramIntents.order} size="lg" variant="outline" />
        </div>
      </div>
    </section>
  );
}
