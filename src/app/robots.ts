import type { MetadataRoute } from "next";
import { getActiveTenant } from "@/core/data";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getActiveTenant({ preferStatic: true });
  const siteUrl = config?.seo.siteUrl.replace(/\/$/, "") ?? "";
  const aiConfig = config?.aeo.aiCrawlers;

  const rules: MetadataRoute.Robots["rules"] = [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
  ];

  if (aiConfig?.allowSearchBots) {
    for (const bot of aiConfig.allowedBots) {
      rules.push({
        userAgent: bot,
        allow: "/",
        disallow: ["/api/"],
      });
    }
  }

  return {
    rules,
    sitemap: siteUrl ? `${siteUrl}/sitemap.xml` : undefined,
  };
}
