import "server-only";
import { z } from "zod";
const infrastructureSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().refine((value) => /^rediss?:/.test(value)),
});
// Lazy validation: static pages and liveness do not require infrastructure.
export function getInfrastructureEnv() {
  return infrastructureSchema.parse({ DATABASE_URL: process.env.DATABASE_URL, REDIS_URL: process.env.REDIS_URL });
}
