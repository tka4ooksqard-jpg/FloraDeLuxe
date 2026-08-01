import type { SiteImage } from "@/lib/content/media";

/**
 * Unified luxury photoset slots for editorial sections.
 * All frames share one cinematic grade (bordeaux / champagne / gold).
 */
export const sceneImages = {
  delivery: {
    src: "/images/scenes/delivery-arrival.webp",
    alt: "Приймання свіжої поставки квітів на оптовому складі Flora de Luxe",
    width: 1920,
    height: 1440,
    isPlaceholder: false,
  },
  assortment: {
    src: "/images/scenes/assortment.webp",
    alt: "Преміальний оптовий асортимент квітів крупним планом",
    width: 1920,
    height: 1440,
    isPlaceholder: false,
  },
  import: {
    src: "/images/scenes/import-logistics.webp",
    alt: "Підготовка імпортної партії квітів на складі",
    width: 1920,
    height: 1440,
    isPlaceholder: false,
  },
  telegram: {
    src: "/images/scenes/telegram-desk.webp",
    alt: "Робоче місце менеджера опту з Telegram і прайсом",
    width: 1920,
    height: 1440,
    isPlaceholder: false,
  },
  contacts: {
    src: "/images/scenes/contacts-entrance.webp",
    alt: "Вхід на оптову квіткову базу Flora de Luxe Kyiv OPT",
    width: 1920,
    height: 1440,
    isPlaceholder: false,
  },
  faq: {
    src: "/images/scenes/faq-desk.webp",
    alt: "Невелика квіткова композиція на робочому столі",
    width: 1920,
    height: 1440,
    isPlaceholder: false,
  },
  finalCta: {
    src: "/images/scenes/final-bouquet.webp",
    alt: "Преміальний букет у теплому світлі оптового залу",
    width: 1920,
    height: 1440,
    isPlaceholder: false,
  },
} as const satisfies Record<string, SiteImage>;
