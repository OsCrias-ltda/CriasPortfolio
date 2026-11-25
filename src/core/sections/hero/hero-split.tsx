import { Badge } from "@/core/ui/badge";
import { MediaFrame } from "@/core/ui/media-frame";
import { Container } from "@/core/sections/layout/container";
import { HeroActions } from "@/core/sections/hero/hero-actions";
import type { HeroSectionSchema, TenantConfig } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type HeroSectionData = z.infer<typeof HeroSectionSchema>;

export function HeroSplit({
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
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            {section.eyebrow && <Badge variant="accent">{section.eyebrow}</Badge>}
            <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              {section.headline}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {section.subheadline}
            </p>
            <HeroActions
              primary={primary}
              secondary={secondary}
              business={config.business}
            />
          </div>

          <div className="lg:col-span-5">
            <MediaFrame
              asset={
                section.media ?? {
                  alt: `Apresentação visual de ${config.business.name}`,
                  placeholderLabel: "Imagem principal do Hero",
                }
              }
              aspect="4/3"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
