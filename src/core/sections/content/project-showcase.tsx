import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/ui/card";
import { MediaFrame } from "@/core/ui/media-frame";
import { SocialIcon } from "@/core/ui/social-icon";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import { resolveSectionVariant } from "@/core/design/presets";
import type {
  ProjectCase,
  ProjectsSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import { cn } from "@/core/lib/utils";
import type { z } from "zod";

type ProjectsSectionData = z.infer<typeof ProjectsSectionSchema>;

const ACCESS_LABELS: Record<ProjectCase["accessType"], string> = {
  private: "Sistema privado",
  in_development: "Em desenvolvimento",
  public: "Acesso público",
};

function ProjectsHeader({ section }: { section: ProjectsSectionData }) {
  return (
    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
        className="mb-0 sm:mb-0"
      />

      {section.showGitHubLink && section.githubUrl && (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="self-start sm:self-end"
        >
          <a href={section.githubUrl} target="_blank" rel="noopener noreferrer">
            <SocialIcon icon="github" className="h-3.5 w-3.5 text-primary" />
            {section.githubLabel ?? "Ver repositórios no GitHub"}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
  );
}

export function ProjectShowcase({
  section,
  config,
}: {
  section: ProjectsSectionData;
  config: TenantConfig;
}) {
  if (config.projects.length === 0) return null;

  const variant = resolveSectionVariant("projects", section.variant, config);

  if (variant === "changelogFeed") {
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
                  {ACCESS_LABELS[project.accessType]}
                </span>
                <span className="text-muted-foreground">
                  — {project.segment}
                </span>
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

  if (variant === "featuredList") {
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
                      {ACCESS_LABELS[project.accessType]}
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

  if (variant === "asymmetric") {
    const [lead, ...rest] = config.projects;

    return (
      <SectionWrapper id={section.id} subtleSurface>
        <ProjectsHeader section={section} />

        {/* Case principal editorial */}
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

        {/* Demais cases em grade editorial limpa */}
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
                    {ACCESS_LABELS[project.accessType]}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                  <Link href={`/projetos/${project.slug}`}>
                    {project.title}
                  </Link>
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

  if (variant === "bentoShowcase") {
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
                  isLead ? "lg:col-span-12 lg:grid lg:grid-cols-12" : "lg:col-span-6"
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
                        {ACCESS_LABELS[project.accessType]}
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

  // variant === "grid" (padrão clássico)
  return (
    <SectionWrapper id={section.id} subtleSurface>
      <ProjectsHeader section={section} />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {config.projects.map((project) => (
          <Card
            key={project.slug}
            className="group flex flex-col overflow-hidden hover:border-primary/60"
          >
            <Link
              href={`/projetos/${project.slug}`}
              className="block p-4 pb-0 focus-visible:rounded-md"
              aria-label={`Abrir detalhes do projeto ${project.title}`}
            >
              <MediaFrame
                asset={project.coverImage}
                aspect="16/10"
                className="transition-transform duration-200 group-hover:scale-[1.01]"
              />
            </Link>

            <CardHeader className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="accent">{project.category}</Badge>
                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                  {project.accessType === "private" && (
                    <Lock className="h-3 w-3 text-primary" />
                  )}
                  {ACCESS_LABELS[project.accessType]}
                </span>
              </div>

              <CardTitle className="transition-colors group-hover:text-primary">
                <Link href={`/projetos/${project.slug}`}>{project.title}</Link>
              </CardTitle>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xs border border-border bg-background px-2 py-0.5 font-accent text-[10px] tracking-wide text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>

            <CardFooter className="border-t border-border/70 pt-4">
              <Link
                href={`/projetos/${project.slug}`}
                className="inline-flex w-full items-center justify-between text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                <span>{section.ctaLabel}</span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
