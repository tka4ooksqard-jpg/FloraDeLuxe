import Image from "next/image";
import Link from "next/link";

import { cardInteractive, cardSurface } from "@/components/common/card";
import { InternalCta } from "@/components/common/cta";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { supplierRegions } from "@/lib/content/suppliers";
import { cn } from "@/lib/utils";

/**
 * Compact geography teaser for the home page. The map, per-region profiles and
 * supply frequency live on `/suppliers`.
 */
export function SuppliersPreview() {
  return (
    <section id="suppliers" aria-labelledby="suppliers-preview-title" className="bg-porcelain">
      <div className="container-page section-y">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="suppliers-preview-title"
            eyebrow="Географія поставок"
            title="Квіти з найкращих флористичних регіонів"
            description="Кілька напрямків замість одного — ширший вибір сортів і стабільніше наповнення партій протягом року."
          />
          <Reveal delay={100} className="shrink-0">
            <InternalCta
              href="/suppliers"
              label="Наші постачальники"
              variant="outline"
              size="lg"
            />
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {supplierRegions.map((region, index) => (
            <li key={region.code}>
              <Reveal delay={(index % 4) * 80} className="h-full">
                <Link
                  href={`/suppliers#${region.code.toLowerCase()}`}
                  className={cn(
                    cardSurface,
                    cardInteractive,
                    "group flex h-full flex-col overflow-hidden",
                  )}
                >
                  <span className="relative block aspect-16/10 overflow-hidden">
                    <Image
                      src={region.image.src}
                      alt={region.image.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                    />
                  </span>

                  <span className="flex flex-1 flex-col p-5">
                    <span className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="border-line-strong text-bordeaux rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-semibold tracking-[0.14em]"
                      >
                        {region.code}
                      </span>
                      <span className="font-display text-ink text-[1.375rem] leading-tight">
                        {region.country}
                      </span>
                    </span>
                    <span className="text-muted mt-2.5 block text-[0.875rem] leading-relaxed">
                      {region.description}
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
