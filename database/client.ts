import "server-only";
import { PrismaClient } from "@prisma/client";
import { getInfrastructureEnv } from "@/config/env";
const globalDatabase = globalThis as unknown as { prisma?: PrismaClient };
export function getDatabase() {
  getInfrastructureEnv();
  if (!globalDatabase.prisma) globalDatabase.prisma = new PrismaClient({ log: ["error"] });
  return globalDatabase.prisma;
}
