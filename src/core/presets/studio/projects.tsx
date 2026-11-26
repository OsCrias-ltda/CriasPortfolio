import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { Badge } from "@/core/ui/badge";
import { MediaFrame } from "@/core/ui/media-frame";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import {
  PROJECT_ACCESS_LABELS,
  ProjectsHeader,
  type ProjectsSectionData,
} from "@/core/presets/shared/projects-header";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";
import { cn } from "@/core/lib/utils";

export function StudioProjects({
  section,
  config,
}: {
  section: ProjectsSectionData;
  config: TenantConfig;
}) {
  return (
    <SectionWrapper id={section.id} subtleSurface>
      <ProjectsHeader section={section} />

      <div className="mt-12 space-y-6">
        {config.projects.map((project, idx) => {
          const reverse = idx % 2 === 1;
          return (
            <article
              key={project.slug}
              className="group grid min-w-0 items-center gap-6 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50 sm:gap-8 sm:p-8 lg:grid-cols-12"
            >
              <Link
                href={`/projetos/${project.slug}`}
                className={cn(
                  "block min-w-0 focus-visible:rounded-md lg:col-span-6",
                  reverse && "lg:order-2"
                )}
                aria-label={`Abrir detalhes do projeto ${project.title}`}
              >
                <MediaFrame
                  asset={project.coverImage}
                  aspect="16/10"
                  className="transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </Link>

              <div
                className={cn(
                  "flex min-w-0 flex-col gap-4 lg:col-span-6",
                  reverse && "lg:order-1"
                )}
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="accent">{project.category}</Badge>
                  <span className="inline-flex items-center gap-1 font-accent text-[11px] text-muted-foreground">
                    {project.accessType === "private" && (
                      <Lock className="h-3 w-3 text-primary" />
                    )}
                    {PROJECT_ACCESS_LABELS[project.accessType]}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    • {project.segment}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                  <Link href={`/projetos/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {project.objective}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-background px-2.5 py-1 font-accent text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href={`/projetos/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    <span>{section.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
