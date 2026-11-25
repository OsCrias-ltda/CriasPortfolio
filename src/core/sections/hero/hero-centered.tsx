import { Badge } from "@/core/ui/badge";
import { Container } from "@/core/sections/layout/container";
import { HeroActions } from "@/core/sections/hero/hero-actions";
import type { HeroSectionSchema, TenantConfig } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type HeroSectionData = z.infer<typeof HeroSectionSchema>;

export function HeroCentered({
  section,
  config,
}: {
  section: HeroSectionData;
  config: TenantConfig;
}) {
  const primary = section.primaryCta ?? config.cta.primary;
  const secondary = section.secondaryCta ?? config.cta.secondary;

  return (
    <section id={section.id} className="py-24 sm:py-32">
      <Container size="narrow" className="text-center space-y-7">
        {section.eyebrow && <Badge variant="accent">{section.eyebrow}</Badge>}
        <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
          {section.headline}
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {section.subheadline}
        </p>
        <HeroActions
          primary={primary}
          secondary={secondary}
          business={config.business}
          align="center"
        />
      </Container>
    </section>
  );
}
