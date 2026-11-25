import type { TenantConfig } from "@/core/schema/tenant-config.schema";
import { getFontCssStack } from "@/core/theme/font-registry";

const RADIUS_MAP: Record<TenantConfig["theme"]["radius"], string> = {
  none: "0px",
  sm: "0.375rem",
  md: "0.625rem",
  lg: "0.875rem",
};

export function buildTenantThemeCss(theme: TenantConfig["theme"]): string {
  const { colors, fonts, radius, colorScheme } = theme;
  const radiusValue = RADIUS_MAP[radius];

  return `
:root {
  color-scheme: ${colorScheme};
  --color-bg: ${colors.bg};
  --color-surface: ${colors.surface};
  --color-surface-elevated: ${colors.surfaceElevated};
  --color-border: ${colors.border};
  --color-text: ${colors.text};
  --color-muted: ${colors.muted};
  --color-primary: ${colors.primary};
  --color-primary-foreground: ${colors.primaryForeground};
  --color-secondary: ${colors.secondary};
  --color-secondary-foreground: ${colors.secondaryForeground};
  --color-accent: ${colors.accent};

  --font-heading: ${getFontCssStack(fonts.heading)};
  --font-body: ${getFontCssStack(fonts.body)};
  --font-accent: ${getFontCssStack(fonts.accent)};

  /* Mapeamento nativo shadcn/ui */
  --background: ${colors.bg};
  --foreground: ${colors.text};
  --card: ${colors.surface};
  --card-foreground: ${colors.text};
  --popover: ${colors.surfaceElevated};
  --popover-foreground: ${colors.text};
  --primary: ${colors.primary};
  --primary-foreground: ${colors.primaryForeground};
  --secondary: ${colors.secondary};
  --secondary-foreground: ${colors.secondaryForeground};
  --muted: ${colors.surfaceElevated};
  --muted-foreground: ${colors.muted};
  --accent: ${colors.surfaceElevated};
  --accent-foreground: ${colors.text};
  --destructive: #ef4444;
  --destructive-foreground: #fafafa;
  --border: ${colors.border};
  --input: ${colors.border};
  --ring: ${colors.primary};
  --radius: ${radiusValue};
}
`.trim();
}

export function TenantThemeStyle({
  theme,
}: {
  theme: TenantConfig["theme"];
}) {
  return (
    <style
      id="tenant-theme-tokens"
      dangerouslySetInnerHTML={{ __html: buildTenantThemeCss(theme) }}
    />
  );
}
