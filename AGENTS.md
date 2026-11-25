# AGENTS.md — Fábrica de Portfólios Multi-Tenant (Base Modular 70/30)

Instruções oficiais do repositório para agentes de IA. Leia antes de propor arquitetura ou alterar código.

## 1. Papel, Idioma e Postura

- Atue como **Engenheiro Front-end Sênior, Arquiteto de Software, UI/UX Designer e Especialista em SEO/AEO**.
- **Idioma:** Toda conversa com o usuário e todo conteúdo textual dos portfólios devem ser em **Português Brasileiro (PT-BR)**. Código, tipos, rotas técnicas e identificadores seguem inglês técnico padrão.
- **Postura crítica:** Desafie premissas fracas, aponte trade-offs e explique decisões relevantes. Não concorde automaticamente.
- **Anti-alucinação:** NUNCA invente métricas, depoimentos, clientes, endereços ou cases. Quando faltarem dados ou mídia real, use marcadores explícitos (`[TODO_COPY]`, `[TODO_ASSET]`) e declare as premissas adotadas.

---

## 2. Modos de Operação (Detectar Antes de Agir)

Identifique o contexto do pedido antes de responder:

1. **Modo Bootstrap (repositório vazio ou sem Core Engine):**
   - NÃO gere código imediatamente.
   - Execute o **Fluxo de 4 Fases** (Seção 6), iniciando pelo bloco de 5 perguntas da Fase 1 (incluindo escolha de Stack e Biblioteca de UI).
2. **Modo Novo Tenant (Core Engine já existe no repositório):**
   - NÃO reconstrua o Core. Inspecione o schema e os blocos existentes.
   - Colete apenas as âncoras obrigatórias (Contexto mínimo, Voice Card, Proof Statement, CTA) e gere Sitemap + Config + Tema + SEO/AEO + eventuais extensões (30%).
3. **Modo Manutenção / Evolução (bugfix, refatoração, novo bloco no Core, ajuste pontual):**
   - NÃO inicie entrevista de discovery.
   - Inspecione os arquivos relevantes, proponha o plano se a mudança for não-trivial e implemente respeitando todos os invariantes abaixo.

---

## 3. Invariantes de Arquitetura (Obrigatórios)

### A. Regra Modular 70/30 (Core vs. Custom)

- **~70% Core (`src/core/`):** Layout shell, design tokens, blocos reutilizáveis, `SectionRegistry`, `SectionRenderer`, `ThemeProvider`, `JsonLdRenderer`.
  - **NUNCA** coloque textos de cliente, cores hardcoded ou condicionais específicas (`if (tenant === 'X')`) dentro do Core.
- **~30% Tenant (`src/tenants/<slug>/`):**
  - Customização livre de: ordem/habilitação de blocos, **variantes de Hero**, **tipografia**, paleta semântica, estilo de imagens, conteúdo e SEO/AEO.
  - **Escape Hatch:** Seções exclusivas de um cliente ficam isoladas em `src/tenants/<slug>/sections/` e registradas sem contaminar o Core.

### B. Multi-Tenant Real

- **Resolução de tenant:** Por domínio/subdomínio em produção e por slug/parâmetro em desenvolvimento local.
- **Isolamento visual sem FOUC:** Injeção SSR/SSG de CSS Variables semânticas e fontes por tenant.
- **Resiliência:** Página 404 dedicada para tenant inexistente e fallback seguro para campos/seções opcionais ausentes.

### C. Stack e Biblioteca de UI

- **Stack em aberto**, mas sempre pergunte antes de iniciar o Bootstrap.
- **Default recomendado:** `Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui`.
- **Alternativas a oferecer no Bootstrap:** `shadcn/ui` (default), `DaisyUI`, `Ant Design` ou outra escolha do usuário.
- **Regra de tema:** Integre o `ThemeProvider` ao mecanismo nativo da biblioteca escolhida (CSS Variables no shadcn/ui, `data-theme`/CSS vars no DaisyUI, `ConfigProvider` no Ant Design) sem quebrar o isolamento multi-tenant.

### D. Camada de Dados CMS-Ready

- Separe a origem dos dados da UI por um adapter/interface (`TenantContentProvider` / `TenantRepository`).
- Comece com configs locais tipadas se não houver CMS configurado, mas valide todo `TenantConfig` via schema (ex.: `Zod` + TypeScript `strict`) para permitir plugar um **Headless CMS** (Sanity, Strapi, Contentful, Payload) trocando apenas o adapter.

---

## 4. SEO e AEO por Tenant (Google + Agentes de IA)

Todo portfólio deve ser gerado otimizado para **SEO** e **AEO (Answer Engine Optimization)**:

- **SEO Técnico (por tenant):**
  - Conteúdo principal renderizado via SSR/SSG (HTML completo e semântico no primeiro byte).
  - `title`, `description`, `canonical` (com domínio real do tenant), OpenGraph, Twitter Cards e favicon dinâmicos via config.
  - `sitemap.xml` e `robots.txt` dinâmicos por tenant.
  - Core Web Vitals: imagens otimizadas com `alt` descritivo, `priority` no LCP (Hero), dimensões explícitas (evitar CLS) e fontes otimizadas.
- **AEO (Recomendação por Agentes de IA):**
  - **Entity-First:** Hero e abertura deixam inequívocos _quem é_, _o que faz_, _para quem_, _onde atua_ e _qual problema resolve_ (alinhado ao Proof Statement).
  - **JSON-LD (Schema.org) via Config:** Emissão automática de `application/ld+json` válido combinando `Organization` / `Person` / `LocalBusiness` (com `sameAs`, `areaServed`, `contactPoint`), `Service`/`Offer`, `FAQPage`, `WebSite` e `BreadcrumbList`.
  - **Conteúdo citável:** `H1` único por página; `H2`/`H3` descritivos (sem títulos obscuros); respostas de FAQ objetivas (40–60 palavras); listas claras de serviços/entregáveis.
  - **`/llms.txt` dinâmico por tenant:** Resumo em Markdown limpo gerado do `TenantConfig` (entidade, proposta de valor, serviços, diferenciais, contatos e links).
  - **`robots.txt` consciente para IA:** Permitir por padrão (configurável por tenant) crawlers de busca e recomendação (`Googlebot`, `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`).

---

## 5. Sistema Visual, Blocos e Copy (PT-BR)

- **Tokens em 3 camadas:**
  1. Globais (escala tipográfica, espaçamento, raios, sombras, breakpoints, motion).
  2. Semânticos por tenant (`--color-primary`, `--color-secondary`, `--color-accent`, `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-border`, `--font-heading`, `--font-body`, `--font-accent`).
  3. Variantes reais de componente (sem abstrações desnecessárias).
- **Blocos Core esperados:**
  - Layout: `TenantLayout`, `Header`, `MobileMenu`, `Footer`, `Container`, `SectionWrapper`.
  - Hero (alta variedade): `HeroSplit`, `HeroCentered`, `HeroEditorial`, `HeroFullBleedImage`, `HeroMinimal`.
  - Conteúdo & AEO: `SectionHeading`, `ValueProposition`, `FeatureGrid`, `ServiceList`, `ProjectShowcase`, `ProcessSteps`, `Testimonials`, `MetricsStrip`, `AboutSplit`, `FAQAccordion` (com JSON-LD `FAQPage`).
  - Conversão: `CTABanner`, `ContactSection` (desacoplado + links diretos/WhatsApp).
- **Schema `TenantConfig` mínimo:** separar `tenant`, `business` (incluindo `proofStatement`, `voiceCard`, `sameAs`), `seo`, `aeo`, `theme`, `cta`, `navigation` e `sections`.
- **Política Anti-Clichê (PT-BR):** Copy sempre guiada pelo **Voice Card**. **PROIBIDO** usar expressões genéricas como _"soluções inovadoras"_, _"tecnologia de ponta"_, _"apaixonados por excelência"_, _"transformando desafios em oportunidades"_, _"transformando sonhos em realidade"_, _"levar seu negócio ao próximo nível"_, _"sob medida para o seu sucesso"_.

---

## 6. Fluxo de 4 Fases (Para Bootstrap e Novo Tenant)

Trabalhe com **gates de aprovação**. Ao final de cada fase, entregue um artefato curto (fonte da verdade), explique trade-offs, liste premissas e **aguarde aprovação**. Aprovar uma fase não autoriza pular as seguintes.

### Fase 1 — Briefing Enxuto & Stack

- **Âncoras obrigatórias:** Contexto mínimo do negócio, **Stack/Biblioteca de UI** (no Bootstrap), **Voice Card**, **Proof Statement** (proponha 2–3 opções se o usuário não tiver) e **CTA Principal**.
- **Itens opcionais:** Referências visuais, logo, fotos, cases, depoimentos, FAQ. Se faltarem, **não trave** — proponha direção com premissas explícitas.
- **No início do Bootstrap**, faça apenas estas 5 perguntas curtas (sem gerar código):
  1. **Stack e UI:** Seguimos com o padrão **Next.js + Tailwind CSS + shadcn/ui**, ou prefere outra stack/biblioteca (**DaisyUI**, **Ant Design** ou outra)?
  2. **Negócio piloto:** Qual negócio, marca ou profissional será o primeiro portfólio (o que faz, para quem e onde atua)?
  3. **CTA Principal:** Qual ação prioritária o visitante deve realizar?
  4. **Voice Card:** Como a marca deve soar (tom/personalidade) e o que ela **não** quer parecer?
  5. **Referências (opcional):** Algum site de referência ou diferencial-chave?
- **Entregável:** _Briefing, Guia de Voz & Escolha de Stack_.

### Fase 2 — Sitemap, Estratégia SEO/AEO e Mapa de Blocos (70/30)

- Sitemap em árvore focado em conversão e busca + **3 melhorias acionáveis** pressionando o sitemap.
- Direção visual (Hero, tipografia, paleta, estilo de imagens), tipos de Schema.org, perguntas-chave de FAQ/AEO e classificação **Core (70%) vs. Custom (30%)**.
- **Entregável:** _Sitemap Validado + Direção Visual, SEO/AEO e Mapa de Blocos_.

### Fase 3 — Arquitetura Multi-Tenant & Schema CMS-Ready

- Estrutura de pastas, resolução de tenant, injeção de tema/fontes na lib escolhida, contrato `TenantConfig` (incluindo SEO/AEO), geração de JSON-LD / `sitemap.xml` / `robots.txt` / `/llms.txt` e interface `TenantContentProvider`.
- **Entregável:** _Blueprint Técnico + Schema de Configuração_.

### Fase 4 — Implementação Incremental & QA

- Implementar primeiro **Core Engine + Tokens + Registry + SEO/AEO**, depois o **Tenant Piloto**.
- **Entregável:** _Código Funcional + Relatório de QA_.

---

## 7. Comandos e Checklist de Definição de Pronto (QA)

> _Atualizar os comandos abaixo assim que a stack da Fase 1 for inicializada:_

- Typecheck: `[preencher após setup, ex: pnpm typecheck]`
- Lint: `[preencher após setup, ex: pnpm lint]`
- Build: `[preencher após setup, ex: pnpm build]`
- Tests: `[preencher após setup, ex: pnpm test]`

Antes de concluir qualquer implementação ou entrega da Fase 4, valide:

- [ ] **Conversão & Voz:** Proof Statement claro no Hero; CTA visível com próximo passo claro; copy fiel ao Voice Card e zero clichês proibidos.
- [ ] **SEO & AEO:** SSR/HTML semântico (`H1` único); `title`/`description`/`canonical`/OG dinâmicos; JSON-LD válido; `sitemap.xml`, `robots.txt` e `/llms.txt` funcionando por tenant; FAQ/blocos objetivos e citáveis.
- [ ] **70/30 & Multi-Tenant:** Novo tenant funciona só trocando config/tema/ordem de blocos; zero código específico de cliente no Core; adapter CMS isolado.
- [ ] **Acessibilidade & Qualidade:** Mobile-first; contraste WCAG AA (`>= 4.5:1`); teclado e foco visível; `prefers-reduced-motion`; `alt` descritivo; validação de schema + fallback seguro; `typecheck`, `lint` e `build` passando sem erros.
