import { z } from "zod";

export const FontKeySchema = z.enum([
  "space-grotesk",
  "inter",
  "silkscreen",
  "pixelify-sans",
  "chakra-petch",
  "plus-jakarta-sans",
  "jetbrains-mono",
]);

export type FontKey = z.infer<typeof FontKeySchema>;

export const DesignPresetKeySchema = z.enum([
  "studio",
  "editorial",
  "saas",
  "changelog",
  "bold",
  "warm",
]);
export type DesignPresetKey = z.infer<typeof DesignPresetKeySchema>;

export const HeaderVariantSchema = z.enum(["floating", "editorial", "compact"]);
export type HeaderVariant = z.infer<typeof HeaderVariantSchema>;

export const FooterVariantSchema = z.enum(["standard", "editorial", "compact"]);
export type FooterVariant = z.infer<typeof FooterVariantSchema>;

export const HeroVariantSchema = z.enum([
  "studioSplit",
  "editorial",
  "saasCentered",
  "changelog",
  "boldImpact",
  "bento",
  "minimal",
  "split",
  "centered",
  "fullBleed",
]);
export type HeroVariant = z.infer<typeof HeroVariantSchema>;

export const ServicesVariantSchema = z.enum([
  "bento",
  "editorialList",
  "compactGrid",
  "changelogList",
  "cards",
]);
export type ServicesVariant = z.infer<typeof ServicesVariantSchema>;

export const ProjectsVariantSchema = z.enum([
  "featuredList",
  "asymmetric",
  "bentoShowcase",
  "changelogFeed",
  "grid",
]);
export type ProjectsVariant = z.infer<typeof ProjectsVariantSchema>;

export const ProcessVariantSchema = z.enum([
  "stickySplit",
  "timeline",
  "stepper",
  "cards",
]);
export type ProcessVariant = z.infer<typeof ProcessVariantSchema>;

export const AboutVariantSchema = z.enum(["studioCard", "editorial", "split"]);
export type AboutVariant = z.infer<typeof AboutVariantSchema>;

export const ContactVariantSchema = z.enum([
  "focusedForm",
  "minimalDirect",
  "splitCards",
]);
export type ContactVariant = z.infer<typeof ContactVariantSchema>;

export const CtaActionSchema = z.object({
  label: z.string().min(1),
  kind: z.enum(["whatsapp", "email", "anchor", "url"]),
  href: z.string().optional(),
  helperText: z.string().optional(),
});

export type CtaAction = z.infer<typeof CtaActionSchema>;

export const MediaAssetSchema = z.object({
  src: z.string().optional(),
  alt: z.string().min(1),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  placeholderLabel: z.string().optional(),
});

export type MediaAsset = z.infer<typeof MediaAssetSchema>;

export const ProjectGalleryItemSchema = MediaAssetSchema.extend({
  caption: z.string().min(1),
  viewport: z.enum(["desktop", "mobile"]).default("desktop"),
});

export type ProjectGalleryItem = z.infer<typeof ProjectGalleryItemSchema>;

export const ProjectCaseSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
  title: z.string().min(1),
  objective: z.string().min(1),
  summary: z.string().min(1),
  category: z.string().min(1),
  accessType: z.enum(["public", "private", "in_development"]).default("private"),
  segment: z.string().min(1),
  clientName: z.string().optional(),
  year: z.string().optional(),
  problem: z.string().min(1),
  solution: z.string().min(1),
  deliverables: z.array(z.string().min(1)).min(1),
  stack: z.array(z.string().min(1)).min(1),
  coverImage: MediaAssetSchema,
  gallery: z.array(ProjectGalleryItemSchema).default([]),
  metrics: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      })
    )
    .optional(),
  testimonial: z
    .object({
      quote: z.string().min(1),
      author: z.string().min(1),
      role: z.string().optional(),
    })
    .optional(),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  isPlaceholder: z.boolean().default(false),
  indexable: z.boolean().default(true),
});

export type ProjectCase = z.infer<typeof ProjectCaseSchema>;

export const HeroSectionSchema = z.object({
  id: z.string().default("inicio"),
  blockType: z.literal("hero"),
  enabled: z.boolean().default(true),
  variant: HeroVariantSchema.optional(),
  eyebrow: z.string().optional(),
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  highlights: z.array(z.string().min(1)).default([]),
  media: MediaAssetSchema.optional(),
  primaryCta: CtaActionSchema.optional(),
  secondaryCta: CtaActionSchema.optional(),
});

export const ServicesSectionSchema = z.object({
  id: z.string().default("servicos"),
  blockType: z.literal("services"),
  enabled: z.boolean().default(true),
  variant: ServicesVariantSchema.optional(),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  items: z
    .array(
      z.object({
        code: z.string().optional(),
        icon: z
          .enum([
            "globe",
            "layers",
            "cpu",
            "cloud",
            "calendar",
            "code",
            "smartphone",
            "shield",
          ])
          .default("globe"),
        title: z.string().min(1),
        description: z.string().min(1),
        deliverables: z.array(z.string().min(1)).default([]),
      })
    )
    .min(1),
});

export const ProjectsSectionSchema = z.object({
  id: z.string().default("projetos"),
  blockType: z.literal("projects"),
  enabled: z.boolean().default(true),
  variant: ProjectsVariantSchema.optional(),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  ctaLabel: z.string().default("Ver detalhes do projeto"),
  showGitHubLink: z.boolean().default(false),
  githubUrl: z.string().url().optional(),
  githubLabel: z.string().optional(),
});

export const ProcessSectionSchema = z.object({
  id: z.string().default("como-funciona"),
  blockType: z.literal("process"),
  enabled: z.boolean().default(true),
  variant: ProcessVariantSchema.optional(),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  steps: z
    .array(
      z.object({
        number: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
      })
    )
    .min(1),
});

export const AboutSectionSchema = z.object({
  id: z.string().default("sobre"),
  blockType: z.literal("about"),
  enabled: z.boolean().default(true),
  variant: AboutVariantSchema.optional(),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
  pillars: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      })
    )
    .default([]),
  media: MediaAssetSchema.optional(),
});

export const FaqSectionSchema = z.object({
  id: z.string().default("faq"),
  blockType: z.literal("faq"),
  enabled: z.boolean().default(true),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  items: z
    .array(
      z.object({
        question: z.string().min(1),
        answer: z.string().min(1),
      })
    )
    .min(1),
});

export const ValuePropositionSectionSchema = z.object({
  id: z.string().default("proposta"),
  blockType: z.literal("valueProposition"),
  enabled: z.boolean().default(true),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  points: z.array(z.string().min(1)).default([]),
});

export const FeatureGridSectionSchema = z.object({
  id: z.string().default("diferenciais"),
  blockType: z.literal("featureGrid"),
  enabled: z.boolean().default(true),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
      })
    )
    .min(1),
});

export const MetricsStripSectionSchema = z.object({
  id: z.string().default("metricas"),
  blockType: z.literal("metricsStrip"),
  enabled: z.boolean().default(true),
  items: z
    .array(
      z.object({
        value: z.string().min(1),
        label: z.string().min(1),
      })
    )
    .min(1),
});

export const TestimonialsSectionSchema = z.object({
  id: z.string().default("depoimentos"),
  blockType: z.literal("testimonials"),
  enabled: z.boolean().default(true),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  items: z
    .array(
      z.object({
        quote: z.string().min(1),
        author: z.string().min(1),
        role: z.string().optional(),
      })
    )
    .min(1),
});

export const CtaBannerSectionSchema = z.object({
  id: z.string().default("chamada"),
  blockType: z.literal("ctaBanner"),
  enabled: z.boolean().default(true),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  primaryCta: CtaActionSchema.optional(),
  secondaryCta: CtaActionSchema.optional(),
});

export const ContactSectionSchema = z.object({
  id: z.string().default("contato"),
  blockType: z.literal("contact"),
  enabled: z.boolean().default(true),
  variant: ContactVariantSchema.optional(),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  whatsappCardTitle: z.string().default("Prefere conversar direto?"),
  whatsappCardDescription: z.string().min(1),
  formTitle: z.string().default("Envie sua proposta por e-mail"),
  projectTypes: z.array(z.string().min(1)).default([]),
  submitLabel: z.string().default("Enviar proposta"),
});

export const CustomSectionSchema = z.object({
  id: z.string().min(1),
  blockType: z.literal("custom"),
  enabled: z.boolean().default(true),
  customKey: z.string().min(1),
  props: z.record(z.unknown()).default({}),
});

export const SectionConfigSchema = z.discriminatedUnion("blockType", [
  HeroSectionSchema,
  ServicesSectionSchema,
  ProjectsSectionSchema,
  ProcessSectionSchema,
  AboutSectionSchema,
  FaqSectionSchema,
  ValuePropositionSectionSchema,
  FeatureGridSectionSchema,
  MetricsStripSectionSchema,
  TestimonialsSectionSchema,
  CtaBannerSectionSchema,
  ContactSectionSchema,
  CustomSectionSchema,
]);

export type SectionConfig = z.infer<typeof SectionConfigSchema>;

export const TenantConfigSchema = z.object({
  tenant: z.object({
    slug: z
      .string()
      .min(2)
      .regex(/^[a-z0-9-]+$/),
    domains: z.array(z.string()).default([]),
    locale: z.string().default("pt-BR"),
  }),
  business: z.object({
    name: z.string().min(1),
    legalName: z.string().optional(),
    schemaType: z
      .enum(["Organization", "ProfessionalService", "LocalBusiness", "Person"])
      .default("ProfessionalService"),
    tagline: z.string().min(1),
    proofStatement: z.string().min(1),
    voiceCard: z.object({
      tone: z.array(z.string().min(1)).min(1),
      avoid: z.array(z.string().min(1)).min(1),
    }),
    location: z.object({
      city: z.string().optional(),
      state: z.string().min(1).optional(),
      country: z.string().default("Brasil"),
      areaServed: z.array(z.string().min(1)).min(1),
    }),
    contact: z.object({
      email: z.string().email(),
      whatsappNumber: z.string().optional(),
      whatsappDefaultMessage: z.string().min(1),
      phoneDisplay: z.string().optional(),
    }),
    sameAs: z.array(z.string().url()).default([]),
    socialLinks: z
      .array(
        z.object({
          label: z.string().min(1),
          href: z.string().url(),
          icon: z
            .enum(["github", "instagram", "linkedin", "x", "youtube", "globe"])
            .optional(),
        })
      )
      .default([]),
    logo: z
      .object({
        src: z.string().min(1),
        alt: z.string().min(1),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
      })
      .optional(),
  }),
  design: z
    .object({
      preset: DesignPresetKeySchema.default("studio"),
      headerVariant: HeaderVariantSchema.optional(),
      footerVariant: FooterVariantSchema.optional(),
    })
    .default({ preset: "studio" }),
  theme: z.object({
    colorScheme: z.enum(["dark", "light"]).default("dark"),
    colors: z.object({
      bg: z.string().min(4),
      surface: z.string().min(4),
      surfaceElevated: z.string().min(4),
      border: z.string().min(4),
      text: z.string().min(4),
      muted: z.string().min(4),
      primary: z.string().min(4),
      primaryForeground: z.string().min(4),
      secondary: z.string().min(4),
      secondaryForeground: z.string().min(4),
      accent: z.string().min(4),
    }),
    fonts: z.object({
      heading: FontKeySchema,
      body: FontKeySchema,
      accent: FontKeySchema,
    }),
    radius: z.enum(["none", "sm", "md", "lg"]).default("md"),
    surfaceStyle: z.enum(["minimal", "grid", "brutalist"]).default("grid"),
  }),
  seo: z.object({
    siteUrl: z.string().url(),
    titleTemplate: z.string().min(1),
    defaultTitle: z.string().min(1),
    defaultDescription: z.string().min(1),
    ogImage: z.string().optional(),
    favicon: z.string().default("/Logo.png"),
  }),
  aeo: z.object({
    summaryForLlms: z.string().min(1),
    differentials: z.array(z.string().min(1)).default([]),
    aiCrawlers: z
      .object({
        allowSearchBots: z.boolean().default(true),
        allowedBots: z
          .array(z.string().min(1))
          .default([
            "Googlebot",
            "OAI-SearchBot",
            "PerplexityBot",
            "Claude-SearchBot",
          ]),
      })
      .default({
        allowSearchBots: true,
        allowedBots: [
          "Googlebot",
          "OAI-SearchBot",
          "PerplexityBot",
          "Claude-SearchBot",
        ],
      }),
  }),
  cta: z.object({
    primary: CtaActionSchema,
    secondary: CtaActionSchema.optional(),
  }),
  navigation: z.object({
    items: z
      .array(
        z.object({
          label: z.string().min(1),
          href: z.string().min(1),
        })
      )
      .default([]),
    showHeaderCta: z.boolean().default(true),
    footerNote: z.string().min(1),
  }),
  projects: z.array(ProjectCaseSchema).default([]),
  sections: z.array(SectionConfigSchema).min(1),
});

export type TenantConfig = z.infer<typeof TenantConfigSchema>;
