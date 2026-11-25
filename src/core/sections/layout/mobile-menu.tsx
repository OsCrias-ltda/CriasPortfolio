"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ArrowUpRight } from "lucide-react";
import { Button } from "@/core/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/core/ui/sheet";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";
import { resolveCtaHref } from "@/core/lib/utils";

interface MobileMenuProps {
  config: TenantConfig;
}

export function MobileMenu({ config }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const primaryCta = resolveCtaHref(config.cta.primary, config.business);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-label="Abrir menu de navegação"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-xs bg-primary" />
          {config.business.name}
        </SheetTitle>

        <nav
          aria-label="Navegação mobile"
          className="mt-8 flex flex-col gap-1"
        >
          {config.navigation.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface-elevated hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <Button asChild className="w-full" size="default">
            <Link
              href={primaryCta.href}
              target={primaryCta.external ? "_blank" : undefined}
              rel={primaryCta.external ? "noopener noreferrer" : undefined}
              onClick={() => setOpen(false)}
            >
              {config.cta.primary.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
