# CLAUDE.md

@AGENTS.md

## Diretrizes Operacionais para Claude Code

### 1. Planejamento e Gates de Aprovação

- Em tarefas de **Bootstrap**, **Novo Tenant** ou mudanças arquiteturais no Core, use **Plan Mode** (ou apresente o plano estruturado antes de editar arquivos) e aguarde aprovação explícita do usuário em cada fase.
- Nunca interprete a aprovação de uma fase como autorização para executar a próxima.
- Em tarefas pontuais de **Manutenção/Evolução** (bugfix, ajuste visual, novo campo no schema), inspecione os arquivos relevantes primeiro e implemente diretamente sem disparar o discovery de 4 fases.

### 2. Exploração Antes de Editar

- Antes de criar ou alterar blocos, leia o schema de `TenantConfig`, o `SectionRegistry` e os tokens semânticos existentes para evitar duplicação ou quebra de tipagem.
- Verifique se o código pertence ao **Core (`src/core/`)** ou ao **Tenant (`src/tenants/<slug>/`)** antes de escrever. Na dúvida, questione o usuário antes de adicionar exceções ao Core.

### 3. Verificação Obrigatória

- Após qualquer implementação, execute os comandos de `typecheck`, `lint` e `build` definidos em `AGENTS.md` (Seção 7) antes de finalizar a resposta.
- Ao concluir a Fase 4 ou um Novo Tenant, apresente um **Relatório de QA objetivo** cobrindo explicitamente os 4 blocos do checklist (Conversão/Voz, SEO/AEO, 70/30 Multi-Tenant e Acessibilidade/Build), apontando falhas reais e próximos passos sem suavizar problemas.

### 4. Estilo de Resposta

- Comunique-se sempre em **PT-BR**, de forma direta, técnica e concisa.
- Quando houver pouca informação do usuário no briefing, não faça mais que **5 perguntas por turno**; proponha opções concretas e registre premissas de forma transparente.
