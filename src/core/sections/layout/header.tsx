import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/core/ui/button";
import { Container } from "@/core/sections/layout/container";
import { MobileMenu } from "@/core/sections/layout/mobile-menu";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";
import { resolveCtaHref } from "@/core/lib/utils";

interface HeaderProps {
  config: TenantConfig;
}

export function Header({ config }: HeaderProps) {
  const primaryCta = resolveCtaHref(config.cta.primary, config.business);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:rounded-sm"
        >
          {config.business.logo ? (
            <Image
              src={config.business.logo.src}
              alt={config.business.logo.alt}
              width={config.business.logo.width}
              height={config.business.logo.height}
              className="h-8 w-8 rounded-sm object-contain"
              priority
            />
          ) : (
            <span
              className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary font-accent text-xs font-bold text-primary-foreground"
              aria-hidden="true"
            >
              {config.business.name.slice(0, 2).toUpperCase()}
            </span>
          )}
          <span className="font-heading text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {config.business.name}
          </span>
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 md:flex"
        >
          {config.navigation.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
