import { resolveHeaderVariant } from "@/core/presets";
import { StudioHeader } from "@/core/presets/studio";
import { EditorialHeader } from "@/core/presets/editorial";
import { ChangelogHeader } from "@/core/presets/changelog";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

interface HeaderProps {
  config: TenantConfig;
  homeHref?: string;
}

export function Header({ config, homeHref = "/" }: HeaderProps) {
  const variant = resolveHeaderVariant(config);

  switch (variant) {
    case "floating":
      return <StudioHeader config={config} homeHref={homeHref} />;
    case "editorial":
      return <EditorialHeader config={config} homeHref={homeHref} />;
    case "compact":
    default:
      return <ChangelogHeader config={config} homeHref={homeHref} />;
  }
}
