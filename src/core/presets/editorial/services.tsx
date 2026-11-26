import { Globe } from "lucide-react";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import { SERVICE_ICONS } from "@/core/presets/shared/service-icons";
import type { ServicesSectionSchema } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ServicesSectionData = z.infer<typeof ServicesSectionSchema>;

export function EditorialServices({
  section,
}: {
  section: ServicesSectionData;
}) {
  return (
    <SectionWrapper id={section.id}>
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      <div className="divide-y divide-border border-y border-border">
        {section.items.map((item, idx) => {
          const Icon = SERVICE_ICONS[item.icon] ?? Globe;
          const code = item.code ?? `0${idx + 1}`;

          return (
            <div
              key={item.title}
              className="group grid gap-5 py-7 transition-colors sm:py-9 lg:grid-cols-12 lg:items-start"
            >
              <div className="flex items-center gap-3 lg:col-span-1">
                <span className="font-accent text-xs font-medium text-primary">
                  {code}
                </span>
              </div>

              <div className="flex items-start gap-3 lg:col-span-4">
                <Icon className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                  {item.title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base lg:col-span-4">
                {item.description}
              </p>

              {item.deliverables.length > 0 && (
                <ul className="flex flex-wrap gap-1.5 lg:col-span-3 lg:justify-end">
                  {item.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="rounded-sm border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {deliverable}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
