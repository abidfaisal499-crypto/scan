import type { SecurityProvider } from "./types";
/** Intentionally empty until Phase 5: never fabricate clean results. */
export function createProviderRegistry(providers: SecurityProvider[] = []) {
  const registry = new Map<string, SecurityProvider>();
  for (const provider of providers) {
    if (registry.has(provider.id)) throw new Error(`Duplicate provider: ${provider.id}`);
    registry.set(provider.id, provider);
  }
  return { list: () => [...registry.values()], enabled: () => [...registry.values()].filter((p) => p.enabled) };
}
