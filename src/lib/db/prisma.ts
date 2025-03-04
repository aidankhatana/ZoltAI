import { PrismaClient } from '@prisma/client';

// Check for required database URL
if (!process.env.POSTGRES_PRISMA_URL && !process.env.DATABASE_URL) {
  console.error('Neither POSTGRES_PRISMA_URL nor DATABASE_URL environment variables are set!');
  throw new Error('Database connection URL is required');
}

// Use Supabase URL with proper connection settings for serverless
const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

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