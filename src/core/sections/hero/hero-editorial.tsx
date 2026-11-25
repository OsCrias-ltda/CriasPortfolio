import { Container } from "@/core/sections/layout/container";
import { HeroActions } from "@/core/sections/hero/hero-actions";
import type { HeroSectionSchema, TenantConfig } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type HeroSectionData = z.infer<typeof HeroSectionSchema>;

export function HeroEditorial({
  section,
  config,
}: {
  section: HeroSectionData;
  config: TenantConfig;
}) {
  const primary = section.primaryCta ?? config.cta.primary;
  const secondary = section.secondaryCta ?? config.cta.secondary;

  return (
    <section id={section.id} className="py-20 sm:py-28">
      <Container>
        <div className="space-y-8 border-b border-border pb-12">
          {section.eyebrow && (
            <p className="font-accent text-xs tracking-wider text-primary uppercase">
              {section.eyebrow}
            </p>
          )}
          <h1 className="font-heading text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {section.headline}
          </h1>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="text-lg leading-relaxed text-muted-foreground lg:col-span-7">
            {section.subheadline}
          </p>
          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <HeroActions
              primary={primary}
              secondary={secondary}
              business={config.business}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
