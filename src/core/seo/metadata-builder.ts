import type { Metadata } from "next";
import { getEffectiveSiteUrl } from "@/core/lib/utils";
import type { ProjectCase, TenantConfig } from "@/core/schema/tenant-config.schema";

export function buildHomeMetadata(config: TenantConfig): Metadata {
  const siteUrl = getEffectiveSiteUrl(config.seo.siteUrl);
  const ogImages = config.seo.ogImage ? [{ url: config.seo.ogImage }] : undefined;
  const isStaging = process.env.APP_ENV === "staging";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: config.seo.defaultTitle,
      template: config.seo.titleTemplate,
    },
    description: config.seo.defaultDescription,
    alternates: {
      canonical: siteUrl,
    },
    robots: isStaging ? { index: false, follow: false } : undefined,
    icons: {
      icon: config.seo.favicon,
    },
    openGraph: {
      type: "website",
      locale: config.tenant.locale.replace("-", "_"),
      url: siteUrl,
      siteName: config.business.name,
      title: config.seo.defaultTitle,
      description: config.seo.defaultDescription,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.defaultTitle,
      description: config.seo.defaultDescription,
      images: config.seo.ogImage ? [config.seo.ogImage] : undefined,
    },
  };
}

export function buildProjectMetadata(
  config: TenantConfig,
  project: ProjectCase
): Metadata {
  const siteUrl = getEffectiveSiteUrl(config.seo.siteUrl);
  const canonicalUrl = `${siteUrl}/projetos/${project.slug}`;
  const isStaging = process.env.APP_ENV === "staging";
  const shouldIndex = !isStaging && !project.isPlaceholder && project.indexable;
  const description = `${project.objective} ${project.summary}`.slice(0, 160);

  return {
    title: project.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "article",
      locale: config.tenant.locale.replace("-", "_"),
      url: canonicalUrl,
      siteName: config.business.name,
      title: `${project.title} — ${config.business.name}`,
      description,
      images: project.coverImage.src
        ? [{ url: project.coverImage.src, alt: project.coverImage.alt }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${config.business.name}`,
      description,
    },
  };
}
