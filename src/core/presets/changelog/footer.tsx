import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Container } from "@/core/sections/layout/container";
import { Separator } from "@/core/ui/separator";
import { SocialIcon } from "@/core/ui/social-icon";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

export function ChangelogFooter({
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

  return (
    <footer className="w-full border-t border-border bg-card">
      <Container size="wide" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="space-y-3 lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <Link href={homeHref} className="inline-flex items-center gap-2.5">
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
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 font-accent text-[10px] text-muted-foreground">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                Disponível
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {config.business.tagline}
            </p>
            <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
              {locationSummary}
            </p>
          </div>

          <div className="space-y-3 lg:col-span-4">
            <p className="font-accent text-[11px] uppercase tracking-wider text-primary">
              Navegação
            </p>
            <div className="flex flex-wrap gap-2">
              {config.navigation.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md border border-border/80 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3 lg:col-span-3">
            <p className="font-accent text-[11px] uppercase tracking-wider text-primary">
              Canais & Índice
            </p>
            <div className="flex flex-wrap gap-2">
              {config.business.socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/50"
                >
                  <SocialIcon
                    icon={social.icon}
                    href={social.href}
                    label={social.label}
                    className="h-3.5 w-3.5 text-primary"
                  />
                  <span>{social.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              ))}
              <Link
                href="/llms.txt"
                className="inline-flex items-center rounded-md border border-border/80 bg-background/70 px-3 py-1.5 font-accent text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                llms.txt
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col justify-between gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {currentYear} {config.business.legalName ?? config.business.name}.{" "}
            {config.navigation.footerNote}
          </p>
          <a
            href={`mailto:${config.business.contact.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
            {config.business.contact.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
