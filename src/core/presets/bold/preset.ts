import type { DesignPresetDefinition } from "@/core/presets/types";

export const boldPreset: DesignPresetDefinition = {
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
};
