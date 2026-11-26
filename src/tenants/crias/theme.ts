import type { TenantThemeOverrides } from "@/core/schema/tenant-config.schema";

/**
 * Identidade visual proposta pelo tenant Crias Ltda (cor de marca e tipografia).
 * Superfícies, esquema claro/escuro, bordas e demais tokens caem no fallback do preset ativo.
 */
export const criasTheme: TenantThemeOverrides = {
  colors: {
    primary: "#F97316",
    accent: "#FB923C",
  },
  fonts: {
    heading: "plus-jakarta-sans",
    body: "inter",
    accent: "jetbrains-mono",
  },
};
