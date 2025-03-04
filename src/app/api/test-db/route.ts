import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

// Add route configuration to make it public
export const config = {
  runtime: 'edge',
  unstable_allowDynamic: [
    '**/node_modules/lodash/**',
  ],
};

export async function GET() {
  console.log('Database test endpoint called');
  
  try {
    // Log connection info (sanitized)
    const dbUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || 'Not set';
    const maskedUrl = dbUrl.replace(/\/\/.*?@/, '//****:****@');
    console.log('Using database URL:', maskedUrl);
    
    // Simple query to test the connection
    const startTime = Date.now();
    const userCount = await prisma.user.count();
    const endTime = Date.now();
    
    console.log(`Database query successful. Query took ${endTime - startTime}ms`);
    console.log(`User count: ${userCount}`);
    
    // Return success response
    return NextResponse.json({
      status: 'success',
      message: 'Successfully connected to Supabase database',
      userCount,
      queryTimeMs: endTime - startTime,
      connectionInfo: {
        provider: 'supabase',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Database test error:', error);
    
    // Return detailed error for debugging
    return NextResponse.json({
      status: 'error',
      message: 'Failed to connect to database',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    }, { status: 500 });
  }
} 