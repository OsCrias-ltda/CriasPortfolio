import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/core/sections/layout/container";
import { SocialIcon } from "@/core/ui/social-icon";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

export function EditorialFooter({
  config,
  homeHref = "/",
}: {
  config: TenantConfig;
  homeHref?: string;
}) {
  const currentYear = new Date().getFullYear();
  const regionBadge = [
    config.business.location.state,
    config.business.location.country,
  ]
    .filter(Boolean)
    .join(" / ");

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-14 sm:py-20">
        <div className="grid gap-10 pb-12 lg:grid-cols-12 lg:items-end">
          <div className="space-y-4 lg:col-span-7">
            <Link href={homeHref} className="inline-flex items-center gap-3">
              {config.business.logo && (
                <Image
                  src={config.business.logo.src}
                  alt={config.business.logo.alt}
                  width={config.business.logo.width}
                  height={config.business.logo.height}
                  className="h-8 w-8 rounded-sm object-contain"
                />
              )}
              <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
                {config.business.name}
              </span>
            </Link>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              {config.business.tagline}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 lg:col-span-5 lg:items-end">
            <span className="font-accent text-[11px] uppercase tracking-widest text-muted-foreground">
              Contato direto
            </span>
            <a
              href={`mailto:${config.business.contact.email}`}
              className="font-heading text-lg font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary sm:text-xl"
            >
              {config.business.contact.email}
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 border-y border-border py-6 sm:flex-row sm:items-center">
          <nav
            aria-label="Navegação do rodapé"
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-wider"
          >
            {config.navigation.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            {config.business.socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <SocialIcon
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                  className="h-3.5 w-3.5 text-primary"
                />
                <span>{social.label}</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ))}
            <Link
              href="/llms.txt"
              className="font-accent text-muted-foreground transition-colors hover:text-foreground"
            >
              llms.txt
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {currentYear} {config.business.legalName ?? config.business.name}.{" "}
            {config.navigation.footerNote}
          </p>
          <p className="font-accent text-[10px] uppercase tracking-wider">
            {regionBadge}
          </p>
        </div>
      </Container>
    </footer>
  );
}
