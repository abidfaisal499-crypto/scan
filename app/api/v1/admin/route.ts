import { apiError } from "@/server/http";
export async function GET() { return apiError("UNAUTHORIZED", "Administrator authentication is required. No administrative data is exposed in Phase 1.", 401); }
