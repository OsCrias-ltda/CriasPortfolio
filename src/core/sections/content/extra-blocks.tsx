import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import type {
  FeatureGridSectionSchema,
  MetricsStripSectionSchema,
  TestimonialsSectionSchema,
  ValuePropositionSectionSchema,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

export function ValueProposition({
  section,
}: {
  section: z.infer<typeof ValuePropositionSectionSchema>;
}) {
  return (
    <SectionWrapper id={section.id}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.title}
            subtitle={section.description}
            className="mb-0"
          />
        </div>
        <ul className="space-y-3 lg:col-span-6">
          {section.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 rounded-md border border-border bg-card p-4 text-sm text-foreground"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}

export function FeatureGrid({
  section,
}: {
  section: z.infer<typeof FeatureGridSectionSchema>;
}) {
  return (
    <SectionWrapper id={section.id}>
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {section.items.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}

export function MetricsStrip({
  section,
}: {
  section: z.infer<typeof MetricsStripSectionSchema>;
}) {
  return (
    <SectionWrapper id={section.id} subtleSurface className="py-12 sm:py-16">
      <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {section.items.map((metric) => (
          <div key={metric.label} className="space-y-1">
            <dt className="font-heading text-3xl font-bold text-primary">
              {metric.value}
            </dt>
            <dd className="text-sm text-muted-foreground">{metric.label}</dd>
          </div>
        ))}
      </dl>
    </SectionWrapper>
  );
}

export function Testimonials({
  section,
}: {
  section: z.infer<typeof TestimonialsSectionSchema>;
}) {
  return (
    <SectionWrapper id={section.id} subtleSurface>
      <SectionHeading eyebrow={section.eyebrow} title={section.title} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {section.items.map((item, idx) => (
          <Card key={idx} className="flex flex-col justify-between p-6">
            <blockquote className="text-sm leading-relaxed text-foreground">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div className="mt-6 border-t border-border pt-4">
              <p className="text-sm font-semibold text-foreground">
                {item.author}
              </p>
              {item.role && (
                <p className="text-xs text-muted-foreground">{item.role}</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
