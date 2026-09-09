export const SCAN_QUEUE = "sentinelscan:url:v1";
// Queue contains an opaque DB identifier, not URLs with possibly sensitive query strings.
export interface UrlScanJob { scanId: string; schemaVersion: 1; }
export const jobPolicy = { attempts: 3, backoff: { type: "exponential", delay: 2000 },
  removeOnComplete: { age: 3600, count: 1000 }, removeOnFail: { age: 86400, count: 1000 } } as const;
