import { Badge } from "@/core/ui/badge";
import { Container } from "@/core/sections/layout/container";
import { HeroActions } from "@/core/sections/hero/hero-actions";
import type { HeroSectionSchema, TenantConfig } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";
import { cn } from "@/core/lib/utils";

type HeroSectionData = z.infer<typeof HeroSectionSchema>;

interface HeroVariantProps {
  section: HeroSectionData;
  config: TenantConfig;
}

export function HeroMinimal({ section, config }: HeroVariantProps) {
  const primary = section.primaryCta ?? config.cta.primary;
  const secondary = section.secondaryCta ?? config.cta.secondary;
  const useGrid = config.theme.surfaceStyle === "grid";

  return (
    <section
      id={section.id}
      className={cn(
        "relative overflow-hidden py-24 sm:py-32 lg:py-36",
        useGrid && "bg-tenant-grid"
      )}
    >
      {/* Brilho sutil laranja no fundo sem poluir o minimalismo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]"
      />

      <Container className="relative">
        <div className="max-w-4xl space-y-8">
          {section.eyebrow && (
            <Badge variant="accent" className="gap-2 py-1.5">
              <span
                className="h-2 w-2 rounded-xs bg-primary"
                aria-hidden="true"
              />
              {section.eyebrow}
            </Badge>
          )}

          <h1 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {section.headline}
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {section.subheadline}
          </p>

          <HeroActions
            primary={primary}
            secondary={secondary}
            business={config.business}
          />
        </div>

        {section.highlights.length > 0 && (
          <div className="mt-16 grid gap-4 border-t border-border/80 pt-8 sm:grid-cols-3">
            {section.highlights.map((item, idx) => (
              <div key={item} className="flex items-start gap-3">
                <span className="font-accent text-xs text-primary">
                  0{idx + 1}
                </span>
                <p className="text-sm leading-snug text-muted-foreground">
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
