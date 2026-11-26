import type { ColorPresetKey } from "@/core/schema/tenant-config.schema";

export interface ColorPresetDefinition {
  key: ColorPresetKey;
  label: string;
  swatch: string;
  dark: {
    primary: string;
    accent: string;
  };
  light: {
    primary: string;
    accent: string;
  };
}

export const COLOR_PRESETS: Record<ColorPresetKey, ColorPresetDefinition> = {
  orange: {
    key: "orange",
    label: "Laranja",
    swatch: "#F97316",
    dark: { primary: "#F97316", accent: "#FB923C" },
    light: { primary: "#C2410C", accent: "#EA580C" },
  },
  blue: {
    key: "blue",
    label: "Azul",
    swatch: "#2563EB",
    dark: { primary: "#3B82F6", accent: "#60A5FA" },
    light: { primary: "#1D4ED8", accent: "#2563EB" },
  },
  emerald: {
    key: "emerald",
    label: "Esmeralda",
    swatch: "#10B981",
    dark: { primary: "#10B981", accent: "#34D399" },
    light: { primary: "#047857", accent: "#059669" },
  },
  violet: {
    key: "violet",
    label: "Violeta",
    swatch: "#7C3AED",
    dark: { primary: "#8B5CF6", accent: "#A78BFA" },
    light: { primary: "#6D28D9", accent: "#7C3AED" },
  },
  rose: {
    key: "rose",
    label: "Vermelho",
    swatch: "#E11D48",
    dark: { primary: "#F43F5E", accent: "#FB7185" },
    light: { primary: "#BE123C", accent: "#E11D48" },
  },
  amber: {
    key: "amber",
    label: "Âmbar",
    swatch: "#D97706",
    dark: { primary: "#F59E0B", accent: "#FBBF24" },
    light: { primary: "#B45309", accent: "#D97706" },
  },
  cyan: {
    key: "cyan",
    label: "Ciano",
    swatch: "#06B6D4",
    dark: { primary: "#06B6D4", accent: "#22D3EE" },
    light: { primary: "#0E7490", accent: "#0891B2" },
  },
  zinc: {
    key: "zinc",
    label: "Mono",
    swatch: "#71717A",
    dark: { primary: "#F4F4F5", accent: "#D4D4D8" },
    light: { primary: "#18181B", accent: "#3F3F46" },
  },
};

export const COLOR_PRESET_LIST: ColorPresetDefinition[] = [
  COLOR_PRESETS.orange,
  COLOR_PRESETS.blue,
  COLOR_PRESETS.emerald,
  COLOR_PRESETS.violet,
  COLOR_PRESETS.rose,
  COLOR_PRESETS.amber,
  COLOR_PRESETS.cyan,
  COLOR_PRESETS.zinc,
];

export function isValidColorPreset(value: string): value is ColorPresetKey {
  return value in COLOR_PRESETS;
}
