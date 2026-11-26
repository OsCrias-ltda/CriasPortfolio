import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Container } from "@/core/sections/layout/container";
import { Separator } from "@/core/ui/separator";
import { SocialIcon } from "@/core/ui/social-icon";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

export function StudioFooter({
  config,
  homeHref = "/",
}: {
  config: TenantConfig;
  homeHref?: string;
}) {
  const currentYear = new Date().getFullYear();
  const locationSummary = config.business.location.state
    ? `${config.business.location.state}, ${config.business.location.country} — ${config.business.location.areaServed.join(" • ")}`
    : config.business.location.areaServed.join(" • ");
  const regionBadge = [
    config.business.location.state,
    config.business.location.country,
  ]
    .filter(Boolean)
    .join(" / ");

  return (
    <footer className="border-t border-border bg-surface/50">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
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
              <span className="font-heading text-lg font-semibold text-foreground">
                {config.business.name}
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {config.business.tagline}
            </p>
            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                {locationSummary}
              </span>
              <a
                href={`mailto:${config.business.contact.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                {config.business.contact.email}
              </a>
            </div>
          </div>

          <div className="space-y-3 md:col-span-3 md:col-start-7">
            <p className="font-accent text-[11px] tracking-wider text-primary uppercase">
              Navegação
            </p>
            <ul className="space-y-2.5 text-sm">
              {config.navigation.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 md:col-span-3">
            <p className="font-accent text-[11px] tracking-wider text-primary uppercase">
              Canais
            </p>
            <ul className="space-y-2.5 text-sm">
              {config.business.socialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <SocialIcon
                      icon={social.icon}
                      href={social.href}
                      label={social.label}
                      className="h-3.5 w-3.5 shrink-0 text-primary"
                    />
                    <span>{social.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/llms.txt"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  llms.txt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {currentYear} {config.business.legalName ?? config.business.name}.{" "}
            {config.navigation.footerNote}
          </p>
          <p className="font-accent text-[10px] tracking-wider uppercase text-muted-foreground/80">
            {regionBadge}
          </p>
        </div>
      </Container>
    </footer>
  );
}
