import { Badge } from "@/core/ui/badge";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { HeroActions } from "@/core/sections/hero/hero-actions";
import type {
  CtaBannerSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type CtaBannerData = z.infer<typeof CtaBannerSectionSchema>;

export function CtaBannerDefault({
  section,
  config,
}: {
  section: CtaBannerData;
  config: TenantConfig;
}) {
  const primary = section.primaryCta ?? config.cta.primary;
  const secondary = section.secondaryCta ?? config.cta.secondary;

  return (
    <SectionWrapper id={section.id} bordered={false} className="py-12 sm:py-16">
      <div className="bg-tenant-grid relative overflow-hidden rounded-lg border border-primary/35 bg-card p-8 sm:p-12 lg:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-[90px]"
        />
        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl space-y-3">
            {section.eyebrow && (
              <Badge variant="accent">{section.eyebrow}</Badge>
            )}
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {section.title}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {section.description}
            </p>
          </div>
          <div className="shrink-0">
            <HeroActions
              primary={primary}
              secondary={secondary}
              business={config.business}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
