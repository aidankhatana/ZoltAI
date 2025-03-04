import { NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { Pool } from 'pg';

export const runtime = "nodejs";

// Simple hash function for testing only
function simpleHash(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  console.log('Registration test endpoint called');
  
  try {
    // Get all possible database URLs
    const possibleUrls = [
      process.env.POSTGRES_PRISMA_URL,
      process.env.POSTGRES_URL,
      process.env.DATABASE_URL,
      process.env.DIRECT_DATABASE_URL,
    ].filter((url): url is string => Boolean(url));

    // Log available URLs (masked for security)
    console.log('Available database URLs:', possibleUrls.map(url => {
      try {
        return url.replace(/\/\/.*?@/, '//****:****@');
      } catch (e) {
        return 'Invalid URL format';
      }
    }));

    // Try each connection URL until one works
    let pool = null;
    let lastError: Error | null = null;
    let connected = false;

    for (const url of possibleUrls) {
      try {
        console.log(`Trying connection with URL: ${url.replace(/\/\/.*?@/, '//****:****@')}`);
        pool = new Pool({ connectionString: url });
        
        // Test the connection with a simple query
        const startTime = Date.now();
        const result = await pool.query('SELECT 1 as test');
        const endTime = Date.now();
        
        console.log(`Database connection successful with URL starting with ${url.substring(0, 10)}... Query took ${endTime - startTime}ms`);
        connected = true;
        break; // Connection successful, exit the loop
      } catch (error) {
        console.error(`Failed to connect with URL starting with ${url.substring(0, 10)}...`, error);
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        // Close the pool if it was created
        if (pool) await pool.end().catch(console.error);
        pool = null;
      }
    }

    if (!connected || !pool) {
      console.error('All database connection attempts failed');
      return NextResponse.json({
        status: 'error',
        message: 'Database connection failed',
        error: lastError?.message || 'Unknown database error',
        env: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
    
    // Parse request body
    const body = await request.json().catch(() => null);
    
    if (!body) {
      await pool.end().catch(console.error);
      return NextResponse.json({
        status: 'error',
        message: 'Invalid request body'
      }, { status: 400 });
    }
    
    const { name, email, password } = body;
    
    // Validate request
    if (!email || !password) {
      await pool.end().catch(console.error);
      return NextResponse.json({
        status: 'error',
        message: 'Email and password are required'
      }, { status: 400 });
    }
    
    // Check if user exists
    const checkUserResult = await pool.query(
      'SELECT id FROM "User" WHERE email = $1',
      [email]
    );
    
    if (checkUserResult.rows.length > 0) {
      await pool.end().catch(console.error);
      return NextResponse.json({
        status: 'error',
        message: 'User already exists'
      }, { status: 409 });
    }
    
    // Create user
    const hashedPassword = simpleHash(password);
    const displayName = name || email.split('@')[0];
    
    const createUserResult = await pool.query(
      'INSERT INTO "User" (id, name, email, password, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, "createdAt", "updatedAt"',
      [
        crypto.randomUUID(), // Generate a UUID for id
        displayName,
        email,
        hashedPassword,
        new Date(),
        new Date()
      ]
    );
    
    const user = createUserResult.rows[0];
    
    // Close the pool
    await pool.end().catch(console.error);
    
    // Return successful response
    return NextResponse.json({
      status: 'success',
      message: 'User registered successfully in test mode',
      user
    });
  } catch (error) {
    console.error('Registration test error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Registration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 