import type { DesignPresetDefinition } from "@/core/presets/types";

export const studioPreset: DesignPresetDefinition = {
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
};
