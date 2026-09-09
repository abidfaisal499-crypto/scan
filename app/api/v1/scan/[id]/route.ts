import { apiError } from "@/server/http";
export async function GET() { return apiError("UNAUTHORIZED", "Authentication is required. Authentication and scan retrieval are not enabled in Phase 1.", 401); }
