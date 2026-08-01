import type { IconName } from "@/lib/content/icons";

export type AppRoute =
  | "/"
  | "/assortment"
  | "/supplies"
  | "/suppliers"
  | "/about"
  | "/faq"
  | "/contacts"
  | "/privacy";

export type RouteMeta = {
  readonly href: AppRoute;
  /** Short label used in navigation and breadcrumbs. */
  readonly label: string;
  /** One line describing the page, reused by the "next step" card grids. */
  readonly summary: string;
  readonly icon: IconName;
  /** Included in the XML sitemap. */
  readonly sitemapPriority: number;
  readonly changeFrequency: "weekly" | "monthly" | "yearly";
};

export const routes: readonly RouteMeta[] = [
  {
    href: "/",
    label: "Головна",
    summary: "Коротко про оптовий напрямок Flora de Luxe у Києві.",
    icon: "sparkles",
    sitemapPriority: 1,
    changeFrequency: "weekly",
  },
  {
    href: "/assortment",
    label: "Асортимент",
    summary: "Категорії, з яких формуються оптові замовлення.",
    icon: "flower",
    sitemapPriority: 0.9,
    changeFrequency: "weekly",
  },
  {
    href: "/supplies",
    label: "Поставки",
    summary: "Графік поставок, пачки та доставка по Києву.",
    icon: "truck",
    sitemapPriority: 0.8,
    changeFrequency: "monthly",
  },
  {
    href: "/suppliers",
    label: "Постачальники",
    summary: "Регіони, з яких надходять квіти, і що саме вони дають.",
    icon: "route",
    sitemapPriority: 0.7,
    changeFrequency: "monthly",
  },
  {
    href: "/about",
    label: "Про нас",
    summary: "Історія, склад, холодильна зона та принципи роботи.",
    icon: "warehouse",
    sitemapPriority: 0.6,
    changeFrequency: "yearly",
  },
  {
    href: "/faq",
    label: "FAQ",
    summary: "Оплата, мінімальне замовлення, доставка та прайс.",
    icon: "fileText",
    sitemapPriority: 0.6,
    changeFrequency: "monthly",
  },
  {
    href: "/contacts",
    label: "Контакти",
    summary: "Адреса, маршрут, Telegram і форма для оптових клієнтів.",
    icon: "mapPin",
    sitemapPriority: 0.8,
    changeFrequency: "monthly",
  },
  {
    href: "/privacy",
    label: "Політика конфіденційності",
    summary: "Як ми поводимося з даними, залишеними у формі.",
    icon: "shield",
    sitemapPriority: 0.2,
    changeFrequency: "yearly",
  },
];

const routeMap = new Map<AppRoute, RouteMeta>(routes.map((route) => [route.href, route]));

export function getRoute(href: AppRoute): RouteMeta {
  const route = routeMap.get(href);
  if (!route) throw new Error(`Unknown route in navigation registry: ${href}`);
  return route;
}

/** Primary header navigation, in display order. */
export const primaryNav: readonly RouteMeta[] = (
  ["/assortment", "/supplies", "/suppliers", "/about", "/faq", "/contacts"] as const
).map(getRoute);

/** A single card in the "next step" grids. Internal routes or Telegram. */
export type NavCard = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly external: boolean;
  readonly icon: IconName;
};

/** Turns route metadata into cards, so link copy lives in exactly one place. */
export function routeCards(hrefs: readonly AppRoute[]): readonly NavCard[] {
  return hrefs.map((href) => {
    const route = getRoute(href);
    return {
      id: href,
      title: route.label,
      description: route.summary,
      href,
      external: false,
      icon: route.icon,
    };
  });
}

/**
 * "Next step" links shown at the bottom of each page, so a visitor always has a
 * route onward instead of a dead end. Keyed by the page they appear on.
 */
export const relatedRoutes: Readonly<Record<AppRoute, readonly AppRoute[]>> = {
  "/": ["/assortment", "/supplies", "/contacts"],
  "/assortment": ["/suppliers", "/supplies", "/contacts"],
  "/supplies": ["/suppliers", "/assortment", "/contacts"],
  "/suppliers": ["/assortment", "/supplies", "/about"],
  "/about": ["/supplies", "/suppliers", "/contacts"],
  "/faq": ["/supplies", "/assortment", "/contacts"],
  "/contacts": ["/assortment", "/supplies", "/faq"],
  "/privacy": ["/contacts", "/faq", "/about"],
};

/** Shared CTA copy so button labels never drift between sections. */
export const ctaLabels = {
  price: "Отримати прайс",
  telegram: "Замовити в Telegram",
  telegramShort: "Написати в Telegram",
  assortment: "Переглянути асортимент",
  contacts: "Контакти",
  availability: "Дізнатися наявність",
  currentSupply: "Перевірити актуальну поставку",
  terms: "Отримати умови співпраці",
  route: "Побудувати маршрут",
  call: "Зателефонувати",
  maps: "Відкрити в Google Maps",
} as const;

/** Pre-filled Telegram messages, keyed by the CTA that opens the chat. */
export const telegramIntents = {
  price: "Вітаю! Хочу отримати актуальний оптовий прайс Flora de Luxe Kyiv OPT.",
  order: "Вітаю! Хочу оформити оптове замовлення квітів.",
  supply: "Вітаю! Підкажіть, будь ласка, склад найближчої поставки.",
  category: (category: string) =>
    `Вітаю! Цікавить наявність та ціни: ${category}. Дякую!`,
  terms: "Вітаю! Хочу дізнатися умови оптової співпраці.",
} as const;
