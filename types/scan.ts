export type ScanStatus = "QUEUED" | "SCANNING" | "ANALYZING" | "AGGREGATING" | "COMPLETED" | "FAILED";
export type ScanKind = "URL" | "DOMAIN" | "IP" | "FILE" | "HASH" | "EMAIL";
export type RiskLevel = "SAFE" | "LOW_RISK" | "SUSPICIOUS" | "HIGH_RISK" | "MALICIOUS";
export interface AnalysisFinding { code: string; severity: "info" | "low" | "medium" | "high" | "critical"; description: string; }
export interface ScanProgress { scanId: string; status: ScanStatus; stage: string; progress: number; }
