import { PrismaClient } from '@prisma/client';
import React from 'react';

// This ensures the page is generated at build time
export const dynamic = 'force-static';

export default async function DbTestPage() {
  let message = '';
  let error: any = null;
  let count = 0;
  
  try {
    console.log('Connecting to database...');
    const prisma = new PrismaClient();
    
    // Try to get a count of users
    count = await prisma.user.count();
    message = 'Successfully connected to database';
    
    // Close the connection
    await prisma.$disconnect();
  } catch (e) {
    error = e;
    message = 'Failed to connect to database';
    console.error('Database connection error:', e);
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      <div className="mb-4">
        <p className="font-semibold">Status: <span className={error ? "text-red-500" : "text-green-500"}>{message}</span></p>
      </div>
      {!error && (
        <div className="p-4 bg-gray-100 rounded">
          <p>User count: {count}</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-100 rounded">
          <p className="font-bold">Error:</p>
          <pre className="whitespace-pre-wrap">{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
} 