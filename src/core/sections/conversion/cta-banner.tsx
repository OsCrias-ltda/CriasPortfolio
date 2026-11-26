import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import { SectionWrapper } from "@/core/sections/layout/section-wrapper";
import { HeroActions } from "@/core/sections/hero/hero-actions";
import type {
  CtaAction,
  CtaBannerSectionSchema,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import { resolveCtaHref } from "@/core/lib/utils";
import type { z } from "zod";

type CtaBannerData = z.infer<typeof CtaBannerSectionSchema>;

function ActionIcon({ kind }: { kind: CtaAction["kind"] }) {
  if (kind === "whatsapp") return <MessageCircle className="h-4 w-4" />;
  if (kind === "email") return <Mail className="h-4 w-4" />;
  return <ArrowRight className="h-4 w-4" />;
}

export function CTABanner({
  section,
  config,
}: {
  section: CtaBannerData;
  config: TenantConfig;
}) {
  const primary = section.primaryCta ?? config.cta.primary;
  const secondary = section.secondaryCta ?? config.cta.secondary;
  const isBoldPreset = config.design?.preset === "bold";

  if (isBoldPreset) {
    const resolvedPrimary = resolveCtaHref(primary, config.business);
    const resolvedSecondary = secondary
      ? resolveCtaHref(secondary, config.business)
      : null;

    return (
      <SectionWrapper id={section.id} bordered={false} className="py-12 sm:py-16">
        <div className="bg-primary p-8 text-primary-foreground sm:p-12 lg:p-14">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-3">
              {section.eyebrow && (
                <p className="font-accent text-xs font-bold uppercase tracking-widest opacity-85">
                  {section.eyebrow}
                </p>
              )}
              <h2 className="font-heading text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                {section.title}
              </h2>
              <p className="text-base leading-relaxed opacity-90">
                {section.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:shrink-0">
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link
                  href={resolvedPrimary.href}
                  target={resolvedPrimary.external ? "_blank" : undefined}
                  rel={
                    resolvedPrimary.external ? "noopener noreferrer" : undefined
                  }
                >
                  <ActionIcon kind={primary.kind} />
                  {primary.label}
                </Link>
              </Button>

              {secondary && resolvedSecondary && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link
                    href={resolvedSecondary.href}
                    target={resolvedSecondary.external ? "_blank" : undefined}
                    rel={
                      resolvedSecondary.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <ActionIcon kind={secondary.kind} />
                    {secondary.label}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id={section.id} bordered={false} className="py-12 sm:py-16">
      <div className="bg-tenant-grid relative overflow-hidden rounded-lg border border-primary/35 bg-card p-8 sm:p-12 lg:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-[90px]"
        />
        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl space-y-3">
            {section.eyebrow && (
              <Badge variant="accent">{section.eyebrow}</Badge>
            )}
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {section.title}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {section.description}
            </p>
          </div>
          <div className="shrink-0">
            <HeroActions
              primary={primary}
              secondary={secondary}
              business={config.business}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
