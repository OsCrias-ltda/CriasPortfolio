import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "./globals.css";
import { getActiveTenant } from "@/core/data";
import { getAllPresetFontClasses } from "@/core/theme/font-registry";
import { TenantThemeStyle } from "@/core/theme/theme-provider";
import { buildHomeMetadata } from "@/core/seo/metadata-builder";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getActiveTenant();
  if (!config) {
    return {
      title: "Página não encontrada",
      robots: { index: false, follow: false },
    };
  }
  return buildHomeMetadata(config);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getActiveTenant();
  if (!config) {
    notFound();
  }

  const fontClasses = getAllPresetFontClasses(config.theme.fonts);

  return (
    <html
      lang={config.tenant.locale}
      className={fontClasses}
      suppressHydrationWarning
    >
      <head>
        <TenantThemeStyle theme={config.theme} />
      </head>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
