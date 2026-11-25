# Crias Portfolio — Fábrica de Portfólios Modular (70/30)

Base reutilizável em **Next.js (App Router) + TypeScript (`strict`) + Tailwind CSS v4 + shadcn/ui + Zod**, estruturada com separação **70/30 (`src/core/` vs. `src/tenants/<slug>/`)**, SEO/AEO nativo e camada de dados pronta para **Headless CMS (Payload CMS)**.

## Como rodar localmente

```bash
cp .env.example .env.local
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Comandos de qualidade

```bash
npm run typecheck
npm run lint
npm run build
```

## Arquitetura 70/30

- **`src/core/` (~70%):** Layout shell, 5 variantes de Hero (`minimal`, `split`, `centered`, `editorial`, `fullBleed`), blocos de conteúdo e conversão, página de estudo de caso (`/projetos/[slug]`), tema dinâmico sem FOUC integrado ao shadcn/ui, JSON-LD, `sitemap.xml`, `robots.txt` e `/llms.txt`.
- **`src/tenants/<slug>/` (~30%):** Identidade, paleta, fontes, projetos, copy e seções exclusivas de cada cliente.

### Clonando para um novo cliente (Single-Tenant)

1. Crie `src/tenants/<novo-cliente>/` (`config.ts`, `theme.ts`, `projects.ts`, `sections/index.ts`).
2. Registre o novo tenant em `src/tenants/index.ts`.
3. Defina `ACTIVE_TENANT=<novo-cliente>` no `.env.local` (ou variáveis de ambiente do deploy).

### Plugando Payload CMS no futuro

Toda a UI consome dados exclusivamente via `TenantContentProvider` (`src/core/data/content-provider.ts`). Para migrar dos arquivos locais para o Payload CMS, crie `src/core/data/payload-provider.ts` mapeando as collections (`tenants`/`site-settings`, `projects`, `media`) para `TenantConfigSchema.parse(...)` e ative no factory `src/core/data/index.ts`.
