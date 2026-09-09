import { apiError } from "@/server/http";
export async function GET() { return apiError("FEATURE_NOT_AVAILABLE", "Domain analysis is reserved for a later phase.", 503); }
