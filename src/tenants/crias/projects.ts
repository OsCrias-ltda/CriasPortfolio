import type { ProjectCase } from "@/core/schema/tenant-config.schema";

/**
 * Cases estruturados a partir das frentes reais da Crias Ltda, mantidos em modo
 * placeholder (isPlaceholder: true / indexable: false) para validação visual.
 * Quando inserir os detalhes e prints reais, troque isPlaceholder para false e indexable para true.
 */
export const criasProjects: ProjectCase[] = [
  {
    slug: "sistema-gestao-lava-jato",
    title: "Sistema de Gestão Empresarial para Lava-Jato",
    objective:
      "Centralizar ordens de serviço, controle de pátio, caixa e histórico de veículos em uma plataforma web simples para a operação diária.",
    summary:
      "Plataforma web privada criada para organizar atendimentos, equipe e financeiro de um lava-jato em tempo real.",
    category: "Sistema Web",
    accessType: "private",
    segment: "Serviços automotivos",
    year: "[TODO_COPY: Ano]",
    problem:
      "[TODO_COPY] Descreva o gargalo real antes do sistema — por exemplo, controle em papel ou planilhas que gerava atraso no pátio, erros de fechamento de caixa e falta de histórico por cliente.",
    solution:
      "[TODO_COPY] Descreva como a Crias estruturou o fluxo web — abertura rápida de OS por placa, acompanhamento do status da lavagem e fechamento financeiro integrado.",
    deliverables: [
      "[TODO_COPY] Painel de ordens de serviço e fila de veículos",
      "[TODO_COPY] Controle de caixa, serviços executados e comissões",
      "[TODO_COPY] Cadastro de clientes e histórico por placa",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    coverImage: {
      alt: "Tela principal do Sistema de Gestão Empresarial para Lava-Jato",
      placeholderLabel:
        "Capa desktop do painel de gestão do lava-jato (fila de veículos e indicadores do dia)",
    },
    gallery: [
      {
        alt: "Fluxo de abertura de ordem de serviço no sistema de lava-jato",
        caption:
          "[TODO_COPY] Tela de abertura e acompanhamento de ordem de serviço em tempo real.",
        viewport: "desktop",
        placeholderLabel: "Print da tela de ordens de serviço e status de pátio",
      },
      {
        alt: "Fechamento financeiro e relatórios do sistema de lava-jato",
        caption:
          "[TODO_COPY] Visão de faturamento diário, serviços mais vendidos e controle financeiro.",
        viewport: "desktop",
        placeholderLabel: "Print da tela financeira / relatórios de caixa",
      },
      {
        alt: "Acompanhamento rápido pelo celular no pátio do lava-jato",
        caption:
          "[TODO_COPY] Interface adaptada para atualização de status direto no pátio pelo celular.",
        viewport: "mobile",
        placeholderLabel: "Print mobile da atualização de lavagem no pátio",
      },
    ],
    isPlaceholder: true,
    indexable: false,
  },
  {
    slug: "sistema-laudos-lavagem-caminhoes",
    title: "Sistema de Laudos para Lavagem de Caminhões",
    objective:
      "Padronizar vistorias, registro fotográfico e emissão de laudos técnicos de higienização para caminhões com rastreabilidade.",
    summary:
      "Sistema web privado para emissão rápida de laudos de lavagem de frotas e caminhões, com histórico organizado por veículo.",
    category: "Sistema Web",
    accessType: "private",
    segment: "Transporte e higienização de frotas",
    year: "[TODO_COPY: Ano]",
    problem:
      "[TODO_COPY] Descreva como os laudos eram emitidos antes — preenchimento manual lento, dificuldade para anexar evidências e retrabalho na consulta de certificados antigos.",
    solution:
      "[TODO_COPY] Descreva a plataforma desenvolvida pela Crias — checklist guiado, anexo de fotos, geração automática de laudo padronizado em PDF e consulta imediata por placa ou lote.",
    deliverables: [
      "[TODO_COPY] Formulário guiado de inspeção e lavagem de caminhões",
      "[TODO_COPY] Geração padronizada de laudo técnico com histórico",
      "[TODO_COPY] Consulta rápida por placa, transportadora e data",
    ],
    stack: ["React", "TypeScript", "Node.js", "Geração de PDF"],
    coverImage: {
      alt: "Tela principal do Sistema de Laudos para Lavagem de Caminhões",
      placeholderLabel:
        "Capa desktop do sistema de emissão e histórico de laudos para caminhões",
    },
    gallery: [
      {
        alt: "Checklist técnico e anexo de fotos no sistema de laudos",
        caption:
          "[TODO_COPY] Preenchimento do checklist de lavagem e registro de evidências do veículo.",
        viewport: "desktop",
        placeholderLabel: "Print do formulário de checklist e fotos",
      },
      {
        alt: "Visualização e exportação do laudo técnico emitido",
        caption:
          "[TODO_COPY] Modelo final do laudo pronto para impressão ou envio digital à transportadora.",
        viewport: "desktop",
        placeholderLabel: "Print da visualização/exportação do laudo",
      },
    ],
    isPlaceholder: true,
    indexable: false,
  },
  {
    slug: "plataforma-saas-agendamentos-gestao-equipe",
    title: "Plataforma SaaS de Agendamentos e Gestão de Equipe",
    objective:
      "Unificar agenda online, distribuição de serviços por profissional e acompanhamento da equipe em um produto SaaS multiempresa.",
    summary:
      "Frente SaaS da Crias voltada a negócios de serviço que precisam organizar agendamentos, agenda da equipe e operação em um só lugar.",
    category: "Plataforma SaaS",
    accessType: "in_development",
    segment: "Empresas de serviços e equipes em campo/balcão",
    year: "2026",
    problem:
      "[TODO_COPY] Descreva a dor atacada pelo SaaS — agendamentos espalhados em mensagens, conflitos de horário entre profissionais e falta de clareza sobre a carga da equipe.",
    solution:
      "[TODO_COPY] Descreva a arquitetura da plataforma SaaS — agenda centralizada por colaborador, catálogo de serviços com duração/regras e painel administrativo pensado para escalar para múltiplas empresas.",
    deliverables: [
      "[TODO_COPY] Agenda inteligente por profissional e tipo de serviço",
      "[TODO_COPY] Gestão de equipe, permissões e acompanhamento de atendimentos",
      "[TODO_COPY] Base multiempresa preparada para assinatura recorrente",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "SaaS"],
    coverImage: {
      alt: "Tela da Plataforma SaaS de Agendamentos e Gestão de Equipe",
      placeholderLabel:
        "Capa desktop do calendário de agendamentos e painel de gestão de equipe",
    },
    gallery: [
      {
        alt: "Grade de agendamentos por profissional na plataforma SaaS",
        caption:
          "[TODO_COPY] Visão diária e semanal de horários com distribuição por membro da equipe.",
        viewport: "desktop",
        placeholderLabel: "Print da agenda de equipe e serviços",
      },
      {
        alt: "Cadastro de serviços e controle de equipe",
        caption:
          "[TODO_COPY] Configuração de serviços, durações e acompanhamento dos atendimentos.",
        viewport: "desktop",
        placeholderLabel: "Print do painel de gestão de serviços e equipe",
      },
      {
        alt: "Visão mobile do agendamento na plataforma SaaS",
        caption:
          "[TODO_COPY] Experiência mobile limpa para consulta de horários da equipe em movimento.",
        viewport: "mobile",
        placeholderLabel: "Print mobile da agenda diária",
      },
    ],
    isPlaceholder: true,
    indexable: false,
  },
];
