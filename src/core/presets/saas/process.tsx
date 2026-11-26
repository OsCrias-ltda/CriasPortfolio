import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import type { ProcessSectionSchema } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ProcessSectionData = z.infer<typeof ProcessSectionSchema>;

export function SaasProcess({ section }: { section: ProcessSectionData }) {
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
