import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { TenantConfigSchema } from "@/core/schema/tenant-config.schema";
import {
  DESIGN_PRESETS,
  DESIGN_PRESET_LIST,
  applyDesignPreset,
  resolveSectionVariant,
} from "@/core/design/presets";
import { buildHomeJsonLd, buildProjectJsonLd } from "@/core/seo/json-ld";
import { buildLlmsTxt } from "@/core/seo/llms-builder";
import {
  buildWhatsAppUrl,
  escapeHtml,
  isPlaceholderValue,
} from "@/core/lib/utils";
import { criasConfig } from "@/tenants/crias/config";

const FORBIDDEN_CLICHES = [
  "soluções inovadoras",
  "tecnologia de ponta",
  "apaixonados por excelência",
  "transformando desafios em oportunidades",
  "transformando sonhos em realidade",
  "levar seu negócio ao próximo nível",
  "sob medida para o seu sucesso",
];

function collectFilesRecursively(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFilesRecursively(fullPath));
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

describe("Schema & TenantConfig", () => {
  it("valida criasConfig integralmente pelo TenantConfigSchema", () => {
    const parsed = TenantConfigSchema.parse(criasConfig);
    assert.equal(parsed.tenant.slug, "crias");
    assert.ok(parsed.sections.length > 0);
  });

  it("não contém clichês proibidos pela política editorial PT-BR", () => {
    const serialized = JSON.stringify(criasConfig).toLowerCase();
    for (const cliche of FORBIDDEN_CLICHES) {
      assert.equal(
        serialized.includes(cliche),
        false,
        `Clichê proibido encontrado no tenant crias: "${cliche}"`
      );
    }
  });
});

describe("Design Presets & Composição", () => {
  it("valida todos os presets registrados no Core via Zod", () => {
    assert.equal(DESIGN_PRESET_LIST.length, 6);

    for (const preset of DESIGN_PRESET_LIST) {
      const applied = applyDesignPreset(criasConfig, preset.key);
      const parsed = TenantConfigSchema.parse(applied);
      assert.equal(parsed.design.preset, preset.key);
      assert.equal(parsed.theme.colors.primary, preset.theme.colors.primary);
    }
  });

  it("reescreve âncoras internas (/#...) para manter o preset durante o preview", () => {
    const previewConfig = applyDesignPreset(criasConfig, "editorial");

    for (const item of previewConfig.navigation.items) {
      assert.ok(
        item.href.startsWith("/preview/editorial#"),
        `Link de navegação deveria apontar para /preview/editorial#, recebeu: ${item.href}`
      );
    }

    assert.equal(
      previewConfig.cta.secondary?.href,
      "/preview/editorial#contato"
    );
  });

  it("prioriza variant explícita da seção sobre o padrão do preset", () => {
    const resolvedDefault = resolveSectionVariant(
      "services",
      undefined,
      criasConfig
    );
    assert.equal(
      resolvedDefault,
      DESIGN_PRESETS[criasConfig.design.preset].sectionVariants.services
    );

    const resolvedOverride = resolveSectionVariant(
      "services",
      "editorialList",
      criasConfig
    );
    assert.equal(resolvedOverride, "editorialList");
  });
});

describe("SEO & AEO (JSON-LD e llms.txt)", () => {
  it("gera JSON-LD válido para home e páginas de projeto", () => {
    const homeSchemas = buildHomeJsonLd(criasConfig);
    assert.ok(homeSchemas.length >= 3);
    assert.equal(homeSchemas[0]?.["@context"], "https://schema.org");

    const firstProject = criasConfig.projects[0];
    assert.ok(firstProject);
    const projectSchemas = buildProjectJsonLd(criasConfig, firstProject);
    assert.equal(projectSchemas.length, 2);
    assert.equal(projectSchemas[1]?.["@type"], "BreadcrumbList");
  });

  it("exclui projetos em placeholder do /llms.txt", () => {
    const llms = buildLlmsTxt(criasConfig);
    assert.ok(llms.includes(`# ${criasConfig.business.name}`));
    assert.equal(
      llms.includes("## Estudos de Caso"),
      false,
      "Cases marcados como placeholder não devem aparecer em /llms.txt"
    );
  });
});

describe("Utilitários & Isolamento 70/30", () => {
  it("protege WhatsApp contra valores placeholder e sanitiza HTML", () => {
    assert.equal(isPlaceholderValue("[TODO_COPY: +5562999999999]"), true);
    assert.equal(
      buildWhatsAppUrl("[TODO_COPY: +5562999999999]", "Olá"),
      null
    );
    assert.equal(
      buildWhatsAppUrl("+55 (62) 99999-9999", "Olá"),
      "https://wa.me/5562999999999?text=Ol%C3%A1"
    );
    assert.equal(
      escapeHtml(`<script>alert("x")</script>`),
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;"
    );
  });

  it("garante que src/core não importa diretamente nenhum tenant específico", () => {
    const coreFiles = collectFilesRecursively(path.join(process.cwd(), "src/core"));
    for (const file of coreFiles) {
      const content = fs.readFileSync(file, "utf8");
      assert.equal(
        /@\/tenants\/[a-z0-9-]+/i.test(content),
        false,
        `Violação 70/30: ${path.relative(process.cwd(), file)} importa tenant específico diretamente.`
      );
    }
  });
});
