import { commerceConfig, contactConfig, formatUah } from "@/lib/contact-config";
import type { IconName } from "@/lib/content/icons";
import type { SiteImage } from "@/lib/content/media";
import { type NavCard, routeCards } from "@/lib/content/navigation";

export const hero = {
  eyebrow: "Оптовий напрямок Flora de Luxe",
  titleLead: "Квіти,",
  titleAccent: ["які обирають", "професіонали"] as const,
  subtitle: [
    "Добірні троянди, хризантеми, сезонні квіти та зелень для квіткових магазинів, студій флористики і корпоративних клієнтів.",
    "Працюємо виключно з професійними клієнтами.",
    "Актуальний прайс та швидке оформлення — у Telegram.",
  ] as const,
  image: {
    src: "/images/hero/hero-premium-wholesale.webp",
    alt: "Оптовий асортимент свіжих квітів Flora de Luxe Kyiv OPT",
    width: 1920,
    height: 1280,
    isPlaceholder: false,
    blurDataURL:
      "data:image/webp;base64,UklGRpQAAABXRUJQVlA4IIgAAABQBACdASoYABAAPu1iqk2ppaQiMAgBMB2JQBOmUAZnIiOOrb0Ver4cCEHgAP7u31j0sJ2Qb25Hn9hs5VbH4dPJaoBG+UTEu9Ah4xrKZdKuwYdbrvOfbB1UBrWQSIaKjg/Ab+fKJbFM+IIDMmK8IaV4LYzsiLOVrnjRYByVNkDlWTacdlZNDVAA",
  } satisfies SiteImage,
} as const;

export type HeroHighlight = {
  readonly id: string;
  readonly label: string;
  readonly icon: IconName;
};

export const heroHighlights: readonly HeroHighlight[] = [
  { id: "frequency", label: "Регулярні дні поставок", icon: "clock" },
  { id: "geography", label: "Голландія, Еквадор, Вірменія, Україна", icon: "globe" },
  { id: "packs", label: "Відпуск пачками та пучками", icon: "packageCheck" },
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

/**
 * Home bridge between Hero and Delivery — trust, not company biography.
 * Claims stay qualitative unless already confirmed elsewhere on the site.
 */
export const aboutBrief = {
  /** Small navigation label — brand name already lives in the logo. */
  eyebrow: "Для професіоналів",
  title: ["Для тих,", "хто продає", "квіти щодня"] as const,
  /** Short right-column trust lines — not a paragraph. */
  aside: [
    "Працюємо лише",
    "з професійними",
    "клієнтами.",
    "Без роздрібного продажу.",
  ] as const,
  linkLabel: "Про компанію",
} as const;

export type BridgeTrustItem = {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly icon: IconName;
};

/** Compact trust strip under the bridge copy — no cards, no invented metrics. */
export const bridgeTrust: readonly BridgeTrustItem[] = [
  {
    id: "cadence",
    value: "3 поставки",
    label: "щотижня",
    icon: "clock",
  },
  {
    id: "regions",
    value: "Нідерланди",
    label: "Еквадор · Україна",
    icon: "globe",
  },
  {
    id: "telegram",
    value: "Telegram",
    label: "оновлюється щодня",
    icon: "send",
  },
  {
    id: "delivery",
    value: "Доставка",
    label: "по Києву",
    icon: "truck",
  },
];

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
