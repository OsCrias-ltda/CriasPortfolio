import * as React from "react";
import { Globe } from "lucide-react";
import { cn } from "@/core/lib/utils";

export type SocialIconName =
  | "github"
  | "instagram"
  | "linkedin"
  | "x"
  | "youtube"
  | "globe";

function resolveSocialIconName(
  icon?: SocialIconName,
  href?: string,
  label?: string
): SocialIconName {
  if (icon) return icon;

  const fingerprint = `${href ?? ""} ${label ?? ""}`.toLowerCase();
  if (fingerprint.includes("github")) return "github";
  if (fingerprint.includes("instagram")) return "instagram";
  if (fingerprint.includes("linkedin")) return "linkedin";
  if (fingerprint.includes("youtube") || fingerprint.includes("youtu.be")) {
    return "youtube";
  }
  if (
    fingerprint.includes("twitter.com") ||
    fingerprint.includes("x.com") ||
    label?.trim().toLowerCase() === "x"
  ) {
    return "x";
  }
  return "globe";
}

export function SocialIcon({
  icon,
  href,
  label,
  className,
}: {
  icon?: SocialIconName;
  href?: string;
  label?: string;
  className?: string;
}) {
  const resolved = resolveSocialIconName(icon, href, label);

  if (resolved === "github") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={cn("h-4 w-4 shrink-0", className)}
      >
        <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.084 3.292 9.397 7.865 10.918.575.106.785-.25.785-.555 0-.274-.01-1-.016-1.963-3.199.695-3.874-1.542-3.874-1.542-.523-1.329-1.277-1.682-1.277-1.682-1.044-.714.079-.699.079-.699 1.154.081 1.761 1.185 1.761 1.185 1.026 1.758 2.691 1.25 3.347.956.104-.743.402-1.25.731-1.538-2.554-.29-5.238-1.277-5.238-5.683 0-1.255.448-2.281 1.184-3.086-.119-.291-.513-1.46.112-3.044 0 0 .966-.309 3.164 1.179A11.01 11.01 0 0 1 12 6.066c.977.005 1.962.132 2.882.388 2.196-1.488 3.16-1.179 3.16-1.179.627 1.584.233 2.753.114 3.044.737.805 1.182 1.831 1.182 3.086 0 4.417-2.688 5.389-5.25 5.674.413.356.781 1.058.781 2.132 0 1.539-.014 2.78-.014 3.158 0 .308.207.667.791.554C20.212 21.392 23.5 17.081 23.5 12 23.5 5.648 18.352.5 12 .5Z" />
      </svg>
    );
  }

  if (resolved === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn("h-4 w-4 shrink-0", className)}
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }

  if (resolved === "linkedin") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={cn("h-4 w-4 shrink-0", className)}
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
      </svg>
    );
  }

  if (resolved === "x") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={cn("h-4 w-4 shrink-0", className)}
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  if (resolved === "youtube") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={cn("h-4 w-4 shrink-0", className)}
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }

  return <Globe aria-hidden="true" className={cn("h-4 w-4 shrink-0", className)} />;
}
