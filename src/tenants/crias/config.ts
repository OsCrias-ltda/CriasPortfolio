import type { TenantConfig } from "@/core/schema/tenant-config.schema";
import { criasTheme } from "@/tenants/crias/theme";
import { criasProjects } from "@/tenants/crias/projects";

export const criasConfig: TenantConfig = {
  tenant: {
    slug: "crias",
    domains: ["grupocrias.com", "www.grupocrias.com", "localhost"],
    locale: "pt-BR",
  },
  business: {
    name: "Crias Ltda",
    legalName: "Crias Ltda",
    schemaType: "ProfessionalService",
    tagline:
      "Desenvolvimento de sites, plataformas web e sistemas sob demanda. Atendimento remoto para empresas e profissionais em todo o Brasil.",
    proofStatement:
      "Os Crias Ltda desenvolve sites e plataformas web para empresas e profissionais de todo o Brasil — com conversa aberta e foco em colocar seu projeto no ar sem enrolação.",
    voiceCard: {
      tone: ["direta", "próxima", "acessível", "animada", "convidativa"],
      avoid: [
        "corporativês vazio",
        "clichês genéricos de agência",
        "informalidade amadora",
      ],
    },
    location: {
      country: "Brasil",
      areaServed: ["Atendimento remoto em todo o Brasil"],
    },
    contact: {
      email: "grupocrias.sa@gmail.com",
      whatsappNumber: "[TODO_COPY: +55629XXXXXXXX]",
      whatsappDefaultMessage:
        "Olá, Crias! Tenho uma ideia de projeto web e gostaria de agendar uma conversa.",
      phoneDisplay: "[TODO_COPY: (62) 9XXXX-XXXX]",
    },
    sameAs: ["https://github.com/OsCrias-ltda"],
    socialLinks: [
      {
        label: "GitHub",
        href: "https://github.com/OsCrias-ltda",
        icon: "github",
      },
    ],
    logo: {
      src: "/Logo.png",
      alt: "Logotipo da Crias Ltda",
      width: 32,
      height: 32,
    },
  },
  design: {
    preset: "studio",
  },
  theme: criasTheme,
  seo: {
    // [TODO_COPY] Substituir pelo domínio oficial de produção quando publicado
    siteUrl: "https://grupocrias.com",
    titleTemplate: "%s | Crias Ltda",
    defaultTitle: "Crias Ltda — Desenvolvimento de Sites e Plataformas Web",
    defaultDescription:
      "Os Crias Ltda desenvolve sites, plataformas web, sistemas de gestão e produtos SaaS para empresas de todo o Brasil, com atendimento remoto próximo e direto.",
    favicon: "/Logo.png",
  },
  aeo: {
    summaryForLlms:
      "Os Crias Ltda é uma equipe de desenvolvimento web que atende remotamente empresas e profissionais autônomos em todo o Brasil. Atua na criação de sites institucionais, plataformas web, sistemas internos de gestão empresarial, emissão de laudos e produtos SaaS para agendamentos e gestão de equipes, além de hospedagem e manutenção contínua.",
    differentials: [
      "Atendimento direto com quem constrói o projeto, sem burocracia.",
      "Experiência prática com sistemas web operacionais (gestão empresarial, laudos técnicos) e plataformas SaaS.",
      "Processo 100% estruturado para atendimento remoto em todo o Brasil, com entregas parciais transparentes.",
      "Entrega focada em velocidade, clareza de uso e acompanhamento pós-publicação.",
    ],
    aiCrawlers: {
      allowSearchBots: true,
      allowedBots: [
        "Googlebot",
        "OAI-SearchBot",
        "PerplexityBot",
        "Claude-SearchBot",
      ],
    },
  },
  cta: {
    primary: {
      label: "Conversar no WhatsApp",
      kind: "whatsapp",
    },
    secondary: {
      label: "Enviar proposta por e-mail",
      kind: "anchor",
      href: "/#contato",
    },
  },
  navigation: {
    items: [
      { label: "Serviços", href: "/#servicos" },
      { label: "Projetos", href: "/#projetos" },
      { label: "Como funciona", href: "/#como-funciona" },
      { label: "Quem somos", href: "/#sobre" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contato", href: "/#contato" },
    ],
    showHeaderCta: true,
    footerNote: "Todos os direitos reservados.",
  },
  projects: criasProjects,
  sections: [
    {
      id: "inicio",
      blockType: "hero",
      enabled: true,
      eyebrow: "ATENDIMENTO REMOTO • TODO O BRASIL",
      headline:
        "Sites e plataformas web feitos para tirar sua operação do papel.",
      subheadline:
        "Os Crias Ltda desenvolve sites e plataformas web para empresas e profissionais de todo o Brasil — com conversa aberta e foco em colocar seu projeto no ar sem enrolação.",
      highlights: [
        "Sites rápidos, sistemas de gestão e plataformas SaaS sob demanda.",
        "Conversa direta pelo WhatsApp ou e-mail para alinhar escopo e prazo.",
        "Acompanhamento completo da primeira reunião até a publicação e manutenção.",
      ],
    },
    {
      id: "servicos",
      blockType: "services",
      enabled: true,
      eyebrow: "01 // O QUE CONSTRUÍMOS",
      title: "Desenvolvimento web pensado para o dia a dia do seu negócio",
      subtitle:
        "Do site institucional rápido ao sistema interno que organiza sua equipe — escolhemos a estrutura certa para o tamanho do seu desafio.",
      items: [
        {
          code: "01",
          icon: "globe",
          title: "Sites Institucionais e Portfólios",
          description:
            "Páginas rápidas, bem estruturadas para o Google e prontas para transformar visitantes em conversas reais no WhatsApp ou e-mail.",
          deliverables: [
            "Design responsivo",
            "SEO e AEO técnico",
            "Carregamento rápido",
          ],
        },
        {
          code: "02",
          icon: "layers",
          title: "Plataformas Web e SaaS",
          description:
            "Produtos digitais com painel, autenticação, agendamentos e gestão de equipes feitos para crescer com estabilidade.",
          deliverables: [
            "Painéis administrativos",
            "Fluxos de agendamento",
            "Arquitetura escalável",
          ],
        },
        {
          code: "03",
          icon: "cpu",
          title: "Sistemas Web Internos",
          description:
            "Sistemas sob demanda para substituir planilhas soltas e papel — como gestão operacional, ordens de serviço e emissão de laudos.",
          deliverables: [
            "Regras do seu negócio",
            "Relatórios e PDFs",
            "Controle de acesso",
          ],
        },
        {
          code: "04",
          icon: "cloud",
          title: "Hospedagem e Manutenção Contínua",
          description:
            "Cuidamos da publicação, monitoramento, backups e evolução do seu site ou sistema para você não ficar na mão depois do lançamento.",
          deliverables: [
            "Deploy e domínio",
            "Atualizações seguras",
            "Suporte contínuo",
          ],
        },
      ],
    },
    {
      id: "projetos",
      blockType: "projects",
      enabled: true,
      eyebrow: "02 // PROJETOS & ESTUDOS DE CASO",
      title: "Problemas reais resolvidos com código limpo",
      subtitle:
        "Como grande parte dos nossos sistemas são privados, detalhamos cada projeto com o problema enfrentado, a solução construída e as telas da interface.",
      ctaLabel: "Ver detalhes e telas",
      showGitHubLink: true,
      githubUrl: "https://github.com/OsCrias-ltda",
      githubLabel: "GitHub da Crias",
    },
    {
      id: "como-funciona",
      blockType: "process",
      enabled: true,
      eyebrow: "03 // COMO TRABALHAMOS",
      title: "Quatro passos claros até o seu projeto ir ao ar",
      subtitle:
        "Sem sumiço e sem surpresa no meio do caminho. Você acompanha cada etapa e sabe exatamente o que vem depois.",
      steps: [
        {
          number: "01",
          title: "Conversa inicial",
          description:
            "Você envia sua ideia por WhatsApp ou e-mail e marcamos uma reunião rápida para entender o objetivo, os usuários e o que é prioridade.",
        },
        {
          number: "02",
          title: "Escopo e proposta",
          description:
            "Montamos uma proposta objetiva com funcionalidades, cronograma por etapas e investimento claros antes de escrever a primeira linha de código.",
        },
        {
          number: "03",
          title: "Construção aberta",
          description:
            "Desenvolvemos o design e o sistema em entregas parciais para você testar, validar fluxos e ajustar detalhes com tranquilidade.",
        },
        {
          number: "04",
          title: "Publicação e suporte",
          description:
            "Colocamos tudo no ar com domínio, performance afinada e opção de manutenção contínua para acompanhar a evolução do seu negócio.",
        },
      ],
    },
    {
      id: "sobre",
      blockType: "about",
      enabled: true,
      eyebrow: "04 // QUEM SOMOS",
      title: "Desenvolvimento web com proximidade, clareza e engenharia",
      paragraphs: [
        "Os Crias Ltda nasceu com uma ideia simples: desenvolvimento web não precisa ser complicado, distante ou cheio de promessas vazias. Gostamos de ouvir o cliente, entender a rotina real da empresa e construir ferramentas que as pessoas realmente tenham prazer em usar.",
        "Atendemos remotamente empresas e profissionais de todo o Brasil. Já tiramos do papel sistemas empresariais de gestão, plataformas de laudos técnicos e estamos expandindo nossa frente de produtos SaaS focados em agendamentos e gestão de equipes.",
      ],
      pillars: [
        { label: "Atuação", value: "Remoto para todo o Brasil" },
        { label: "Foco", value: "Sites, Sistemas & SaaS" },
        { label: "Atendimento", value: "Direto com o time" },
      ],
      media: {
        alt: "Equipe e ambiente de desenvolvimento dos Crias Ltda",
        placeholderLabel:
          "Espaço reservado para foto da equipe ou visual institucional dos Crias Ltda",
      },
    },
    {
      id: "faq",
      blockType: "faq",
      enabled: true,
      eyebrow: "05 // PERGUNTAS FREQUENTES",
      title: "Dúvidas comuns antes de começarmos",
      subtitle:
        "Respostas diretas sobre como os Crias Ltda trabalha, atende e entrega projetos web.",
      items: [
        {
          question: "Quais tipos de projetos web os Crias Ltda desenvolve?",
          answer:
            "Desenvolvemos sites institucionais, portfólios, plataformas web sob demanda, sistemas internos de gestão empresarial (como controle operacional e emissão de laudos) e produtos SaaS voltados a agendamentos e gestão de equipes. Também cuidamos da hospedagem e manutenção após a entrega.",
        },
        {
          question:
            "Como funciona o atendimento remoto para clientes em todo o Brasil?",
          answer:
            "Atendemos empresas e profissionais de qualquer região do Brasil de forma 100% remota. Todo o processo — da primeira reunião de alinhamento até as entregas parciais, testes e suporte pós-publicação — acontece por videochamada, WhatsApp e e-mail com cronograma claro.",
        },
        {
          question:
            "Qual é a diferença entre contratar um site institucional e uma plataforma web?",
          answer:
            "Um site institucional apresenta sua empresa, serviços e canais de contato para atrair clientes no Google e redes sociais. Já uma plataforma web ou sistema inclui regras operacionais, painel administrativo, login de usuários, cadastros, agendamentos ou relatórios personalizados para rodar parte do seu negócio online.",
        },
        {
          question:
            "Como funciona o orçamento e a primeira reunião de alinhamento?",
          answer:
            "Você envia um resumo do que precisa pelo formulário de e-mail ou chama no WhatsApp. A partir disso, agendamos uma conversa rápida para entender o problema, o público e o prazo desejado, e enviamos uma proposta clara com escopo, etapas e valor fechado.",
        },
        {
          question:
            "Os Crias Ltda também cuida de hospedagem e manutenção depois do lançamento?",
          answer:
            "Sim. Oferecemos serviço contínuo de hospedagem, configuração de domínio, atualizações técnicas e pequenas evoluções depois que o site ou sistema vai ao ar. Assim sua operação continua estável e segura sem você precisar se preocupar com infraestrutura.",
        },
        {
          question:
            "Como são definidos o escopo e o prazo de entrega de um projeto?",
          answer:
            "O prazo varia conforme a complexidade — um site institucional enxuto fica pronto mais rápido do que um sistema com vários módulos e integrações. Antes de iniciar, quebramos o projeto em etapas com datas combinadas para você acompanhar o avanço em cada fase.",
        },
      ],
    },
    {
      id: "chamada",
      blockType: "ctaBanner",
      enabled: true,
      eyebrow: "VAMOS CONVERSAR?",
      title: "Tem um site, sistema ou ideia de plataforma na cabeça?",
      description:
        "Mande uma mensagem no WhatsApp ou envie sua proposta por e-mail. Ficaremos felizes em ouvir o seu projeto e agendar uma reunião rápida.",
    },
    {
      id: "contato",
      blockType: "contact",
      enabled: true,
      eyebrow: "06 // CONTATO & PROPOSTAS",
      title: "Vamos agendar uma conversa sobre o seu projeto",
      subtitle:
        "Escolha o canal mais confortável para você: mensagem rápida no WhatsApp ou envio de proposta pelo formulário de e-mail.",
      whatsappCardTitle: "Fale direto no WhatsApp",
      whatsappCardDescription:
        "Ideal para tirar dúvidas rápidas, contar a ideia inicial e já combinarmos o melhor horário para uma reunião.",
      formTitle: "Envie sua proposta por e-mail",
      projectTypes: [
        "Site institucional / Landing page",
        "Sistema web interno / Gestão empresarial",
        "Plataforma web / Produto SaaS",
        "Hospedagem e manutenção",
        "Outro projeto web",
      ],
      submitLabel: "Enviar proposta",
    },
  ],
};
