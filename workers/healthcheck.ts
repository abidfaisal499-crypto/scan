import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL ?? "", { connectTimeout: 2000, maxRetriesPerRequest: 1, retryStrategy: () => null });
redis.on("error", () => {});
try {
  const heartbeat = await redis.get("sentinelscan:foundation:heartbeat");
  const healthy = !!heartbeat && Date.now() - new Date(heartbeat).getTime() < 60_000;
  redis.disconnect(); process.exit(healthy ? 0 : 1);
} catch { redis.disconnect(); process.exit(1); }
