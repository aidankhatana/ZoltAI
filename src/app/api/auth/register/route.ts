import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import * as crypto from 'crypto';

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    console.log('Registration process started');
    
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
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          details: lastError?.message || 'Unknown database error'
        },
        { status: 500 }
      );
    }
    
    const { name, email, password } = await request.json();
    console.log('Parsed registration data:', { name, emailProvided: !!email, passwordProvided: !!password });

    // Validate input
    if (!email || !password) {
      console.log('Validation failed: Missing email or password');
      await pool.end().catch(console.error);
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('Checking if user exists:', email);
    const existingUserResult = await pool.query(
      'SELECT id FROM "User" WHERE email = $1',
      [email]
    );

    if (existingUserResult.rows.length > 0) {
      console.log('User already exists:', email);
      await pool.end().catch(console.error);
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    console.log('Hashing password');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    // Create user
    console.log('Creating user in database');
    const userId = crypto.randomUUID();
    const createUserResult = await pool.query(
      'INSERT INTO "User" (id, name, email, password, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, "createdAt", "updatedAt"',
      [
        userId,
        name,
        email,
        hashedPassword,
        new Date(),
        new Date()
      ]
    );
    
    const user = createUserResult.rows[0];
    console.log('User created successfully:', user.id);

    // Close the pool
    await pool.end().catch(console.error);
    
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    
    return NextResponse.json(
      { 
        error: 'Something went wrong during registration',
        details: process.env.NODE_ENV === 'production' 
          ? 'See server logs for details' 
          : error.message
      },
      { status: 500 }
    );
  }
} 