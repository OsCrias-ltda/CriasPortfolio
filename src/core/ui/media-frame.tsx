import Image from "next/image";
import { LayoutGrid, Monitor, Smartphone } from "lucide-react";
import { cn, isPlaceholderValue } from "@/core/lib/utils";
import type { MediaAsset } from "@/core/schema/tenant-config.schema";

interface MediaFrameProps {
  asset: MediaAsset;
  aspect?: "16/10" | "16/9" | "4/3" | "mobile";
  priority?: boolean;
  className?: string;
}

const ASPECT_CLASSES = {
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  mobile: "aspect-[9/16] max-w-[280px] mx-auto",
};

export function MediaFrame({
  asset,
  aspect = "16/10",
  priority = false,
  className,
}: MediaFrameProps) {
  const hasRealImage = Boolean(asset.src) && !isPlaceholderValue(asset.src);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-md border border-border bg-surface-elevated",
        ASPECT_CLASSES[aspect],
        className
      )}
    >
      {hasRealImage && asset.src ? (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          className="object-cover"
        />
      ) : (
        <div className="bg-tenant-grid relative flex h-full w-full flex-col justify-between p-5">
          {/* Barra minimalista simulando janela de interface */}
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-xs bg-primary/80" />
              <span className="h-2 w-2 rounded-xs bg-border" />
              <span className="h-2 w-2 rounded-xs bg-border" />
            </div>
            <span className="font-accent text-[10px] tracking-wider text-muted-foreground uppercase">
              {aspect === "mobile" ? "MOBILE UI" : "WEB INTERFACE"}
            </span>
          </div>

          {/* Esqueleto abstrato minimalista + rótulo explícito */}
          <div className="my-auto flex flex-col items-center justify-center gap-3 text-center py-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
              {aspect === "mobile" ? (
                <Smartphone className="h-5 w-5" />
              ) : aspect === "4/3" ? (
                <LayoutGrid className="h-5 w-5" />
              ) : (
                <Monitor className="h-5 w-5" />
              )}
            </div>
            <div className="space-y-1 max-w-xs">
              <p className="font-accent text-[11px] tracking-wider text-primary uppercase">
                [TODO_ASSET]
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {asset.placeholderLabel ?? asset.alt}
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-3 gap-2 opacity-40"
            aria-hidden="true"
          >
            <div className="h-2 rounded-xs bg-border" />
            <div className="h-2 rounded-xs bg-border" />
            <div className="h-2 rounded-xs bg-primary/40" />
          </div>
        </div>
      )}
    </div>
  );
}
