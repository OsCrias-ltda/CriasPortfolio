import { resolveFooterVariant } from "@/core/presets";
import { StudioFooter } from "@/core/presets/studio";
import { EditorialFooter } from "@/core/presets/editorial";
import { ChangelogFooter } from "@/core/presets/changelog";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

interface FooterProps {
  config: TenantConfig;
  homeHref?: string;
}

export function Footer({ config, homeHref = "/" }: FooterProps) {
  const variant = resolveFooterVariant(config);

  switch (variant) {
    case "editorial":
      return <EditorialFooter config={config} homeHref={homeHref} />;
    case "compact":
      return <ChangelogFooter config={config} homeHref={homeHref} />;
    case "standard":
    default:
      return <StudioFooter config={config} homeHref={homeHref} />;
  }
}
