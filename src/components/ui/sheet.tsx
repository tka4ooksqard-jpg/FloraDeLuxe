"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Right-hand slide-over used for the mobile navigation. Radix supplies the
 * focus trap, scroll lock, Escape handling and `aria-modal` semantics.
 */
const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetTitle = DialogPrimitive.Title;
const SheetDescription = DialogPrimitive.Description;

function SheetContent({
  className,
  children,
  closeLabel = "Закрити меню",
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & { closeLabel?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          "bg-ink/60 fixed inset-0 z-50 backdrop-blur-[2px]",
          "data-[state=open]:animate-[fdl-overlay-in_240ms_var(--ease-soft)]",
          "data-[state=closed]:animate-[fdl-overlay-out_200ms_var(--ease-soft)]",
        )}
      />
      <DialogPrimitive.Content
        className={cn(
          "bg-porcelain fixed inset-y-0 right-0 z-50 flex h-dvh max-h-dvh w-full max-w-sm flex-col",
          "shadow-lift border-line border-l",
          "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
          "data-[state=open]:animate-[fdl-slide-in-right_300ms_var(--ease-soft)]",
          "data-[state=closed]:animate-[fdl-slide-out-right_240ms_var(--ease-soft)]",
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Close
          aria-label={closeLabel}
          className={cn(
            "border-line text-graphite absolute top-[max(1rem,env(safe-area-inset-top))] right-4 z-10 grid size-11 place-items-center",
            "hover:border-bordeaux hover:text-bordeaux rounded-full border transition-colors duration-300",
          )}
        >
          <X className="size-5" aria-hidden="true" />
        </DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger };
