import { PrismaClient } from '@prisma/client';

// Check for required database URL
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set!');
  throw new Error('Database connection URL is required');
}

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Custom connection settings to handle SSL properly
const isProduction = process.env.NODE_ENV === 'production';
const connectionSettings = {
  log: isProduction ? ['error' as const] : ['error' as const, 'warn' as const],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
  // SSL is handled automatically by Prisma when needed
};

console.log(`Initializing Prisma Client (${isProduction ? 'production' : 'development'} mode)`);
console.log(`Database URL: ${process.env.DATABASE_URL?.replace(/\/\/.*?@/, '//****:****@')}`);

export const prisma = globalForPrisma.prisma || new PrismaClient(connectionSettings);

// If not in production, add to global object for better performance
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma; 