import { PrismaClient } from '@prisma/client';

// Check for required database URL
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set!');
  throw new Error('Database connection URL is required');
}

// Use database URL with proper connection settings
const databaseUrl = process.env.DATABASE_URL;

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || 
  new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: databaseUrl
      }
    }
  });

// Log which environment we're running in
console.log(`Prisma Client initialized in ${process.env.NODE_ENV || 'unknown'} environment`);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma; 