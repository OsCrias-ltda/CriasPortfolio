import type {
  AboutVariant,
  ContactVariant,
  DesignPresetKey,
  FooterVariant,
  HeaderVariant,
  HeroVariant,
  ProcessVariant,
  ProjectsVariant,
  ResolvedTheme,
  ServicesVariant,
} from "@/core/schema/tenant-config.schema";

export interface DesignPresetDefinition {
  key: DesignPresetKey;
  label: string;
  shortLabel: string;
  tagline: string;
  theme: ResolvedTheme;
  layout: {
    headerVariant: HeaderVariant;
    footerVariant: FooterVariant;
  };
  sectionVariants: {
    hero: HeroVariant;
    services: ServicesVariant;
    projects: ProjectsVariant;
    process: ProcessVariant;
    about: AboutVariant;
    contact: ContactVariant;
  };
}
