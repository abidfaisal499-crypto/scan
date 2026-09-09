import { NextResponse } from "next/server";
import { getDatabase } from "@/database/client";
import { getRedis } from "@/lib/redis";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const redis = getRedis();
    if (redis.status === "wait") await redis.connect();
    await Promise.race([
      Promise.all([getDatabase().$queryRaw`SELECT 1`, redis.ping()]),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3500)),
    ]);
    return NextResponse.json({ status: "ready", scope: "infrastructure", scanning: false }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ status: "unavailable", scope: "infrastructure" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
