import type { AnalysisFinding } from "@/types/scan";
export type AnalyzerId = "url" | "domain" | "redirect" | "dns" | "ssl" | "reputation" | "phishing";
export interface AnalyzerResult { analyzer: AnalyzerId; findings: AnalysisFinding[]; score: number | null; available: boolean; }
export interface Analyzer {
  id: AnalyzerId;
  analyze(context: { normalizedUrl: string; hostname: string; signal: AbortSignal }): Promise<AnalyzerResult>;
}
