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
  const token = request.headers.get('authorization')?.split(' ')[1];
  
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      email: string;
    };
  } catch (error) {
    return null;
  }
};

export async function POST(request: NextRequest) {
  try {
    console.log('Starting roadmap creation...');
    
    const { userId, token } = await verifyAuth(request);
    console.log('Auth verified, userId:', userId);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    const { topic, skillLevel, additionalInfo, isPublic = false } = body;
    
    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Topic is required' },
        { status: 400 }
      );
    }

    console.log('Generating roadmap with Gemini...');
    // Generate roadmap content using Gemini API
    const roadmapData = await generateRoadmap({
      topic,
      skillLevel: skillLevel || 'Beginner',
      additionalInfo
    });
    console.log('Roadmap generated successfully');
    
    console.log('Creating roadmap in database...');
    // Create roadmap with PostgreSQL client
    const roadmap = await pgClient.roadmap.create({
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
    console.log('Roadmap created successfully in database');
    
    return NextResponse.json({ 
      success: true, 
      roadmap,
      message: 'Roadmap created successfully' 
    });
  } catch (error: any) {
    console.error('Detailed error in roadmap creation:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      cause: error?.cause
    });
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create roadmap',
        details: error?.message 
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