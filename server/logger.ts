import "server-only";
// Deliberate allowlist. Never pass input URLs, request bodies or provider responses.
type LogEvent = "startup" | "dependency_unavailable" | "provider_failure" | "security_event";
export function logEvent(event: LogEvent, fields: { requestId?: string; providerId?: string; code?: string } = {}) {
  console.info(JSON.stringify({ timestamp: new Date().toISOString(), event, ...fields }));
}
