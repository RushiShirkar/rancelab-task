// src/server/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        // Only log in development to reduce overhead
        log: process.env.NODE_ENV === "production"
            ? ["error"]
            : ["query", "error", "warn"],

        // Connection pooling configuration
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    });

// Prisma connection pool configuration via environment variables
// Add these to your .env file:
// DATABASE_URL="postgresql://user:password@localhost:5432/db?connection_limit=10&pool_timeout=20"

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;