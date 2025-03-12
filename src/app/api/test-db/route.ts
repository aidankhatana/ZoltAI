import { NextRequest, NextResponse } from 'next/server';
import pgClient from '@/lib/db/pg-client';

export async function GET(request: NextRequest) {
  try {
    // Do a simple database query to verify connection
    const query = 'SELECT 1 as test';
    const result = await pgClient.query(query);
    
    // If we made it here, the connection is working
    const userCount = await pgClient.user.count();
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection is working',
      userCount,
      testResult: result.rows[0]
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to database' },
      { status: 500 }
    );
  }
} 