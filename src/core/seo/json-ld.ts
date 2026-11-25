import type { ProjectCase, TenantConfig } from "@/core/schema/tenant-config.schema";

export function buildHomeJsonLd(config: TenantConfig): Record<string, unknown>[] {
  const siteUrl = config.seo.siteUrl.replace(/\/$/, "");
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;

  const servicesSection = config.sections.find(
    (section) => section.blockType === "services" && section.enabled
  );
  const faqSection = config.sections.find(
    (section) => section.blockType === "faq" && section.enabled
  );

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": config.business.schemaType,
      "@id": organizationId,
      name: config.business.name,
      legalName: config.business.legalName ?? config.business.name,
      url: siteUrl,
      description: config.business.proofStatement,
      email: config.business.contact.email,
      areaServed: config.business.location.areaServed.map((area) => ({
        "@type": "Place",
        name: area,
      })),
      address: {
        "@type": "PostalAddress",
        addressRegion: config.business.location.state,
        addressCountry: config.business.location.country,
      },
      sameAs: config.business.sameAs,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: config.business.contact.email,
        availableLanguage: ["Portuguese"],
      },
      ...(servicesSection && servicesSection.blockType === "services"
        ? {
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: servicesSection.title,
              itemListElement: servicesSection.items.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.title,
                  description: service.description,
                },
              })),
            },
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: config.business.name,
      description: config.seo.defaultDescription,
      inLanguage: config.tenant.locale,
      publisher: {
        "@id": organizationId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: siteUrl,
        },
      ],
    },
  ];

  if (faqSection && faqSection.blockType === "faq" && faqSection.items.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqSection.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return schemas;
}

export function buildProjectJsonLd(
  config: TenantConfig,
  project: ProjectCase
): Record<string, unknown>[] {
  const siteUrl = config.seo.siteUrl.replace(/\/$/, "");
  const projectUrl = `${siteUrl}/projetos/${project.slug}`;
  const isSoftware =
    project.category.toLowerCase().includes("sistema") ||
    project.category.toLowerCase().includes("saas") ||
    project.category.toLowerCase().includes("plataforma");

  return [
    {
      "@context": "https://schema.org",
      "@type": isSoftware ? "SoftwareApplication" : "CreativeWork",
      name: project.title,
      url: projectUrl,
      description: `${project.objective} ${project.solution}`,
      applicationCategory: isSoftware ? project.category : undefined,
      operatingSystem: isSoftware ? "Web" : undefined,
      creator: {
        "@type": config.business.schemaType,
        name: config.business.name,
        url: siteUrl,
      },
      keywords: project.stack.join(", "),
      inLanguage: config.tenant.locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projetos",
          item: `${siteUrl}/#projetos`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
          item: projectUrl,
        },
      ],
    },
  ];
}
