import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { MediaFrame } from "@/core/ui/media-frame";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import {
  PROJECT_ACCESS_LABELS,
  ProjectsHeader,
  type ProjectsSectionData,
} from "@/core/presets/shared/projects-header";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

export function EditorialProjects({
  section,
  config,
}: {
  section: ProjectsSectionData;
  config: TenantConfig;
}) {
  const [lead, ...rest] = config.projects;

  return (
    <SectionWrapper id={section.id} subtleSurface>
      <ProjectsHeader section={section} />

      {lead && (
        <article className="group mt-12 grid min-w-0 items-center gap-8 border-y border-border py-10 lg:grid-cols-12">
          <Link
            href={`/projetos/${lead.slug}`}
            className="block min-w-0 lg:col-span-7"
            aria-label={`Abrir detalhes do projeto ${lead.title}`}
          >
            <MediaFrame
              asset={lead.coverImage}
              aspect="16/10"
              className="transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </Link>

          <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3 font-accent text-xs uppercase tracking-wider text-primary">
              <span>Destaque</span>
              <span className="text-border">/</span>
              <span className="text-muted-foreground">{lead.category}</span>
            </div>

            <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
              <Link href={`/projetos/${lead.slug}`}>{lead.title}</Link>
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {lead.objective}
            </p>

            <p className="font-accent text-xs text-muted-foreground">
              {lead.stack.join(" · ")}
            </p>

            <div className="pt-2">
              <Link
                href={`/projetos/${lead.slug}`}
                className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <span>{section.ctaLabel}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {rest.map((project) => (
            <article
              key={project.slug}
              className="group flex min-w-0 flex-col gap-4 border-b border-border pb-8"
            >
              <Link
                href={`/projetos/${project.slug}`}
                className="block"
                aria-label={`Abrir detalhes do projeto ${project.title}`}
              >
                <MediaFrame
                  asset={project.coverImage}
                  aspect="16/10"
                  className="transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </Link>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <span className="font-accent text-[11px] uppercase tracking-wider text-primary">
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  {project.accessType === "private" && (
                    <Lock className="h-3 w-3 text-primary" />
                  )}
                  {PROJECT_ACCESS_LABELS[project.accessType]}
                </span>
              </div>

              <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                <Link href={`/projetos/${project.slug}`}>{project.title}</Link>
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.summary}
              </p>

              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="font-accent text-[11px] text-muted-foreground">
                  {project.stack.slice(0, 3).join(" · ")}
                </span>
                <Link
                  href={`/projetos/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                >
                  <span>Ver case</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
