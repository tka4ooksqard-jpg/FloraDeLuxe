import type { SiteImage } from "@/lib/content/media";

export type GalleryItem = {
  readonly id: string;
  /** `feature` renders as the single large tile at the top of the grid. */
  readonly layout: "feature" | "tile";
  readonly kind: "image" | "video";
  readonly title: string;
  readonly caption: string;
  /**
   * Real OPT product photography when available. Video (and any future empty
   * slots) keep `expectedPath` so the UI can still name the missing file.
   */
  readonly image?: SiteImage;
  readonly expectedPath?: string;
};

/**
 * Product photography from the public OPT Telegram channel
 * (@floradeluxekyiv_opt). Captions describe what is shown — not invented
 * warehouse scenes. The walkthrough video has not been supplied.
 */
export const galleryItems: readonly GalleryItem[] = [
  {
    id: "unloading",
    layout: "feature",
    kind: "image",
    title: "Оптові пачки троянд",
    caption: "Партія троянд у пачках — типовий формат відпуску Kyiv OPT.",
    image: {
      src: "/images/warehouse/unloading.webp",
      alt: "Оптові пачки троянд Flora de Luxe Kyiv OPT",
      width: 1600,
      height: 1200,
      isPlaceholder: false,
    },
  },
  {
    id: "cold-room",
    layout: "tile",
    kind: "image",
    title: "Танацетум Голландія",
    caption: "Сезонна позиція з голландського напрямку в актуальному прайсі.",
    image: {
      src: "/images/warehouse/cold-room.webp",
      alt: "Танацетум Голландія з оптового асортименту Flora de Luxe Kyiv OPT",
      width: 1400,
      height: 1050,
      isPlaceholder: false,
    },
  },
  {
    id: "bunches",
    layout: "tile",
    kind: "image",
    title: "Пачки перед видачею",
    caption: "Підготовлені пачки квітів для оптових клієнтів.",
    image: {
      src: "/images/warehouse/bunches.webp",
      alt: "Підготовлені оптові пачки квітів Flora de Luxe Kyiv OPT",
      width: 1400,
      height: 1050,
      isPlaceholder: false,
    },
  },
  {
    id: "sorting",
    layout: "tile",
    kind: "image",
    title: "Декоративна зелень",
    caption: "Зелень у пучках — окремий розділ оптового прайсу.",
    image: {
      src: "/images/warehouse/sorting.webp",
      alt: "Декоративна зелень з оптового асортименту Flora de Luxe Kyiv OPT",
      width: 1400,
      height: 1050,
      isPlaceholder: false,
    },
  },
  {
    id: "picking",
    layout: "tile",
    kind: "image",
    title: "Акцентні позиції",
    caption: "Сорти з поточної поставки для вітрини та подій.",
    image: {
      src: "/images/warehouse/picking.webp",
      alt: "Акцентна квіткова позиція з оптового асортименту Flora de Luxe Kyiv OPT",
      width: 1400,
      height: 1050,
      isPlaceholder: false,
    },
  },
  {
    id: "walkthrough",
    layout: "tile",
    kind: "video",
    expectedPath: "public/videos/warehouse/walkthrough.mp4",
    title: "Відео зі складу",
    caption: "Коротка екскурсія зоною приймання та зберігання — матеріал ще готується.",
  },
];

export const galleryNotice =
  "Фото з оптового асортименту Flora de Luxe Kyiv OPT. Відео зі складу буде додано після отримання від компанії.";
