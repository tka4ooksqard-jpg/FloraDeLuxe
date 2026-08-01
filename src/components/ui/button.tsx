import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Every variant keeps a comfortable touch target. Large CTAs target 56px.
 */
const buttonVariants = cva(
  cn(
    "group/button inline-flex items-center justify-center gap-2 rounded-full",
    "text-center text-[0.9375rem] font-semibold tracking-normal text-balance",
    "transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-[var(--ease-soft)]",
    "hover:scale-[1.01] active:scale-100",
    "disabled:pointer-events-none disabled:opacity-55 disabled:hover:scale-100",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-bordeaux text-porcelain shadow-soft hover:bg-bordeaux-soft hover:shadow-lift",
        telegram:
          "bg-[#0F4938] text-porcelain shadow-soft hover:bg-[#135543] hover:shadow-lift",
        outline:
          "border border-line-strong bg-transparent text-graphite hover:border-bordeaux hover:text-bordeaux",
        ghost: "bg-transparent text-graphite hover:bg-cream",
        light:
          "border border-[#C7A15C]/55 bg-[#F5F0EA] text-bordeaux-deep shadow-soft hover:border-[#C7A15C]/90 hover:bg-[#F8F3ED] hover:shadow-[0_0_0_1px_rgb(199_161_92_/_0.28),0_18px_40px_-24px_rgb(199_161_92_/_0.4)]",
        onDark:
          "border border-porcelain/30 bg-transparent text-porcelain hover:border-[#C7A15C]/70 hover:text-[#C7A15C]",
        linkGold:
          "min-h-0 rounded-none bg-transparent px-0 py-0 font-medium text-porcelain shadow-none hover:scale-100 hover:shadow-none",
      },
      size: {
        sm: "min-h-11 px-4 py-2 text-sm",
        md: "min-h-12 px-5 py-3 text-[0.9375rem] sm:px-6",
        lg: "min-h-14 px-6 py-3.5 text-[0.9375rem] sm:px-8",
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
