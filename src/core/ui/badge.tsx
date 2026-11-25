import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/core/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-border bg-surface-elevated text-foreground",
        outline: "border-border bg-transparent text-muted-foreground",
        accent:
          "border-primary/35 bg-primary/12 text-primary font-accent tracking-wider uppercase text-[11px]",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
