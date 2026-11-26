import { NextResponse, type NextRequest } from "next/server";
import {
  DESIGN_PREVIEW_COOKIE,
  isDesignPreviewEnabled,
} from "@/core/presets";

/**
 * Lê APP_ENV e ENABLE_DESIGN_PREVIEW em runtime (Env do Dokploy) sem sacrificar o SSG das páginas.
 * - Em staging, injeta o cabeçalho oficial X-Robots-Tag: noindex, nofollow.
 * - Controla em runtime o cookie sinalizador do DesignPreviewSwitcher na home (/).
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  if (process.env.APP_ENV === "staging") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  const previewEnabled = isDesignPreviewEnabled();
  if (previewEnabled) {
    response.cookies.set(DESIGN_PREVIEW_COOKIE, "1", {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
    });
  } else if (request.cookies.has(DESIGN_PREVIEW_COOKIE)) {
    response.cookies.set(DESIGN_PREVIEW_COOKIE, "", {
      path: "/",
      maxAge: 0,
      sameSite: "lax",
      httpOnly: false,
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
