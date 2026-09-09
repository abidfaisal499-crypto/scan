import { apiError } from "@/server/http";
export async function GET() { return apiError("FEATURE_NOT_AVAILABLE", "IP scanning is a future capability and is not enabled.", 503); }
