import Link from "next/link";
import { ArrowUpRight, FolderGit2, Mail } from "lucide-react";
import { Badge } from "@/core/ui/badge";
import { SocialIcon } from "@/core/ui/social-icon";
import { Container } from "@/core/sections/layout/container";
import { HeroActions } from "@/core/sections/hero/hero-actions";
import type {
  HeroSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type HeroSectionData = z.infer<typeof HeroSectionSchema>;

export function HeroBento({
  section,
  config,
}: {
  section: HeroSectionData;
  config: TenantConfig;
}) {
  const primary = section.primaryCta ?? config.cta.primary;
  const secondary = section.secondaryCta ?? config.cta.secondary;

  return (
    <section id={section.id} className="bg-tenant-grid py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Bloco principal do Bento */}
          <div className="relative flex min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-10 lg:col-span-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/12 blur-[90px]"
            />

            <div className="relative space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                {section.eyebrow && (
                  <Badge variant="accent" className="py-1">
                    {section.eyebrow}
                  </Badge>
                )}
                <span className="inline-flex items-center gap-1.5 font-accent text-[11px] text-muted-foreground">
                  <span
                    className="h-2 w-2 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  />
                  Disponível para projetos
                </span>
              </div>

              <h1 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
                {section.headline}
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {section.subheadline}
              </p>
            </div>

            <div className="relative mt-8 pt-6 border-t border-border/80">
              <HeroActions
                primary={primary}
                secondary={secondary}
                business={config.business}
              />
            </div>
          </div>

          {/* Coluna lateral modular do Bento */}
          <div className="flex min-w-0 flex-col gap-4 lg:col-span-4">
            {/* Tile de destaques */}
            <div className="flex-1 rounded-xl border border-border bg-card p-5 sm:p-6">
              <p className="font-accent text-[11px] uppercase tracking-wider text-primary">
                Como entregamos
              </p>
              <ul className="mt-4 divide-y divide-border/70">
                {section.highlights.map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <span className="font-accent text-xs text-primary">
                      0{idx + 1}
                    </span>
                    <p className="text-sm leading-snug text-muted-foreground">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tile de atalhos rápidos */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="#projetos"
                className="group flex flex-col justify-between rounded-xl border border-border bg-surface-elevated/70 p-4 transition-colors hover:border-primary/60"
              >
                <div className="flex items-center justify-between">
                  <FolderGit2 className="h-4 w-4 text-primary" />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <div className="mt-4">
                  <p className="font-heading text-sm font-semibold text-foreground">
                    Projetos
                  </p>
                  <p className="font-accent text-[11px] text-muted-foreground">
                    {config.projects.length} cases
                  </p>
                </div>
              </Link>

              <div className="flex flex-col justify-between rounded-xl border border-border bg-surface-elevated/70 p-4">
                <p className="font-accent text-[10px] uppercase tracking-wider text-muted-foreground">
                  Canais diretos
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${config.business.contact.email}`}
                    aria-label="Enviar e-mail"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  {config.business.socialLinks.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <SocialIcon
                        icon={social.icon}
                        href={social.href}
                        label={social.label}
                        className="h-4 w-4"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
