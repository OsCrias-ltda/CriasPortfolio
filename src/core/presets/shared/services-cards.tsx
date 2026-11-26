import { Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/ui/card";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import { SERVICE_ICONS } from "@/core/presets/shared/service-icons";
import type { ServicesSectionSchema } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type ServicesSectionData = z.infer<typeof ServicesSectionSchema>;

export function ServicesCards({ section }: { section: ServicesSectionData }) {
  return (
    <SectionWrapper id={section.id}>
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {section.items.map((item, idx) => {
          const Icon = SERVICE_ICONS[item.icon] ?? Globe;
          const code = item.code ?? `0${idx + 1}`;

          return (
            <Card
              key={item.title}
              className="group flex flex-col justify-between hover:border-primary/60"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface-elevated text-primary transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-accent text-xs text-muted-foreground group-hover:text-primary">
                    {code}
                  </span>
                </div>
                <div className="space-y-2">
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </CardHeader>

              {item.deliverables.length > 0 && (
                <CardContent>
                  <ul className="flex flex-wrap gap-2 border-t border-border/70 pt-4">
                    {item.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="rounded-sm border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
