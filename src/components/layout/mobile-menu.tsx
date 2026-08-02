"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

/** Mobile-only navigation sheet — split from SiteHeader to keep the Radix dialog chunk off the critical path until needed. */
export function MobileMenu({
  isHome,
  isActive,
}: {
  isHome: boolean;
  isActive: (href: string) => boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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

        <nav
          aria-label="Мобільна навігація"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4"
        >
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
  );
}
