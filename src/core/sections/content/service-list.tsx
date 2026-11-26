import {
  Calendar,
  Cloud,
  Code2,
  Cpu,
  Globe,
  Layers,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/ui/card";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import { resolveSectionVariant } from "@/core/design/presets";
import type {
  ServicesSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import { cn } from "@/core/lib/utils";
import type { z } from "zod";

type ServicesSectionData = z.infer<typeof ServicesSectionSchema>;

const ICONS = {
  globe: Globe,
  layers: Layers,
  cpu: Cpu,
  cloud: Cloud,
  calendar: Calendar,
  code: Code2,
  smartphone: Smartphone,
  shield: ShieldCheck,
};

export function ServiceList({
  section,
  config,
}: {
  section: ServicesSectionData;
  config: TenantConfig;
}) {
  const variant = resolveSectionVariant("services", section.variant, config);

  if (variant === "changelogList") {
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

  if (variant === "editorialList") {
    return (
      <SectionWrapper id={section.id}>
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
        />

        <div className="divide-y divide-border border-y border-border">
          {section.items.map((item, idx) => {
            const Icon = ICONS[item.icon] ?? Globe;
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

  if (variant === "bento") {
    return (
      <SectionWrapper id={section.id}>
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
        />

        <div className="grid gap-5 lg:grid-cols-12">
          {section.items.map((item, idx) => {
            const Icon = ICONS[item.icon] ?? Globe;
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

  if (variant === "compactGrid") {
    return (
      <SectionWrapper id={section.id}>
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {section.items.map((item, idx) => {
            const Icon = ICONS[item.icon] ?? Globe;
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

  // variant === "cards" (padrão clássico)
  return (
    <SectionWrapper id={section.id}>
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      <div className="grid gap-6 md:grid-cols-2">
        {section.items.map((item, idx) => {
          const Icon = ICONS[item.icon] ?? Globe;
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
