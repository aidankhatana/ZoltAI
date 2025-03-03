import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Basic connection test
    console.log('Attempting to connect to database with URL:', 
      process.env.DATABASE_URL ? 
      `${process.env.DATABASE_URL.split('@')[0].split(':')[0]}:****@${process.env.DATABASE_URL.split('@')[1]}` : 
      'DATABASE_URL not set');
    
    // Try to count users (a simple query)
    console.log('Executing count query...');
    const userCount = await prisma.user.count();
    
    console.log('Database connection successful. User count:', userCount);
    
    // Test Prisma client
    const clientInfo = {
      connected: !!prisma,
      provider: 'Prisma'
    };
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount,
      environment: process.env.NODE_ENV || 'unknown',
      runtime: process.env.NEXT_RUNTIME || 'unknown',
      databaseUrl: process.env.DATABASE_URL ? 
        `${process.env.DATABASE_URL.split('@')[0].split(':')[0]}:****@${process.env.DATABASE_URL.split('@')[1]}` : 
        'DATABASE_URL not set',
      clientInfo
    });
  } catch (error: any) {
    console.error('Database connection error details:', {
      message: error.message,
      name: error.name,
      code: error.code,
      stack: error.stack
    });
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
      errorCode: error.code,
      errorName: error.name,
      stack: error.stack || 'No stack trace available',
      environment: process.env.NODE_ENV || 'unknown',
      runtime: process.env.NEXT_RUNTIME || 'unknown',
      databaseUrl: process.env.DATABASE_URL ? 
        `${process.env.DATABASE_URL.split('@')[0].split(':')[0]}:****@${process.env.DATABASE_URL.split('@')[1]}` : 
        'DATABASE_URL not set'
    }, { status: 500 });
  }
} 