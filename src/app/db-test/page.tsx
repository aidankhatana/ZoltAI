import React from 'react';

// This ensures the page is generated at request time, not build time
export const dynamic = 'force-dynamic';

export default async function DbTestPage() {
  let message = '';
  let error: any = null;
  let count = 0;
  let queryTime = 0;
  let timestamp = '';
  let environment = '';
  
  try {
    // Fetch from our working API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || ''}/api/public-db-test`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'success') {
      message = data.message;
      count = data.userCount;
      queryTime = data.queryTime;
      timestamp = data.timestamp;
      environment = data.environment;
    } else {
      throw new Error(data.message || 'Unknown error occurred');
    }
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
        <div className="p-4 bg-gray-100 rounded space-y-2">
          <p>User count: {count}</p>
          <p>Query time: {queryTime}ms</p>
          <p>Timestamp: {timestamp}</p>
          <p>Environment: {environment}</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-100 rounded">
          <p className="font-bold">Error:</p>
          <pre className="whitespace-pre-wrap">{error instanceof Error ? error.message : JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
} 