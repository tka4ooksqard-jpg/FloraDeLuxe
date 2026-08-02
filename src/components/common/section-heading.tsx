import type { ReactNode } from "react";

import { Reveal } from "@/components/common/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  tone?: "light" | "dark";
  /** Heading level, so each page keeps a single h1 and a sane outline. */
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
};

/**
 * Shared section title grammar — hairline + uppercase eyebrow + display clamp,
 * aligned with Hero / Delivery editorial voice (copy unchanged).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  tone = "light",
  as: Tag = "h2",
  className,
  id,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <Reveal className={cn("flex max-w-3xl flex-col", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <span
          className={cn(
            "mb-6 flex items-center gap-3.5 text-[0.75rem] font-medium tracking-[0.2em] uppercase",
            align === "center" && "justify-center",
            isDark ? "text-[#D5AF63]" : "text-brass",
          )}
        >
          {align === "start" ? (
            <span
              aria-hidden="true"
              className={cn("h-px w-8 shrink-0", isDark ? "bg-[#D5AF63]/55" : "bg-brass/55")}
            />
          ) : null}
          {eyebrow}
        </span>
      ) : null}

      <Tag
        id={id}
        className={cn(
          "font-display text-[clamp(2.15rem,1.35rem+2.6vw,3.5rem)] leading-[1.05] font-normal tracking-[-0.02em]",
          isDark ? "text-[#F5EFE9]" : "text-ink",
        )}
      >
        {title}
      </Tag>

      {description ? (
        <div
          className={cn(
            "mt-7 max-w-[34rem] text-[1.0625rem] leading-[1.75] font-medium md:text-[1.125rem] md:leading-[1.8]",
            align === "center" && "mx-auto",
            isDark ? "text-[rgba(255,255,255,0.84)]" : "text-muted",
          )}
        >
          {description}
        </div>
      ) : null}
    </Reveal>
  );
}
