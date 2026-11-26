import type {
  HeroSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";
import { resolveSectionVariant } from "@/core/design/presets";
import { HeroMinimal } from "@/core/sections/hero/hero-minimal";
import { HeroSplit } from "@/core/sections/hero/hero-split";
import { HeroCentered } from "@/core/sections/hero/hero-centered";
import { HeroEditorial } from "@/core/sections/hero/hero-editorial";
import { HeroFullBleedImage } from "@/core/sections/hero/hero-full-bleed";
import { HeroStudioSplit } from "@/core/sections/hero/hero-studio-split";
import { HeroBento } from "@/core/sections/hero/hero-bento";
import { HeroSaasCentered } from "@/core/sections/hero/hero-saas-centered";
import { HeroChangelog } from "@/core/sections/hero/hero-changelog";
import { HeroBoldImpact } from "@/core/sections/hero/hero-bold-impact";

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
      return <HeroStudioSplit section={section} config={config} />;
    case "saasCentered":
      return <HeroSaasCentered section={section} config={config} />;
    case "changelog":
      return <HeroChangelog section={section} config={config} />;
    case "boldImpact":
      return <HeroBoldImpact section={section} config={config} />;
    case "bento":
      return <HeroBento section={section} config={config} />;
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
