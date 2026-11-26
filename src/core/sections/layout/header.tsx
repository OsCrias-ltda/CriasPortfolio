import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/core/ui/button";
import { Container } from "@/core/sections/layout/container";
import { MobileMenu } from "@/core/sections/layout/mobile-menu";
import { resolveHeaderVariant } from "@/core/design/presets";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";
import { resolveCtaHref } from "@/core/lib/utils";

interface HeaderProps {
  config: TenantConfig;
  homeHref?: string;
}

function BrandMark({
  config,
  homeHref = "/",
}: {
  config: TenantConfig;
  homeHref?: string;
}) {
  return (
    <Link
      href={homeHref}
      className="group flex min-w-0 items-center gap-2.5 focus-visible:rounded-sm sm:gap-3"
    >
      {config.business.logo ? (
        <Image
          src={config.business.logo.src}
          alt={config.business.logo.alt}
          width={config.business.logo.width}
          height={config.business.logo.height}
          className="h-8 w-8 shrink-0 rounded-sm object-contain"
          priority
        />
      ) : (
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-primary font-accent text-xs font-bold text-primary-foreground"
          aria-hidden="true"
        >
          {config.business.name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="truncate font-heading text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
        {config.business.name}
      </span>
    </Link>
  );
}

export function Header({ config, homeHref = "/" }: HeaderProps) {
  const variant = resolveHeaderVariant(config);
  const primaryCta = resolveCtaHref(config.cta.primary, config.business);

  if (variant === "floating") {
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

  if (variant === "editorial") {
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

  // variant === "compact" (Dev Bento)
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
