import "server-only";
import Redis from "ioredis";
import { getInfrastructureEnv } from "@/config/env";
const globalRedis = globalThis as unknown as { redis?: Redis };
export function getRedis() {
  if (!globalRedis.redis) {
    globalRedis.redis = new Redis(getInfrastructureEnv().REDIS_URL, {
      lazyConnect: true, maxRetriesPerRequest: 1, enableOfflineQueue: false,
      connectTimeout: 3000, retryStrategy: () => null,
    });
    globalRedis.redis.on("error", () => { /* Readiness handles errors without logging secrets. */ });
  }
  return globalRedis.redis;
}
