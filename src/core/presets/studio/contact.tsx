"use client";

import { MessageCircle } from "lucide-react";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import {
  ContactProposalForm,
  DirectChannelCards,
  WhatsAppActionBlock,
  type ContactSectionData,
} from "@/core/presets/shared/contact-shared";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

export function StudioContact({
  section,
  config,
}: {
  section: ContactSectionData;
  config: TenantConfig;
}) {
  return (
    <SectionWrapper id={section.id} subtleSurface>
      <SectionHeading
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      <div className="grid overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-12">
        <div className="flex min-w-0 flex-col justify-between gap-8 border-b border-border bg-surface-elevated/55 p-5 sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r">
          <div className="min-w-0 space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground">
              {section.whatsappCardTitle}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {section.whatsappCardDescription}
            </p>
            <div className="pt-1">
              <WhatsAppActionBlock config={config} />
            </div>
          </div>

          <div className="min-w-0 space-y-3 border-t border-border/80 pt-6">
            <p className="font-accent text-[11px] uppercase tracking-wider text-muted-foreground">
              Outros canais
            </p>
            <DirectChannelCards config={config} />
          </div>
        </div>

        <div className="min-w-0 p-5 sm:p-8 lg:col-span-7">
          <div className="mb-6 space-y-1.5">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              {section.formTitle}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Conte brevemente o que você precisa construir. Respondemos com
              clareza para marcarmos uma reunião de entendimento.
            </p>
          </div>
          <ContactProposalForm section={section} config={config} />
        </div>
      </div>
    </SectionWrapper>
  );
}
