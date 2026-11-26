"use client";

import { MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/ui/card";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import {
  ContactProposalForm,
  DirectChannelCards,
  WhatsAppActionBlock,
  type ContactSectionData,
} from "@/core/presets/shared/contact-shared";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

export function BoldContact({
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

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-12">
        <div className="min-w-0 space-y-6 lg:col-span-5">
          <Card className="min-w-0 border-primary/40">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 text-primary">
                <MessageCircle className="h-5 w-5" />
              </div>
              <CardTitle>{section.whatsappCardTitle}</CardTitle>
              <CardDescription>
                {section.whatsappCardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 pt-0 sm:p-6 sm:pt-0">
              <WhatsAppActionBlock config={config} />
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base">Outros canais</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
              <DirectChannelCards config={config} />
            </CardContent>
          </Card>
        </div>

        <Card className="min-w-0 lg:col-span-7">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle>{section.formTitle}</CardTitle>
            <CardDescription>
              Conte brevemente o que você precisa construir. Respondemos com
              clareza para marcarmos uma reunião de entendimento.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <ContactProposalForm section={section} config={config} />
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
}
