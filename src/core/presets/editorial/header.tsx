import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/core/ui/button";
import { Container } from "@/core/sections/layout/container";
import { MobileMenu } from "@/core/sections/layout/mobile-menu";
import { BrandMark } from "@/core/presets/shared/brand-mark";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";
import { resolveCtaHref } from "@/core/lib/utils";

export function EditorialHeader({
  config,
  homeHref = "/",
}: {
  config: TenantConfig;
  homeHref?: string;
}) {
  const primaryCta = resolveCtaHref(config.cta.primary, config.business);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <BrandMark config={config} homeHref={homeHref} />

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 md:flex"
        >
          {config.navigation.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {config.navigation.showHeaderCta && (
            <Button
              asChild
              size="sm"
              variant="default"
              className="hidden rounded-sm md:inline-flex"
            >
              <Link
                href={primaryCta.href}
                target={primaryCta.external ? "_blank" : undefined}
                rel={primaryCta.external ? "noopener noreferrer" : undefined}
              >
                {config.cta.primary.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
          <MobileMenu config={config} />
        </div>
      </Container>
    </header>
  );
}
