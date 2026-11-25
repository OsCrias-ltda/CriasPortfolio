import type { TenantConfig } from "@/core/schema/tenant-config.schema";
import {
  renderCoreSection,
  type CustomSectionRegistry,
} from "@/core/registry/section-registry";

interface SectionRendererProps {
  config: TenantConfig;
  customSections?: CustomSectionRegistry;
}

export function SectionRenderer({
  config,
  customSections,
}: SectionRendererProps) {
  return (
    <>
      {config.sections
        .filter((section) => section.enabled)
        .map((section, idx) => (
          <div key={`${section.blockType}-${section.id}-${idx}`}>
            {renderCoreSection(section, config, customSections)}
          </div>
        ))}
    </>
  );
}
