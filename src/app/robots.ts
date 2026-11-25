import type { MetadataRoute } from "next";
import { getActiveTenant } from "@/core/data";
import { getEffectiveSiteUrl } from "@/core/lib/utils";

export default async function robots(): Promise<MetadataRoute.Robots> {
  if (process.env.APP_ENV === "staging") {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  const config = await getActiveTenant({ preferStatic: true });
  const siteUrl = config ? getEffectiveSiteUrl(config.seo.siteUrl) : "";
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
