import { Container } from "@/core/sections/layout/container";
import { MediaFrame } from "@/core/ui/media-frame";
import { HeroActions } from "@/core/sections/hero/hero-actions";
import type {
  HeroSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type HeroSectionData = z.infer<typeof HeroSectionSchema>;

export function EditorialHero({
  section,
  config,
}: {
  section: HeroSectionData;
  config: TenantConfig;
}) {
  const primary = section.primaryCta ?? config.cta.primary;
  const secondary = section.secondaryCta ?? config.cta.secondary;
  const mediaAsset = section.media ?? {
    alt: `Apresentação visual de ${config.business.name}`,
    placeholderLabel:
      "Imagem editorial de destaque (equipe, escritório ou tela principal de projeto)",
  };

  return (
    <section id={section.id} className="py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="space-y-6 border-b border-border pb-10 sm:pb-12">
          {section.eyebrow && (
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              <p className="font-accent text-xs font-medium tracking-widest text-primary uppercase">
                {section.eyebrow}
              </p>
            </div>
          )}
          <h1 className="max-w-5xl font-heading text-4xl font-bold leading-[1.03] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
            {section.headline}
          </h1>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 space-y-8 lg:col-span-6">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {section.subheadline}
            </p>

            <HeroActions
              primary={primary}
              secondary={secondary}
              business={config.business}
            />

            {section.highlights.length > 0 && (
              <ul className="divide-y divide-border border-y border-border">
                {section.highlights.map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 py-3.5 text-sm leading-relaxed text-foreground/85"
                  >
                    <span className="font-accent text-xs font-medium text-primary">
                      0{idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="min-w-0 lg:col-span-6">
            <div className="rounded-md border border-border bg-surface p-2.5 shadow-sm">
              <MediaFrame asset={mediaAsset} aspect="4/3" priority />
              <div className="mt-2.5 flex items-center justify-between gap-3 px-1 font-accent text-[11px] text-muted-foreground">
                <span className="truncate">{config.business.name}</span>
                <span className="shrink-0 uppercase tracking-wider text-primary">
                  {config.business.location.country}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
