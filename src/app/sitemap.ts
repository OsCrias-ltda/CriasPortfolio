import type { MetadataRoute } from "next";
import { getActiveTenant } from "@/core/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await getActiveTenant({ preferStatic: true });
  if (!config) return [];

  const siteUrl = config.seo.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Apenas projetos reais e indexáveis entram no sitemap.xml
  for (const project of config.projects) {
    if (!project.isPlaceholder && project.indexable) {
      entries.push({
        url: `${siteUrl}/projetos/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
