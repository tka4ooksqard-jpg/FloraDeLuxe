import { cn } from "@/lib/utils";

/**
 * Shared card language for the whole site — same radius, border, shadow and
 * hover as the Hero / Delivery glass tiles, so light chapters stay in family.
 */
export const cardSurface = cn(
  "rounded-[1.75rem] border border-[rgba(35,7,13,0.08)] bg-[rgba(246,243,239,0.72)] shadow-soft backdrop-blur-[18px]",
  "transition-[box-shadow,border-color,transform,background-color] duration-500 ease-[var(--ease-soft)]",
);

/** Interactive lift — soft rise (4px), thin gold edge, never jumpy. */
export const cardInteractive = cn(
  "hover:-translate-y-1 hover:border-[rgba(213,175,99,0.35)] hover:bg-[rgba(246,243,239,0.9)] hover:shadow-[0_24px_48px_-28px_rgb(20_12_14_/_0.3)]",
  "focus-visible:-translate-y-1 focus-visible:border-[rgba(213,175,99,0.35)] focus-visible:shadow-[0_24px_48px_-28px_rgb(20_12_14_/_0.3)]",
);

/** Media-forward cards (categories, supplier portraits): thin frame, no fill. */
export const cardMedia = cn(
  "group relative block w-full max-w-full min-w-0 overflow-hidden rounded-[1.75rem]",
  "border border-[rgba(35,7,13,0.1)] bg-graphite shadow-soft",
  "transition-[box-shadow,border-color,transform] duration-500 ease-[var(--ease-soft)]",
  "hover:-translate-y-1 hover:border-[rgba(213,175,99,0.35)] hover:shadow-[0_24px_48px_-28px_rgb(20_12_14_/_0.3)]",
);

/** Dark-surface cards — same language as Delivery / Hero glass. */
export const cardDark = "delivery-card";

export const cardDarkInteractive = "";
