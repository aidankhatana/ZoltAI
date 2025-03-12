import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export const runtime = "nodejs";

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    databaseUrls: {
      found: false,
      urls: [],
      details: {}
    },
    connection: {
      attempted: false,
      successful: false,
      error: null
    }
  };
  
  try {
    // Check for environment variables
    const possibleUrls = [
      { name: 'POSTGRES_PRISMA_URL', value: process.env.POSTGRES_PRISMA_URL },
      { name: 'POSTGRES_URL', value: process.env.POSTGRES_URL },
      { name: 'DATABASE_URL', value: process.env.DATABASE_URL },
      { name: 'DIRECT_DATABASE_URL', value: process.env.DIRECT_DATABASE_URL },
    ].filter(item => Boolean(item.value));
    
    diagnostics.databaseUrls.found = possibleUrls.length > 0;
    diagnostics.databaseUrls.count = possibleUrls.length;
    
    // Sanitize URLs to not expose credentials
    diagnostics.databaseUrls.urls = possibleUrls.map(item => ({
      name: item.name,
      value: item.value ? item.value.replace(/\/\/.*?@/, '//****:****@') : null
    }));
    
    // Try connecting with each URL
    if (possibleUrls.length > 0) {
      diagnostics.connection.attempted = true;
      
      for (const item of possibleUrls) {
        const url = item.value as string;
        diagnostics.databaseUrls.details[item.name] = {
          attempted: true,
          successful: false,
          error: null
        };
        
        try {
          const pool = new Pool({ 
            connectionString: url,
            ssl: url.includes('supabase') ? {
              rejectUnauthorized: false
            } : undefined
          });
          
          const result = await pool.query('SELECT 1 as test');
          await pool.end();
          
          diagnostics.databaseUrls.details[item.name].successful = true;
          diagnostics.connection.successful = true;
          
          // If successful, no need to try other URLs
          break;
        } catch (error) {
          diagnostics.databaseUrls.details[item.name].error = error instanceof Error 
            ? error.message 
            : 'Unknown error';
        }
      }
    }
    
    return NextResponse.json(diagnostics);
  } catch (error) {
    return NextResponse.json({
      success: false,
      diagnostics,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 