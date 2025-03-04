import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

export const runtime = "nodejs";

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-dev';

export async function POST(request: Request) {
  let pool = null;
  
  try {
    console.log('Login process started');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('JWT_SECRET starts with:', JWT_SECRET.substring(0, 10) + '...');
    
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
        success: false,
        error: 'Database connection failed',
        details: lastError?.message || 'Unknown database error'
      }, { status: 500 });
    }
    
    // Parse request body
    let email, password;
    try {
      const body = await request.json();
      email = body.email;
      password = body.password;
      console.log('Request parsed:', { emailProvided: !!email, passwordProvided: !!password });
    } catch (parseError) {
      console.error('Failed to parse request JSON:', parseError);
      await pool.end().catch(console.error);
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!email || !password) {
      console.log('Validation failed: Missing email or password');
      await pool.end().catch(console.error);
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find the user by email
    console.log('Looking up user by email');
    const userResult = await pool.query(
      'SELECT * FROM "User" WHERE email = $1',
      [email]
    );
    
    const user = userResult.rows[0];
    console.log('User lookup result:', { found: !!user });

    if (!user) {
      console.log('User not found:', email);
      await pool.end().catch(console.error);
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Compare the provided password with the stored hash
    console.log('Comparing password hash');
    let isPasswordValid;
    try {
      isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password comparison result:', isPasswordValid);
    } catch (bcryptError) {
      console.error('bcrypt error during password comparison:', bcryptError);
      await pool.end().catch(console.error);
      return NextResponse.json(
        { success: false, error: 'Authentication error' },
        { status: 500 }
      );
    }

    if (!isPasswordValid) {
      console.log('Password invalid for user:', email);
      await pool.end().catch(console.error);
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate a JWT token
    console.log('Generating JWT token');
    let token;
    try {
      token = jwt.sign(
        {
          userId: user.id,
          email: user.email
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      console.log('JWT token generated successfully');
      console.log('Token starts with:', token.substring(0, 10) + '...');
    } catch (jwtError) {
      console.error('JWT signing error:', jwtError);
      await pool.end().catch(console.error);
      return NextResponse.json(
        { success: false, error: 'Error generating authentication token' },
        { status: 500 }
      );
    }

    // Close the database connection
    await pool.end().catch(console.error);

    console.log('Login successful for user:', email);
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error: any) {
    console.error('Login error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    
    // Ensure we close the pool if it exists
    if (pool) await pool.end().catch(console.error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred during login',
        details: process.env.NODE_ENV === 'production' 
          ? 'See server logs for details' 
          : error.message
      },
      { status: 500 }
    );
  }
}
