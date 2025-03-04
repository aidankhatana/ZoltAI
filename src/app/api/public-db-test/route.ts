import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Updated runtime configuration
export const runtime = "nodejs";

export async function GET() {
  console.log('Public database test endpoint called');
  
  try {
    // Get the database URL
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('No database URL found in environment variables');
    }
    
    // Log connection info (sanitized)
    const maskedUrl = dbUrl.replace(/\/\/.*?@/, '//****:****@');
    console.log('Using database URL:', maskedUrl);
    
    // Parse the connection string to extract components
    const connectionMatch = dbUrl.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)/);
    if (!connectionMatch) {
      throw new Error('Invalid PostgreSQL connection string format');
    }
    
    const [, user, password, host, port, database] = connectionMatch;
    
    // Create a new PostgreSQL client with explicit configuration
    const pool = new Pool({
      user,
      password,
      host,
      port: parseInt(port, 10),
      database,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    // Test the connection with a user count query
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