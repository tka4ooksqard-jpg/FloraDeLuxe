import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cardMedia } from "@/components/common/card";
import { telegramLink } from "@/lib/contact-config";
import type { Category } from "@/lib/content/categories";
import { ctaLabels, telegramIntents } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

type CategoryCardProps = {
  category: Category;
  /** `teaser` links through to the assortment page, `detail` opens Telegram. */
  variant?: "teaser" | "detail";
  /** Controls the crop; the first tiles in the editorial grid are wider. */
  wide?: boolean;
  priority?: boolean;
};

const mediaSizes =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 460px";

export function CategoryCard({
  category,
  variant = "teaser",
  wide = false,
  priority = false,
}: CategoryCardProps) {
  const media = (
    <>
      <Image
        src={category.image.src}
        alt={category.image.alt}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        quality={85}
        sizes={mediaSizes}
        className="media-grade media-zoom object-cover object-[50%_42%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/5 transition-opacity duration-500 group-hover:opacity-95"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 20%, rgb(239 217 222 / 0.35), transparent 55%)",
        }}
      />
    </>
  );

  const body = (
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
      <div className="min-w-0">
        <h3 className="font-display text-[1.625rem] leading-tight font-normal tracking-[-0.015em] text-[#F5EFE9] sm:text-[1.875rem]">
          {category.name}
        </h3>
        <p className="mt-2 max-w-md text-[0.9375rem] leading-[1.65] font-medium text-[rgba(245,239,233,0.86)]">
          {category.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium tracking-[0.02em] text-[#D5AF63]">
          {ctaLabels.availability}
        </span>
      </div>

      <span
        aria-hidden="true"
        className={cn(
          "grid size-11 shrink-0 place-items-center rounded-[14px] border border-[rgba(213,175,99,0.35)] bg-[rgba(35,7,13,0.35)] text-[#D5AF63]",
          "transition-transform duration-500 ease-[var(--ease-soft)]",
          "group-hover:translate-x-1",
        )}
      >
        <ArrowUpRight className="size-4" />
      </span>
    </div>
  );

  const frame = cn(
    cardMedia,
    wide ? "aspect-4/5 sm:aspect-3/2 lg:aspect-16/11" : "aspect-4/5 sm:aspect-3/2 lg:aspect-4/5",
  );

  if (variant === "detail") {
    return (
      <a
        href={telegramLink(telegramIntents.category(category.name))}
        target="_blank"
        rel="noopener noreferrer"
        className={frame}
      >
        {media}
        {body}
        <span className="sr-only">
          {`Написати в Telegram щодо категорії «${category.name}» (відкриється в новій вкладці)`}
        </span>
      </a>
    );
  }

  return (
    <Link href={`/assortment#${category.slug}`} className={frame}>
      {media}
      {body}
      <span className="sr-only">{`Детальніше про категорію «${category.name}»`}</span>
    </Link>
  );
}
