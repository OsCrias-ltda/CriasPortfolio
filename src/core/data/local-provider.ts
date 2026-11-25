import {
  TenantConfigSchema,
  type ProjectCase,
  type TenantConfig,
} from "@/core/schema/tenant-config.schema";
import type {
  TenantContentProvider,
  TenantResolutionContext,
} from "@/core/data/content-provider";
import {
  DEFAULT_TENANT_SLUG,
  LOCAL_TENANT_DEFINITIONS,
} from "@/tenants";

const validatedCache = new Map<string, TenantConfig>();

function loadValidatedTenant(slug: string): TenantConfig | null {
  const normalizedSlug = slug.trim().toLowerCase();
  const cached = validatedCache.get(normalizedSlug);
  if (cached) return cached;

  const raw = LOCAL_TENANT_DEFINITIONS[normalizedSlug];
  if (!raw) return null;

  const parsed = TenantConfigSchema.parse(raw);
  validatedCache.set(normalizedSlug, parsed);
  return parsed;
}

function normalizeHost(host: string): string {
  return host.trim().toLowerCase().replace(/^https?:\/\//, "").split(":")[0] ?? "";
}

export class LocalTenantContentProvider implements TenantContentProvider {
  private readonly defaultSlug: string;

  constructor(defaultSlug = process.env.ACTIVE_TENANT || DEFAULT_TENANT_SLUG) {
    this.defaultSlug = defaultSlug.trim().toLowerCase();
  }

  async listTenantSlugs(): Promise<string[]> {
    return Object.keys(LOCAL_TENANT_DEFINITIONS);
  }

  async getTenantBySlug(slug: string): Promise<TenantConfig | null> {
    return loadValidatedTenant(slug);
  }

  async getTenantByHost(host: string): Promise<TenantConfig | null> {
    const cleanHost = normalizeHost(host);
    if (!cleanHost) return null;

    for (const slug of Object.keys(LOCAL_TENANT_DEFINITIONS)) {
      const tenant = loadValidatedTenant(slug);
      if (!tenant) continue;
      const matches = tenant.tenant.domains.some(
        (domain) => normalizeHost(domain) === cleanHost
      );
      if (matches) return tenant;
    }

    return null;
  }

  async getActiveTenant(
    context?: TenantResolutionContext
  ): Promise<TenantConfig | null> {
    if (context?.slugOverride) {
      return this.getTenantBySlug(context.slugOverride);
    }

    if (context?.host) {
      const byHost = await this.getTenantByHost(context.host);
      if (byHost) return byHost;
    }

    return this.getTenantBySlug(this.defaultSlug);
  }

  async getProjectBySlug(
    tenantSlug: string,
    projectSlug: string
  ): Promise<ProjectCase | null> {
    const tenant = await this.getTenantBySlug(tenantSlug);
    if (!tenant) return null;
    return tenant.projects.find((item) => item.slug === projectSlug) ?? null;
  }
}
