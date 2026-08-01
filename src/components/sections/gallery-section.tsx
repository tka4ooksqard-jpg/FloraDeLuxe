"use client";

import { Expand, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  galleryNotice,
  galleryPhotoItems,
  galleryVideoItems,
  type GalleryItem,
} from "@/lib/content/gallery";
import { cn } from "@/lib/utils";

const slotSurface = cn(
  "group relative flex w-full flex-col justify-end overflow-hidden text-left",
  "rounded-[var(--radius-card)] border border-line/70",
  "bg-graphite shadow-soft transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-soft)]",
  "hover:border-line-strong hover:shadow-lift hover:-translate-y-0.5",
);

function tileClass(item: GalleryItem): string {
  if (item.emphasis === "video") {
    return item.orientation === "portrait"
      ? "md:col-span-2 md:row-span-2"
      : "md:col-span-3";
  }

  switch (item.emphasis) {
    case "feature":
      return "md:col-span-2 md:row-span-3";
    case "large":
      return item.orientation === "portrait"
        ? "md:col-span-2 md:row-span-3"
        : "md:col-span-4 md:row-span-2";
    case "accent":
      return "md:col-span-2 md:row-span-3";
    case "secondary":
      return item.orientation === "portrait"
        ? "md:col-span-2 md:row-span-2"
        : "md:col-span-3 md:row-span-2";
    default:
      return "md:col-span-2";
  }
}

function dialogAspect(item: GalleryItem): string {
  if (item.kind === "video") return "aspect-video";
  return item.orientation === "portrait" ? "aspect-3/4 max-h-[70dvh]" : "aspect-16/10";
}

function GalleryTile({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (item: GalleryItem) => void;
}) {
  const isVideo = item.kind === "video";
  const hasMedia = Boolean(item.image);

  return (
    <li className={tileClass(item)}>
      <Reveal delay={(index % 4) * 70} className="h-full">
        <button
          type="button"
          onClick={() => onOpen(item)}
          aria-haspopup="dialog"
          aria-label={
            isVideo ? `Відтворити відео: ${item.title}` : `Відкрити фото: ${item.title}`
          }
          className={cn(slotSurface, "h-full min-h-full")}
        >
          {item.image ? (
            <Image
              src={item.image.src}
              alt=""
              fill
              loading="lazy"
              quality={85}
              sizes={
                item.emphasis === "feature"
                  ? "(max-width: 768px) 100vw, 40vw"
                  : item.emphasis === "large"
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 100vw, 33vw"
              }
              className="media-grade media-zoom object-cover object-[50%_45%]"
            />
          ) : (
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(155deg,var(--color-cream)_0%,var(--color-sand)_42%,var(--color-bordeaux)_160%)]"
            />
          )}

          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
          />

          {isVideo ? (
            <span
              aria-hidden="true"
              className="border-porcelain/30 bg-ink/45 text-porcelain absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border backdrop-blur-sm transition-transform duration-500 group-hover:scale-105"
            >
              <Play className="size-5 fill-current" />
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="border-line-strong/80 text-bordeaux bg-porcelain/80 absolute top-4 left-4 grid size-11 place-items-center rounded-full border backdrop-blur-sm"
            >
              <Icon name="image" className="size-5" />
            </span>
          )}

          <span
            aria-hidden="true"
            className="border-line-strong/80 text-muted bg-porcelain/80 absolute top-4 right-4 grid size-9 place-items-center rounded-full border opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Expand className="size-4" />
          </span>

          <span className="relative p-5 sm:p-6">
            <span className="type-eyebrow text-porcelain/85">
              {isVideo ? "Відео · Kyiv OPT" : hasMedia ? "Фото · Kyiv OPT" : "Очікує матеріал"}
            </span>
            <span
              className={cn(
                "text-porcelain font-display mt-2 block leading-tight",
                item.emphasis === "feature"
                  ? "text-[1.75rem] sm:text-[2.15rem]"
                  : "text-xl sm:text-[1.375rem]",
              )}
            >
              {item.title}
            </span>
            <span className="text-porcelain/88 mt-2 block max-w-md text-sm leading-[1.6] font-medium">
              {item.caption}
            </span>
          </span>
        </button>
      </Reveal>
    </li>
  );
}

export function GallerySection() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const openItem = (item: GalleryItem) => {
    setActiveItem(item);
    setOpen(true);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setOpen(next);
  };

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="section-canvas-light relative"
    >
      <div className="container-page section-y relative">
        <SectionHeading
          id="gallery-title"
          eyebrow="Візуальне підтвердження"
          title="Як виглядає наша робота"
          description={galleryNotice}
        />

        <ul className="mt-12 grid auto-rows-[10.5rem] gap-3 sm:auto-rows-[12.5rem] sm:gap-4 md:grid-cols-6 md:gap-5">
          {galleryPhotoItems.map((item, index) => (
            <GalleryTile key={item.id} item={item} index={index} onOpen={openItem} />
          ))}
        </ul>

        <div className="mt-14">
          <h3 className="text-ink text-[1.0625rem] font-semibold tracking-tight sm:text-[1.125rem]">
            Відео зі складу
          </h3>
          <p className="text-muted mt-2 max-w-2xl text-[0.9375rem] leading-[1.7] font-medium">
            Короткі ролики оптового залу. Відтворення лише після натискання — без автозапуску зі
            звуком.
          </p>

          <ul className="mt-8 grid auto-rows-[11rem] gap-3 sm:auto-rows-[13rem] sm:gap-4 md:grid-cols-6 md:gap-5">
            {galleryVideoItems.map((item, index) => (
              <GalleryTile key={item.id} item={item} index={index} onOpen={openItem} />
            ))}
          </ul>
        </div>
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        {activeItem ? (
          <DialogContent>
            <div className="pr-12">
              <p className="type-eyebrow text-brass-soft">
                {activeItem.kind === "video" ? "Відеоматеріал" : "Фотоматеріал"}
              </p>
              <DialogTitle className="text-porcelain font-display mt-3 text-[1.75rem] leading-tight sm:text-[2.25rem]">
                {activeItem.title}
              </DialogTitle>
              <DialogDescription className="text-porcelain/85 mt-3 text-[0.9375rem] leading-[1.7] font-medium">
                {activeItem.caption}
              </DialogDescription>
            </div>

            {activeItem.kind === "video" && activeItem.videoSrc ? (
              <div
                className={cn(
                  "mt-6 overflow-hidden rounded-[var(--radius-tile)] bg-ink",
                  dialogAspect(activeItem),
                )}
              >
                {reduceMotion && activeItem.image ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={activeItem.image.src}
                      alt={activeItem.image.alt || activeItem.title}
                      fill
                      quality={85}
                      sizes="(max-width: 768px) 90vw, 720px"
                      className="media-grade object-cover"
                    />
                    <p className="text-porcelain/80 absolute inset-x-0 bottom-0 bg-ink/75 p-4 text-sm leading-relaxed">
                      Зменшення руху увімкнено — показано poster-кадр. Відкрийте відео в новій
                      вкладці або вимкніть налаштування, щоб переглянути ролик з елементами
                      керування.
                    </p>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    key={activeItem.id}
                    src={activeItem.videoSrc}
                    poster={activeItem.image?.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
            ) : activeItem.image ? (
              <div
                className={cn(
                  "relative mt-6 mx-auto w-full overflow-hidden rounded-[var(--radius-tile)]",
                  dialogAspect(activeItem),
                )}
              >
                <Image
                  src={activeItem.image.src}
                  alt={activeItem.image.alt || activeItem.title}
                  fill
                  quality={85}
                  sizes="(max-width: 768px) 90vw, 640px"
                  className="media-grade object-cover"
                />
              </div>
            ) : (
              <div className="border-porcelain/15 mt-6 rounded-[var(--radius-tile)] border border-dashed p-5">
                <p className="text-porcelain/80 text-sm leading-[1.65] font-medium">
                  Матеріал ще не додано.
                </p>
                {activeItem.expectedPath ? (
                  <>
                    <p className="text-porcelain/70 mt-4 text-[0.8125rem] font-medium">
                      Очікуваний файл:
                    </p>
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
