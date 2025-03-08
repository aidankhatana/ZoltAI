import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

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
    
    // Set headers to make this endpoint publicly accessible
    const response = NextResponse.json({
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
    
    // Add headers to disable authentication
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('Vercel-CDN-Cache-Control', 'no-store');
    response.headers.set('X-Vercel-Protection-Bypass', 'true');
    
    return response;
  } catch (error) {
    console.error('Database test error:', error);
    
    // Return detailed error for debugging
    const errorResponse = NextResponse.json({
      status: 'error',
      message: 'Failed to connect to database',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    }, { status: 500 });
    
    // Add headers to disable authentication
    errorResponse.headers.set('Cache-Control', 'no-store');
    errorResponse.headers.set('Vercel-CDN-Cache-Control', 'no-store');
    errorResponse.headers.set('X-Vercel-Protection-Bypass', 'true');
    
    return errorResponse;
  }
} 