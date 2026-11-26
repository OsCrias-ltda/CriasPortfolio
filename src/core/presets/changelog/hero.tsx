import { Container } from "@/core/sections/layout/container";
import { HeroActions } from "@/core/sections/hero/hero-actions";
import type {
  HeroSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type HeroSectionData = z.infer<typeof HeroSectionSchema>;

export function ChangelogHero({
  section,
  config,
}: {
  section: HeroSectionData;
  config: TenantConfig;
}) {
  const primary = section.primaryCta ?? config.cta.primary;
  const secondary = section.secondaryCta ?? config.cta.secondary;

  return (
    <section id={section.id} className="py-16 sm:py-24">
      <Container size="narrow">
        <div className="space-y-7">
          <div className="flex flex-wrap items-center gap-3 font-accent text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-2.5 py-1 text-foreground">
              <span
                className="h-2 w-2 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              <span>~/{config.tenant.slug}</span>
            </span>
            {section.eyebrow && (
              <span className="uppercase tracking-wider text-primary">
                {section.eyebrow}
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-5xl">
            {section.headline}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {section.subheadline}
          </p>

          <HeroActions
            primary={primary}
            secondary={secondary}
            business={config.business}
          />

          {section.highlights.length > 0 && (
            <div className="border-t border-border pt-6">
              <p className="mb-3 font-accent text-[11px] uppercase tracking-wider text-muted-foreground">
                Resumo técnico
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {section.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      className="font-accent text-primary"
                      aria-hidden="true"
                    >
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
