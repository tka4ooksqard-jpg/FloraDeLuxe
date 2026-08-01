import type { IconName } from "@/lib/content/icons";
import type { SiteImage } from "@/lib/content/media";

export type PageIntro = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
};

export const assortmentPage = {
  intro: {
    eyebrow: "Асортимент",
    title: "Категорії для оптових закупівель",
    description:
      "Робочі категорії, з яких формуються оптові замовлення. Наявність конкретних сортів, довжина стебла та кількість у пачці залежать від поточної поставки — актуальний перелік менеджер надсилає у прайсі.",
  } satisfies PageIntro,
  priceNotice:
    "Ціни не публікуються на сайті: вони змінюються від поставки до поставки. Актуальний прайс надсилає менеджер у Telegram.",
  audience: [
    "Квіткові магазини та мережі точок",
    "Флористичні студії та приватні флористи",
    "Декоратори та event-агенції",
    "Весільні агенції",
    "HoReCa: ресторани, готелі, простори подій",
  ],
} as const;

export const suppliesPage = {
  intro: {
    eyebrow: "Поставки та логістика",
    title: "Як влаштований шлях квітки до вашої точки",
    description:
      "Від поточної партії в прайсі до видачі оптового замовлення. Умови — з офіційного прайсу Kyiv OPT: пачки/пучки, мінімальна сума та доставка по Києву.",
  } satisfies PageIntro,
  chain: [
    {
      id: "arrival",
      title: "Прибуття партії",
      description: "Партія надходить у визначені дні тижня згідно з графіком поставок.",
      icon: "truck" as IconName,
    },
    {
      id: "acceptance",
      title: "Приймання та перевірка",
      description: "Позиції перевіряють, сортують і розподіляють за категоріями.",
      icon: "shield" as IconName,
    },
    {
      id: "storage",
      title: "Підготовка до видачі",
      description: "Квіти готують до оптового відпуску пачками або пучками — без поділу.",
      icon: "warehouse" as IconName,
    },
    {
      id: "picking",
      title: "Комплектація",
      description: "Замовлення збирають після підтвердження наявності та оплати.",
      icon: "package" as IconName,
    },
    {
      id: "handover",
      title: "Доставка або самовивіз",
      description: "Доставка по Києву або самовивіз після підтвердження готовності.",
      icon: "route" as IconName,
    },
  ],
  logistics: [
    {
      id: "city",
      title: "Доставка по Києву",
      description:
        "Безкоштовна доставка по місту від 5 000 грн. Маршрут і час узгоджуються з менеджером.",
    },
    {
      id: "packs",
      title: "Відпуск пачками / пучками",
      description: "Усі квіти відпускаються пачками або пучками без можливості поділу.",
    },
    {
      id: "pickup",
      title: "Самовивіз",
      description: "Замовлення можна забрати самостійно після підтвердження готовності.",
    },
  ],
} as const;

export const suppliersPage = {
  intro: {
    eyebrow: "Наші постачальники",
    title: "Регіони, з яких приходять квіти",
    description:
      "У офіційному прайсі Kyiv OPT виділені напрямки: Голландія, Еквадор (серія «Е»), Вірменія («АР») та «Україна інше». Конкретні сорти — у поточному прайсі.",
  } satisfies PageIntro,
  /** Why a multi-region mix matters for a wholesale buyer. */
  benefits: [
    {
      id: "variety",
      title: "Ширший вибір сортів",
      description: "Кілька напрямків дають більше позицій, ніж один локальний ринок.",
      icon: "flower" as IconName,
    },
    {
      id: "stability",
      title: "Стабільніше наповнення",
      description: "Якщо сезон просідає в одному регіоні, партію доповнюють інші напрямки.",
      icon: "shield" as IconName,
    },
    {
      id: "seasonality",
      title: "Робота із сезоном",
      description: "Сезонні піки різних регіонів не збігаються — вітрина залишається наповненою.",
      icon: "clock" as IconName,
    },
  ],
} as const;

export const aboutPage = {
  intro: {
    eyebrow: "Про компанію",
    title: "Оптовий напрямок Flora de Luxe у Києві",
    description:
      "Flora de Luxe Kyiv OPT — це B2B-підрозділ, який працює з тими, для кого квіти є частиною бізнесу: магазинами, флористами, декораторами та HoReCa.",
  } satisfies PageIntro,
  story: [
    "Flora de Luxe — квіткова мережа з точками у Києві та області. Kyiv OPT — окремий оптовий напрямок для магазинів, флористів, декораторів і HoReCa.",
    "Актуальний асортимент публікується в прайсі та каналі Telegram опту: троянди з Голландії, Еквадору й Вірменії, хризантеми, зелень, екзотика та сезонні позиції. Квіти відпускаються пачками або пучками.",
    "Замовлення узгоджуються з менеджером: мінімальна сума — 2 200 грн, безкоштовна доставка по Києву від 5 000 грн. Зв’язок — Telegram / Viber / WhatsApp за номером оптової лінії.",
  ],
  principles: [
    {
      id: "freshness",
      title: "Свіжість передусім",
      description: "Скорочуємо час між прийманням партії та видачею замовлення.",
      icon: "sparkles" as IconName,
    },
    {
      id: "predictability",
      title: "Передбачуваність",
      description: "Регулярні дні поставок, щоб клієнт міг планувати закупівлю.",
      icon: "clock" as IconName,
    },
    {
      id: "honesty",
      title: "Чесні умови",
      description: "Наявність і ціну підтверджує менеджер до оплати, без прихованих умов.",
      icon: "shield" as IconName,
    },
  ],
  /** "Why clients stay" — phrased as process facts, not marketing promises. */
  trust: [
    {
      id: "schedule",
      title: "Графік, а не обіцянки",
      description:
        "Дні поставок відомі заздалегідь, тож закупівлю можна вбудувати у власний графік продажів.",
      icon: "clock" as IconName,
    },
    {
      id: "packs",
      title: "Відпуск пачками",
      description:
        "Квіти відпускаються пачками або пучками без поділу — як зазначено в офіційному прайсі.",
      icon: "package" as IconName,
    },
    {
      id: "one-channel",
      title: "Один менеджер і один чат",
      description:
        "Не потрібно шукати, кому написати: прайс, наявність і доставка узгоджуються в одному місці.",
      icon: "send" as IconName,
    },
    {
      id: "no-surprises",
      title: "Підтвердження до оплати",
      description:
        "Наявність і суму менеджер підтверджує до оплати — без прихованих умов і донарахувань.",
      icon: "shield" as IconName,
    },
  ],
  images: {
    hall: {
      src: "/images/about/warehouse-stock.webp",
      alt: "Оптовий асортимент квітів у залі Flora de Luxe Kyiv OPT",
      width: 1600,
      height: 2000,
      isPlaceholder: false,
    } satisfies SiteImage,
    craft: {
      src: "/images/about/packaging-area.webp",
      alt: "Упаковка та флористичні матеріали на оптовому складі Flora de Luxe Kyiv OPT",
      width: 2200,
      height: 1238,
      isPlaceholder: false,
    } satisfies SiteImage,
  },
} as const;

export const contactsPage = {
  intro: {
    eyebrow: "Контакти",
    title: "Зв’язатися з оптовим напрямком",
    description:
      "Прайс і наявність — у Telegram-каналі опту. Замовлення та доставку узгоджуйте з менеджером у Telegram, Viber або WhatsApp за оптовою лінією.",
  } satisfies PageIntro,
} as const;

export const faqPage = {
  intro: {
    eyebrow: "FAQ",
    title: "Питання про оптову співпрацю",
    description:
      "Відповіді на те, що найчастіше запитують нові оптові клієнти. Якщо потрібної відповіді немає — напишіть менеджеру.",
  } satisfies PageIntro,
} as const;
