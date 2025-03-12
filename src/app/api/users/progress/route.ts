import { NextRequest, NextResponse } from 'next/server';
import pgClient from '@/lib/db/pg-client';
import { verifyAuth } from '@/lib/auth';

interface Step {
  id: string;
  title: string;
  order: number;
  roadmapId: string;
}

interface Roadmap {
  id: string;
  title: string;
  topic: string;
  difficulty: string;
}

interface UserProgress {
  id: string | null;
  userId: string;
  roadmapId: string;
  stepId: string;
  completed: boolean;
  quizScore: number | null;
  completedAt: Date | null;
  step?: Step;
  roadmap?: Roadmap;
}

// Get user progress for all roadmaps or a specific roadmap
export async function GET(request: NextRequest) {
  try {
    const { userId } = await verifyAuth(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const url = new URL(request.url);
    const roadmapId = url.searchParams.get('roadmapId');
    const stepId = url.searchParams.get('stepId');
    
    // Build the where clause
    const where: any = { userId };
    
    if (roadmapId) {
      where.roadmapId = roadmapId;
    }
    
    if (stepId) {
      where.stepId = stepId;
    }
    
    // Get the user progress
    const userProgress = await pgClient.userProgress.findMany(where);
    
    return NextResponse.json({
      success: true,
      progress: userProgress
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user progress' },
      { status: 500 }
    );
  }
}

// Update user progress for a specific step
export async function POST(request: NextRequest) {
  try {
    const { userId } = await verifyAuth(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const { roadmapId, stepId, completed } = await request.json();
    
    if (!roadmapId || !stepId) {
      return NextResponse.json(
        { success: false, error: 'Roadmap ID and Step ID are required' },
        { status: 400 }
      );
    }
    
    // Verify that the roadmap exists
    const roadmap = await pgClient.roadmap.findUnique(roadmapId);
    
    if (!roadmap) {
      return NextResponse.json(
        { success: false, error: 'Roadmap not found' },
        { status: 404 }
      );
    }
    
    // Check if there is existing progress
    const existingProgress = await pgClient.userProgress.findFirst({
      userId,
      roadmapId,
      stepId
    });
    
    let userProgress;
    
    // Determine the completion status based on the input or existing state
    const isCompleted = completed !== undefined ? completed : true;
    
    // Update or create progress record
    if (existingProgress) {
      userProgress = await pgClient.userProgress.update(
        { id: existingProgress.id },
        {
          completed: isCompleted,
          completedAt: isCompleted ? new Date() : existingProgress.completedAt
        }
      );
    } else {
      userProgress = await pgClient.userProgress.create({
        userId,
        roadmapId,
        stepId,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : null
      });
    }
    
    return NextResponse.json({
      success: true,
      progress: userProgress
    });
  } catch (error) {
    console.error('Error updating user progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user progress' },
      { status: 500 }
    );
  }
}
