"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { TelegramCta } from "@/components/common/cta";
import { BrandMark } from "@/components/layout/brand-mark";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ctaLabels, primaryNav, telegramIntents } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,box-shadow,border-color] duration-300",
        "bg-porcelain/85 supports-[backdrop-filter]:bg-porcelain/70 backdrop-blur-xl",
        scrolled ? "border-line border-b shadow-soft" : "border-b border-transparent",
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4 sm:h-20">
        <BrandMark />

        <nav aria-label="Основна навігація" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem]",
                    "transition-colors duration-300",
                    isActive(item.href)
                      ? "text-bordeaux"
                      : "text-graphite hover:text-bordeaux",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "bg-bordeaux absolute inset-x-4 bottom-2 h-px origin-left transition-transform duration-300 ease-[var(--ease-soft)]",
                      isActive(item.href) ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <TelegramCta
            intent={telegramIntents.price}
            label={ctaLabels.price}
            variant="outline"
            size="sm"
            showIcon={false}
          />
          <TelegramCta intent={telegramIntents.order} size="sm" />
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon" aria-label="Відкрити меню">
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>

          <SheetContent aria-describedby="mobile-menu-description">
            <SheetTitle className="sr-only">Меню сайту</SheetTitle>
            <SheetDescription id="mobile-menu-description" className="sr-only">
              Навігація сайту та кнопки зв’язку з оптовим менеджером.
            </SheetDescription>

            <div className="border-line border-b px-5 py-6">
              <SheetClose asChild>
                <Link href="/" aria-label="Flora de Luxe Kyiv OPT — на головну">
                  <BrandMark asLink={false} />
                </Link>
              </SheetClose>
            </div>

            {/* Each link is wrapped in SheetClose, so the menu dismisses itself on navigation. */}
            <nav aria-label="Мобільна навігація" className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "border-line/70 flex min-h-14 items-center border-b text-lg transition-colors duration-200",
                          isActive(item.href) ? "text-bordeaux" : "text-graphite hover:text-bordeaux",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-line bg-cream/60 flex flex-col gap-3 border-t px-5 py-5">
              <TelegramCta intent={telegramIntents.order} size="lg" className="w-full" />
              <TelegramCta
                intent={telegramIntents.price}
                label={ctaLabels.price}
                variant="outline"
                size="lg"
                showIcon={false}
                className="w-full"
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
