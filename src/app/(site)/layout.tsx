import { notFound } from "next/navigation";
import { getActiveTenant } from "@/core/data";
import { isDesignPreviewEnabled } from "@/core/design/presets";
import { DesignPreviewSwitcher } from "@/core/design/design-preview-switcher";
import { TenantLayout } from "@/core/sections/layout/tenant-layout";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getActiveTenant();
  if (!config) {
    notFound();
  }

  const showPreviewSwitcher = isDesignPreviewEnabled();

  return (
    <TenantLayout config={config}>
      {children}
      {showPreviewSwitcher && (
        <DesignPreviewSwitcher
          activePreset={config.design.preset}
          isPreviewRoute={false}
        />
      )}
    </TenantLayout>
  );
}
