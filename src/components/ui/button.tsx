import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Every variant keeps a minimum height of 44px (2.75rem) so all controls meet
 * the recommended touch-target size on mobile.
 */
const buttonVariants = cva(
  cn(
    "group/button inline-flex min-h-11 items-center justify-center gap-2 rounded-full",
    // Long Ukrainian labels must be allowed to wrap: forcing nowrap pushes the
    // button past the viewport at 320px and drags its whole grid column with it.
    "text-center text-sm font-medium tracking-wide text-balance",
    "transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-soft)]",
    "disabled:pointer-events-none disabled:opacity-55",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-bordeaux text-porcelain shadow-soft hover:bg-bordeaux-deep hover:shadow-lift",
        telegram:
          "bg-forest text-porcelain shadow-soft hover:bg-forest-soft hover:shadow-lift",
        outline:
          "border border-line-strong bg-transparent text-graphite hover:border-bordeaux hover:text-bordeaux",
        ghost: "bg-transparent text-graphite hover:bg-cream",
        light:
          "bg-porcelain/95 text-bordeaux-deep shadow-soft hover:bg-porcelain hover:shadow-lift",
        onDark:
          "border border-porcelain/35 bg-transparent text-porcelain hover:border-porcelain/70 hover:bg-porcelain/10",
      },
      size: {
        sm: "px-4 py-2 text-[0.8125rem]",
        md: "px-5 py-3 sm:px-6",
        lg: "px-5 py-3.5 text-[0.9375rem] sm:px-7",
        icon: "size-11 shrink-0 px-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
