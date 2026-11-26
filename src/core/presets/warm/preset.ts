import type { DesignPresetDefinition } from "@/core/presets/types";

export const warmPreset: DesignPresetDefinition = {
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
};
