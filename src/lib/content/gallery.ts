import type { SiteImage } from "@/lib/content/media";

export type GalleryOrientation = "portrait" | "landscape";

export type GalleryEmphasis = "feature" | "large" | "accent" | "secondary" | "video";

export type GalleryItem = {
  readonly id: string;
  readonly kind: "image" | "video";
  readonly emphasis: GalleryEmphasis;
  readonly orientation: GalleryOrientation;
  readonly title: string;
  readonly caption: string;
  /** Still image, or poster frame for video tiles. */
  readonly image?: SiteImage;
  /** Public path to the mp4. Only set for shipped video items. */
  readonly videoSrc?: string;
  /**
   * Kept for future assets that are not yet on disk. The UI can still name the
   * expected file without inventing substitute media.
   */
  readonly expectedPath?: string;
};

/**
 * Visual presentation of assortment and wholesale processes.
 * Captions describe the depicted scene only — no invented farm or country claims.
 */
export const galleryItems: readonly GalleryItem[] = [
  {
    id: "warehouse-overview",
    kind: "image",
    emphasis: "feature",
    orientation: "portrait",
    title: "Оптовий асортимент",
    caption: "Загальний вигляд оптового асортименту Flora de Luxe Kyiv OPT.",
    image: {
      src: "/images/gallery/wholesale-hall-premium.webp",
      alt: "Візуальна презентація оптового асортименту квітів",
      width: 1600,
      height: 2000,
      isPlaceholder: false,
    },
  },
  {
    id: "flower-floor",
    kind: "image",
    emphasis: "large",
    orientation: "landscape",
    title: "Партія на прийманні",
    caption: "Свіжа партія після розвантаження, підготовлена до видачі.",
    image: {
      src: "/images/gallery/new-delivery-premium.webp",
      alt: "Нова партія квітів на прийманні",
      width: 2200,
      height: 1238,
      isPlaceholder: false,
    },
  },
  {
    id: "red-white-roses",
    kind: "image",
    emphasis: "large",
    orientation: "portrait",
    title: "Червоні та білі троянди",
    caption: "Пачки троянд з поточної оптової партії.",
    image: {
      src: "/images/gallery/red-white-roses-premium.webp",
      alt: "Оптові пачки червоних і білих троянд",
      width: 1600,
      height: 2000,
      isPlaceholder: false,
    },
  },
  {
    id: "pink-roses",
    kind: "image",
    emphasis: "accent",
    orientation: "portrait",
    title: "Рожеві троянди",
    caption: "Рожеві троянди в пачках для оптових клієнтів.",
    image: {
      src: "/images/gallery/pink-roses-premium.webp",
      alt: "Оптові пачки пудрово-рожевих троянд",
      width: 1600,
      height: 2000,
      isPlaceholder: false,
    },
  },
  {
    id: "baskets",
    kind: "image",
    emphasis: "accent",
    orientation: "portrait",
    title: "Кошики",
    caption: "Плетіння кошики для флористичної комплектації.",
    image: {
      src: "/images/gallery/floral-baskets-premium.webp",
      alt: "Преміальні плетені кошики для флористики",
      width: 1600,
      height: 2000,
      isPlaceholder: false,
    },
  },
  {
    id: "packaging-stock",
    kind: "image",
    emphasis: "secondary",
    orientation: "landscape",
    title: "Упаковка",
    caption: "Запаси пакувальних матеріалів для комплектації замовлень.",
    image: {
      src: "/images/gallery/packaging-materials-premium.webp",
      alt: "Пакувальні матеріали для оптових замовлень",
      width: 2200,
      height: 1238,
      isPlaceholder: false,
    },
  },
  {
    id: "order-preparation",
    kind: "image",
    emphasis: "secondary",
    orientation: "landscape",
    title: "Комплектація",
    caption: "Акуратна підготовка оптового замовлення до видачі.",
    image: {
      src: "/images/gallery/order-preparation-premium.webp",
      alt: "Комплектація оптового замовлення квітів",
      width: 2200,
      height: 1238,
      isPlaceholder: false,
    },
  },
  {
    id: "cold-storage",
    kind: "image",
    emphasis: "secondary",
    orientation: "portrait",
    title: "Холодильне зберігання",
    caption: "Квіти у професійних контейнерах у зоні зберігання.",
    image: {
      src: "/images/gallery/cold-storage-premium.webp",
      alt: "Холодильне зберігання оптових квітів",
      width: 1600,
      height: 2000,
      isPlaceholder: false,
    },
  },

  // —— Video tiles. Poster frames from the same visual series. ——
  {
    id: "video-wholesale-floor",
    kind: "video",
    emphasis: "video",
    orientation: "landscape",
    title: "Оптовий зал",
    caption: "Коротке відео оптового асортименту.",
    videoSrc: "/videos/warehouse/wholesale-floor.mp4",
    image: {
      src: "/images/gallery/wholesale-hall-premium.webp",
      alt: "Відео: загальний вигляд оптового асортименту",
      width: 1600,
      height: 2000,
      isPlaceholder: false,
    },
  },
  {
    id: "video-mixed-arrival",
    kind: "video",
    emphasis: "video",
    orientation: "landscape",
    title: "Мікс партії",
    caption: "Надходження змішаної квіткової партії.",
    videoSrc: "/videos/warehouse/mixed-arrival.mp4",
    image: {
      src: "/images/gallery/new-delivery-premium.webp",
      alt: "Відео: надходження квіткової партії",
      width: 2200,
      height: 1238,
      isPlaceholder: false,
    },
  },
  {
    id: "video-pink-roses",
    kind: "video",
    emphasis: "video",
    orientation: "portrait",
    title: "Рожеві троянди",
    caption: "Пачки рожевих троянд з оптової партії.",
    videoSrc: "/videos/warehouse/pink-roses.mp4",
    image: {
      src: "/images/gallery/pink-roses-premium.webp",
      alt: "Відео: оптові рожеві троянди",
      width: 1600,
      height: 2000,
      isPlaceholder: false,
    },
  },
  {
    id: "video-red-roses",
    kind: "video",
    emphasis: "video",
    orientation: "portrait",
    title: "Червоні троянди",
    caption: "Пачки червоних і білих троянд.",
    videoSrc: "/videos/warehouse/red-roses.mp4",
    image: {
      src: "/images/gallery/red-white-roses-premium.webp",
      alt: "Відео: червоні та білі троянди",
      width: 1600,
      height: 2000,
      isPlaceholder: false,
    },
  },
  {
    id: "video-hydrangeas",
    kind: "video",
    emphasis: "video",
    orientation: "portrait",
    title: "Гортензії",
    caption: "Гортензії з поточної поставки.",
    videoSrc: "/videos/warehouse/hydrangeas.mp4",
    image: {
      src: "/images/categories/seasonal-premium.webp",
      alt: "Відео: сезонні квіти з гортензією",
      width: 1600,
      height: 1067,
      isPlaceholder: false,
    },
  },
  {
    id: "video-peonies",
    kind: "video",
    emphasis: "video",
    orientation: "portrait",
    title: "Півонії",
    caption: "Півонії з оптового асортименту.",
    videoSrc: "/videos/warehouse/peonies.mp4",
    image: {
      src: "/images/gallery/pink-roses-premium.webp",
      alt: "Відео: квіткові пачки з оптового асортименту",
      width: 1600,
      height: 2000,
      isPlaceholder: false,
    },
  },
];

export const galleryNotice =
  "Візуальна презентація асортименту та процесів Flora de Luxe Kyiv OPT. Натисніть на кадр, щоб відкрити його повністю.";

export const galleryPhotoItems = galleryItems.filter((item) => item.kind === "image");
export const galleryVideoItems = galleryItems.filter((item) => item.kind === "video");
