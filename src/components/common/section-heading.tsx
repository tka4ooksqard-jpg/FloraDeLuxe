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
            "type-eyebrow mb-6",
            isDark ? "text-brass" : "text-bordeaux",
          )}
        >
          {eyebrow}
        </span>
      ) : null}

      <Tag
        id={id}
        className={cn(
          "text-[clamp(2.15rem,1.35rem+2.9vw,3.75rem)] leading-[1.05] tracking-[-0.02em]",
          isDark && "text-frost",
        )}
      >
        {title}
      </Tag>

      {description ? (
        <div
          className={cn(
            "mt-7 max-w-2xl text-base leading-[1.8] font-medium md:text-lg",
            align === "center" && "mx-auto",
            isDark ? "text-mist" : "text-muted",
          )}
        >
          {description}
        </div>
      ) : null}
    </Reveal>
  );
}
