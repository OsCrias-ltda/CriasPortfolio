import { getEffectiveSiteUrl } from "@/core/lib/utils";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

export function buildLlmsTxt(config: TenantConfig): string {
  const siteUrl = getEffectiveSiteUrl(config.seo.siteUrl);
  const servicesSection = config.sections.find(
    (s) => s.blockType === "services" && s.enabled
  );
  const faqSection = config.sections.find(
    (s) => s.blockType === "faq" && s.enabled
  );
  const indexableProjects = config.projects.filter(
    (p) => !p.isPlaceholder && p.indexable
  );

  const lines: string[] = [
    `# ${config.business.name}`,
    "",
    `> ${config.business.proofStatement}`,
    "",
    "## Visão Geral",
    config.aeo.summaryForLlms,
    "",
    `- **Localização:** ${config.business.location.state}, ${config.business.location.country}`,
    `- **Área de atuação:** ${config.business.location.areaServed.join(", ")}`,
    `- **Site:** ${siteUrl}`,
    `- **E-mail:** ${config.business.contact.email}`,
  ];

  if (config.aeo.differentials.length > 0) {
    lines.push("", "## Diferenciais");
    for (const item of config.aeo.differentials) {
      lines.push(`- ${item}`);
    }
  }

  if (servicesSection && servicesSection.blockType === "services") {
    lines.push("", `## ${servicesSection.title}`);
    for (const service of servicesSection.items) {
      lines.push(`- **${service.title}:** ${service.description}`);
    }
  }

  if (indexableProjects.length > 0) {
    lines.push("", "## Estudos de Caso");
    for (const project of indexableProjects) {
      lines.push(
        `- [${project.title}](${siteUrl}/projetos/${project.slug}): ${project.objective}`
      );
    }
  }

  if (faqSection && faqSection.blockType === "faq") {
    lines.push("", "## Perguntas Frequentes");
    for (const item of faqSection.items) {
      lines.push(`- **${item.question}** ${item.answer}`);
    }
  }

  if (config.business.socialLinks.length > 0) {
    lines.push("", "## Links Oficiais");
    for (const link of config.business.socialLinks) {
      lines.push(`- ${link.label}: ${link.href}`);
    }
  }

  return `${lines.join("\n")}\n`;
}
