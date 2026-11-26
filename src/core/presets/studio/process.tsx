import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import type { ProcessSectionSchema } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ProcessSectionData = z.infer<typeof ProcessSectionSchema>;

export function StudioProcess({ section }: { section: ProcessSectionData }) {
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
