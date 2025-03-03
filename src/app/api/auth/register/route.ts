import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db/prisma';

export async function POST(request: Request) {
  try {
    console.log('Registration process started');
    
    const { name, email, password } = await request.json();
    console.log('Parsed registration data:', { name, emailProvided: !!email, passwordProvided: !!password });

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
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('User already exists:', email);
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
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    console.log('User created successfully:', user.id);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: userWithoutPassword 
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