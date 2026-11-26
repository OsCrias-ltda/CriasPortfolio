import { Globe } from "lucide-react";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import { SERVICE_ICONS } from "@/core/presets/shared/service-icons";
import type { ServicesSectionSchema } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ServicesSectionData = z.infer<typeof ServicesSectionSchema>;

export function SaasServices({ section }: { section: ServicesSectionData }) {
  return (
    <SectionWrapper id={section.id}>
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {section.items.map((item, idx) => {
          const Icon = SERVICE_ICONS[item.icon] ?? Globe;
          const code = item.code ?? `0${idx + 1}`;

          return (
            <div
              key={item.title}
              className="group flex min-w-0 flex-col justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/60"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border/70 pb-3">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="font-accent text-[11px] text-muted-foreground group-hover:text-primary">
                    /{code}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-semibold leading-snug text-foreground">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>

              {item.deliverables.length > 0 && (
                <ul className="mt-5 space-y-1.5 border-t border-border/70 pt-4">
                  {item.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="flex items-center gap-2 font-accent text-[11px] text-muted-foreground"
                    >
                      <span
                        className="h-1 w-1 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      <span>{deliverable}</span>
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
