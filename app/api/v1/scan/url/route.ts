import { apiError, readLimitedJson } from "@/server/http";
import { normalizeUrl, scanUrlSchema } from "@/utils/url";
export const runtime = "nodejs";
export async function POST(request: Request) {
  let body: unknown;
  try { body = await readLimitedJson(request); }
  catch { return apiError("INVALID_REQUEST", "Provide a JSON body of at most 8 KB.", 400); }
  const parsed = scanUrlSchema.safeParse(body);
  if (!parsed.success) return apiError("INVALID_URL", "Provide a single URL string (maximum 4096 characters).", 400);
  try { normalizeUrl(parsed.data.url); }
  catch (error) { return apiError("INVALID_URL", error instanceof Error ? error.message : "Invalid URL.", 400); }
  // Fail closed: no outbound requests, persistence, provider calls or queue writes in Phase 1.
  return apiError("FEATURE_NOT_AVAILABLE", "The scanning engine is not enabled in Phase 1. No scan was created and no request was sent to the destination.", 503);
}
