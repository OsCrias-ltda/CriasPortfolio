import { headers } from "next/headers";
import type { TenantContentProvider } from "@/core/data/content-provider";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

export async function resolveTenantConfig(
  provider: TenantContentProvider,
  options?: { slugOverride?: string | null; preferStatic?: boolean }
): Promise<TenantConfig | null> {
  if (options?.slugOverride) {
    return provider.getTenantBySlug(options.slugOverride);
  }

  const multiTenantMode = process.env.MULTI_TENANT_MODE === "true";

  if (!options?.preferStatic && multiTenantMode) {
    try {
      const requestHeaders = await headers();
      const host =
        requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
      return provider.getActiveTenant({ host });
    } catch {
      return provider.getActiveTenant();
    }
  }

  return provider.getActiveTenant();
}
