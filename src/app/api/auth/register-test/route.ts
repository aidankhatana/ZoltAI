import { NextResponse } from 'next/server';
import * as crypto from 'crypto';
import prisma from '@/lib/db/prisma';

// Simple hash function for testing only
function simpleHash(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  console.log('Registration test endpoint called');
  
  try {
    // Log diagnostic info
    const dbUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || 'Not set';
    const maskedUrl = dbUrl.replace(/\/\/.*?@/, '//****:****@');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Using database URL:', maskedUrl);
    
    // Test database connection first
    try {
      const startTime = Date.now();
      const userCount = await prisma.user.count();
      const endTime = Date.now();
      console.log(`Database connection test: SUCCESS. Query took ${endTime - startTime}ms`);
      console.log(`Current user count: ${userCount}`);
    } catch (dbError) {
      console.error('Database connection test: FAILED', dbError);
      return NextResponse.json({
        status: 'error',
        message: 'Database connection failed',
        error: dbError instanceof Error ? dbError.message : 'Unknown database error',
        env: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
    
    // Parse request body
    const body = await request.json().catch(() => null);
    
    if (!body) {
      return NextResponse.json({
        status: 'error',
        message: 'Invalid request body'
      }, { status: 400 });
    }
    
    const { name, email, password } = body;
    
    // Validate request
    if (!email || !password) {
      return NextResponse.json({
        status: 'error',
        message: 'Email and password are required'
      }, { status: 400 });
    }
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return NextResponse.json({
        status: 'error',
        message: 'User already exists'
      }, { status: 409 });
    }
    
    // Create user
    const hashedPassword = simpleHash(password);
    
    const user = await prisma.user.create({
      data: {
        name: name || email.split('@')[0],
        email,
        password: hashedPassword,
      }
    });
    
    // Return successful response
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      status: 'success',
      message: 'User registered successfully in test mode',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Registration test error:', error);
    
    // Check for specific database errors
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json({
        status: 'error',
        message: 'User already exists (caught in error handler)'
      }, { status: 409 });
    }
    
    return NextResponse.json({
      status: 'error',
      message: 'Registration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 