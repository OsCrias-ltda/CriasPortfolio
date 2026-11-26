"use client";

import { resolveSectionVariant } from "@/core/presets";
import { StudioContact } from "@/core/presets/studio";
import { EditorialContact } from "@/core/presets/editorial";
import { BoldContact } from "@/core/presets/bold";
import type {
  ContactSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ContactSectionData = z.infer<typeof ContactSectionSchema>;

export function ContactSection({
  section,
  config,
}: {
  section: ContactSectionData;
  config: TenantConfig;
}) {
  const variant = resolveSectionVariant("contact", section.variant, config);

  switch (variant) {
    case "focusedForm":
      return <StudioContact section={section} config={config} />;
    case "minimalDirect":
      return <EditorialContact section={section} config={config} />;
    case "splitCards":
    default:
      return <BoldContact section={section} config={config} />;
  }
}
