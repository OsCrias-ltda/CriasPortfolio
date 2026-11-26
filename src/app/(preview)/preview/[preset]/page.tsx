import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveTenant } from "@/core/data";
import {
  DESIGN_PRESETS,
  applyDesignPreset,
  isDesignPreviewEnabled,
  isValidColorPreset,
  isValidDesignPreset,
  resolveTenantTheme,
} from "@/core/presets";
import { DesignPreviewSwitcher } from "@/core/presets/preview-switcher";
import { SectionRenderer } from "@/core/registry/section-renderer";
import { TenantLayout } from "@/core/sections/layout/tenant-layout";
import { TenantThemeStyle } from "@/core/theme/theme-provider";
import { getTenantCustomSections } from "@/tenants";

export const dynamic = "force-dynamic";

interface PreviewPageProps {
  params: Promise<{ preset: string }>;
  searchParams: Promise<{ color?: string }>;
}

export async function generateMetadata({
  params,
}: PreviewPageProps): Promise<Metadata> {
  const { preset } = await params;
  if (!isValidDesignPreset(preset)) {
    return {
      title: "Preview não encontrado",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Preview: ${DESIGN_PRESETS[preset].label}`,
    robots: { index: false, follow: false },
  };
}

export default async function DesignPreviewPage({
  params,
  searchParams,
}: PreviewPageProps) {
  if (!isDesignPreviewEnabled()) {
    notFound();
  }

  const [{ preset }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  if (!isValidDesignPreset(preset)) {
    notFound();
  }

  const baseConfig = await getActiveTenant();
  if (!baseConfig) {
    notFound();
  }

  const rawColor = resolvedSearchParams.color;
  const activeColorPreset =
    rawColor && isValidColorPreset(rawColor) ? rawColor : undefined;

  const previewConfig = applyDesignPreset(baseConfig, preset, activeColorPreset);
  const resolvedTheme = resolveTenantTheme(previewConfig);
  const customSections = getTenantCustomSections(previewConfig.tenant.slug);
  const homeHref = activeColorPreset
    ? `/preview/${preset}?color=${activeColorPreset}`
    : `/preview/${preset}`;

  return (
    <>
      <TenantThemeStyle
        key={`${preset}-${activeColorPreset ?? "tenant"}`}
        id="preview-theme-tokens"
        theme={resolvedTheme}
      />
      <TenantLayout config={previewConfig} homeHref={homeHref}>
        <SectionRenderer
          config={previewConfig}
          customSections={customSections}
        />
        <DesignPreviewSwitcher
          activePreset={preset}
          activeColorPreset={activeColorPreset}
          isPreviewRoute
        />
      </TenantLayout>
    </>
  );
}
