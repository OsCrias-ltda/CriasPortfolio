import { resolveSectionVariant } from "@/core/presets";
import { StudioProcess } from "@/core/presets/studio";
import { EditorialProcess } from "@/core/presets/editorial";
import { SaasProcess } from "@/core/presets/saas";
import { ProcessCards } from "@/core/presets/shared/process-cards";
import type {
  ProcessSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ProcessSectionData = z.infer<typeof ProcessSectionSchema>;

export function ProcessSteps({
  section,
  config,
}: {
  section: ProcessSectionData;
  config: TenantConfig;
}) {
  const variant = resolveSectionVariant("process", section.variant, config);

  switch (variant) {
    case "stickySplit":
      return <StudioProcess section={section} />;
    case "timeline":
      return <EditorialProcess section={section} />;
    case "stepper":
      return <SaasProcess section={section} />;
    case "cards":
    default:
      return <ProcessCards section={section} />;
  }
}
