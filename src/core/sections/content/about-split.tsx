import { resolveSectionVariant } from "@/core/presets";
import { StudioAbout } from "@/core/presets/studio";
import { EditorialAbout } from "@/core/presets/editorial";
import { AboutSplitClassic } from "@/core/presets/shared/about-split-classic";
import type {
  AboutSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type AboutSectionData = z.infer<typeof AboutSectionSchema>;

export function AboutSplit({
  section,
  config,
}: {
  section: AboutSectionData;
  config: TenantConfig;
}) {
  const variant = resolveSectionVariant("about", section.variant, config);

  switch (variant) {
    case "studioCard":
      return <StudioAbout section={section} />;
    case "editorial":
      return <EditorialAbout section={section} />;
    case "split":
    default:
      return <AboutSplitClassic section={section} />;
  }
}
