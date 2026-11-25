import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Lock,
} from "lucide-react";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card";
import { MediaFrame } from "@/core/ui/media-frame";
import { Separator } from "@/core/ui/separator";
import { Container } from "@/core/sections/layout/container";
import { HeroActions } from "@/core/sections/hero/hero-actions";
import type {
  ProjectCase,
  TenantConfig,
} from "@/core/schema/tenant-config.schema";

interface ProjectDetailPageProps {
  config: TenantConfig;
  project: ProjectCase;
  nextProject?: ProjectCase | null;
}

const ACCESS_LABEL: Record<ProjectCase["accessType"], string> = {
  private: "Sistema privado (acesso restrito ao cliente)",
  in_development: "Produto em desenvolvimento",
  public: "Acesso público online",
};

export function ProjectDetailPage({
  config,
  project,
  nextProject,
}: ProjectDetailPageProps) {
  const desktopGallery = project.gallery.filter(
    (item) => item.viewport === "desktop"
  );
  const mobileGallery = project.gallery.filter(
    (item) => item.viewport === "mobile"
  );

  return (
    <article className="pb-20">
      {/* Cabeçalho do estudo de caso */}
      <header className="border-b border-border/80 bg-tenant-grid py-12 sm:py-16">
        <Container className="space-y-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground">
              Início
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/#projetos" className="hover:text-foreground">
              Projetos
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{project.title}</span>
          </nav>

          {project.isPlaceholder && (
            <div className="rounded-md border border-primary/40 bg-primary/10 px-4 py-3 text-xs text-foreground">
              <span className="font-accent text-primary mr-2">PREVIEW</span>
              Este estudo de caso está em modo placeholder (<code>noindex</code>{" "}
              ativo automaticamente para mecanismos de busca até a substituição
              por conteúdo e telas reais).
            </div>
          )}

          <div className="max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent">{project.category}</Badge>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                {project.accessType === "private" && (
                  <Lock className="h-3.5 w-3.5 text-primary" />
                )}
                {ACCESS_LABEL[project.accessType]}
              </span>
            </div>

            <h1 className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>

            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {project.objective}
            </p>

            {(project.liveUrl || project.repoUrl) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {project.liveUrl && (
                  <Button asChild size="sm">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Acessar projeto
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver código
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Metadados objetivos */}
          <dl className="grid gap-4 border-t border-border/80 pt-6 sm:grid-cols-4">
            <div>
              <dt className="font-accent text-[10px] tracking-wider text-primary uppercase">
                Segmento
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {project.segment}
              </dd>
            </div>
            <div>
              <dt className="font-accent text-[10px] tracking-wider text-primary uppercase">
                Categoria
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {project.category}
              </dd>
            </div>
            {project.clientName && (
              <div>
                <dt className="font-accent text-[10px] tracking-wider text-primary uppercase">
                  Cliente
                </dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {project.clientName}
                </dd>
              </div>
            )}
            {project.year && (
              <div>
                <dt className="font-accent text-[10px] tracking-wider text-primary uppercase">
                  Ano
                </dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {project.year}
                </dd>
              </div>
            )}
          </dl>

          <MediaFrame asset={project.coverImage} aspect="16/9" priority />
        </Container>
      </header>

      {/* Narrativa Problema -> Solução -> Entregáveis & Stack */}
      <section className="py-16 sm:py-20">
        <Container className="space-y-12">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <p className="font-accent text-[11px] tracking-wider text-primary uppercase">
                  01 // O problema
                </p>
                <CardTitle>O que travava a operação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {project.problem}
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/40">
              <CardHeader>
                <p className="font-accent text-[11px] tracking-wider text-primary uppercase">
                  02 // A solução
                </p>
                <CardTitle>Como construímos a resposta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {project.solution}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-7">
              <CardHeader>
                <p className="font-accent text-[11px] tracking-wider text-primary uppercase">
                  03 // Entregáveis
                </p>
                <CardTitle>Principais funcionalidades e entregas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="lg:col-span-5">
              <CardHeader>
                <p className="font-accent text-[11px] tracking-wider text-primary uppercase">
                  04 // Stack
                </p>
                <CardTitle>Tecnologias aplicadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="py-1.5 px-3">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {project.metrics && project.metrics.length > 0 && (
                  <div className="border-t border-border pt-5">
                    <p className="mb-3 font-accent text-[10px] tracking-wider text-primary uppercase">
                      Resultados registrados
                    </p>
                    <dl className="grid grid-cols-2 gap-4">
                      {project.metrics.map((metric) => (
                        <div key={metric.label}>
                          <dt className="font-heading text-xl font-bold text-primary">
                            {metric.value}
                          </dt>
                          <dd className="text-xs text-muted-foreground">
                            {metric.label}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Galeria da Interface */}
      {project.gallery.length > 0 && (
        <section className="border-t border-border/70 bg-surface/40 py-16 sm:py-20">
          <Container className="space-y-10">
            <div className="max-w-2xl space-y-2">
              <p className="font-accent text-xs tracking-wider text-primary uppercase">
                05 // Interface do sistema
              </p>
              <h2 className="font-heading text-3xl font-semibold text-foreground">
                Telas e fluxos principais
              </h2>
              <p className="text-base text-muted-foreground">
                Visão geral da interface construída para simplificar a rotina da
                operação.
              </p>
            </div>

            {desktopGallery.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {desktopGallery.map((screen, idx) => (
                  <figure
                    key={`${screen.alt}-${idx}`}
                    className="space-y-3 rounded-lg border border-border bg-card p-4"
                  >
                    <MediaFrame asset={screen} aspect="16/10" />
                    <figcaption className="text-sm leading-relaxed text-muted-foreground px-1">
                      {screen.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            {mobileGallery.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mobileGallery.map((screen, idx) => (
                  <figure
                    key={`${screen.alt}-${idx}`}
                    className="space-y-3 rounded-lg border border-border bg-card p-4"
                  >
                    <MediaFrame asset={screen} aspect="mobile" />
                    <figcaption className="text-center text-sm leading-relaxed text-muted-foreground">
                      {screen.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Depoimento opcional */}
      {project.testimonial && (
        <section className="py-12">
          <Container size="narrow">
            <Card className="p-8 text-center">
              <blockquote className="font-heading text-xl leading-relaxed text-foreground">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-primary">
                {project.testimonial.author}
                {project.testimonial.role ? ` — ${project.testimonial.role}` : ""}
              </p>
            </Card>
          </Container>
        </section>
      )}

      {/* Navegação entre projetos + CTA contextual */}
      <Container className="mt-12 space-y-10">
        <div className="bg-tenant-grid rounded-lg border border-primary/35 bg-card p-8 sm:p-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl space-y-2">
              <p className="font-accent text-xs tracking-wider text-primary uppercase">
                Próximo passo
              </p>
              <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Precisa de um sistema ou site nessa linha?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Conte o que sua operação precisa hoje. Conversamos por WhatsApp
                ou e-mail e agendamos uma reunião rápida para entender o
                projeto.
              </p>
            </div>
            <HeroActions
              primary={config.cta.primary}
              secondary={config.cta.secondary}
              business={config.business}
            />
          </div>
        </div>

        <Separator />

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Button asChild variant="outline">
            <Link href="/#projetos">
              <ArrowLeft className="h-4 w-4" />
              Voltar para todos os projetos
            </Link>
          </Button>

          {nextProject && (
            <Button asChild variant="secondary">
              <Link href={`/projetos/${nextProject.slug}`}>
                Próximo: {nextProject.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </Container>
    </article>
  );
}
