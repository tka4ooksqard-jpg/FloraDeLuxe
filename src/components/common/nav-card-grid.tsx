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
    <ul className={cn("grid gap-3.5 md:grid-cols-3 md:gap-4", className)}>
      {links.map((link, index) => {
        const Arrow = link.external ? ArrowUpRight : ArrowRight;
        const featured = link.id === "telegram";

        const inner = (
          <>
            <span
              className={cn(
                "grid size-12 place-items-center rounded-full border transition-[background-color,border-color,color,box-shadow] duration-[420ms] ease-[var(--ease-soft)]",
                featured
                  ? "border-[rgba(213,175,99,0.35)] bg-[rgba(213,175,99,0.1)] text-[#D5AF63] group-hover:border-[rgba(213,175,99,0.55)] group-hover:bg-[rgba(213,175,99,0.16)] group-hover:shadow-[0_0_24px_-8px_rgb(213_175_99_/_0.45)]"
                  : "border-line bg-cream/70 text-bordeaux group-hover:border-transparent group-hover:bg-bordeaux group-hover:text-porcelain",
              )}
            >
              <Icon name={link.icon} className="size-5" />
            </span>

            <span className="mt-6 flex items-center justify-between gap-4">
              <span
                className={cn(
                  "font-display text-2xl leading-tight",
                  featured ? "text-[#F5EFE9]" : "text-ink",
                )}
              >
                {link.title}
              </span>
              <Arrow
                aria-hidden="true"
                className={cn(
                  "size-5 shrink-0 transition-transform duration-[420ms] ease-[var(--ease-soft)] group-hover:translate-x-1",
                  featured ? "text-[#D5AF63]" : "text-bordeaux",
                )}
              />
            </span>

            <span
              className={cn(
                "mt-2.5 block text-[0.9375rem] leading-[1.7] font-medium",
                featured ? "text-[rgba(245,239,233,0.72)]" : "text-muted",
              )}
            >
              {link.description}
            </span>
          </>
        );

        const classes = featured
          ? cn(
              "group flex h-full flex-col rounded-[1.5rem] border border-[rgba(213,175,99,0.28)] bg-[#23070d] p-6 sm:p-7",
              "shadow-[0_18px_40px_-28px_rgb(20_12_14_/_0.45)]",
              "transition-[box-shadow,border-color,transform,background-color] duration-[420ms] ease-[var(--ease-soft)]",
              "hover:-translate-y-1 hover:border-[rgba(213,175,99,0.5)] hover:bg-[#2a0c14]",
              "hover:shadow-[0_24px_48px_-28px_rgb(20_12_14_/_0.5),0_0_0_1px_rgb(213_175_99_/_0.12)]",
              "focus-visible:-translate-y-1 focus-visible:border-[rgba(213,175,99,0.5)]",
            )
          : cn(cardSurface, cardInteractive, "group flex h-full flex-col p-6 sm:p-7");

        return (
          <li key={link.id}>
            <Reveal delay={index * 70} className="h-full">
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
