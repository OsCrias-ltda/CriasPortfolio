"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Layers, Palette, RotateCcw, X } from "lucide-react";
import {
  COLOR_PRESET_LIST,
  DESIGN_PRESET_LIST,
  DESIGN_PRESETS,
} from "@/core/presets";
import type {
  ColorPresetKey,
  DesignPresetKey,
} from "@/core/schema/tenant-config.schema";
import { cn } from "@/core/lib/utils";

interface DesignPreviewSwitcherProps {
  activePreset: DesignPresetKey;
  activeColorPreset?: ColorPresetKey;
  isPreviewRoute: boolean;
}

function buildPreviewUrl(
  preset: DesignPresetKey,
  colorPreset?: ColorPresetKey
): string {
  return colorPreset ? `/preview/${preset}?color=${colorPreset}` : `/preview/${preset}`;
}

export function DesignPreviewSwitcher({
  activePreset,
  activeColorPreset,
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
      aria-label="Seletor de modelos e cores de design"
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
            {Object.entries(activeDef.sectionVariants).map(
              ([block, variant]) => (
                <div key={block} className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">{block}</dt>
                  <dd className="text-foreground">{variant}</dd>
                </div>
              )
            )}
          </dl>
        </div>
      )}

      <div className="space-y-2 rounded-xl border border-border/90 bg-card/95 p-2 shadow-2xl backdrop-blur-xl">
        {/* Linha 1: Presets de layout */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap">
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
                  href={buildPreviewUrl(preset.key, activeColorPreset)}
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

        {/* Linha 2: Presets de cor primária */}
        <div className="flex items-center justify-between gap-2 border-t border-border/70 px-1.5 pt-2">
          <span className="font-accent text-[10px] uppercase tracking-wider text-muted-foreground">
            Cor
          </span>

          <div
            role="group"
            aria-label="Alternar cor primária"
            className="flex flex-wrap items-center gap-1.5"
          >
            {COLOR_PRESET_LIST.map((color) => {
              const isSelected = activeColorPreset === color.key;
              return (
                <Link
                  key={color.key}
                  href={buildPreviewUrl(activePreset, color.key)}
                  title={color.label}
                  aria-label={`Cor ${color.label}`}
                  className={cn(
                    "inline-flex h-6 w-6 items-center justify-center rounded-full border transition-transform hover:scale-110",
                    isSelected
                      ? "scale-110 border-foreground ring-2 ring-primary/40"
                      : "border-border/80"
                  )}
                  style={{ backgroundColor: color.swatch }}
                >
                  {isSelected && (
                    <Check className="h-3 w-3 text-white drop-shadow" />
                  )}
                </Link>
              );
            })}

            {activeColorPreset && (
              <Link
                href={buildPreviewUrl(activePreset)}
                title="Voltar para a cor padrão do tenant"
                aria-label="Voltar para a cor padrão do tenant"
                className="ml-1 inline-flex h-6 items-center gap-1 rounded-full border border-border px-2 text-[10px] font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <RotateCcw className="h-2.5 w-2.5" />
                <span>Tenant</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
