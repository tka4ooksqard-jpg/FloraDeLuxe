import { ExternalLink, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/layout/brand-mark";
import { contactConfig } from "@/lib/contact-config";
import { categories } from "@/lib/content/categories";
import { siteConfig } from "@/lib/site-config";

const companyLinks = [
  { label: "Про нас", href: "/about" },
  { label: "Поставки", href: "/supplies" },
  { label: "Постачальники", href: "/suppliers" },
  { label: "Умови співпраці", href: "/supplies#terms" },
  { label: "FAQ", href: "/faq" },
] as const;

const columnTitleClass = "type-eyebrow text-brass mb-6";
const linkClass =
  "text-mist hover:text-frost inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium leading-relaxed transition-colors duration-[var(--duration-micro)]";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-bordeaux-deep text-mist relative mt-auto overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(48rem_28rem_at_12%_0%,rgb(200_164_106_/_0.08),transparent_60%)]"
      />
      <div className="container-page relative py-20 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] lg:gap-12">
          <div className="max-w-sm">
            <BrandMark tone="dark" />
            <p className="text-frost mt-7 text-base leading-[1.8] font-medium">
              Оптові поставки свіжих квітів для магазинів, флористів і бізнесу.
            </p>
            <p className="text-mist mt-4 text-[0.9375rem] leading-[1.8] font-medium">
              Троянди, хризантеми, екзотика, зелень і сезонні позиції — пачками та пучками, з
              доставкою по Києву.
            </p>
          </div>

          <nav aria-labelledby="footer-assortment">
            <h2 id="footer-assortment" className={columnTitleClass}>
              Асортимент
            </h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/assortment#${category.slug}`} className={linkClass}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className={columnTitleClass}>
              Компанія
            </h2>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-contacts">
            <h2 id="footer-contacts" className={columnTitleClass}>
              Контакти
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href={contactConfig.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Send className="size-4 shrink-0" aria-hidden="true" />
                  {contactConfig.telegramHandle}
                </a>
              </li>
              <li>
                <a href={`tel:${contactConfig.phoneHref}`} className={linkClass}>
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  {contactConfig.phone.value}
                </a>
              </li>
              <li>
                <Link href="/contacts" className={linkClass}>
                  <MapPin className="size-4 shrink-0" aria-hidden="true" />
                  {contactConfig.address}
                </Link>
              </li>
              <li>
                <a
                  href={contactConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
                  Google Maps
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {siteConfig.isDemo ? (
          <p className="border-porcelain/18 text-mist mt-16 rounded-[var(--radius-tile)] border border-dashed px-5 py-4 text-[0.9375rem] leading-[1.75] font-medium">
            Демонстраційні відгуки ще не замінені публічними відгуками клієнтів. Графік роботи
            оптової точки уточнюйте у менеджера. Приберіть цю позначку перед публікацією.
          </p>
        ) : null}

        <div className="border-porcelain/15 mt-16 flex flex-col gap-4 border-t pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-mist/90 text-sm leading-relaxed font-medium">
            © {year} {siteConfig.name}. Усі права захищені.
          </p>
          <Link
            href="/privacy"
            className="text-mist hover:text-frost inline-flex min-h-11 items-center text-sm font-medium transition-colors duration-[var(--duration-micro)]"
          >
            Політика конфіденційності
          </Link>
        </div>
      </div>
    </footer>
  );
}
