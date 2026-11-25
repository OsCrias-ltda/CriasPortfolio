import type { HeroSectionSchema, TenantConfig } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";
import { HeroMinimal } from "@/core/sections/hero/hero-minimal";
import { HeroSplit } from "@/core/sections/hero/hero-split";
import { HeroCentered } from "@/core/sections/hero/hero-centered";
import { HeroEditorial } from "@/core/sections/hero/hero-editorial";
import { HeroFullBleedImage } from "@/core/sections/hero/hero-full-bleed";

type HeroSectionData = z.infer<typeof HeroSectionSchema>;

export function HeroSection({
  section,
  config,
}: {
  section: HeroSectionData;
  config: TenantConfig;
}) {
  switch (section.variant) {
    case "split":
      return <HeroSplit section={section} config={config} />;
    case "centered":
      return <HeroCentered section={section} config={config} />;
    case "editorial":
      return <HeroEditorial section={section} config={config} />;
    case "fullBleed":
      return <HeroFullBleedImage section={section} config={config} />;
    case "minimal":
    default:
      return <HeroMinimal section={section} config={config} />;
  }
}
