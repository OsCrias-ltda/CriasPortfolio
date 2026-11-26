import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import { resolveSectionVariant } from "@/core/design/presets";
import type {
  ProcessSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ProcessSectionData = z.infer<typeof ProcessSectionSchema>;

export function ProcessSteps({
  section,
  config,
}: {
  section: ProcessSectionData;
  config: TenantConfig;
}) {
  const variant = resolveSectionVariant("process", section.variant, config);

  if (variant === "stickySplit") {
    return (
      <SectionWrapper id={section.id}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <SectionHeading
              eyebrow={section.eyebrow}
              title={section.title}
              subtitle={section.subtitle}
              className="mb-0 sm:mb-0"
            />
          </div>

          <ol className="space-y-4 lg:col-span-7">
            {section.steps.map((step) => (
              <li
                key={step.number}
                className="flex min-w-0 items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 sm:gap-5 sm:p-6"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 font-accent text-xs font-semibold text-primary">
                  {step.number}
                </span>
                <div className="min-w-0 space-y-1.5">
                  <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </SectionWrapper>
    );
  }

  if (variant === "timeline") {
    return (
      <SectionWrapper id={section.id}>
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
        />

        <ol className="relative grid gap-8 border-l border-border pl-6 lg:grid-cols-4 lg:gap-8 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8">
          {section.steps.map((step) => (
            <li key={step.number} className="relative space-y-3">
              {/* Marcador na linha do tempo */}
              <span
                aria-hidden="true"
                className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background lg:-top-[37px] lg:left-0"
              />
              <span className="inline-block font-accent text-xs font-semibold text-primary">
                Etapa {step.number}
              </span>
              <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </SectionWrapper>
    );
  }

  if (variant === "stepper") {
    return (
      <SectionWrapper id={section.id}>
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
        />

        <ol className="grid divide-y divide-border overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {section.steps.map((step) => (
            <li
              key={step.number}
              className="flex min-w-0 flex-col justify-between p-5 transition-colors hover:bg-surface-elevated/50 sm:p-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-accent text-xs font-semibold text-primary">
                    STEP_{step.number}
                  </span>
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-primary/70"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground sm:text-lg">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </SectionWrapper>
    );
  }

  // variant === "cards"
  return (
    <SectionWrapper id={section.id}>
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {section.steps.map((step) => (
          <li
            key={step.number}
            className="flex flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50"
          >
            <div className="space-y-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-primary/40 bg-primary/10 font-accent text-xs text-primary">
                {step.number}
              </span>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
