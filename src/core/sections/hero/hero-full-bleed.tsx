import Image from "next/image";
import { Badge } from "@/core/ui/badge";
import { Container } from "@/core/sections/layout/container";
import { HeroActions } from "@/core/sections/hero/hero-actions";
import type { HeroSectionSchema, TenantConfig } from "@/core/schema/tenant-config.schema";
import { isPlaceholderValue } from "@/core/lib/utils";
import type { z } from "zod";

type HeroSectionData = z.infer<typeof HeroSectionSchema>;

export function HeroFullBleedImage({
  section,
  config,
}: {
  section: HeroSectionData;
  config: TenantConfig;
}) {
  const primary = section.primaryCta ?? config.cta.primary;
  const secondary = section.secondaryCta ?? config.cta.secondary;
  const hasImage = Boolean(section.media?.src) && !isPlaceholderValue(section.media?.src);

  return (
    <section
      id={section.id}
      className="relative flex min-h-[78vh] items-center overflow-hidden bg-surface py-24"
    >
      {hasImage && section.media?.src && (
        <Image
          src={section.media.src}
          alt={section.media.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60"
      />
      <Container className="relative z-10">
        <div className="max-w-3xl space-y-6">
          {section.eyebrow && <Badge variant="accent">{section.eyebrow}</Badge>}
          <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            {section.headline}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {section.subheadline}
          </p>
          <HeroActions
            primary={primary}
            secondary={secondary}
            business={config.business}
          />
        </div>
      </Container>
    </section>
  );
}
