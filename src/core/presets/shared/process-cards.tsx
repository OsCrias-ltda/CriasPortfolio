import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import type { ProcessSectionSchema } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ProcessSectionData = z.infer<typeof ProcessSectionSchema>;

export function ProcessCards({ section }: { section: ProcessSectionData }) {
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
