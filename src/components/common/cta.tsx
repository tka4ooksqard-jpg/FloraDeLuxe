import { ArrowRight, Send } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { telegramLink } from "@/lib/contact-config";
import { ctaLabels } from "@/lib/content/navigation";
import { cn } from "@/lib/utils";

/** Arrow that nudges to the right when its parent button is hovered. */
export function CtaArrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden="true"
      className={cn(
        "transition-transform duration-500 ease-[var(--ease-soft)]",
        "group-hover/button:translate-x-1 group-focus-visible/button:translate-x-1",
        className,
      )}
    />
  );
}

type TelegramCtaProps = Omit<ButtonProps, "asChild" | "children"> & {
  /** Pre-filled chat message; keeps every Telegram entry point attributable. */
  intent?: string;
  label?: ReactNode;
  showIcon?: boolean;
};

/**
 * The single place that opens the wholesale Telegram chat — the URL itself
 * lives only in `contact-config`.
 */
export function TelegramCta({
  intent,
  label = ctaLabels.telegram,
  showIcon = true,
  variant = "telegram",
  ...props
}: TelegramCtaProps) {
  return (
    <Button asChild variant={variant} {...props}>
      <a href={telegramLink(intent)} target="_blank" rel="noopener noreferrer">
        {showIcon ? <Send aria-hidden="true" /> : null}
        {label}
        <span className="sr-only"> (відкриється в новій вкладці)</span>
      </a>
    </Button>
  );
}

type InternalCtaProps = Omit<ButtonProps, "asChild" | "children"> & {
  href: ComponentProps<typeof Link>["href"];
  label: ReactNode;
  withArrow?: boolean;
};

export function InternalCta({ href, label, withArrow = true, ...props }: InternalCtaProps) {
  return (
    <Button asChild {...props}>
      <Link href={href}>
        {label}
        {withArrow ? <CtaArrow /> : null}
      </Link>
    </Button>
  );
}
