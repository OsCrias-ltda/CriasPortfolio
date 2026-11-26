import { resolveSectionVariant } from "@/core/presets";
import { StudioServices } from "@/core/presets/studio";
import { EditorialServices } from "@/core/presets/editorial";
import { SaasServices } from "@/core/presets/saas";
import { ChangelogServices } from "@/core/presets/changelog";
import { ServicesCards } from "@/core/presets/shared/services-cards";
import type {
  ServicesSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ServicesSectionData = z.infer<typeof ServicesSectionSchema>;

export function ServiceList({
  section,
  config,
}: {
  section: ServicesSectionData;
  config: TenantConfig;
}) {
  const variant = resolveSectionVariant("services", section.variant, config);

  switch (variant) {
    case "bento":
      return <StudioServices section={section} />;
    case "editorialList":
      return <EditorialServices section={section} />;
    case "compactGrid":
      return <SaasServices section={section} />;
    case "changelogList":
      return <ChangelogServices section={section} />;
    case "cards":
    default:
      return <ServicesCards section={section} />;
  }
}
