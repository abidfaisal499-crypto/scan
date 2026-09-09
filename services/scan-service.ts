import type { AcceptedScan } from "@/api/contracts";
/** Port implemented when authorization, quotas, persistence and queue dispatch are ready. */
export interface ScanService {
  submit(input: { url: string; userId: string | null; apiKeyId: string | null }): Promise<AcceptedScan>;
}
