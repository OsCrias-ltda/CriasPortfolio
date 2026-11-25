import type { TenantContentProvider } from "@/core/data/content-provider";
import { LocalTenantContentProvider } from "@/core/data/local-provider";
import { resolveTenantConfig } from "@/core/data/tenant-resolver";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";
import { DEFAULT_TENANT_SLUG } from "@/tenants";

let providerInstance: TenantContentProvider | null = null;

/**
 * Factory central de dados.
 * Quando CONTENT_PROVIDER="payload" for implementado, basta instanciar
 * PayloadTenantContentProvider aqui sem alterar páginas ou blocos de UI.
 */
export function getContentProvider(): TenantContentProvider {
  if (!providerInstance) {
    providerInstance = new LocalTenantContentProvider(
      process.env.ACTIVE_TENANT || DEFAULT_TENANT_SLUG
    );
  }
  return providerInstance;
}

export async function getActiveTenant(options?: {
  slugOverride?: string | null;
  preferStatic?: boolean;
}): Promise<TenantConfig | null> {
  const provider = getContentProvider();
  return resolveTenantConfig(provider, options);
}
