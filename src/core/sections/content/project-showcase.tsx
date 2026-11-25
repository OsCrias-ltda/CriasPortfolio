import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/core/ui/card";
import { MediaFrame } from "@/core/ui/media-frame";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import type {
  ProjectCase,
  ProjectsSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ProjectsSectionData = z.infer<typeof ProjectsSectionSchema>;

const ACCESS_LABELS: Record<ProjectCase["accessType"], string> = {
  private: "Sistema privado",
  in_development: "Em desenvolvimento",
  public: "Acesso público",
};

export function ProjectShowcase({
  section,
  config,
}: {
  section: ProjectsSectionData;
  config: TenantConfig;
}) {
  if (config.projects.length === 0) return null;

  return (
    <SectionWrapper id={section.id} subtleSurface>
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
          className="mb-0"
        />

        {section.showGitHubLink && section.githubUrl && (
          <Button asChild variant="outline" size="sm" className="self-start sm:self-end">
            <a
              href={section.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {section.githubLabel ?? "Ver repositórios no GitHub"}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>

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

              <CardTitle className="group-hover:text-primary transition-colors">
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
