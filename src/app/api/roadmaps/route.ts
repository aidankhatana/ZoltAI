import { NextRequest, NextResponse } from 'next/server';
import { generateRoadmap } from '@/lib/gemini';
import prisma from '@/lib/db/prisma';
import jwt from 'jsonwebtoken';
import { verifyAuth } from '@/lib/auth';

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
    const { userId, token } = await verifyAuth(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const { topic, skillLevel, additionalInfo, isPublic = false } = await request.json();
    
    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Generate roadmap content using Gemini API
    const roadmapData = await generateRoadmap({
      topic,
      skillLevel: skillLevel || 'Beginner',
      additionalInfo
    });
    
    // Create the roadmap in the database
    const roadmap = await prisma.roadmap.create({
      data: {
        topic,
        title: roadmapData.title,
        description: roadmapData.description,
        difficulty: skillLevel || 'Beginner',
        estimatedTime: roadmapData.estimatedTime,
        isPublic,
        userId,
        steps: {
          create: roadmapData.steps.map(step => ({
            title: step.title,
            description: step.description,
            order: step.order,
            estimatedTime: step.estimatedTime,
            content: step.content,
            resources: {
              create: step.resources.map(resource => ({
                title: resource.title || "Resource",
                url: resource.url,
                type: resource.type || "article"
              }))
            }
          }))
        }
      },
      include: {
        steps: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      roadmap,
      message: 'Roadmap created successfully' 
    });
  } catch (error) {
    console.error('Error creating roadmap:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create roadmap' },
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
    
    const roadmaps = await prisma.roadmap.findMany({
      where: whereClause,
      include: {
        steps: {
          orderBy: {
            order: 'asc'
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json({ success: true, roadmaps });
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch roadmaps' },
      { status: 500 }
    );
  }
} 