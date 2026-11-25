import type { ProjectCase, TenantConfig } from "@/core/schema/tenant-config.schema";

export interface TenantResolutionContext {
  host?: string | null;
  slugOverride?: string | null;
}

/**
 * Interface CMS-Ready para desacoplar origem de dados da UI.
 * Para integrar Payload CMS (ou Sanity/Strapi), implemente esta interface
 * validando o retorno com TenantConfigSchema.parse(...).
 */
export interface TenantContentProvider {
  getActiveTenant(context?: TenantResolutionContext): Promise<TenantConfig | null>;
  getTenantBySlug(slug: string): Promise<TenantConfig | null>;
  getTenantByHost(host: string): Promise<TenantConfig | null>;
  listTenantSlugs(): Promise<string[]>;
  getProjectBySlug(
    tenantSlug: string,
    projectSlug: string
  ): Promise<ProjectCase | null>;
}
