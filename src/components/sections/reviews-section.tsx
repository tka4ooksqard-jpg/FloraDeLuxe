import { Info, Quote } from "lucide-react";

import { cardInteractive, cardSurface } from "@/components/common/card";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { reviews, reviewsAreDemo, reviewsDisclaimer } from "@/lib/content/reviews";
import { cn } from "@/lib/utils";

export function ReviewsSection() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-porcelain">
      <div className="container-page section-y">
        <SectionHeading
          id="reviews-title"
          eyebrow="Клієнти"
          title="Нам довіряють флористи та магазини"
          description="Оптова співпраця тримається на передбачуваності: графіку, наявності та чесному підтвердженні замовлення."
        />

        {reviewsAreDemo ? (
          <Reveal delay={80} className="mt-8">
            <p className="border-line-strong text-muted flex items-start gap-3 rounded-[var(--radius-tile)] border border-dashed p-4 text-[0.875rem] leading-relaxed sm:p-5">
              <Info className="text-bordeaux mt-0.5 size-5 shrink-0" aria-hidden="true" />
              {reviewsDisclaimer}
            </p>
          </Reveal>
        ) : null}

        <ul className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <li key={review.id}>
              <Reveal delay={(index % 3) * 90} className="h-full">
                <figure
                  className={cn(
                    cardSurface,
                    cardInteractive,
                    "flex h-full flex-col p-6 sm:p-7",
                  )}
                >
                  <Quote className="text-rose-soft size-7 shrink-0" aria-hidden="true" />

                  <blockquote className="text-graphite mt-4 flex-1 text-[0.9375rem] leading-relaxed">
                    {review.text}
                  </blockquote>

                  <figcaption className="border-line mt-6 border-t pt-5">
                    <p className="text-ink font-display text-lg leading-tight">{review.business}</p>
                    <p className="text-muted mt-1 text-[0.8125rem]">
                      {review.clientType} · {review.city}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
