import * as React from "react";
import { cn } from "@/core/lib/utils";
import { Container } from "@/core/sections/layout/container";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  size?: "default" | "narrow" | "wide";
  bordered?: boolean;
  subtleSurface?: boolean;
}

export function SectionWrapper({
  id,
  size = "default",
  bordered = true,
  subtleSurface = false,
  className,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-20 sm:py-28",
        bordered && "border-t border-border/70",
        subtleSurface && "bg-surface/40",
        className
      )}
      {...props}
    >
      <Container size={size}>{children}</Container>
    </section>
  );
}
