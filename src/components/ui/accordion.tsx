"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Thin wrapper over the Radix accordion, which already ships the required
 * keyboard support and `aria-expanded` / `aria-controls` wiring.
 */
const Accordion = AccordionPrimitive.Root;

function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "group border-line border-b transition-colors duration-300 last:border-b-0",
        "data-[state=open]:border-line-strong",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex min-h-14 flex-1 items-center justify-between gap-3 py-5 text-left sm:gap-6",
          "font-display text-ink text-[1.25rem] leading-snug font-normal tracking-[-0.015em] transition-colors duration-500 ease-[var(--ease-soft)] sm:text-2xl",
          "hover:text-bordeaux-deep data-[state=open]:text-bordeaux-deep",
          className,
        )}
        {...props}
      >
        <span className="min-w-0 text-balance">{children}</span>
        <span
          aria-hidden="true"
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-[14px] border border-line-strong text-brass",
            "transition-[transform,background-color,border-color,color] duration-500 ease-[var(--ease-soft)]",
            "group-data-[state=open]:rotate-45 group-data-[state=open]:border-[rgba(213,175,99,0.45)] group-data-[state=open]:bg-[rgba(213,175,99,0.12)] group-data-[state=open]:text-[#D5AF63]",
          )}
        >
          <Plus className="size-4" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden",
        "data-[state=closed]:animate-[fdl-accordion-up_260ms_var(--ease-soft)]",
        "data-[state=open]:animate-[fdl-accordion-down_320ms_var(--ease-soft)]",
      )}
      {...props}
    >
      <div
        className={cn(
          "text-muted max-w-2xl pb-6 text-[0.9375rem] leading-[1.75] font-medium",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
