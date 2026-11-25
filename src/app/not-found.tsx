import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/core/ui/button";
import { Container } from "@/core/sections/layout/container";

export default function NotFoundPage() {
  return (
    <section className="py-28 sm:py-36">
      <Container size="narrow" className="space-y-6 text-center">
        <p className="font-accent text-xs tracking-widest text-primary uppercase">
          ERRO 404
        </p>
        <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
          Página não encontrada
        </h1>
        <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground">
          O endereço que você acessou não existe ou foi movido. Volte para a
          página inicial para conhecer nossos serviços e projetos.
        </p>
        <div className="pt-2">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Voltar para o início
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
