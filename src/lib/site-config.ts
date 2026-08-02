import { contactConfig } from "@/lib/contact-config";

/**
 * Locale is kept as an explicit constant so a future `[locale]` segment can be
 * introduced without touching call sites. Only `uk` is shipped today.
 */
export const LOCALES = ["uk"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uk";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://opt.floradeluxe.com.ua";

export const siteConfig = {
  name: contactConfig.legalName,
  shortName: "Flora de Luxe OPT",
  logoTop: "FLORA DE LUXE",
  logoBottom: "KYIV OPT",
  url: rawSiteUrl.replace(/\/$/, ""),
  locale: DEFAULT_LOCALE,
  htmlLang: "uk",
  ogLocale: "uk_UA",
  title: "Flora de Luxe Kyiv OPT — квіти оптом у Києві",
  titleTemplate: "%s — Flora de Luxe Kyiv OPT",
  description:
    "Оптові поставки свіжих квітів у Києві: троянди, хризантеми, екзотика, зелень і сезонні квіти. Регулярні поставки, доставка по Києву та актуальний прайс у Telegram.",
  keywords: [
    "квіти оптом Київ",
    "оптовий постачальник квітів",
    "троянди оптом",
    "хризантеми оптом",
    "квіти для флористів",
    "Flora de Luxe опт",
  ],
  /**
   * Site-wide demonstration flag. While `true`:
   * - footer shows the demo notice;
   * - the lead form validates but does not deliver or claim a real submission
     (`submitLead` → status `demo`).
   * Set to `false` only together with real lead delivery and real reviews
   * (`reviewsAreDemo = false`).
   */
  isDemo: true,
} as const;

export function absoluteUrl(pathname: string): string {
  if (pathname.startsWith("http")) return pathname;
  return `${siteConfig.url}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
