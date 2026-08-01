import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Wordmark used in the header, footer and mobile menu. There is no supplied
 * logo file yet, so the brand is set in the display serif with a wide-tracked
 * sub-line — replace with an SVG once the client provides one.
 */
export function BrandMark({
  tone = "light",
  asLink = true,
  className,
}: {
  tone?: "light" | "dark";
  asLink?: boolean;
  className?: string;
}) {
  const isDark = tone === "dark";

  const content = (
    <span className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-display text-[1.0625rem] tracking-[0.22em] uppercase sm:text-lg",
          isDark ? "text-porcelain" : "text-ink",
        )}
      >
        {siteConfig.logoTop}
      </span>
      <span
        className={cn(
          "mt-1 text-[0.5625rem] font-semibold tracking-[0.42em] uppercase",
          isDark ? "text-brass-soft" : "text-bordeaux",
        )}
      >
        {siteConfig.logoBottom}
      </span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — на головну`}
      className="inline-flex min-h-11 shrink-0 items-center"
    >
      {content}
    </Link>
  );
}
