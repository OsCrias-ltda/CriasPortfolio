import type { TenantConfig } from "@/core/schema/tenant-config.schema";

export const criasTheme: TenantConfig["theme"] = {
  colorScheme: "dark",
  colors: {
    bg: "#111214",
    surface: "#1A1C20",
    surfaceElevated: "#22252B",
    border: "#2C3038",
    text: "#F4F5F7",
    muted: "#A1A7B3",
    primary: "#F97316",
    primaryForeground: "#111214",
    secondary: "#272A30",
    secondaryForeground: "#F4F5F7",
    accent: "#FF5A1F",
  },
  fonts: {
    heading: "space-grotesk",
    body: "inter",
    accent: "silkscreen",
  },
  radius: "md",
  surfaceStyle: "grid",
};
