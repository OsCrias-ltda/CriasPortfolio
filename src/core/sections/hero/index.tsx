import type {
  HeroSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";
import { resolveSectionVariant } from "@/core/presets";
import { StudioHero } from "@/core/presets/studio";
import { EditorialHero } from "@/core/presets/editorial";
import { SaasHero } from "@/core/presets/saas";
import { ChangelogHero } from "@/core/presets/changelog";
import { BoldHero } from "@/core/presets/bold";
import { HeroMinimal } from "@/core/sections/hero/hero-minimal";
import { HeroSplit } from "@/core/sections/hero/hero-split";
import { HeroCentered } from "@/core/sections/hero/hero-centered";
import { HeroFullBleedImage } from "@/core/sections/hero/hero-full-bleed";
import { HeroBento } from "@/core/sections/hero/hero-bento";

type HeroSectionData = z.infer<typeof HeroSectionSchema>;

export function HeroSection({
  section,
  config,
}: {
  section: HeroSectionData;
  config: TenantConfig;
}) {
  const variant = resolveSectionVariant("hero", section.variant, config);

  switch (variant) {
    case "studioSplit":
      return <StudioHero section={section} config={config} />;
    case "editorial":
      return <EditorialHero section={section} config={config} />;
    case "saasCentered":
      return <SaasHero section={section} config={config} />;
    case "changelog":
      return <ChangelogHero section={section} config={config} />;
    case "boldImpact":
      return <BoldHero section={section} config={config} />;
    case "bento":
      return <HeroBento section={section} config={config} />;
    case "split":
      return <HeroSplit section={section} config={config} />;
    case "centered":
      return <HeroCentered section={section} config={config} />;
    case "fullBleed":
      return <HeroFullBleedImage section={section} config={config} />;
    case "minimal":
    default:
      return <HeroMinimal section={section} config={config} />;
  }
}
