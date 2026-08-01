import { cn } from "@/lib/utils";

/**
 * Shared card surface. Every tile on the site — advantages, suppliers,
 * reviews, navigation — pulls from this so weight, radius and hover never
 * drift between sections.
 */
export const cardSurface = cn(
  "border-line bg-porcelain rounded-[var(--radius-card)] border shadow-soft",
  "transition-[box-shadow,border-color,transform,background-color] duration-500 ease-[var(--ease-soft)]",
);

/** Interactive lift, applied on top of `cardSurface` for links and buttons. */
export const cardInteractive = cn(
  "hover:border-line-strong hover:shadow-lift hover:-translate-y-1",
  "focus-visible:border-line-strong focus-visible:shadow-lift",
);

/** Media-forward cards (categories, supplier portraits): thin frame, no fill. */
export const cardMedia = cn(
  "group relative block overflow-hidden rounded-[var(--radius-card)]",
  "border border-line/80 bg-graphite shadow-soft",
  "transition-[box-shadow,border-color,transform] duration-500 ease-[var(--ease-soft)]",
  "hover:border-line-strong hover:shadow-lift hover:-translate-y-0.5",
);

export const cardDark = cn(
  "border-porcelain/12 bg-porcelain/[0.05] rounded-[var(--radius-card)] border",
  "transition-[background-color,border-color,box-shadow,transform] duration-500 ease-[var(--ease-soft)]",
);

export const cardDarkInteractive = cn(
  "hover:border-brass/45 hover:bg-porcelain/[0.08] hover:-translate-y-0.5",
);
