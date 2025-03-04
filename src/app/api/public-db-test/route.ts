import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Updated runtime configuration
export const runtime = "nodejs";

export async function GET() {
  console.log('Public database test endpoint called');
  
  try {
    // Try all possible database URLs
    const possibleUrls = [
      process.env.POSTGRES_PRISMA_URL,
      process.env.POSTGRES_URL,
      process.env.DATABASE_URL,
      process.env.DIRECT_DATABASE_URL
    ].filter((url): url is string => Boolean(url)); // Filter out undefined values and type assertion
    
    if (possibleUrls.length === 0) {
      throw new Error('No database URL found in environment variables');
    }
    
    // Log all available URLs (sanitized)
    console.log('Available database URLs:');
    possibleUrls.forEach((url, index) => {
      const maskedUrl = url.replace(/\/\/.*?@/, '//****:****@');
      console.log(`URL ${index + 1}: ${maskedUrl}`);
    });
    
    // Try each URL until one works
    let lastError: Error | null = null;
    for (const dbUrl of possibleUrls) {
      try {
        console.log('Trying URL:', dbUrl.replace(/\/\/.*?@/, '//****:****@'));
        
        // Create a new PostgreSQL client with the connection string
        const pool = new Pool({
          connectionString: dbUrl,
          ssl: {
            rejectUnauthorized: false
          }
        });
        
        // Test the connection with a simple query
        const startTime = Date.now();
        const result = await pool.query('SELECT 1 as test');
        const endTime = Date.now();
        
        // Close the connection
        await pool.end();
        
        console.log(`Database query successful. Query took ${endTime - startTime}ms`);
        console.log(`Test result:`, result.rows[0]);
        
        // If we get here, the connection was successful
        // Return success response with appropriate headers
        const response = NextResponse.json({
          status: 'success',
          message: 'Successfully connected to database',
          testResult: result.rows[0],
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
        console.error('Error with this URL:', error);
        lastError = error instanceof Error ? error : new Error('Unknown error');
        // Continue to the next URL
      }
    }
    
    // If we get here, all URLs failed
    throw lastError || new Error('All database URLs failed');
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