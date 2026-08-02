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
  const isHome = pathname === "/";

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
        "sticky top-0 z-40 w-full transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-[var(--ease-soft)]",
        isHome
          ? scrolled
            ? "border-b border-white/5 bg-[rgba(25,18,18,0.88)] shadow-[0_10px_36px_-28px_rgb(0_0_0_/_0.5)] backdrop-blur-[18px]"
            : "border-b border-white/5 bg-[rgba(25,18,18,0.75)] backdrop-blur-[18px]"
          : scrolled
            ? "border-line/80 bg-porcelain/72 border-b shadow-soft backdrop-blur-2xl supports-[backdrop-filter]:bg-porcelain/55"
            : "border-b border-transparent bg-porcelain/40 backdrop-blur-md supports-[backdrop-filter]:bg-porcelain/25",
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between gap-3 sm:gap-5",
          isHome ? "h-[5.25rem] sm:h-[5.5rem]" : "h-16 sm:h-[4.5rem]",
        )}
      >
        <BrandMark tone={isHome ? "dark" : "light"} priority />

        <nav aria-label="Основна навігація" className="hidden min-w-0 lg:block">
          <ul className="flex items-center gap-2.5 xl:gap-4">
            {primaryNav.map((item) => (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-10 items-center whitespace-nowrap rounded-full px-3.5 text-[0.8125rem] font-medium tracking-[0.02em] xl:px-4",
                    "transition-colors duration-500 ease-[var(--ease-soft)]",
                    isHome
                      ? isActive(item.href)
                        ? "text-[#D5AF63]"
                        : "text-[rgba(246,240,235,0.55)] hover:text-[#D5AF63]"
                      : isActive(item.href)
                        ? "text-bordeaux"
                        : "text-graphite/80 hover:text-bordeaux",
                  )}
                >
                  {item.label}
                  {!isHome ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 bottom-2 h-px origin-left bg-bordeaux transition-transform duration-300 ease-[var(--ease-soft)]",
                        isActive(item.href) ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <TelegramCta
            intent={telegramIntents.price}
            label={ctaLabels.price}
            variant={isHome ? "onDark" : "outline"}
            size="sm"
            showIcon={false}
            className="h-10 min-h-10 rounded-full px-4 text-[0.8125rem]"
          />
          <TelegramCta
            intent={telegramIntents.order}
            size="sm"
            className="h-10 min-h-10 rounded-full px-4 text-[0.8125rem]"
          />
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild className="lg:hidden shrink-0">
            <Button
              variant={isHome ? "onDark" : "outline"}
              size="icon"
              aria-label="Відкрити меню"
              className="size-11 min-h-11 min-w-11"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>

          <SheetContent aria-describedby="mobile-menu-description">
            <SheetTitle className="sr-only">Меню сайту</SheetTitle>
            <SheetDescription id="mobile-menu-description" className="sr-only">
              Навігація сайту та кнопки зв’язку з оптовим менеджером.
            </SheetDescription>

            <div className="border-line border-b py-6 pr-16 pl-5">
              <SheetClose asChild>
                <Link href="/" aria-label="Flora de Luxe Kyiv OPT — на головну">
                  <BrandMark asLink={false} />
                </Link>
              </SheetClose>
            </div>

            <nav aria-label="Мобільна навігація" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
              <ul className="flex flex-col">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "border-line/70 flex min-h-14 items-center border-b py-3 text-[1.0625rem] leading-snug font-medium tracking-normal break-words transition-colors duration-200",
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

            <div className="border-line bg-cream/60 flex shrink-0 flex-col gap-3 border-t px-5 py-5">
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
