import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    // Base
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
    "font-medium text-sm transition-all duration-150 outline-none select-none shrink-0",
    // Spring ease press
    "ease-[cubic-bezier(0.34,1.2,0.64,1)]",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-40",
    // Focus ring
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
    // Icon sizing
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground rounded-full",
          "shadow-[0_2px_10px_oklch(0.6_0.22_250/25%),inset_0_1px_0_oklch(1_0_0/18%)]",
          "hover:bg-primary/95 hover:scale-[1.02] hover:-translate-y-px",
          "active:scale-[0.97] active:translate-y-0",
        ].join(" "),
        outline: [
          "rounded-full border border-border bg-card text-foreground",
          "shadow-[var(--shadow-xs),inset_0_1px_0_oklch(1_0_0/60%)]",
          "dark:shadow-[var(--shadow-xs),inset_0_1px_0_oklch(1_0_0/8%)]",
          "hover:bg-muted hover:border-border-strong hover:scale-[1.02] hover:-translate-y-px",
          "active:scale-[0.97] active:translate-y-0",
        ].join(" "),
        secondary: [
          "rounded-full bg-secondary text-secondary-foreground border border-border",
          "hover:bg-secondary/80 hover:scale-[1.02]",
          "active:scale-[0.97]",
        ].join(" "),
        ghost: [
          "rounded-xl text-muted-foreground",
          "hover:bg-muted/80 hover:text-foreground",
          "active:scale-[0.97]",
        ].join(" "),
        destructive: [
          "rounded-full bg-destructive/10 text-destructive border border-destructive/20",
          "hover:bg-destructive/15 hover:scale-[1.02]",
          "active:scale-[0.97]",
        ].join(" "),
        link: "text-primary underline-offset-4 hover:underline rounded-none p-0 h-auto",
      },
      size: {
        default: "h-10 px-5",
        xs: "h-7 px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 px-4 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 px-6 text-base",
        icon: "size-10 rounded-xl",
        "icon-xs": "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-xl [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
