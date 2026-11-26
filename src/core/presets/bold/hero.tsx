import { Container } from "@/core/sections/layout/container";
import { HeroActions } from "@/core/sections/hero/hero-actions";
import type {
  HeroSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type HeroSectionData = z.infer<typeof HeroSectionSchema>;

export function BoldHero({
  section,
  config,
}: {
  section: HeroSectionData;
  config: TenantConfig;
}) {
  const primary = section.primaryCta ?? config.cta.primary;
  const secondary = section.secondaryCta ?? config.cta.secondary;

  return (
    <section id={section.id} className="relative overflow-hidden">
      <div className="bg-tenant-grid relative py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-0 h-[460px] w-[460px] rounded-full bg-primary/20 blur-[140px]"
        />

        <Container className="relative">
          <div className="space-y-8">
            {section.eyebrow && (
              <div className="inline-flex items-center gap-3 border border-primary/50 bg-primary/10 px-3.5 py-1.5 font-accent text-xs font-semibold uppercase tracking-widest text-primary">
                <span className="h-2 w-2 bg-primary" aria-hidden="true" />
                <span>{section.eyebrow}</span>
              </div>
            )}

            <h1 className="max-w-5xl font-heading text-4xl font-bold uppercase leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-[4.5rem]">
              {section.headline}
            </h1>

            <div className="grid gap-8 border-t border-border pt-8 lg:grid-cols-12 lg:items-center">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-7">
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
          </div>
        </Container>
      </div>

      {section.highlights.length > 0 && (
        <div className="border-y border-primary bg-primary text-primary-foreground">
          <Container>
            <ul className="grid divide-y divide-primary-foreground/20 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {section.highlights.map((item, idx) => (
                <li
                  key={item}
                  className="flex items-start gap-3 py-4 sm:px-5 sm:first:pl-0 sm:last:pr-0"
                >
                  <span className="font-accent text-xs font-bold opacity-80">
                    0{idx + 1}
                  </span>
                  <span className="text-sm font-semibold leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      )}
    </section>
  );
}
