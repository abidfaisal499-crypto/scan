import { NextResponse } from "next/server";
import type { ErrorCode, ApiErrorBody } from "@/api/contracts";
export function apiError(code: ErrorCode, message: string, status: number) {
  const requestId = crypto.randomUUID();
  return NextResponse.json<ApiErrorBody>({ error: { code, message, requestId } }, {
    status, headers: { "Cache-Control": "no-store", "X-Request-Id": requestId },
  });
}
// Streaming limit also works when Content-Length is missing or dishonest.
export async function readLimitedJson(request: Request, maxBytes = 8192): Promise<unknown> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new Error("JSON required");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Empty body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); throw new Error("Body too large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body));
}
