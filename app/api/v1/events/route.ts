import { apiError } from "@/server/http";
export async function GET() { return apiError("FEATURE_NOT_AVAILABLE", "Authenticated scan event streams are planned for the worker phase.", 503); }
