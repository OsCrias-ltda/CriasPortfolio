"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { SocialIcon } from "@/core/ui/social-icon";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { SectionHeading } from "@/core/sections/layout/section-heading";
import {
  ContactProposalForm,
  WhatsAppActionBlock,
  type ContactSectionData,
} from "@/core/presets/shared/contact-shared";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

export function EditorialContact({
  section,
  config,
}: {
  section: ContactSectionData;
  config: TenantConfig;
}) {
  return (
    <SectionWrapper id={section.id} subtleSurface>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col justify-between gap-8 lg:col-span-5">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={section.eyebrow}
              title={section.title}
              subtitle={section.subtitle}
              className="mb-0 sm:mb-0"
            />
            <div className="max-w-sm">
              <WhatsAppActionBlock config={config} />
            </div>
          </div>

          <div className="min-w-0 space-y-4 border-t border-border pt-6">
            <p className="font-accent text-[11px] uppercase tracking-widest text-muted-foreground">
              Canais diretos
            </p>
            <div className="divide-y divide-border border-y border-border text-sm">
              <a
                href={`mailto:${config.business.contact.email}`}
                className="flex min-w-0 items-center justify-between gap-3 py-3.5 text-foreground transition-colors hover:text-primary"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span className="truncate font-medium">
                    {config.business.contact.email}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </a>

              {config.business.socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center justify-between gap-3 py-3.5 text-foreground transition-colors hover:text-primary"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <SocialIcon
                      icon={social.icon}
                      href={social.href}
                      label={social.label}
                      className="h-4 w-4 shrink-0 text-primary"
                    />
                    <span className="truncate font-medium">{social.label}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-lg border border-border bg-card p-5 sm:p-8 lg:col-span-7">
          <div className="mb-6 space-y-1.5 border-b border-border pb-5">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              {section.formTitle}
            </h3>
            <p className="text-sm text-muted-foreground">
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
