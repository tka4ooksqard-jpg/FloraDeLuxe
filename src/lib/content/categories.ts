import type { SiteImage } from "@/lib/content/media";

export type CategorySlug = "roses" | "chrysanthemums" | "exotic" | "greenery" | "seasonal";

export type Category = {
  readonly slug: CategorySlug;
  readonly name: string;
  /** One-line description used on the home page card. */
  readonly description: string;
  /** Extended bullets used on the assortment page. */
  readonly details: readonly string[];
  readonly image: SiteImage;
};

/**
 * Categories mirror the OPT price sheet sections published in
 * @floradeluxekyiv_opt (троянди, хризантема, зелень, екзотика + сезонні акценти).
 * Exact SKUs change with each delivery — availability is confirmed in Telegram.
 */
export const categories: readonly Category[] = [
  {
    slug: "roses",
    name: "Троянди",
    description:
      "Класичні, кущові та спрей-троянди з Голландії, Еквадору, Вірменії та інших напрямків — у пачках для оптової видачі.",
    details: [
      "Одноголові, кущові та спрей-форми різної довжини стебла",
      "Партії з Голландії, Еквадору та Вірменії відповідно до поточного прайсу",
      "Відпуск лише пачками — без поділу пачки на штуки",
    ],
    image: {
      src: "/images/categories/roses.webp",
      alt: "Оптові пачки троянд Flora de Luxe Kyiv OPT",
      width: 1200,
      height: 1500,
      isPlaceholder: false,
    },
  },
  {
    slug: "chrysanthemums",
    name: "Хризантеми",
    description: "Окрема категорія в оптовому прайсі — стійкі позиції для щоденного продажу.",
    details: [
      "Позиції з розділу «Хризантема» актуального прайсу",
      "Підходять для роздрібної вітрини та щоденних композицій",
      "Наявність і сорти підтверджує менеджер у Telegram",
    ],
    image: {
      src: "/images/categories/chrysanthemums.webp",
      alt: "Оптові квіткові пачки Flora de Luxe Kyiv OPT",
      width: 1200,
      height: 1500,
      isPlaceholder: false,
    },
  },
  {
    slug: "exotic",
    name: "Екзотика",
    description:
      "Орхідеї, кали, матіола, целозія, дельфініум та інші акцентні позиції з розділу «Орхідея та інша екзотика».",
    details: [
      "Акцентні позиції для авторської флористики та декору",
      "У прайсі також представлені кала, фрезія, ірис, фаленопсис",
      "Доступність залежить від поточної поставки",
    ],
    image: {
      src: "/images/categories/exotic.webp",
      alt: "Акцентна екзотична позиція з оптового асортименту Flora de Luxe",
      width: 1200,
      height: 1500,
      isPlaceholder: false,
    },
  },
  {
    slug: "greenery",
    name: "Зелень",
    description: "Евкаліпт, оксипеталум, вібурнум, фісташка та інша декоративна зелень у пучках.",
    details: [
      "Евкаліпт Baby Blue та Cinerea — у пучках",
      "Оксипеталум, вібурнум Snowball, фісташка та інші наповнювачі",
      "Формати пучків під щоденні потреби магазину",
    ],
    image: {
      src: "/images/categories/greenery.webp",
      alt: "Декоративна зелень з оптового асортименту Flora de Luxe Kyiv OPT",
      width: 1200,
      height: 1500,
      isPlaceholder: false,
    },
  },
  {
    slug: "seasonal",
    name: "Сезонні квіти",
    description:
      "Еустома, гербера, гортензія, лілія, гвоздика, танацетум, сухоцвіти та інші позиції з поточного прайсу.",
    details: [
      "Сезонні та акцентні позиції з поточного прайсу",
      "Гербера, еустома, гортензія, лілія, гвоздика — за наявності",
      "Сухоцвіти — окремий розділ прайсу (амарант, лагурус, бавовна тощо)",
      "Актуальний перелік — у прайсі та каналі Telegram опту",
    ],
    image: {
      src: "/images/categories/seasonal.webp",
      alt: "Сезонна позиція з оптового асортименту Flora de Luxe Kyiv OPT",
      width: 1200,
      height: 1500,
      isPlaceholder: false,
    },
  },
];

export const categoryNames: readonly string[] = categories.map((category) => category.name);
