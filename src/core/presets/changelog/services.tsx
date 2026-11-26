import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import type { ServicesSectionSchema } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ServicesSectionData = z.infer<typeof ServicesSectionSchema>;

export function ChangelogServices({
  section,
}: {
  section: ServicesSectionData;
}) {
  return (
    <SectionWrapper id={section.id} size="narrow">
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
        className="mb-10 sm:mb-12"
      />

      <div className="divide-y divide-border border-y border-border">
        {section.items.map((item, idx) => {
          const code = item.code ?? `0${idx + 1}`;
          return (
            <div
              key={item.title}
              className="group grid gap-3 py-6 sm:grid-cols-12 sm:gap-6"
            >
              <div className="font-accent text-xs text-primary sm:col-span-2 sm:pt-1">
                [{code}]
              </div>
              <div className="min-w-0 space-y-2 sm:col-span-10">
                <h3 className="font-heading text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                {item.deliverables.length > 0 && (
                  <p className="pt-1 font-accent text-[11px] text-muted-foreground/90">
                    {item.deliverables.join("  /  ")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
