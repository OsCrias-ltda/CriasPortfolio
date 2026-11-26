import { DESIGN_PRESETS } from "@/core/design/presets";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

/**
 * Tema oficial da Crias Ltda baseado no preset comercial "studio",
 * preservando a assinatura laranja (#F97316) e tipografia comercial/técnica.
 */
export const criasTheme: TenantConfig["theme"] = {
  ...DESIGN_PRESETS.studio.theme,
};
