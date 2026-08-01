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
          "flex min-h-14 flex-1 items-center justify-between gap-6 py-5 text-left",
          "font-display text-ink text-xl leading-snug transition-colors duration-300 sm:text-2xl",
          "hover:text-bordeaux data-[state=open]:text-bordeaux",
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        <span
          aria-hidden="true"
          className={cn(
            "border-line-strong text-bordeaux grid size-9 shrink-0 place-items-center rounded-full border",
            "transition-transform duration-400 ease-[var(--ease-soft)]",
            "group-data-[state=open]:bg-bordeaux group-data-[state=open]:text-porcelain",
            "group-data-[state=open]:border-bordeaux group-data-[state=open]:rotate-45",
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
      <div className={cn("text-muted max-w-2xl pb-6 text-[0.9375rem] leading-relaxed", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
