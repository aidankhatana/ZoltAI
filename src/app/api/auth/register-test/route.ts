import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/db/prisma';

// Simple hash function that doesn't use bcrypt
function simpleHash(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  try {
    console.log('Test registration process started');
    
    // Parse request body
    let name, email, password;
    try {
      const body = await request.json();
      name = body.name;
      email = body.email;
      password = body.password;
      console.log('Parsed registration data:', { 
        name, 
        emailProvided: !!email, 
        passwordProvided: !!password 
      });
    } catch (parseError) {
      console.error('Failed to parse request JSON:', parseError);
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Validate input
    if (!email || !password) {
      console.log('Validation failed: Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('Checking if user exists:', email);
    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email },
      });
      console.log('User exists check result:', !!existingUser);
    } catch (dbError: any) {
      console.error('Database error during user lookup:', {
        message: dbError.message,
        code: dbError.code
      });
      return NextResponse.json(
        { error: 'Database error during registration' },
        { status: 500 }
      );
    }

    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password with simple method
    console.log('Hashing password with simple method');
    const hashedPassword = simpleHash(password);
    console.log('Password hashed successfully');

    // Create user
    console.log('Creating user in database');
    let user;
    try {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      console.log('User created successfully:', user.id);
    } catch (createError: any) {
      console.error('User creation error:', {
        message: createError.message,
        code: createError.code
      });
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      );
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { 
        message: 'User registered successfully (TEST MODE)',
        user: userWithoutPassword,
        note: "This is a test endpoint that uses simple password hashing"
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration test error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });
    
    return NextResponse.json(
      { 
        error: 'Something went wrong during test registration',
        details: process.env.NODE_ENV === 'production' 
          ? 'See server logs for details' 
          : error.message
      },
      { status: 500 }
    );
  }
} 