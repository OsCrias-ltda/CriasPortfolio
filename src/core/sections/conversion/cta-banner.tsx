import { BoldCtaBanner } from "@/core/presets/bold";
import { CtaBannerDefault } from "@/core/presets/shared/cta-banner-default";
import type {
  CtaBannerSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type CtaBannerData = z.infer<typeof CtaBannerSectionSchema>;

export function CTABanner({
  section,
  config,
}: {
  section: CtaBannerData;
  config: TenantConfig;
}) {
  if (config.design?.preset === "bold") {
    return <BoldCtaBanner section={section} config={config} />;
  }

  return <CtaBannerDefault section={section} config={config} />;
}
