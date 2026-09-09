export interface ProviderInput { url: string; hostname: string; publicAddresses: readonly string[]; signal: AbortSignal; }
export interface ProviderResult {
  provider: string;
  // Unknown is not clean: disabled / unavailable providers must return null.
  detected: boolean | null; score: number | null; categories: string[]; confidence: number | null;
  status: "completed" | "disabled" | "unavailable" | "timeout";
  details: Record<string, unknown>; checkedAt: string;
}
export interface SecurityProvider {
  id: string; enabled: boolean; timeoutMs: number;
  analyze(input: ProviderInput): Promise<ProviderResult>;
}
