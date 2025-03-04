import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export const runtime = "nodejs";

export async function GET() {
  console.log('PostgreSQL direct test endpoint called');
  
  try {
    // Get the database URL
    const dbUrl = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('No database URL found in environment variables');
    }
    
    // Log connection info (sanitized)
    const maskedUrl = dbUrl.replace(/\/\/.*?@/, '//****:****@');
    console.log('Using database URL:', maskedUrl);
    
    // Create a new PostgreSQL client with SSL configuration
    const pool = new Pool({
      connectionString: dbUrl,
      ssl: {
        rejectUnauthorized: false // Required for self-signed certificates
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
    
    // Return success response with appropriate headers
    const response = NextResponse.json({
      status: 'success',
      message: 'Successfully connected to database using pg',
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
    console.error('PostgreSQL test error:', error);
    
    // Return detailed error information
    const errorResponse = NextResponse.json({
      status: 'error',
      message: 'Failed to connect to database using pg',
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