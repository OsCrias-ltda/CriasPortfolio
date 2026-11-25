import { NextResponse } from "next/server";

/**
 * Lê APP_ENV em runtime (Env do Dokploy) sem sacrificar o SSG das páginas.
 * Em staging, injeta o cabeçalho oficial X-Robots-Tag: noindex, nofollow.
 */
export function proxy() {
  const response = NextResponse.next();

  if (process.env.APP_ENV === "staging") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
