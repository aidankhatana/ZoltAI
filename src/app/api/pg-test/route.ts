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
    
    // Create a new PostgreSQL client
    const pool = new Pool({
      connectionString: dbUrl,
      ssl: {
        rejectUnauthorized: false // Required for some PostgreSQL providers
      }
    });
    
    // Test the connection
    const startTime = Date.now();
    const result = await pool.query('SELECT COUNT(*) FROM "User"');
    const endTime = Date.now();
    
    // Close the connection
    await pool.end();
    
    const userCount = parseInt(result.rows[0].count, 10);
    console.log(`Database query successful. Query took ${endTime - startTime}ms`);
    console.log(`User count: ${userCount}`);
    
    // Return success response with appropriate headers
    const response = NextResponse.json({
      status: 'success',
      message: 'Successfully connected to database using pg',
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