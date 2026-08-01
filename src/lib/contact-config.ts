/**
 * Single source of truth for every contact detail used across the site.
 *
 * Sources (Aug 2026):
 * - Official OPT price sheet pinned in https://t.me/floradeluxekyiv_opt
 * - Google Maps share link provided for the wholesale point
 * - Retail network site kyiv.floradeluxe.com.ua (brand context only)
 *
 * `workingHours` remains unverified for the wholesale branch.
 */

export type VerifiableValue<T> = {
  readonly value: T;
  readonly needsVerification: boolean;
  /** Internal note for the content owner, never rendered to visitors. */
  readonly note?: string;
};

export type ContactConfig = {
  readonly legalName: string;
  readonly brand: string;
  readonly city: string;
  /** Street line only — used in the map overlay card. */
  readonly street: string;
  readonly address: string;
  readonly postalCode: string;
  readonly country: string;
  /** Short link / share URL opened in a new tab. */
  readonly mapsUrl: string;
  /** Official Google Maps Embed iframe `src` for the company address. */
  readonly mapsEmbedUrl: string;
  readonly telegramUsername: string;
  readonly telegramHandle: string;
  readonly telegramUrl: string;
  readonly instagramUrl: string;
  readonly phone: VerifiableValue<string>;
  /** E.164 form used for `tel:` links and structured data. */
  readonly phoneHref: string;
  readonly workingHours: VerifiableValue<string>;
  readonly geo: { readonly latitude: number; readonly longitude: number } | null;
};

export const contactConfig: ContactConfig = {
  legalName: "Flora de Luxe Kyiv OPT",
  brand: "Flora de Luxe",
  city: "Київ",
  street: "вул. М. Василенка, 2д",
  address: "вул. М. Василенка, 2д, Київ",
  postalCode: "02000",
  country: "UA",
  mapsUrl: "https://maps.app.goo.gl/yYc87BRmqDXdtZUD7?g_st=it",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("вул. М. Василенка, 2д, Київ") +
    "&hl=uk&z=16&output=embed",

  /** Public OPT channel where the price list and stock posts are published. */
  telegramUsername: "floradeluxekyiv_opt",
  telegramHandle: "@floradeluxekyiv_opt",
  telegramUrl: "https://t.me/floradeluxekyiv_opt",
  instagramUrl: "https://www.instagram.com/floradeluxe.kyiv_opt",

  phone: {
    value: "+38 (068) 888 10 08",
    needsVerification: false,
    note: "Published on the official OPT price sheet as Telegram / Viber / WhatsApp.",
  },
  phoneHref: "+380688881008",

  workingHours: {
    value: "Графік роботи уточнюйте у менеджера.",
    needsVerification: true,
    note: "Wholesale opening hours are not published on the price sheet or retail site.",
  },

  /** Exact coordinates are not confirmed, so no geo data is emitted in JSON-LD. */
  geo: null,
};

/** Commercial terms shown across the site. Numbers are in UAH. */
export const commerceConfig = {
  minimumOrder: 2200,
  /** Confirmed on the official OPT price sheet (was previously listed as 3000). */
  freeDeliveryFrom: 5000,
  currency: "UAH",
  currencyLabel: "грн",
  /**
   * Delivery weekdays come from the original wholesale brief and were not
   * republished on the current price sheet — kept until the client revises them.
   */
  deliveryDays: ["Понеділок", "Вівторок", "П’ятниця"],
} as const;

/**
 * Builds a Telegram deep link with an optional pre-filled message so every CTA
 * can be attributed without duplicating the base URL anywhere in the codebase.
 */
export function telegramLink(prefilledText?: string): string {
  if (!prefilledText) return contactConfig.telegramUrl;
  return `${contactConfig.telegramUrl}?text=${encodeURIComponent(prefilledText)}`;
}

export function formatUah(amount: number): string {
  return `${new Intl.NumberFormat("uk-UA").format(amount)} ${commerceConfig.currencyLabel}`;
}
