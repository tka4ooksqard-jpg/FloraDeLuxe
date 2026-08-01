"use client";

import { Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { galleryItems, galleryNotice, type GalleryItem } from "@/lib/content/gallery";
import { cn } from "@/lib/utils";

/**
 * Editorial masonry gallery. Real OPT photos fill available slots; the video
 * tile stays a labelled placeholder until footage is supplied.
 */
const slotSurface = cn(
  "group relative flex w-full flex-col justify-end overflow-hidden text-left",
  "rounded-[var(--radius-card)] border border-line/70",
  "bg-[radial-gradient(120%_90%_at_78%_12%,rgb(239_217_222_/_0.55),transparent_52%),linear-gradient(155deg,var(--color-cream)_0%,var(--color-sand)_42%,var(--color-bordeaux)_160%)]",
  "shadow-soft transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-soft)]",
  "hover:border-line-strong hover:shadow-lift hover:-translate-y-0.5",
);

export function GallerySection() {
  // `activeItem` deliberately outlives `open` so the closing animation still has
  // content to render; it is replaced on the next open rather than cleared.
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [open, setOpen] = useState(false);

  const openItem = (item: GalleryItem) => {
    setActiveItem(item);
    setOpen(true);
  };

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative bg-porcelain">
      <div aria-hidden="true" className="surface-glow absolute inset-0" />

      <div className="container-page section-y relative">
        <SectionHeading
          id="gallery-title"
          eyebrow="Візуальне підтвердження"
          title="Як виглядає наша робота"
          description={galleryNotice}
        />

        <ul className="mt-12 grid auto-rows-[11rem] gap-3 sm:auto-rows-[13rem] sm:gap-4 md:grid-cols-6 md:gap-5">
          {galleryItems.map((item, index) => {
            const isFeature = item.layout === "feature";
            const hasImage = Boolean(item.image);
            const tileClass = isFeature
              ? "md:col-span-4 md:row-span-2"
              : index === 1
                ? "md:col-span-2 md:row-span-2"
                : index === 2 || index === 3
                  ? "md:col-span-2"
                  : "md:col-span-3";

            return (
              <li key={item.id} className={tileClass}>
                <Reveal delay={(index % 4) * 70} className="h-full">
                  <button
                    type="button"
                    onClick={() => openItem(item)}
                    aria-haspopup="dialog"
                    className={cn(slotSurface, "h-full min-h-full")}
                  >
                    {item.image ? (
                      <Image
                        src={item.image.src}
                        alt=""
                        fill
                        sizes={
                          isFeature
                            ? "(max-width: 768px) 100vw, 66vw"
                            : "(max-width: 768px) 100vw, 33vw"
                        }
                        className="object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03]"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                        style={{
                          background:
                            index % 2 === 0
                              ? "radial-gradient(80% 70% at 30% 80%, rgb(90 18 38 / 0.35), transparent 60%)"
                              : "radial-gradient(70% 60% at 70% 30%, rgb(30 58 49 / 0.28), transparent 55%)",
                        }}
                      />
                    )}

                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
                    />

                    <span
                      aria-hidden="true"
                      className="border-line-strong/80 text-bordeaux bg-porcelain/80 absolute top-4 left-4 grid size-11 place-items-center rounded-full border backdrop-blur-sm"
                    >
                      <Icon name={item.kind === "video" ? "video" : "image"} className="size-5" />
                    </span>

                    <span
                      aria-hidden="true"
                      className="border-line-strong/80 text-muted bg-porcelain/80 absolute top-4 right-4 grid size-9 place-items-center rounded-full border opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <Expand className="size-4" />
                    </span>

                    <span className="relative p-5 sm:p-6">
                      <span
                        className={cn(
                          "text-[0.625rem] font-semibold tracking-[0.2em] uppercase",
                          hasImage ? "text-porcelain/70" : "text-bordeaux/70",
                        )}
                      >
                        {item.kind === "video"
                          ? "Відео · очікує матеріал"
                          : hasImage
                            ? "Фото · Kyiv OPT"
                            : "Фото · очікує матеріал"}
                      </span>
                      <span
                        className={cn(
                          "font-display mt-2 block leading-tight",
                          hasImage ? "text-porcelain" : "text-ink",
                          isFeature ? "text-[1.75rem] sm:text-[2.15rem]" : "text-xl sm:text-[1.375rem]",
                        )}
                      >
                        {item.title}
                      </span>
                      <span
                        className={cn(
                          "mt-2 block max-w-md text-[0.875rem] leading-relaxed",
                          hasImage ? "text-porcelain/75" : "text-muted",
                        )}
                      >
                        {item.caption}
                      </span>
                    </span>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        {activeItem ? (
          <DialogContent>
            <div className="pr-12">
              <p className="text-brass-soft text-[0.625rem] font-semibold tracking-[0.2em] uppercase">
                {activeItem.kind === "video" ? "Відеоматеріал" : "Фотоматеріал"}
              </p>
              <DialogTitle className="text-porcelain font-display mt-3 text-[1.75rem] leading-tight sm:text-[2.25rem]">
                {activeItem.title}
              </DialogTitle>
              <DialogDescription className="text-porcelain/70 mt-3 text-[0.9375rem] leading-relaxed">
                {activeItem.caption}
              </DialogDescription>
            </div>

            {activeItem.image ? (
              <div className="relative mt-6 aspect-4/3 overflow-hidden rounded-[var(--radius-tile)]">
                <Image
                  src={activeItem.image.src}
                  alt={activeItem.image.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 640px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="border-porcelain/15 mt-6 rounded-[var(--radius-tile)] border border-dashed p-5">
                <p className="text-porcelain/60 text-sm leading-relaxed">
                  Матеріал ще не додано. Реальне відео зі складу буде розміщено після отримання від
                  компанії.
                </p>
                {activeItem.expectedPath ? (
                  <>
                    <p className="text-porcelain/45 mt-4 text-xs tracking-wide">Очікуваний файл:</p>
                    <code className="text-brass-soft mt-1 block font-mono text-[0.8125rem] break-all">
                      {activeItem.expectedPath}
                    </code>
                  </>
                ) : null}
              </div>
            )}
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  );
}
