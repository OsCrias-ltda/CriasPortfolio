import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import {
  PROJECT_ACCESS_LABELS,
  ProjectsHeader,
  type ProjectsSectionData,
} from "@/core/presets/shared/projects-header";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

export function ChangelogProjects({
  section,
  config,
}: {
  section: ProjectsSectionData;
  config: TenantConfig;
}) {
  return (
    <SectionWrapper id={section.id} size="narrow" subtleSurface>
      <ProjectsHeader section={section} />

      <div className="mt-10 space-y-8 border-l border-border pl-6 sm:pl-8">
        {config.projects.map((project, idx) => (
          <article key={project.slug} className="group relative space-y-3">
            <span
              aria-hidden="true"
              className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background sm:-left-[37px]"
            />

            <div className="flex flex-wrap items-center gap-2.5 font-accent text-[11px]">
              <span className="rounded-xs border border-primary/40 bg-primary/10 px-2 py-0.5 text-primary">
                v0.{config.projects.length - idx} • {project.category}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                {project.accessType === "private" && (
                  <Lock className="h-3 w-3 text-primary" />
                )}
                {PROJECT_ACCESS_LABELS[project.accessType]}
              </span>
              <span className="text-muted-foreground">— {project.segment}</span>
            </div>

            <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
              <Link href={`/projetos/${project.slug}`}>{project.title}</Link>
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.objective}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xs border border-border bg-background px-2 py-0.5 font-accent text-[10px] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href={`/projetos/${project.slug}`}
                className="inline-flex items-center gap-1.5 font-accent text-xs font-medium text-primary hover:underline"
              >
                <span>{section.ctaLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
