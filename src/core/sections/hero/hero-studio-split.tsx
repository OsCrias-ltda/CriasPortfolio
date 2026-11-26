import Link from "next/link";
import { ArrowUpRight, Check, Layers } from "lucide-react";
import { Badge } from "@/core/ui/badge";
import { MediaFrame } from "@/core/ui/media-frame";
import { Container } from "@/core/sections/layout/container";
import { HeroActions } from "@/core/sections/hero/hero-actions";
import type {
  HeroSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type HeroSectionData = z.infer<typeof HeroSectionSchema>;

export function HeroStudioSplit({
  section,
  config,
}: {
  section: HeroSectionData;
  config: TenantConfig;
}) {
  const primary = section.primaryCta ?? config.cta.primary;
  const secondary = section.secondaryCta ?? config.cta.secondary;
  const featuredProjects = config.projects.slice(0, 3);

  return (
    <section
      id={section.id}
      className="relative overflow-hidden py-16 sm:py-24 lg:py-28"
    >
      {/* Luz ambiente sutil de estúdio */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Coluna principal de valor e conversão */}
          <div className="min-w-0 space-y-7 lg:col-span-7">
            {section.eyebrow && (
              <Badge
                variant="accent"
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
              >
                <span
                  className="h-2 w-2 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <span>{section.eyebrow}</span>
              </Badge>
            )}

            <h1 className="font-heading text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              {section.headline}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {section.subheadline}
            </p>

            <HeroActions
              primary={primary}
              secondary={secondary}
              business={config.business}
            />

            {section.highlights.length > 0 && (
              <ul className="grid gap-3 border-t border-border/80 pt-6 sm:grid-cols-3">
                {section.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground sm:text-sm"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Painel visual comercial / vitrine de entregas */}
          <div className="min-w-0 lg:col-span-5">
            {section.media?.src ? (
              <div className="rounded-xl border border-border/80 bg-card/80 p-2 shadow-2xl shadow-black/25 backdrop-blur-sm">
                <MediaFrame asset={section.media} aspect="4/3" priority />
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-border/90 bg-card/90 shadow-2xl shadow-black/25 backdrop-blur-sm">
                {/* Barra de janela estilo produto digital */}
                <div className="flex items-center justify-between border-b border-border/80 bg-surface-elevated/80 px-4 py-3">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                  </div>
                  <span className="font-accent text-[11px] text-muted-foreground">
                    {config.business.name}
                  </span>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                      <Layers className="h-4 w-4 text-primary" />
                      <span>Frentes & Projetos</span>
                    </div>
                    <Link
                      href="#projetos"
                      className="inline-flex items-center gap-1 font-accent text-[11px] text-primary transition-opacity hover:opacity-80"
                    >
                      Ver todos
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  {featuredProjects.length > 0 ? (
                    <div className="space-y-2.5">
                      {featuredProjects.map((project, idx) => (
                        <Link
                          key={project.slug}
                          href={`/projetos/${project.slug}`}
                          className="group flex items-start justify-between gap-3 rounded-lg border border-border/80 bg-background/70 p-3.5 transition-colors hover:border-primary/60"
                        >
                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-accent text-[10px] text-primary">
                                0{idx + 1}
                              </span>
                              <span className="truncate font-accent text-[10px] uppercase tracking-wider text-muted-foreground">
                                {project.category}
                              </span>
                            </div>
                            <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                              {project.title}
                            </p>
                            <p className="line-clamp-1 text-xs text-muted-foreground">
                              {project.segment}
                            </p>
                          </div>
                          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {config.business.tagline}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/80 pt-3 text-xs text-muted-foreground">
                    <span>{config.business.location.areaServed[0]}</span>
                    <span className="inline-flex items-center gap-1.5 font-accent text-[11px] text-foreground">
                      <span
                        className="h-2 w-2 rounded-full bg-emerald-500"
                        aria-hidden="true"
                      />
                      Agenda aberta
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
