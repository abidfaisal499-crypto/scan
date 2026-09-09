export const site = {
  name: "SentinelScan", version: "0.1.0", phase: 1,
  description: "Advanced URL and domain threat intelligence in one place.",
  repository: "https://github.com/abidfaisal499-crypto/scan",
} as const;
export const providerCatalog = [
  { id: "virustotal", name: "VirusTotal", description: "Multi-engine threat detection", initials: "VT", color: "blue", phase: 5 },
  { id: "google", name: "Google Safe Browsing", description: "Phishing & unsafe site detection", initials: "G", color: "multi", phase: 5 },
  { id: "urlhaus", name: "URLhaus", description: "Malware distribution intelligence", initials: "U", color: "red", phase: 5 },
  { id: "abuseipdb", name: "AbuseIPDB", description: "IP abuse & infrastructure reputation", initials: "A", color: "purple", phase: 5 },
  { id: "otx", name: "AlienVault OTX", description: "Community-powered threat intelligence", initials: "O", color: "orange", phase: 5 },
] as const;
