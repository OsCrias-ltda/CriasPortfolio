import Image from "next/image";
import Link from "next/link";
import type { TenantConfig } from "@/core/schema/tenant-config.schema";

export function BrandMark({
  config,
  homeHref = "/",
}: {
  config: TenantConfig;
  homeHref?: string;
}) {
  return (
    <Link
      href={homeHref}
      className="group flex min-w-0 items-center gap-2.5 focus-visible:rounded-sm sm:gap-3"
    >
      {config.business.logo ? (
        <Image
          src={config.business.logo.src}
          alt={config.business.logo.alt}
          width={config.business.logo.width}
          height={config.business.logo.height}
          className="h-8 w-8 shrink-0 rounded-sm object-contain"
          priority
        />
      ) : (
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-primary font-accent text-xs font-bold text-primary-foreground"
          aria-hidden="true"
        >
          {config.business.name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="truncate font-heading text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
        {config.business.name}
      </span>
    </Link>
  );
}
