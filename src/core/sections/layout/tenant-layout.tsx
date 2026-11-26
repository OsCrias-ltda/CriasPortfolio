import * as React from "react";
import { Header } from "@/core/sections/layout/header";
import { Footer } from "@/core/sections/layout/footer";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

interface TenantLayoutProps {
  config: TenantConfig;
  homeHref?: string;
  children: React.ReactNode;
}

export function TenantLayout({
  config,
  homeHref = "/",
  children,
}: TenantLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Pular para o conteúdo principal
      </a>
      <Header config={config} homeHref={homeHref} />
      <main id="conteudo-principal" className="flex-1">
        {children}
      </main>
      <Footer config={config} homeHref={homeHref} />
    </div>
  );
}
