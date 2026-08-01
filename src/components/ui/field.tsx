"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Check } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const controlStyles = cn(
  "border-line-strong bg-porcelain text-graphite w-full rounded-2xl border px-4 py-3",
  "min-h-11 text-[0.9375rem] placeholder:text-muted/60",
  "transition-[border-color,box-shadow] duration-300 ease-[var(--ease-soft)]",
  "hover:border-line-strong/80",
  "focus:border-bordeaux focus:ring-bordeaux/15 focus:ring-4 focus:outline-none",
  "aria-[invalid=true]:border-bordeaux-soft aria-[invalid=true]:ring-bordeaux/10 aria-[invalid=true]:ring-4",
);

function Label({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn("text-graphite mb-2 block text-sm font-medium", className)}
      {...props}
    />
  );
}

function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return <input type={type} className={cn(controlStyles, className)} {...props} />;
}

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlStyles, "min-h-28 resize-y", className)} {...props} />;
}

function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(controlStyles, "cursor-pointer appearance-none pr-10", className)} {...props} />;
}

function Checkbox({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "border-line-strong bg-porcelain grid size-5 shrink-0 place-items-center rounded-md border",
        "transition-colors duration-200",
        "data-[state=checked]:border-bordeaux data-[state=checked]:bg-bordeaux data-[state=checked]:text-porcelain",
        "aria-[invalid=true]:border-bordeaux-soft",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="size-3.5" aria-hidden="true" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

/** Renders validation text and stays in the DOM so `aria-describedby` is stable. */
function FieldMessage({
  id,
  message,
  hint,
}: {
  id: string;
  message?: string;
  hint?: string;
}) {
  if (!message && !hint) return null;
  return (
    <p
      id={id}
      className={cn("mt-1.5 text-[0.8125rem] leading-snug", message ? "text-bordeaux" : "text-muted")}
    >
      {message ?? hint}
    </p>
  );
}

export { Checkbox, FieldMessage, Input, Label, Select, Textarea };
