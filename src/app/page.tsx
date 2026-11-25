import { notFound } from "next/navigation";
import { getActiveTenant } from "@/core/data";
import { SectionRenderer } from "@/core/registry/section-renderer";
import { buildHomeJsonLd } from "@/core/seo/json-ld";
import { JsonLdRenderer } from "@/core/seo/json-ld-renderer";
import { getTenantCustomSections } from "@/tenants";

export default async function HomePage() {
  const config = await getActiveTenant();
  if (!config) {
    notFound();
  }

  const schemas = buildHomeJsonLd(config);
  const customSections = getTenantCustomSections(config.tenant.slug);

  return (
    <>
      <JsonLdRenderer schemas={schemas} />
      <SectionRenderer config={config} customSections={customSections} />
    </>
  );
}
