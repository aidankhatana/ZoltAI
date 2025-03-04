import { NextResponse } from 'next/server';

export const runtime = "nodejs";

export async function GET() {
  // Get all environment variables related to Prisma and database
  const envVars = {
    DATABASE_URL: process.env.DATABASE_URL ? 'Set (masked)' : 'Not set',
    DIRECT_DATABASE_URL: process.env.DIRECT_DATABASE_URL ? 'Set (masked)' : 'Not set',
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL ? 'Set (masked)' : 'Not set',
    POSTGRES_URL: process.env.POSTGRES_URL ? 'Set (masked)' : 'Not set',
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING ? 'Set (masked)' : 'Not set',
    PRISMA_GENERATE_DATAPROXY: process.env.PRISMA_GENERATE_DATAPROXY || 'Not set',
    NODE_ENV: process.env.NODE_ENV || 'Not set',
  };

  // Return the environment variables
  return NextResponse.json({
    status: 'success',
    message: 'Environment variables',
    envVars,
    timestamp: new Date().toISOString()
  });
} 