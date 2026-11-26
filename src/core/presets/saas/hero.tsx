import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Layers } from "lucide-react";
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

export function SaasHero({
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-primary/6 via-transparent to-transparent"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          {section.eyebrow && (
            <div className="flex justify-center">
              <Badge
                variant="accent"
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              >
                <span
                  className="h-2 w-2 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <span>{section.eyebrow}</span>
              </Badge>
            </div>
          )}

          <h1 className="font-heading text-4xl font-bold leading-[1.06] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {section.headline}
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {section.subheadline}
          </p>

          <div className="pt-2">
            <HeroActions
              primary={primary}
              secondary={secondary}
              business={config.business}
              align="center"
            />
          </div>

          {section.highlights.length > 0 && (
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-3 text-xs text-muted-foreground sm:text-sm">
              {section.highlights.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-14 sm:mt-16">
          {section.media?.src ? (
            <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-surface p-3 shadow-xl shadow-black/5">
              <MediaFrame asset={section.media} aspect="16/9" priority />
            </div>
          ) : (
            <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-black/5">
              <div className="flex items-center justify-between border-b border-border bg-surface-elevated/80 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-border"
                    aria-hidden="true"
                  />
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-border"
                    aria-hidden="true"
                  />
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-primary/70"
                    aria-hidden="true"
                  />
                  <span className="ml-2 font-accent text-[11px] text-muted-foreground">
                    {config.business.name} • Portfólio & Entregas
                  </span>
                </div>
                <Link
                  href="#projetos"
                  className="inline-flex items-center gap-1 font-accent text-[11px] font-medium text-primary hover:underline"
                >
                  Explorar cases
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
                {featuredProjects.map((project, idx) => (
                  <Link
                    key={project.slug}
                    href={`/projetos/${project.slug}`}
                    className="group flex min-w-0 flex-col justify-between rounded-xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 font-accent text-[10px] font-medium uppercase tracking-wider text-primary">
                          <Layers className="h-3 w-3" />
                          {project.category}
                        </span>
                        <span className="font-accent text-[10px] text-muted-foreground">
                          0{idx + 1}
                        </span>
                      </div>
                      <h2 className="font-heading text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {project.title}
                      </h2>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 font-accent text-[11px] text-muted-foreground">
                      <span className="truncate">{project.segment}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-primary" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
