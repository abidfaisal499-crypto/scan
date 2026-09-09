import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json({ status: "ok", service: "sentinelscan-web", version: "0.1.0", phase: 1,
    capabilities: { scanning: false, authentication: false, providerIntegrations: false } },
    { headers: { "Cache-Control": "no-store" } });
}
