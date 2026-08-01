import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { cardInteractive, cardSurface } from "@/components/common/card";
import { Icon } from "@/components/common/icon";
import { Reveal } from "@/components/common/reveal";
import type { NavCard } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

/** Large link tiles used for cross-page navigation and the Telegram entry point. */
export function NavCardGrid({
  links,
  className,
}: {
  links: readonly NavCard[];
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-4 md:grid-cols-3 md:gap-5", className)}>
      {links.map((link, index) => {
        const Arrow = link.external ? ArrowUpRight : ArrowRight;

        const inner = (
          <>
            <span className="border-line text-bordeaux bg-cream/70 group-hover:bg-bordeaux group-hover:text-porcelain grid size-12 place-items-center rounded-full border transition-colors duration-500 group-hover:border-transparent">
              <Icon name={link.icon} className="size-5" />
            </span>

            <span className="mt-6 flex items-center justify-between gap-4">
              <span className="font-display text-ink text-2xl leading-tight">{link.title}</span>
              <Arrow
                aria-hidden="true"
                className="text-bordeaux size-5 shrink-0 transition-transform duration-300 ease-[var(--ease-soft)] group-hover:translate-x-1"
              />
            </span>

            <span className="text-muted mt-2.5 block text-[0.9375rem] leading-relaxed">
              {link.description}
            </span>
          </>
        );

        const classes = cn(cardSurface, cardInteractive, "group flex h-full flex-col p-6 sm:p-7");

        return (
          <li key={link.id}>
            <Reveal delay={index * 90} className="h-full">
              {link.external ? (
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={classes}>
                  {inner}
                  <span className="sr-only"> (відкриється в новій вкладці)</span>
                </a>
              ) : (
                <Link href={link.href} className={classes}>
                  {inner}
                </Link>
              )}
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
