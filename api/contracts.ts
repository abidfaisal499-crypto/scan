export type ErrorCode = "INVALID_URL" | "INVALID_REQUEST" | "RATE_LIMITED" | "SCAN_FAILED" |
  "PROVIDER_TIMEOUT" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "FEATURE_NOT_AVAILABLE" | "SERVICE_UNAVAILABLE";
export interface ApiErrorBody { error: { code: ErrorCode; message: string; requestId: string }; }
export interface AcceptedScan { id: string; status: "QUEUED"; cached: boolean; }
