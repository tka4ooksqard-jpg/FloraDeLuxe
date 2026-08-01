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
            "mb-5 text-[0.6875rem] font-semibold tracking-[0.24em] uppercase",
            isDark ? "text-brass-soft" : "text-bordeaux",
          )}
        >
          {eyebrow}
        </span>
      ) : null}

      <Tag
        id={id}
        className={cn(
          "text-[clamp(2rem,1.25rem+2.7vw,3.5rem)] leading-[1.06]",
          isDark && "text-porcelain",
        )}
      >
        {title}
      </Tag>

      {description ? (
        <div
          className={cn(
            "mt-6 max-w-2xl text-[1.0625rem] leading-relaxed md:text-[1.125rem]",
            align === "center" && "mx-auto",
            isDark ? "text-porcelain/75" : "text-muted",
          )}
        >
          {description}
        </div>
      ) : null}
    </Reveal>
  );
}
