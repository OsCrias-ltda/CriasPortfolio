import { NextResponse } from "next/server";
import { getActiveTenant } from "@/core/data";
import { buildLlmsTxt } from "@/core/seo/llms-builder";

export async function GET() {
  const config = await getActiveTenant({ preferStatic: true });
  if (!config) {
    return new NextResponse("Tenant não encontrado.", { status: 404 });
  }

  const markdown = buildLlmsTxt(config);

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
