import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Try to count users (a simple query)
    const userCount = await prisma.user.count();
    
    console.log('Database connection successful. User count:', userCount);
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount,
      dbUrl: process.env.DATABASE_URL?.substring(0, 20) + '...' // Show just the start for security
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
      stack: error.stack || 'No stack trace available'
    }, { status: 500 });
  }
} 