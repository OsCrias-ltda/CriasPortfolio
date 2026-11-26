import type { DesignPresetDefinition } from "@/core/presets/types";

export const editorialPreset: DesignPresetDefinition = {
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
};
