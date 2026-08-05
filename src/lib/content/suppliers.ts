import type { IconName } from "@/lib/content/icons";
import type { SiteImage } from "@/lib/content/media";

export type SupplierRegion = {
  readonly code: string;
  readonly country: string;
  readonly description: string;
  /** Short tag rendered on the map badge. */
  readonly tag: string;
  /**
   * Position on the stylised supply map, in percent of the drawing box. The map
   * is a schematic diagram of supply directions, not an accurate projection.
   */
  readonly map: { readonly x: number; readonly y: number };
  readonly image: SiteImage;
  /** Longer copy shown only on the dedicated suppliers page. */
  readonly profile: {
    readonly summary: string;
    /** Flower groups that typically arrive from the region. */
    readonly flowers: readonly string[];
    readonly advantages: readonly string[];
    /**
     * Deliberately qualitative. Per-region delivery counts are not published
     * because the composition of each batch is confirmed by the manager.
     */
    readonly frequency: string;
  };
};

/** Destination all supply lines converge on. */
export const supplyHub = { label: "Київ", x: 63, y: 33 } as const;

/**
 * Regions appear as named sections in the official OPT price sheet
 * (@floradeluxekyiv_opt). No farm names or exclusive contracts are claimed.
 */
export const supplierRegions: readonly SupplierRegion[] = [
  {
    code: "NL",
    country: "Нідерланди",
    description: "Троянди, спрей-троянди, гвоздика, еустома, танацетум та інші позиції з позначкою «голл.» у прайсі.",
    tag: "Голландія",
    map: { x: 44, y: 20 },
    image: {
      src: "/images/suppliers/crates-flora-de-luxe.webp",
      alt: "Оптові квіти з голландського напрямку прайсу",
      width: 1600,
      height: 1200,
    },
    profile: {
      summary:
        "У прайсі окремо виділені розділи «Троянди Голландія» та «Троянди спрей Голландія», а також позиції з позначкою «голл.» — гвоздика, еустома, ірис, гортензія, танацетум.",
      flowers: ["Троянди", "Спрей-троянди", "Гвоздика", "Еустома", "Танацетум", "Ірис"],
      advantages: [
        "Широкий вибір сортів у розділах прайсу",
        "Спрей- та одноголові форми троянд",
        "Сезонні голландські акценти за наявності",
      ],
      frequency: "У складі поточних імпортних партій",
    },
  },
  {
    code: "EC",
    country: "Еквадор",
    description: "Преміальні троянди серії «Е» у прайсі — зокрема Playa Blanca, Explorer, Ohara.",
    tag: "Серія «Е»",
    map: { x: 14, y: 72 },
    image: {
      src: "/images/suppliers/ecuador.webp",
      alt: "Оптові пачки троянд з напрямку Еквадор",
      width: 1600,
      height: 1200,
    },
    profile: {
      summary:
        "Еквадорський напрямок у прайсі представлений трояндами з префіксом «Е» — великі бутони та довге стебло для вітрини й подій.",
      flowers: ["Е Плая Бланка", "Е Експлорер", "Е Вайт Охара", "Е Пінк Охара"],
      advantages: [
        "Преміальні сорти з великим бутоном",
        "Довжина стебла для вітринних позицій",
        "Окремі позиції під event- та весільну флористику",
      ],
      frequency: "У складі поточних імпортних партій",
    },
  },
  {
    code: "UA",
    country: "Україна",
    description: "Розділ «Україна інше» в оптовому прайсі — локальні та супутні позиції.",
    tag: "Локальні позиції",
    map: { x: 56, y: 47 },
    image: {
      src: "/images/suppliers/ukraine.webp",
      alt: "Оптові квіткові пачки з українського напрямку",
      width: 1600,
      height: 1200,
    },
    profile: {
      summary:
        "У прайсі є окремий блок «Україна інше». Локальні позиції доповнюють імпорт і скорочують логістичний шлях до точки клієнта.",
      flowers: ["Позиції розділу «Україна інше»", "Супутній сезонний асортимент"],
      advantages: [
        "Коротший логістичний шлях",
        "Доповнення між імпортними партіями",
        "Актуальний склад — у прайсі",
      ],
      frequency: "За наявності в поточному прайсі",
    },
  },
  {
    code: "AM",
    country: "Вірменія",
    description: "Окремий розділ «Вірменія» в прайсі — троянди з префіксом «АР».",
    tag: "Розділ «АР»",
    map: { x: 86, y: 58 },
    image: {
      src: "/images/suppliers/armenia.webp",
      alt: "Кущові троянди з вірменського напрямку прайсу",
      width: 1600,
      height: 1200,
    },
    profile: {
      summary:
        "Вірменський напрямок у прайсі виділений окремим розділом: троянди з кодами «АР» — зокрема спрей-форми Bombastic та інші сорти.",
      flowers: ["АР Анеслі", "АР Джумілія", "АР спрей Bombastic", "АР Фаела", "Інші позиції розділу"],
      advantages: [
        "Окремий асортиментний блок у прайсі",
        "Спрей- та класичні форми",
        "Доповнення до голландських і еквадорських троянд",
      ],
      frequency: "За наявності в поточному прайсі",
    },
  },
];

/**
 * Shown on the suppliers page so no region reads as a guaranteed weekly
 * shipment of specific varieties.
 */
export const supplierNotice =
  "Склад кожної партії залежить від сезону та поточного прайсу. Наявність конкретних сортів підтверджує менеджер у Telegram.";

/** Caption under the supply map in the geography column. */
export const supplyMapCaption =
  "Схема напрямків поставок. Конкретні партії та їхній склад залежать від сезону.";

export type SupplyFeature = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
};

/** Logistics story under the geography map. */
export const supplyLogistics: {
  readonly title: string;
  readonly items: readonly SupplyFeature[];
} = {
  title: "Логістика поставок",
  items: [
    {
      id: "frequency",
      title: "Регулярні поставки",
      description: "Регулярні поставки для оптових клієнтів за графіком тижня.",
      icon: "packageCheck",
    },
    {
      id: "temperature",
      title: "Температурний режим",
      description: "Температурний режим 2–6°C під час зберігання та перевезення.",
      icon: "thermometer",
    },
    {
      id: "fleet",
      title: "Власна логістика",
      description: "Власна логістика скорочує зайві етапи між партією та видачею.",
      icon: "truck",
    },
    {
      id: "quality",
      title: "Контроль якості",
      description: "Контроль якості на кожному етапі — від приймання до видачі.",
      icon: "shield",
    },
  ],
};

/** Trust block that closes the left-column story — no invented metrics. */
export const supplierAdvantages: {
  readonly title: string;
  readonly items: readonly SupplyFeature[];
} = {
  title: "Чому обирають Flora de Luxe",
  items: [
    {
      id: "delivery",
      title: "Власна доставка",
      description: "Швидка доставка по Києву для оптових клієнтів.",
      icon: "truck",
    },
    {
      id: "cold-chain",
      title: "Контроль температури",
      description: "Професійне зберігання та перевезення квітів.",
      icon: "thermometer",
    },
    {
      id: "direct",
      title: "Прямі поставки",
      description: "Регулярні надходження від перевірених партнерів.",
      icon: "globe",
    },
    {
      id: "price",
      title: "Актуальний прайс",
      description: "Ціни та наявність оперативно оновлюються у Telegram.",
      icon: "send",
    },
  ],
};
