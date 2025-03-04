import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Updated runtime configuration
export const runtime = "nodejs";

export async function GET() {
  console.log('Public database test endpoint called');
  
  try {
    // Log connection info (sanitized)
    const dbUrl = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL || 'Not set';
    const maskedUrl = dbUrl.replace(/\/\/.*?@/, '//****:****@');
    console.log('Using database URL:', maskedUrl);
    
    // Create a new Prisma client instance with the direct URL
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL
        }
      }
    });
    
    // Simple query to test the connection
    const startTime = Date.now();
    const userCount = await prisma.user.count();
    const endTime = Date.now();
    
    // Disconnect the client
    await prisma.$disconnect();
    
    console.log(`Database query successful. Query took ${endTime - startTime}ms`);
    console.log(`User count: ${userCount}`);
    
    // Return success response with appropriate headers
    const response = NextResponse.json({
      status: 'success',
      message: 'Successfully connected to database',
      userCount,
      queryTimeMs: endTime - startTime,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
    
    // Add headers to make this endpoint public
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    
    return response;
  } catch (error) {
    console.error('Database test error:', error);
    
    // Return detailed error information
    const errorResponse = NextResponse.json({
      status: 'error',
      message: 'Failed to connect to database',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
    
    // Add headers to make this endpoint public
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET');
    errorResponse.headers.set('Cache-Control', 'no-store, max-age=0');
    
    return errorResponse;
  }
} 