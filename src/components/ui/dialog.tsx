"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

function DialogContent({
  className,
  children,
  closeLabel = "Закрити",
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & { closeLabel?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          "bg-ink/70 fixed inset-0 z-50 backdrop-blur-sm",
          "data-[state=open]:animate-[fdl-overlay-in_220ms_var(--ease-soft)]",
          "data-[state=closed]:animate-[fdl-overlay-out_180ms_var(--ease-soft)]",
        )}
      />
      <DialogPrimitive.Content
        className={cn(
          "on-dark fixed top-1/2 left-1/2 z-50 w-[min(calc(100vw-1.5rem),56rem)] max-w-4xl",
          "-translate-x-1/2 -translate-y-1/2",
          "bg-graphite text-porcelain rounded-[var(--radius-card)] shadow-lift",
          "max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain p-4 sm:p-6",
          "data-[state=open]:animate-[fdl-fade-up_260ms_var(--ease-soft)]",
          "data-[state=closed]:animate-[fdl-fade-out_180ms_var(--ease-soft)]",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label={closeLabel}
          className={cn(
            "absolute top-3 right-3 z-10 grid size-11 min-h-11 min-w-11 place-items-center rounded-full",
            "bg-porcelain/10 text-porcelain transition-colors duration-300",
            "hover:bg-porcelain/20",
          )}
        >
          <X className="size-5" aria-hidden="true" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
};
