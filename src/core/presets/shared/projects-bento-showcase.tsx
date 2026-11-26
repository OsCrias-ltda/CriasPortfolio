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

export function ProjectsBentoShowcase({
  section,
  config,
}: {
  section: ProjectsSectionData;
  config: TenantConfig;
}) {
  return (
    <SectionWrapper id={section.id} subtleSurface>
      <ProjectsHeader section={section} />

      <div className="mt-10 grid gap-4 lg:grid-cols-12">
        {config.projects.map((project, idx) => {
          const isLead = idx === 0;
          return (
            <article
              key={project.slug}
              className={cn(
                "group flex min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/60",
                isLead
                  ? "lg:col-span-12 lg:grid lg:grid-cols-12"
                  : "lg:col-span-6"
              )}
            >
              <Link
                href={`/projetos/${project.slug}`}
                className={cn(
                  "block p-4 pb-0 focus-visible:rounded-md",
                  isLead && "lg:col-span-6 lg:p-5"
                )}
                aria-label={`Abrir detalhes do projeto ${project.title}`}
              >
                <MediaFrame
                  asset={project.coverImage}
                  aspect="16/10"
                  className="transition-transform duration-200 group-hover:scale-[1.01]"
                />
              </Link>

              <div
                className={cn(
                  "flex min-w-0 flex-1 flex-col justify-between p-5",
                  isLead && "lg:col-span-6 lg:p-7"
                )}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="accent">{project.category}</Badge>
                    <span className="inline-flex items-center gap-1 font-accent text-[11px] text-muted-foreground">
                      {project.accessType === "private" && (
                        <Lock className="h-3 w-3 text-primary" />
                      )}
                      {PROJECT_ACCESS_LABELS[project.accessType]}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "font-heading font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary",
                      isLead ? "text-2xl sm:text-3xl" : "text-xl"
                    )}
                  >
                    <Link href={`/projetos/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {isLead ? project.objective : project.summary}
                  </p>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-sm border border-border bg-background px-2 py-0.5 font-accent text-[10px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projetos/${project.slug}`}
                    className="inline-flex w-full items-center justify-between border-t border-border/70 pt-3.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
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
