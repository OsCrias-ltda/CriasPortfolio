import { MediaFrame } from "@/core/ui/media-frame";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import type { AboutSectionSchema } from "@/core/schema/tenant-config.schema";
import type { z } from "zod";

type AboutSectionData = z.infer<typeof AboutSectionSchema>;

export function AboutSplitClassic({ section }: { section: AboutSectionData }) {
  const mediaAsset = section.media ?? {
    alt: section.title,
    placeholderLabel: "Foto ou apresentação visual da equipe",
  };

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
