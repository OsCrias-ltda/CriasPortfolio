import { resolveSectionVariant } from "@/core/presets";
import { StudioProjects } from "@/core/presets/studio";
import { EditorialProjects } from "@/core/presets/editorial";
import { SaasProjects } from "@/core/presets/saas";
import { ChangelogProjects } from "@/core/presets/changelog";
import { ProjectsBentoShowcase } from "@/core/presets/shared/projects-bento-showcase";
import type {
  ProjectsSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ProjectsSectionData = z.infer<typeof ProjectsSectionSchema>;

export function ProjectShowcase({
  section,
  config,
}: {
  section: ProjectsSectionData;
  config: TenantConfig;
}) {
  if (config.projects.length === 0) return null;

  const variant = resolveSectionVariant("projects", section.variant, config);

  switch (variant) {
    case "featuredList":
      return <StudioProjects section={section} config={config} />;
    case "asymmetric":
      return <EditorialProjects section={section} config={config} />;
    case "changelogFeed":
      return <ChangelogProjects section={section} config={config} />;
    case "bentoShowcase":
      return <ProjectsBentoShowcase section={section} config={config} />;
    case "grid":
    default:
      return <SaasProjects section={section} config={config} />;
  }
}
