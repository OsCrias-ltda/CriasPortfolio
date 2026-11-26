import type {
  ColorPresetKey,
  DesignPresetKey,
  FooterVariant,
  HeaderVariant,
  ResolvedTheme,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type { DesignPresetDefinition } from "@/core/presets/types";
import {
  COLOR_PRESETS,
  COLOR_PRESET_LIST,
  isValidColorPreset,
} from "@/core/presets/color-presets";
import { studioPreset } from "@/core/presets/studio/preset";
import { editorialPreset } from "@/core/presets/editorial/preset";
import { saasPreset } from "@/core/presets/saas/preset";
import { changelogPreset } from "@/core/presets/changelog/preset";
import { boldPreset } from "@/core/presets/bold/preset";
import { warmPreset } from "@/core/presets/warm/preset";

export type { DesignPresetDefinition } from "@/core/presets/types";
export type { ColorPresetDefinition } from "@/core/presets/color-presets";
export { COLOR_PRESETS, COLOR_PRESET_LIST, isValidColorPreset };

export const DESIGN_PRESETS: Record<DesignPresetKey, DesignPresetDefinition> = {
  studio: studioPreset,
  editorial: editorialPreset,
  saas: saasPreset,
  changelog: changelogPreset,
  bold: boldPreset,
  warm: warmPreset,
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

function computeRelativeLuminance(hex: string): number | null {
  const match = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return null;

  const value = match[1];
  const channels = [
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
  ].map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

export function pickAccessibleForeground(
  backgroundHex: string,
  fallback: string
): string {
  const luminance = computeRelativeLuminance(backgroundHex);
  if (luminance === null) return fallback;

  const contrastWithWhite = (1 + 0.05) / (luminance + 0.05);
  const contrastWithDark = (luminance + 0.05) / (0.003 + 0.05);
  return contrastWithDark >= contrastWithWhite ? "#090B0F" : "#FFFFFF";
}

function compactRecord<T extends Record<string, unknown>>(
  record?: T
): Partial<T> {
  if (!record) return {};
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(record)) {
    if (value !== undefined) {
      result[key as keyof T] = value as T[keyof T];
    }
  }
  return result;
}

/**
 * Resolve o tema final dando prioridade às cores e tipografia propostas pelo tenant,
 * suportando também colorPreset (adaptado para dark/light) e usando o preset selecionado
 * como fallback completo para tokens não informados.
 */
export function resolveTenantTheme(
  config: TenantConfig,
  presetOverride?: DesignPresetKey
): ResolvedTheme {
  const presetTheme = presetOverride
    ? DESIGN_PRESETS[presetOverride].theme
    : getActiveDesignPreset(config).theme;
  const overrides = config.theme;

  if (!overrides) {
    return presetTheme;
  }

  const effectiveScheme = overrides.colorScheme ?? presetTheme.colorScheme;
  const colorPresetTokens = overrides.colorPreset
    ? COLOR_PRESETS[overrides.colorPreset][effectiveScheme]
    : undefined;
  const cleanColorOverrides = compactRecord(overrides.colors);
  const cleanFontOverrides = compactRecord(overrides.fonts);

  const mergedColors = {
    ...presetTheme.colors,
    ...(colorPresetTokens ?? {}),
    ...cleanColorOverrides,
  };

  const hasCustomPrimary = Boolean(
    cleanColorOverrides.primary || colorPresetTokens?.primary
  );
  if (hasCustomPrimary && !cleanColorOverrides.primaryForeground) {
    mergedColors.primaryForeground = pickAccessibleForeground(
      mergedColors.primary,
      presetTheme.colors.primaryForeground
    );
  }

  return {
    colorScheme: effectiveScheme,
    colors: mergedColors,
    fonts: {
      ...presetTheme.fonts,
      ...cleanFontOverrides,
    },
    radius: overrides.radius ?? presetTheme.radius,
    surfaceStyle: overrides.surfaceStyle ?? presetTheme.surfaceStyle,
  };
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
 * Preserva cores e tipografia propostas pelo tenant (usando o preset como fallback),
 * permite testar presets de cor (?color=...) e mantém âncoras (/#secao) dentro da rota de preview ativa.
 */
export function applyDesignPreset(
  config: TenantConfig,
  presetKey: DesignPresetKey,
  colorPresetOverride?: ColorPresetKey
): TenantConfig {
  const preset = DESIGN_PRESETS[presetKey];
  const previewBasePath = colorPresetOverride
    ? `/preview/${presetKey}?color=${colorPresetOverride}`
    : `/preview/${presetKey}`;

  let nextTheme = config.theme;
  if (colorPresetOverride) {
    const restColors = { ...config.theme?.colors };
    delete restColors.primary;
    delete restColors.primaryForeground;
    delete restColors.accent;

    nextTheme = {
      ...config.theme,
      colorPreset: colorPresetOverride,
      colors: Object.keys(restColors).length > 0 ? restColors : undefined,
    };
  }

  return {
    ...config,
    design: {
      preset: presetKey,
      headerVariant: preset.layout.headerVariant,
      footerVariant: preset.layout.footerVariant,
    },
    theme: nextTheme,
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
