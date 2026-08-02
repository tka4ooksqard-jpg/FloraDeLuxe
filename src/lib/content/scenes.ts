import type { SiteImage } from "@/lib/content/media";

/**
 * Unified luxury photoset slots for editorial sections.
 * All frames share one cinematic grade (bordeaux / champagne / gold).
 */
export const sceneImages = {
  delivery: {
    src: "/images/scenes/delivery-arrival.webp",
    alt: "Візуальна презентація приймання оптової поставки квітів",
    width: 1920,
    height: 1440,
  },
  assortment: {
    src: "/images/scenes/assortment.webp",
    alt: "Візуальна презентація оптового асортименту квітів",
    width: 1920,
    height: 1440,
  },
  import: {
    src: "/images/scenes/import-logistics.webp",
    alt: "Візуальна презентація підготовки імпортної партії квітів",
    width: 1920,
    height: 1440,
  },
  telegram: {
    src: "/images/scenes/telegram-desk.webp",
    alt: "Візуальна презентація робочого місця з прайсом і Telegram",
    width: 1920,
    height: 1440,
  },
  contacts: {
    src: "/images/scenes/contacts-entrance.webp",
    alt: "Візуальна презентація входу на оптову точку Flora de Luxe Kyiv OPT",
    width: 1920,
    height: 1440,
  },
  faq: {
    src: "/images/scenes/faq-desk.webp",
    alt: "Візуальна презентація квіткової композиції на робочому столі",
    width: 1920,
    height: 1440,
  },
  finalCta: {
    src: "/images/scenes/final-bouquet.webp",
    alt: "Візуальна презентація преміального букета",
    width: 1920,
    height: 1440,
  },
} as const satisfies Record<string, SiteImage>;
