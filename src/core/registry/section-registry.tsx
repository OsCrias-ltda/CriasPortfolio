import type * as React from "react";
import type {
  SectionConfig,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import { HeroSection } from "@/core/sections/hero";
import { ServiceList } from "@/core/sections/content/service-list";
import { ProjectShowcase } from "@/core/sections/content/project-showcase";
import { ProcessSteps } from "@/core/sections/content/process-steps";
import { AboutSplit } from "@/core/sections/content/about-split";
import { FAQAccordion } from "@/core/sections/content/faq-accordion";
import {
  FeatureGrid,
  MetricsStrip,
  Testimonials,
  ValueProposition,
} from "@/core/sections/content/extra-blocks";
import { CTABanner } from "@/core/sections/conversion/cta-banner";
import { ContactSection } from "@/core/sections/conversion/contact-section";

export type CustomSectionComponent = React.ComponentType<{
  id: string;
  props: Record<string, unknown>;
  config: TenantConfig;
}>;

export type CustomSectionRegistry = Record<string, CustomSectionComponent>;

export function renderCoreSection(
  section: SectionConfig,
  config: TenantConfig,
  customSections?: CustomSectionRegistry
): React.ReactNode {
  switch (section.blockType) {
    case "hero":
      return <HeroSection section={section} config={config} />;
    case "services":
      return <ServiceList section={section} config={config} />;
    case "projects":
      return <ProjectShowcase section={section} config={config} />;
    case "process":
      return <ProcessSteps section={section} config={config} />;
    case "about":
      return <AboutSplit section={section} config={config} />;
    case "faq":
      return <FAQAccordion section={section} />;
    case "valueProposition":
      return <ValueProposition section={section} />;
    case "featureGrid":
      return <FeatureGrid section={section} />;
    case "metricsStrip":
      return <MetricsStrip section={section} />;
    case "testimonials":
      return <Testimonials section={section} />;
    case "ctaBanner":
      return <CTABanner section={section} config={config} />;
    case "contact":
      return <ContactSection section={section} config={config} />;
    case "custom": {
      const Component = customSections?.[section.customKey];
      if (!Component) return null;
      return (
        <Component id={section.id} props={section.props} config={config} />
      );
    }
    default:
      return null;
  }
}
