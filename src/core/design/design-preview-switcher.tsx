"use client";

import * as React from "react";
import Link from "next/link";
import { Layers, Palette, X } from "lucide-react";
import { DESIGN_PRESET_LIST, DESIGN_PRESETS } from "@/core/design/presets";
import type { DesignPresetKey } from "@/core/schema/tenant-config.schema";
import { cn } from "@/core/lib/utils";

interface DesignPreviewSwitcherProps {
  activePreset: DesignPresetKey;
  isPreviewRoute: boolean;
}

export function DesignPreviewSwitcher({
  activePreset,
  isPreviewRoute,
}: DesignPreviewSwitcherProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const activeDef = DESIGN_PRESETS[activePreset];

  if (collapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/95 px-3.5 py-2 text-xs font-semibold text-foreground shadow-xl backdrop-blur-md transition-colors hover:border-primary"
          aria-label="Abrir seletor de presets de design"
        >
          <Palette className="h-3.5 w-3.5 text-primary" />
          <span>Design: {activeDef.shortLabel}</span>
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Seletor de modelos de design"
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100vw-1.5rem)] max-w-2xl -translate-x-1/2 sm:left-auto sm:right-4 sm:w-auto sm:translate-x-0"
    >
      {showDetails && (
        <div className="mb-2 rounded-xl border border-border bg-card/95 p-4 text-xs shadow-2xl backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between gap-4">
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">
                {activeDef.label}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {activeDef.tagline}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDetails(false)}
              className="rounded-md p-1 text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
              aria-label="Fechar detalhes das variantes"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-border/80 pt-2.5 font-accent text-[11px]">
            <div className="flex justify-between gap-2">
              <dt className="text-muted-foreground">header</dt>
              <dd className="text-primary">{activeDef.layout.headerVariant}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-muted-foreground">footer</dt>
              <dd className="text-primary">{activeDef.layout.footerVariant}</dd>
            </div>
            {Object.entries(activeDef.sectionVariants).map(([block, variant]) => (
              <div key={block} className="flex justify-between gap-2">
                <dt className="text-muted-foreground">{block}</dt>
                <dd className="text-foreground">{variant}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/90 bg-card/95 p-2 shadow-2xl backdrop-blur-xl sm:flex-nowrap">
        <div className="flex items-center gap-1.5 pl-1.5">
          <Palette className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="hidden font-accent text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">
            Presets
          </span>
        </div>

        <nav
          aria-label="Alternar modelo visual"
          className="flex flex-1 items-center gap-1 overflow-x-auto sm:flex-initial"
        >
          {DESIGN_PRESET_LIST.map((preset) => {
            const isActive = preset.key === activePreset;
            return (
              <Link
                key={preset.key}
                href={`/preview/${preset.key}`}
                className={cn(
                  "whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                )}
              >
                {preset.shortLabel}
              </Link>
            );
          })}

          {isPreviewRoute && (
            <Link
              href="/"
              className="whitespace-nowrap rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              Site oficial
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowDetails((prev) => !prev)}
            className={cn(
              "inline-flex h-7 w-7 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground",
              showDetails && "border-border bg-surface-elevated text-primary"
            )}
            aria-label="Ver variantes ativas dos blocos"
            title="Ver variantes dos blocos"
          >
            <Layers className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              setShowDetails(false);
              setCollapsed(true);
            }}
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground"
            aria-label="Minimizar seletor de presets"
            title="Minimizar"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
