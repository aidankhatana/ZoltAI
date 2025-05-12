import { NextRequest, NextResponse } from 'next/server';
import { generateRoadmap } from '@/lib/gemini';
import pgClient from '@/lib/db/pg-client';
import jwt from 'jsonwebtoken';
import { verifyAuth } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

// Helper to extract user from token
const getUserFromToken = (request: NextRequest) => {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    console.log('Token received:', token ? 'Present' : 'Missing');
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      email: string;
    };
    console.log('Token decoded successfully:', { userId: decoded.userId });
    return decoded;
  } catch (error: any) {
    console.error('Token verification error:', {
      name: error?.name,
      message: error?.message
    });
    return null;
  }
};

export async function POST(request: NextRequest) {
  console.log('!!! POST /api/roadmaps HANDLER ENTERED !!!');
  console.log('=== Starting Roadmap Creation ===');
  console.log('Request headers:', Object.fromEntries(request.headers.entries()));
  
  try {
    console.log('Step 1: Verifying authentication...');
    const { userId, token } = await verifyAuth(request);
    console.log('Auth verification result:', { userId, hasToken: !!token });
    
    if (!userId) {
      console.log('Authentication failed: No userId');
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    console.log('Step 2: Parsing request body...');
    let body;
    try {
      body = await request.json();
      console.log('Request body parsed successfully:', JSON.stringify(body, null, 2));
    } catch (parseError: any) {
      console.error('Failed to parse request body:', {
        error: parseError?.message,
        body: await request.text()
      });
      throw parseError;
    }
    
    const { topic, skillLevel, additionalInfo, isPublic = false } = body;
    
    if (!topic) {
      console.log('Validation failed: Topic is missing');
      return NextResponse.json(
        { success: false, error: 'Topic is required' },
        { status: 400 }
      );
    }

    console.log('Step 3: Generating roadmap with Gemini...');
    let roadmapData;
    try {
      roadmapData = await generateRoadmap({
        topic,
        skillLevel: skillLevel || 'Beginner',
        additionalInfo
      });
      console.log('Roadmap generated successfully:', {
        title: roadmapData.title,
        stepsCount: roadmapData.steps.length
      });
    } catch (geminiError: any) {
      console.error('Gemini API error:', {
        name: geminiError?.name,
        message: geminiError?.message,
        stack: geminiError?.stack
      });
      throw geminiError;
    }
    
    console.log('Step 4: Creating roadmap in database...');
    let roadmap;
    try {
      roadmap = await pgClient.roadmap.create({
        id: uuidv4(),
        topic,
        title: roadmapData.title,
        description: roadmapData.description,
        difficulty: skillLevel || 'Beginner',
        estimatedTime: roadmapData.estimatedTime,
        isPublic,
        userId,
        steps: roadmapData.steps.map(step => ({
          title: step.title,
          description: step.description,
          order: step.order,
          estimatedTime: step.estimatedTime,
          content: step.content,
          resources: step.resources.map(resource => ({
            title: resource.title || "Resource",
            url: resource.url,
            type: resource.type || "article"
          }))
        }))
      });
      console.log('Roadmap created successfully in database:', {
        id: roadmap.id,
        title: roadmap.title
      });
    } catch (dbError: any) {
      console.error('Database error:', {
        name: dbError?.name,
        message: dbError?.message,
        stack: dbError?.stack,
        code: dbError?.code
      });
      throw dbError;
    }
    
    console.log('=== Roadmap Creation Completed Successfully ===');
    return NextResponse.json({ 
      success: true, 
      roadmap,
      message: 'Roadmap created successfully' 
    });
  } catch (error: any) {
    console.error('=== Roadmap Creation Failed ===', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      cause: error?.cause,
      code: error?.code
    });
    
    // Return more detailed error information
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create roadmap',
        details: {
          message: error?.message,
          type: error?.name,
          code: error?.code
        }
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const isPublic = url.searchParams.get('isPublic') === 'true';
    
    let whereClause: any = {};
    
    if (userId) {
      whereClause.userId = userId;
    }
    
    if (isPublic !== null) {
      whereClause.isPublic = isPublic;
    }
    
    const roadmaps = await pgClient.roadmap.findMany(whereClause);
    
    return NextResponse.json({ success: true, roadmaps });
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch roadmaps' },
      { status: 500 }
    );
  }
} 