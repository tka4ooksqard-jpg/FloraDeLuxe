import { commerceConfig, contactConfig, formatUah } from "@/lib/contact-config";
import type { IconName } from "@/lib/content/icons";
import type { SiteImage } from "@/lib/content/media";
import { type NavCard, routeCards } from "@/lib/content/navigation";

export const hero = {
  eyebrow: "Оптові поставки квітів у Києві",
  titleLead: "Свіжі квіти оптом",
  titleAccent: "для вашого бізнесу",
  tagline: "Опт у Києві. Актуальний прайс у Telegram. Доставка по місту.",
  subtitle:
    "Постачаємо троянди, хризантеми, екзотику, зелень і сезонні квіти для магазинів, флористів, декораторів та HoReCa.",
  image: {
    src: "/images/hero/wholesale-hall.webp",
    alt: "Оптові пачки троянд Flora de Luxe Kyiv OPT",
    width: 1500,
    height: 1900,
    isPlaceholder: false,
    blurDataURL:
      "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADQAQCdASoMABAAA4BaJbACdADdQXv5oAD+umsBHZko//IHhJM0KV9bsv+7w48zFy2VSoRFxPXaixS/WMHHfWiqwjC/cjsJOtdkyAAA",
  } satisfies SiteImage,
} as const;

export type HeroHighlight = {
  readonly id: string;
  readonly label: string;
  readonly icon: IconName;
};

export const heroHighlights: readonly HeroHighlight[] = [
  { id: "frequency", label: "Регулярні дні поставок", icon: "clock" },
  { id: "geography", label: "Голландія, Еквадор, Вірменія, Україна — у прайсі", icon: "route" },
  { id: "packs", label: "Відпуск пачками / пучками", icon: "package" },
  { id: "logistics", label: "Доставка по Києву", icon: "truck" },
];

/** Telegram entry point rendered alongside route cards in the nav grids. */
export const telegramCard: NavCard = {
  id: "telegram",
  title: "Замовити в Telegram",
  description: "Актуальний прайс і наявність — у каналі опту Telegram.",
  href: contactConfig.telegramUrl,
  external: true,
  icon: "send",
};

export const quickLinks: readonly NavCard[] = [
  ...routeCards(["/assortment"]),
  telegramCard,
  ...routeCards(["/contacts"]),
];

/**
 * Home page "why us" grid. Every claim here is one the site already makes and
 * the client has confirmed — no invented certifications or guarantees.
 */
export type Advantage = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
};

export const advantages: readonly Advantage[] = [
  {
    id: "schedule",
    title: "Регулярні дні поставок",
    description:
      "Партії приходять у визначені дні тижня, тож закупівлю можна планувати наперед.",
    icon: "clock",
  },
  {
    id: "geography",
    title: "Кілька флористичних регіонів",
    description:
      "Нідерланди, Еквадор, Україна та Вірменія — ширший вибір сортів протягом року.",
    icon: "route",
  },
  {
    id: "packs",
    title: "Відпуск пачками / пучками",
    description: "Усі квіти відпускаються пачками або пучками без можливості поділу.",
    icon: "package",
  },
  {
    id: "logistics",
    title: "Доставка по Києву",
    description: `Безкоштовна доставка по місту від ${formatUah(commerceConfig.freeDeliveryFrom)}.`,
    icon: "truck",
  },
  {
    id: "channel",
    title: "Один канал комунікації",
    description: "Актуальний прайс і наявність — у Telegram-каналі опту та в чаті з менеджером.",
    icon: "send",
  },
  {
    id: "terms",
    title: "Прозорі умови",
    description: `Мінімальне замовлення ${formatUah(
      commerceConfig.minimumOrder,
    )}, безкоштовна доставка від ${formatUah(commerceConfig.freeDeliveryFrom)}.`,
    icon: "shield",
  },
];

/** Short "who we are" block that replaced the long intro copy on the home page. */
export const aboutBrief = {
  eyebrow: "Flora de Luxe Kyiv OPT",
  title: "Оптовий партнер для тих, хто продає квіти щодня",
  lead: "Окремий B2B-підрозділ Flora de Luxe: працюємо з магазинами, флористами, декораторами та HoReCa, а не з роздрібними букетами.",
} as const;

export const finalCta = {
  eyebrow: "Почати співпрацю",
  title: "Отримайте актуальний прайс сьогодні",
  description:
    "Менеджер надішле перелік позицій у наявності, підтвердить ціни та узгодить доставку під графік вашої точки.",
} as const;

export type CooperationTerm = {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly hint: string;
};

export const cooperationTerms: readonly CooperationTerm[] = [
  {
    id: "minimum",
    label: "Мінімальне замовлення",
    value: formatUah(commerceConfig.minimumOrder),
    hint: "Сума розраховується за підтвердженими позиціями.",
  },
  {
    id: "delivery",
    label: "Доставка",
    value: "По Києву та за погодженням",
    hint: "Час і маршрут узгоджуються з менеджером.",
  },
  {
    id: "free-delivery",
    label: "Безкоштовна доставка",
    value: `Від ${formatUah(commerceConfig.freeDeliveryFrom)}`,
    hint: "Діє відповідно до погоджених умов.",
  },
  {
    id: "ordering",
    label: "Оформлення замовлення",
    value: contactConfig.telegramHandle,
    hint: "Оптовий Telegram для прайсу, наявності та підтвердження.",
  },
];

export const cooperationNotice =
  "Наявність, актуальні ціни та деталі доставки підтверджує менеджер.";

export type OrderStep = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
};

export const orderSteps: readonly OrderStep[] = [
  {
    id: "price",
    title: "Отримайте актуальний прайс",
    description: "Напишіть менеджеру в Telegram — і отримайте перелік позицій, які є в наявності.",
  },
  {
    id: "select",
    title: "Оберіть позиції та кількість",
    description: "Сформуйте замовлення під потреби вашого магазину, події чи закладу.",
  },
  {
    id: "confirm",
    title: "Підтвердьте замовлення з менеджером",
    description: "Менеджер підтверджує наявність, суму, умови оплати та доставки.",
  },
  {
    id: "receive",
    title: "Отримайте квіти доставкою або самовивозом",
    description: "Замовлення комплектується та передається у погоджений спосіб.",
  },
];

/** Short value props used on the home page intro strip. */
export const positioning: readonly { readonly title: string; readonly text: string }[] = [
  {
    title: "Оптовий напрямок",
    text: "Окремий підрозділ Flora de Luxe, який працює саме з бізнес-клієнтами, а не з роздрібними букетами.",
  },
  {
    title: "Передбачуваний графік",
    text: "Регулярні дні поставок дають змогу планувати закупівлю та не тримати зайвих залишків.",
  },
  {
    title: "Один канал комунікації",
    text: "Прайс, наявність, підтвердження та доставка — в одному оптовому чаті Telegram.",
  },
];
