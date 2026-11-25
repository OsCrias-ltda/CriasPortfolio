import {
  Chakra_Petch,
  Inter,
  JetBrains_Mono,
  Pixelify_Sans,
  Plus_Jakarta_Sans,
  Silkscreen,
  Space_Grotesk,
} from "next/font/google";
import type { FontKey } from "@/core/schema/tenant-config.schema";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
  display: "swap",
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixelify-sans",
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra-petch",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const FONT_REGISTRY: Record<
  FontKey,
  { variableClass: string; cssStack: string }
> = {
  "space-grotesk": {
    variableClass: spaceGrotesk.variable,
    cssStack: "var(--font-space-grotesk), system-ui, sans-serif",
  },
  inter: {
    variableClass: inter.variable,
    cssStack: "var(--font-inter), system-ui, sans-serif",
  },
  silkscreen: {
    variableClass: silkscreen.variable,
    cssStack: "var(--font-silkscreen), monospace",
  },
  "pixelify-sans": {
    variableClass: pixelifySans.variable,
    cssStack: "var(--font-pixelify-sans), monospace",
  },
  "chakra-petch": {
    variableClass: chakraPetch.variable,
    cssStack: "var(--font-chakra-petch), system-ui, sans-serif",
  },
  "plus-jakarta-sans": {
    variableClass: plusJakartaSans.variable,
    cssStack: "var(--font-plus-jakarta-sans), system-ui, sans-serif",
  },
  "jetbrains-mono": {
    variableClass: jetbrainsMono.variable,
    cssStack: "var(--font-jetbrains-mono), monospace",
  },
};

export function getTenantFontClasses(fonts: {
  heading: FontKey;
  body: FontKey;
  accent: FontKey;
}): string {
  const uniqueClasses = new Set<string>([
    FONT_REGISTRY[fonts.heading].variableClass,
    FONT_REGISTRY[fonts.body].variableClass,
    FONT_REGISTRY[fonts.accent].variableClass,
  ]);
  return Array.from(uniqueClasses).join(" ");
}

export function getFontCssStack(key: FontKey): string {
  return FONT_REGISTRY[key].cssStack;
}
