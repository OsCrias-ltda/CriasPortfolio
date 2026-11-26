import type { DesignPresetDefinition } from "@/core/presets/types";

export const changelogPreset: DesignPresetDefinition = {
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
};
