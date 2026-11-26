import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveTenant } from "@/core/data";
import {
  DESIGN_PRESETS,
  applyDesignPreset,
  isDesignPreviewEnabled,
  isValidDesignPreset,
} from "@/core/design/presets";
import { DesignPreviewSwitcher } from "@/core/design/design-preview-switcher";
import { SectionRenderer } from "@/core/registry/section-renderer";
import { TenantLayout } from "@/core/sections/layout/tenant-layout";
import { TenantThemeStyle } from "@/core/theme/theme-provider";
import { getTenantCustomSections } from "@/tenants";

export const dynamic = "force-dynamic";

interface PreviewPageProps {
  params: Promise<{ preset: string }>;
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

export default async function DesignPreviewPage({ params }: PreviewPageProps) {
  if (!isDesignPreviewEnabled()) {
    notFound();
  }

  const { preset } = await params;
  if (!isValidDesignPreset(preset)) {
    notFound();
  }

  const baseConfig = await getActiveTenant();
  if (!baseConfig) {
    notFound();
  }

  const previewConfig = applyDesignPreset(baseConfig, preset);
  const customSections = getTenantCustomSections(previewConfig.tenant.slug);

  return (
    <>
      <TenantThemeStyle
        key={preset}
        id="preview-theme-tokens"
        theme={previewConfig.theme}
      />
      <TenantLayout config={previewConfig} homeHref={`/preview/${preset}`}>
        <SectionRenderer
          config={previewConfig}
          customSections={customSections}
        />
        <DesignPreviewSwitcher activePreset={preset} isPreviewRoute />
      </TenantLayout>
    </>
  );
}
