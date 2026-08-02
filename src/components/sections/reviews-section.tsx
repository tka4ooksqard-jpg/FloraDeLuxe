import { Quote } from "lucide-react";

import { cardSurface } from "@/components/common/card";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { reviews } from "@/lib/content/reviews";
import { cn } from "@/lib/utils";

export function ReviewsSection() {
  if (reviews.length === 0) return null;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="section-canvas-light seam-from-dark relative"
    >
      <div className="container-hero section-y relative z-10">
        <SectionHeading
          id="reviews-title"
          eyebrow="Клієнти"
          title="Нам довіряють флористи та магазини"
          description="Оптова співпраця тримається на передбачуваності: графіку, наявності та чесному підтвердженні замовлення."
        />

        <ul className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <li key={review.id}>
              <Reveal delay={(index % 3) * 90} className="h-full">
                <figure className={cn(cardSurface, "flex h-full flex-col p-6 sm:p-7")}>
                  <Quote className="size-6 shrink-0 text-brass/70" aria-hidden="true" strokeWidth={1.25} />

                  <blockquote className="text-graphite mt-4 flex-1 text-[0.9375rem] leading-[1.7] font-medium">
                    {review.text}
                  </blockquote>

                  <figcaption className="border-line mt-6 border-t pt-5">
                    <p className="font-display text-ink text-lg leading-tight font-normal tracking-[-0.01em]">
                      {review.business}
                    </p>
                    <p className="type-caption text-muted mt-1.5">
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
