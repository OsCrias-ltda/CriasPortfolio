import type { TenantConfig } from "@/core/schema/tenant-config.schema";
import type { CustomSectionRegistry } from "@/core/registry/section-registry";
import { criasConfig } from "@/tenants/crias/config";
import { criasCustomSections } from "@/tenants/crias/sections";

export const DEFAULT_TENANT_SLUG = "crias";

export const LOCAL_TENANT_DEFINITIONS: Record<string, TenantConfig> = {
  crias: criasConfig,
};

export const TENANT_CUSTOM_SECTIONS: Record<string, CustomSectionRegistry> = {
  crias: criasCustomSections,
};

export function getTenantCustomSections(slug: string): CustomSectionRegistry {
  return TENANT_CUSTOM_SECTIONS[slug] ?? {};
}
