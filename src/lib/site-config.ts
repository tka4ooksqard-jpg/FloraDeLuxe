import { contactConfig } from "@/lib/contact-config";

/**
 * Locale is kept as an explicit constant so a future `[locale]` segment can be
 * introduced without touching call sites. Only `uk` is shipped today.
 */
export const LOCALES = ["uk"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uk";

const LOCAL_FALLBACK_URL = "http://localhost:3000";

/**
 * Resolves the public site origin from `NEXT_PUBLIC_SITE_URL`.
 * Staging/production must set the env on the host; local falls back to localhost.
 * Only http/https are accepted — invalid values are ignored.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return LOCAL_FALLBACK_URL;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return LOCAL_FALLBACK_URL;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return LOCAL_FALLBACK_URL;
  }

  return parsed.origin;
}

export const siteConfig = {
  name: contactConfig.legalName,
  shortName: "Flora de Luxe OPT",
  logoTop: "FLORA DE LUXE",
  logoBottom: "KYIV OPT",
  url: resolveSiteUrl(),
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
} as const;

/** Build an absolute URL on `siteConfig.url`. Path-only inputs; no open redirects. */
export function absoluteUrl(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteConfig.url}${path}`;
}
