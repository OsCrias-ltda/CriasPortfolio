import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import type { ProcessSectionSchema } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ProcessSectionData = z.infer<typeof ProcessSectionSchema>;

export function EditorialProcess({ section }: { section: ProcessSectionData }) {
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
