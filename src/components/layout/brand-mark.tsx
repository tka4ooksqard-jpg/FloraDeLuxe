import Image from "next/image";
import Link from "next/link";

import { brandLogo } from "@/lib/brand-logo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export { brandLogo };

/**
 * Brand logo for header, footer and mobile menu.
 * Display height ~43px mobile / ~58px desktop; width follows aspect ratio.
 */
export function BrandMark({
  asLink = true,
  priority = false,
  className,
}: {
  /** Kept for call-site compatibility. */
  tone?: "light" | "dark";
  asLink?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const image = (
    <Image
      src={brandLogo.src}
      alt={siteConfig.name}
      width={brandLogo.width}
      height={brandLogo.height}
      priority={priority}
      sizes="(max-width: 640px) 172px, 232px"
      className={cn(
        "h-[43px] w-auto sm:h-[58px]",
        "transition-[transform,filter] duration-[250ms] ease-[var(--ease-soft)]",
        asLink &&
          "group-hover:scale-[1.02] group-hover:drop-shadow-[0_0_10px_rgba(201,166,107,0.22)]",
        className,
      )}
    />
  );

  if (!asLink) return image;

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — на головну`}
      className="group inline-flex shrink-0 items-center self-center"
    >
      {image}
    </Link>
  );
}
