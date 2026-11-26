import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/core/ui/button";
import { MobileMenu } from "@/core/sections/layout/mobile-menu";
import { BrandMark } from "@/core/presets/shared/brand-mark";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";
import { resolveCtaHref } from "@/core/lib/utils";

export function StudioHeader({
  config,
  homeHref = "/",
}: {
  config: TenantConfig;
  homeHref?: string;
}) {
  const primaryCta = resolveCtaHref(config.cta.primary, config.business);

  return (
    <header className="sticky top-0 z-40 px-4 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-xl border border-border/80 bg-surface/85 px-4 shadow-lg shadow-black/15 backdrop-blur-xl sm:h-16 sm:px-6">
        <BrandMark config={config} homeHref={homeHref} />

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 md:flex"
        >
          {config.navigation.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {config.navigation.showHeaderCta && (
            <Button asChild size="sm" className="hidden md:inline-flex">
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
      </div>
    </header>
  );
}
