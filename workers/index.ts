import Redis from "ioredis";
// Infrastructure heartbeat only. Deliberately does not consume or execute scan jobs.
const url = process.env.REDIS_URL;
if (!url) { console.error("REDIS_URL is required for the foundation worker."); process.exit(1); }
const redis = new Redis(url, { maxRetriesPerRequest: null, connectTimeout: 5000 });
redis.on("error", () => console.error(JSON.stringify({ event: "worker_dependency_unavailable" })));
const heartbeatKey = "sentinelscan:foundation:heartbeat";
async function heartbeat() {
  try { await redis.set(heartbeatKey, new Date().toISOString(), "EX", 60); }
  catch { console.error(JSON.stringify({ event: "worker_heartbeat_failed" })); }
}
redis.once("ready", () => { console.info("Foundation worker ready. Scan processing is disabled."); void heartbeat(); });
const timer = setInterval(() => void heartbeat(), 20_000);
async function shutdown() { clearInterval(timer); redis.disconnect(); process.exit(0); }
process.once("SIGTERM", () => void shutdown());
process.once("SIGINT", () => void shutdown());
