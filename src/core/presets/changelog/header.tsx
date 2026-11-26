import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/core/ui/button";
import { Container } from "@/core/sections/layout/container";
import { MobileMenu } from "@/core/sections/layout/mobile-menu";
import { BrandMark } from "@/core/presets/shared/brand-mark";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";
import { resolveCtaHref } from "@/core/lib/utils";

export function ChangelogHeader({
  config,
  homeHref = "/",
}: {
  config: TenantConfig;
  homeHref?: string;
}) {
  const primaryCta = resolveCtaHref(config.cta.primary, config.business);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-4 sm:h-16">
        <div className="flex min-w-0 items-center gap-3">
          <BrandMark config={config} homeHref={homeHref} />
          <span className="hidden items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 font-accent text-[10px] text-muted-foreground lg:inline-flex">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            Online
          </span>
        </div>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-6 md:flex"
        >
          {config.navigation.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-accent text-xs text-muted-foreground transition-colors hover:text-primary"
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
      </Container>
    </header>
  );
}
