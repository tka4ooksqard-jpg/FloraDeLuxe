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

const columnTitleClass = "text-porcelain mb-5 text-[0.6875rem] font-semibold tracking-[0.22em] uppercase";
const linkClass =
  "text-porcelain/65 hover:text-porcelain inline-flex min-h-11 items-center gap-2 text-[0.9375rem] transition-colors duration-300";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-bordeaux-deep text-porcelain/70 mt-auto">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          <div className="max-w-sm">
            <BrandMark tone="dark" />
            <p className="text-porcelain/65 mt-6 text-[0.9375rem] leading-relaxed">
              Оптові поставки свіжих квітів для магазинів, флористів і бізнесу.
            </p>
            <p className="text-porcelain/45 mt-4 text-sm leading-relaxed">
              Троянди, хризантеми, екзотика, зелень і сезонні позиції — пачками та пучками, з
              доставкою по Києву.
            </p>
          </div>

          <nav aria-labelledby="footer-assortment">
            <h2 id="footer-assortment" className={columnTitleClass}>
              Асортимент
            </h2>
            <ul className="space-y-1.5">
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
            <ul className="space-y-1.5">
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
            <ul className="space-y-1.5">
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
          <p className="border-porcelain/15 text-porcelain/55 mt-14 rounded-[var(--radius-tile)] border border-dashed px-5 py-4 text-sm leading-relaxed">
            Демонстраційні відгуки ще не замінені публічними відгуками клієнтів. Графік роботи
            оптової точки уточнюйте у менеджера. Приберіть цю позначку перед публікацією.
          </p>
        ) : null}

        <div className="border-porcelain/15 mt-12 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-porcelain/45 text-sm">
            © {year} {siteConfig.name}. Усі права захищені.
          </p>
          <Link
            href="/privacy"
            className="text-porcelain/55 hover:text-porcelain inline-flex min-h-11 items-center text-sm transition-colors duration-300"
          >
            Політика конфіденційності
          </Link>
        </div>
      </div>
    </footer>
  );
}
