import type { DesignPresetDefinition } from "@/core/presets/types";

export const saasPreset: DesignPresetDefinition = {
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
};
