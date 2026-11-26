import type {
  AboutVariant,
  ContactVariant,
  DesignPresetKey,
  FooterVariant,
  HeaderVariant,
  HeroVariant,
  ProcessVariant,
  ProjectsVariant,
  ServicesVariant,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";

export interface DesignPresetDefinition {
  key: DesignPresetKey;
  label: string;
  shortLabel: string;
  tagline: string;
  theme: TenantConfig["theme"];
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

export const DESIGN_PRESETS: Record<DesignPresetKey, DesignPresetDefinition> = {
  studio: {
    key: "studio",
    label: "Product Studio",
    shortLabel: "Studio",
    tagline: "Dev House B2B • Dark em camadas • Foco comercial",
    theme: {
      colorScheme: "dark",
      colors: {
        bg: "#090B0F",
        surface: "#11141B",
        surfaceElevated: "#181D27",
        border: "#232938",
        text: "#F8FAFC",
        muted: "#94A3B8",
        primary: "#F97316",
        primaryForeground: "#090B0F",
        secondary: "#181D27",
        secondaryForeground: "#F8FAFC",
        accent: "#FB923C",
      },
      fonts: {
        heading: "plus-jakarta-sans",
        body: "inter",
        accent: "jetbrains-mono",
      },
      radius: "lg",
      surfaceStyle: "minimal",
    },
    layout: {
      headerVariant: "floating",
      footerVariant: "standard",
    },
    sectionVariants: {
      hero: "studioSplit",
      services: "bento",
      projects: "featuredList",
      process: "stickySplit",
      about: "studioCard",
      contact: "focusedForm",
    },
  },
  editorial: {
    key: "editorial",
    label: "Editorial Clean",
    shortLabel: "Editorial",
    tagline: "Estúdio High-Ticket • Light off-white • Imagem editorial",
    theme: {
      colorScheme: "light",
      colors: {
        bg: "#FAFAF8",
        surface: "#FFFFFF",
        surfaceElevated: "#F2F1EC",
        border: "#E2E0D8",
        text: "#111214",
        muted: "#525660",
        primary: "#C2410C",
        primaryForeground: "#FFFFFF",
        secondary: "#EFECE5",
        secondaryForeground: "#111214",
        accent: "#EA580C",
      },
      fonts: {
        heading: "space-grotesk",
        body: "inter",
        accent: "jetbrains-mono",
      },
      radius: "sm",
      surfaceStyle: "minimal",
    },
    layout: {
      headerVariant: "editorial",
      footerVariant: "editorial",
    },
    sectionVariants: {
      hero: "editorial",
      services: "editorialList",
      projects: "asymmetric",
      process: "timeline",
      about: "editorial",
      contact: "minimalDirect",
    },
  },
  saas: {
    key: "saas",
    label: "SaaS Commercial",
    shortLabel: "SaaS",
    tagline: "Software House B2B • Light clean • Hero centralizado",
    theme: {
      colorScheme: "light",
      colors: {
        bg: "#FFFFFF",
        surface: "#F8FAFC",
        surfaceElevated: "#F1F5F9",
        border: "#E2E8F0",
        text: "#0F172A",
        muted: "#475569",
        primary: "#C2410C",
        primaryForeground: "#FFFFFF",
        secondary: "#F1F5F9",
        secondaryForeground: "#0F172A",
        accent: "#EA580C",
      },
      fonts: {
        heading: "plus-jakarta-sans",
        body: "inter",
        accent: "jetbrains-mono",
      },
      radius: "lg",
      surfaceStyle: "minimal",
    },
    layout: {
      headerVariant: "floating",
      footerVariant: "standard",
    },
    sectionVariants: {
      hero: "saasCentered",
      services: "compactGrid",
      projects: "grid",
      process: "stepper",
      about: "studioCard",
      contact: "focusedForm",
    },
  },
  changelog: {
    key: "changelog",
    label: "Dev Changelog",
    shortLabel: "Changelog",
    tagline: "Indie / Engenheiro Sênior • Leitura rápida • Estilo release notes",
    theme: {
      colorScheme: "dark",
      colors: {
        bg: "#0A0A0B",
        surface: "#111113",
        surfaceElevated: "#18181B",
        border: "#27272A",
        text: "#FAFAFA",
        muted: "#A1A1AA",
        primary: "#F97316",
        primaryForeground: "#09090B",
        secondary: "#18181B",
        secondaryForeground: "#FAFAFA",
        accent: "#FB923C",
      },
      fonts: {
        heading: "inter",
        body: "inter",
        accent: "jetbrains-mono",
      },
      radius: "sm",
      surfaceStyle: "minimal",
    },
    layout: {
      headerVariant: "compact",
      footerVariant: "compact",
    },
    sectionVariants: {
      hero: "changelog",
      services: "changelogList",
      projects: "changelogFeed",
      process: "timeline",
      about: "editorial",
      contact: "minimalDirect",
    },
  },
  bold: {
    key: "bold",
    label: "Agency Bold",
    shortLabel: "Bold",
    tagline: "Estúdio Criativo • Alto contraste • Tipografia gigante",
    theme: {
      colorScheme: "dark",
      colors: {
        bg: "#050507",
        surface: "#0E0E13",
        surfaceElevated: "#16161F",
        border: "#262634",
        text: "#FFFFFF",
        muted: "#A1A1B5",
        primary: "#FF5A1F",
        primaryForeground: "#050507",
        secondary: "#16161F",
        secondaryForeground: "#FFFFFF",
        accent: "#FF7A45",
      },
      fonts: {
        heading: "chakra-petch",
        body: "inter",
        accent: "jetbrains-mono",
      },
      radius: "none",
      surfaceStyle: "grid",
    },
    layout: {
      headerVariant: "editorial",
      footerVariant: "editorial",
    },
    sectionVariants: {
      hero: "boldImpact",
      services: "bento",
      projects: "featuredList",
      process: "stickySplit",
      about: "studioCard",
      contact: "splitCards",
    },
  },
  warm: {
    key: "warm",
    label: "Warm Boutique",
    shortLabel: "Warm",
    tagline: "Consultoria Humana • Light areia suave • Proximidade",
    theme: {
      colorScheme: "light",
      colors: {
        bg: "#F6F2EA",
        surface: "#FDFBF7",
        surfaceElevated: "#EDE6D8",
        border: "#DDD4C3",
        text: "#1E1B18",
        muted: "#5C544B",
        primary: "#B45309",
        primaryForeground: "#FFFFFF",
        secondary: "#EAE1D0",
        secondaryForeground: "#1E1B18",
        accent: "#D97706",
      },
      fonts: {
        heading: "plus-jakarta-sans",
        body: "inter",
        accent: "jetbrains-mono",
      },
      radius: "lg",
      surfaceStyle: "minimal",
    },
    layout: {
      headerVariant: "floating",
      footerVariant: "editorial",
    },
    sectionVariants: {
      hero: "split",
      services: "editorialList",
      projects: "asymmetric",
      process: "timeline",
      about: "studioCard",
      contact: "focusedForm",
    },
  },
};

export const DESIGN_PRESET_LIST: DesignPresetDefinition[] = [
  DESIGN_PRESETS.studio,
  DESIGN_PRESETS.editorial,
  DESIGN_PRESETS.saas,
  DESIGN_PRESETS.changelog,
  DESIGN_PRESETS.bold,
  DESIGN_PRESETS.warm,
];

export function isValidDesignPreset(value: string): value is DesignPresetKey {
  return value in DESIGN_PRESETS;
}

export function isDesignPreviewEnabled(): boolean {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.APP_ENV === "staging" ||
    process.env.ENABLE_DESIGN_PREVIEW === "true"
  );
}

export function getActiveDesignPreset(
  config: TenantConfig
): DesignPresetDefinition {
  const key = config.design?.preset ?? "studio";
  return DESIGN_PRESETS[key] ?? DESIGN_PRESETS.studio;
}

export function resolveHeaderVariant(config: TenantConfig): HeaderVariant {
  return (
    config.design?.headerVariant ??
    getActiveDesignPreset(config).layout.headerVariant
  );
}

export function resolveFooterVariant(config: TenantConfig): FooterVariant {
  return (
    config.design?.footerVariant ??
    getActiveDesignPreset(config).layout.footerVariant
  );
}

export function resolveSectionVariant<
  K extends keyof DesignPresetDefinition["sectionVariants"],
>(
  blockType: K,
  explicitVariant: DesignPresetDefinition["sectionVariants"][K] | undefined,
  config: TenantConfig
): DesignPresetDefinition["sectionVariants"][K] {
  return (
    explicitVariant ?? getActiveDesignPreset(config).sectionVariants[blockType]
  );
}

function rewritePreviewAnchorHref(
  href: string | undefined,
  previewBasePath: string
): string | undefined {
  if (!href) return href;
  if (href.startsWith("/#")) {
    return `${previewBasePath}${href.slice(1)}`;
  }
  return href;
}

/**
 * Aplica um preset completo sobre o TenantConfig para validação visual (/preview/[preset]).
 * Remove overrides de variante por seção para mostrar a composição pura do preset escolhido
 * e mantém âncoras de navegação (/#secao) dentro da rota de preview ativa.
 */
export function applyDesignPreset(
  config: TenantConfig,
  presetKey: DesignPresetKey
): TenantConfig {
  const preset = DESIGN_PRESETS[presetKey];
  const previewBasePath = `/preview/${presetKey}`;

  return {
    ...config,
    design: {
      preset: presetKey,
      headerVariant: preset.layout.headerVariant,
      footerVariant: preset.layout.footerVariant,
    },
    theme: preset.theme,
    cta: {
      primary: {
        ...config.cta.primary,
        href: rewritePreviewAnchorHref(config.cta.primary.href, previewBasePath),
      },
      secondary: config.cta.secondary
        ? {
            ...config.cta.secondary,
            href: rewritePreviewAnchorHref(
              config.cta.secondary.href,
              previewBasePath
            ),
          }
        : undefined,
    },
    navigation: {
      ...config.navigation,
      items: config.navigation.items.map((item) => ({
        ...item,
        href: rewritePreviewAnchorHref(item.href, previewBasePath) ?? item.href,
      })),
    },
    sections: config.sections.map((section) => {
      switch (section.blockType) {
        case "hero":
          return {
            ...section,
            variant: preset.sectionVariants.hero,
            primaryCta: section.primaryCta
              ? {
                  ...section.primaryCta,
                  href: rewritePreviewAnchorHref(
                    section.primaryCta.href,
                    previewBasePath
                  ),
                }
              : undefined,
            secondaryCta: section.secondaryCta
              ? {
                  ...section.secondaryCta,
                  href: rewritePreviewAnchorHref(
                    section.secondaryCta.href,
                    previewBasePath
                  ),
                }
              : undefined,
          };
        case "services":
          return { ...section, variant: preset.sectionVariants.services };
        case "projects":
          return { ...section, variant: preset.sectionVariants.projects };
        case "process":
          return { ...section, variant: preset.sectionVariants.process };
        case "about":
          return { ...section, variant: preset.sectionVariants.about };
        case "contact":
          return { ...section, variant: preset.sectionVariants.contact };
        case "ctaBanner":
          return {
            ...section,
            primaryCta: section.primaryCta
              ? {
                  ...section.primaryCta,
                  href: rewritePreviewAnchorHref(
                    section.primaryCta.href,
                    previewBasePath
                  ),
                }
              : undefined,
            secondaryCta: section.secondaryCta
              ? {
                  ...section.secondaryCta,
                  href: rewritePreviewAnchorHref(
                    section.secondaryCta.href,
                    previewBasePath
                  ),
                }
              : undefined,
          };
        default:
          return section;
      }
    }),
  };
}
