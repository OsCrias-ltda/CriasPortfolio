import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/core/ui/button";
import type { CtaAction, TenantConfig } from "@/core/schema/tenant-config.schema";
import { cn, resolveCtaHref } from "@/core/lib/utils";

interface HeroActionsProps {
  primary: CtaAction;
  secondary?: CtaAction;
  business: TenantConfig["business"];
  align?: "left" | "center";
}

function ActionIcon({ kind }: { kind: CtaAction["kind"] }) {
  if (kind === "whatsapp") return <MessageCircle className="h-4 w-4" />;
  if (kind === "email") return <Mail className="h-4 w-4" />;
  return <ArrowRight className="h-4 w-4" />;
}

export function HeroActions({
  primary,
  secondary,
  business,
  align = "left",
}: HeroActionsProps) {
  const resolvedPrimary = resolveCtaHref(primary, business);
  const resolvedSecondary = secondary
    ? resolveCtaHref(secondary, business)
    : null;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
        align === "center" && "justify-center"
      )}
    >
      <Button asChild size="lg">
        <Link
          href={resolvedPrimary.href}
          target={resolvedPrimary.external ? "_blank" : undefined}
          rel={resolvedPrimary.external ? "noopener noreferrer" : undefined}
        >
          <ActionIcon kind={primary.kind} />
          {primary.label}
        </Link>
      </Button>

      {secondary && resolvedSecondary && (
        <Button asChild variant="outline" size="lg">
          <Link
            href={resolvedSecondary.href}
            target={resolvedSecondary.external ? "_blank" : undefined}
            rel={resolvedSecondary.external ? "noopener noreferrer" : undefined}
          >
            <ActionIcon kind={secondary.kind} />
            {secondary.label}
          </Link>
        </Button>
      )}
    </div>
  );
}
