import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import jwt from 'jsonwebtoken';

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
      id: string;
      email: string;
    };
  } catch (error) {
    return null;
  }
};

// Update progress for a specific step
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromToken(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { roadmapId, stepId, completed, quizScore } = await request.json();

    if (!roadmapId || !stepId) {
      return NextResponse.json(
        { error: 'Roadmap ID and Step ID are required' },
        { status: 400 }
      );
    }

    // Update or create progress record
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_roadmapId_stepId: {
          userId: user.id,
          roadmapId,
          stepId
        }
      },
      update: {
        completed: completed !== undefined ? completed : undefined,
        quizScore: quizScore !== undefined ? quizScore : undefined,
        completedAt: completed ? new Date() : undefined
      },
      create: {
        userId: user.id,
        roadmapId,
        stepId,
        completed: completed || false,
        quizScore: quizScore,
        completedAt: completed ? new Date() : undefined
      }
    });

    return NextResponse.json({
      message: 'Progress updated successfully',
      progress
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}

// Get all progress for a user
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromToken(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const roadmapId = searchParams.get('roadmapId');

    let query: any = {
      where: {
        userId: user.id
      },
      include: {
        roadmap: {
          select: {
            id: true,
            title: true,
            topic: true,
            difficulty: true
          }
        },
        step: {
          select: {
            id: true,
            title: true,
            order: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    };

    // Filter by roadmap if provided
    if (roadmapId) {
      query.where.roadmapId = roadmapId;
    }

    const progress = await prisma.userProgress.findMany(query);
    
    // Group progress by roadmap for better client-side handling
    const progressByRoadmap: Record<string, any> = {};
    
    progress.forEach(item => {
      // TypeScript can't infer that include adds these properties, so we check for them
      const roadmapData = 'roadmap' in item ? item.roadmap : null;
      const stepData = 'step' in item ? item.step : null;
      
      if (!progressByRoadmap[item.roadmapId] && roadmapData) {
        progressByRoadmap[item.roadmapId] = {
          roadmap: roadmapData,
          steps: []
        };
      }
      
      if (progressByRoadmap[item.roadmapId] && stepData) {
        progressByRoadmap[item.roadmapId].steps.push({
          stepId: item.stepId,
          step: stepData,
          completed: item.completed,
          quizScore: item.quizScore,
          completedAt: item.completedAt
        });
      }
    });

    return NextResponse.json({
      progress: Object.values(progressByRoadmap)
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user progress' },
      { status: 500 }
    );
  }
} 