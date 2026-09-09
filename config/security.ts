// Policy contracts, not a claim of implemented network enforcement.
export const networkPolicy = {
  allowedProtocols: ["http:", "https:"],
  allowedPorts: [80, 443],
  timeoutMs: 10_000,
  maxRedirects: 5,
  maxResponseBytes: 1_048_576,
  denyNonPublicAddresses: true,
  pinDnsResolution: true,
  validateEachRedirect: true,
} as const;
export const defaultRiskWeights = {
  threatIntelligence: 40, domainReputation: 15, urlIndicators: 15,
  redirectBehavior: 10, dns: 10, ssl: 5, phishingIndicators: 5,
} as const;
