import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveTenant, getContentProvider } from "@/core/data";
import { buildProjectMetadata } from "@/core/seo/metadata-builder";
import { buildProjectJsonLd } from "@/core/seo/json-ld";
import { JsonLdRenderer } from "@/core/seo/json-ld-renderer";
import { ProjectDetailPage } from "@/core/sections/project/project-detail-page";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const config = await getActiveTenant({ preferStatic: true });
  if (!config) return [];
  return config.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = await getActiveTenant();
  if (!config) {
    return { title: "Projeto não encontrado" };
  }

  const provider = getContentProvider();
  const project = await provider.getProjectBySlug(config.tenant.slug, slug);
  if (!project) {
    return {
      title: "Projeto não encontrado",
      robots: { index: false, follow: false },
    };
  }

  return buildProjectMetadata(config, project);
}

export default async function ProjectRoutePage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const config = await getActiveTenant();
  if (!config) {
    notFound();
  }

  const provider = getContentProvider();
  const project = await provider.getProjectBySlug(config.tenant.slug, slug);
  if (!project) {
    notFound();
  }

  const currentIndex = config.projects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    config.projects.length > 1
      ? config.projects[(currentIndex + 1) % config.projects.length]
      : null;

  const schemas = buildProjectJsonLd(config, project);

  return (
    <>
      <JsonLdRenderer schemas={schemas} />
      <ProjectDetailPage
        config={config}
        project={project}
        nextProject={nextProject}
      />
    </>
  );
}
