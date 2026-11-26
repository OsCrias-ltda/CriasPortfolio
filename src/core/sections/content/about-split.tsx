import { MediaFrame } from "@/core/ui/media-frame";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import { resolveSectionVariant } from "@/core/design/presets";
import type {
  AboutSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type AboutSectionData = z.infer<typeof AboutSectionSchema>;

export function AboutSplit({
  section,
  config,
}: {
  section: AboutSectionData;
  config: TenantConfig;
}) {
  const variant = resolveSectionVariant("about", section.variant, config);

  const mediaAsset = section.media ?? {
    alt: section.title,
    placeholderLabel: "Foto ou apresentação visual da equipe",
  };

  if (variant === "studioCard") {
    return (
      <SectionWrapper id={section.id} subtleSurface>
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
              <SectionHeading
                eyebrow={section.eyebrow}
                title={section.title}
                className="mb-0 sm:mb-0"
              />

              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                {section.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {section.pillars.length > 0 && (
                <dl className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                  {section.pillars.map((pillar) => (
                    <div key={pillar.label} className="space-y-1">
                      <dt className="font-accent text-[11px] tracking-wider text-primary uppercase">
                        {pillar.label}
                      </dt>
                      <dd className="text-sm font-semibold text-foreground">
                        {pillar.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className="min-w-0 lg:col-span-5">
              <MediaFrame asset={mediaAsset} aspect="4/3" />
            </div>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  if (variant === "editorial") {
    return (
      <SectionWrapper id={section.id} subtleSurface>
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          className="mb-10 max-w-4xl sm:mb-12"
        />

        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {section.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {section.pillars.length > 0 && (
              <dl className="mt-4 grid divide-y divide-border border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {section.pillars.map((pillar) => (
                  <div
                    key={pillar.label}
                    className="py-4 sm:px-5 sm:first:pl-0 sm:last:pr-0"
                  >
                    <dt className="font-accent text-[11px] uppercase tracking-wider text-primary">
                      {pillar.label}
                    </dt>
                    <dd className="mt-1.5 text-sm font-semibold text-foreground">
                      {pillar.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="min-w-0 lg:col-span-5">
            <MediaFrame asset={mediaAsset} aspect="4/3" />
          </div>
        </div>
      </SectionWrapper>
    );
  }

  // variant === "split"
  return (
    <SectionWrapper id={section.id} subtleSurface>
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.title}
            className="mb-0 sm:mb-0"
          />

          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            {section.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {section.pillars.length > 0 && (
            <dl className="grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
              {section.pillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="rounded-md border border-border bg-card p-4"
                >
                  <dt className="font-accent text-[10px] tracking-wider text-primary uppercase">
                    {pillar.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-foreground">
                    {pillar.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="min-w-0 lg:col-span-5">
          <MediaFrame asset={mediaAsset} aspect="4/3" />
        </div>
      </div>
    </SectionWrapper>
  );
}
