import { ArrowUpRight } from "lucide-react";
import { Button } from "@/core/ui/button";
import { SocialIcon } from "@/core/ui/social-icon";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import type {
  ProjectCase,
  ProjectsSectionSchema,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

export type ProjectsSectionData = z.infer<typeof ProjectsSectionSchema>;

export const PROJECT_ACCESS_LABELS: Record<ProjectCase["accessType"], string> = {
  private: "Sistema privado",
  in_development: "Em desenvolvimento",
  public: "Acesso público",
};

export function ProjectsHeader({ section }: { section: ProjectsSectionData }) {
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
