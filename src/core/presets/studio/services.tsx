import { Globe } from "lucide-react";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import { SERVICE_ICONS } from "@/core/presets/shared/service-icons";
import type { ServicesSectionSchema } from "@/core/schema/tenant-config.schema";
import { cn } from "@/core/lib/utils";
import type { z } from "zod";

type ServicesSectionData = z.infer<typeof ServicesSectionSchema>;

export function StudioServices({ section }: { section: ServicesSectionData }) {
  return (
    <SectionWrapper id={section.id}>
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      <div className="grid gap-5 lg:grid-cols-12">
        {section.items.map((item, idx) => {
          const Icon = SERVICE_ICONS[item.icon] ?? Globe;
          const code = item.code ?? `0${idx + 1}`;
          const isWide = idx === 0 || idx === 3;
          const isHeroItem = idx === 0;

          return (
            <div
              key={item.title}
              className={cn(
                "group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/60 sm:p-8",
                isWide ? "lg:col-span-7" : "lg:col-span-5",
                isHeroItem && "border-primary/35 bg-surface-elevated/50"
              )}
            >
              {isHeroItem && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/12 blur-[70px]"
                />
              )}

              <div className="relative space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background/80 text-primary transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-accent text-xs text-muted-foreground group-hover:text-primary">
                    {code}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <h3
                    className={cn(
                      "font-heading font-semibold tracking-tight text-foreground",
                      isHeroItem ? "text-2xl sm:text-3xl" : "text-xl"
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>

              {item.deliverables.length > 0 && (
                <ul className="relative mt-6 flex flex-wrap gap-2 border-t border-border/70 pt-5">
                  {item.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="rounded-md border border-border/80 bg-background/80 px-2.5 py-1 text-xs text-foreground/85"
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
