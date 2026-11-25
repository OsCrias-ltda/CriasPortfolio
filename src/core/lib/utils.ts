import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CtaAction, TenantConfig } from "@/core/schema/tenant-config.schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPlaceholderValue(value?: string | null): boolean {
  if (!value) return true;
  const normalized = value.trim();
  return (
    normalized.length === 0 ||
    normalized.includes("[TODO_COPY") ||
    normalized.includes("[TODO_ASSET")
  );
}

export function sanitizePhoneDigits(phone?: string | null): string | null {
  if (!phone || isPlaceholderValue(phone)) return null;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 ? digits : null;
}

export function buildWhatsAppUrl(
  whatsappNumber?: string | null,
  defaultMessage?: string
): string | null {
  const digits = sanitizePhoneDigits(whatsappNumber);
  if (!digits) return null;
  const text = defaultMessage ? `?text=${encodeURIComponent(defaultMessage)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function resolveCtaHref(
  action: CtaAction,
  business: TenantConfig["business"],
  customMessage?: string
): { href: string; external: boolean; isPlaceholderFallback: boolean } {
  if (action.kind === "whatsapp") {
    const url = buildWhatsAppUrl(
      business.contact.whatsappNumber,
      customMessage ?? business.contact.whatsappDefaultMessage
    );
    if (url) {
      return { href: url, external: true, isPlaceholderFallback: false };
    }
    return { href: "/#contato", external: false, isPlaceholderFallback: true };
  }

  if (action.kind === "email") {
    if (action.href) {
      return { href: action.href, external: false, isPlaceholderFallback: false };
    }
    return { href: "/#contato", external: false, isPlaceholderFallback: false };
  }

  if (action.kind === "url" && action.href && !isPlaceholderValue(action.href)) {
    return { href: action.href, external: true, isPlaceholderFallback: false };
  }

  return {
    href: action.href && !isPlaceholderValue(action.href) ? action.href : "/#contato",
    external: false,
    isPlaceholderFallback: false,
  };
}

export function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function getEffectiveSiteUrl(fallbackSiteUrl: string): string {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  if (envUrl && /^https?:\/\//i.test(envUrl)) {
    return envUrl.replace(/\/$/, "");
  }
  return fallbackSiteUrl.replace(/\/$/, "");
}
