import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-dev';

export async function POST(request: Request) {
  try {
    console.log('Login test process started');
    
    // Parse request body
    let email, password;
    try {
      const body = await request.json();
      email = body.email;
      password = body.password;
      console.log('Request parsed:', { emailProvided: !!email, passwordProvided: !!password });
    } catch (parseError) {
      console.error('Failed to parse request JSON:', parseError);
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!email || !password) {
      console.log('Validation failed: Missing email or password');
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find the user by email
    console.log('Looking up user by email without password check');
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email }
      });
      console.log('User lookup result:', { found: !!user });
    } catch (dbError: any) {
      console.error('Database error during user lookup:', {
        message: dbError.message,
        code: dbError.code
      });
      return NextResponse.json(
        { success: false, error: 'Database error during login' },
        { status: 500 }
      );
    }

    if (!user) {
      console.log('User not found:', email);
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Skip password verification for testing
    console.log('Skip password check for testing purposes');

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
    } catch (jwtError) {
      console.error('JWT signing error:', jwtError);
      return NextResponse.json(
        { success: false, error: 'Error generating authentication token' },
        { status: 500 }
      );
    }

    console.log('Test login successful for user:', email);
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        message: "This is a test login that bypasses password verification for debugging"
      }
    });

  } catch (error: any) {
    console.error('Login test error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred during test login',
        details: process.env.NODE_ENV === 'production' 
          ? 'See server logs for details' 
          : error.message
      },
      { status: 500 }
    );
  }
} 