import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
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
    const { userId, token } = await verifyAuth(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const url = new URL(request.url);
    const roadmapId = url.searchParams.get('roadmapId');
    
    // Query parameters for the database
    const whereClause: any = {
      userId
    };
    
    if (roadmapId) {
      whereClause.roadmapId = roadmapId;
    }
    
    // Get user progress
    const userProgress = await prisma.userProgress.findMany({
      where: whereClause,
      include: {
        step: {
          select: {
            id: true,
            title: true,
            order: true,
            roadmapId: true
          }
        },
        roadmap: {
          select: {
            id: true,
            title: true,
            topic: true,
            difficulty: true
          }
        }
      },
      orderBy: {
        completedAt: 'desc'
      }
    });
    
    // If a specific roadmap was requested, also get the steps that don't have progress
    if (roadmapId) {
      const roadmap = await prisma.roadmap.findUnique({
        where: { id: roadmapId },
        include: {
          steps: {
            orderBy: {
              order: 'asc'
            }
          }
        }
      });
      
      if (!roadmap) {
        return NextResponse.json(
          { success: false, error: 'Roadmap not found' },
          { status: 404 }
        );
      }
      
      // Create a map of existing progress entries
      const progressMap = new Map(
        userProgress.map((progress: UserProgress) => [progress.stepId, progress])
      );
      
      // Create complete progress data including steps without progress
      const completeProgress = roadmap.steps.map((step: Step) => {
        const progress = progressMap.get(step.id);
        
        if (progress) {
          return progress;
        }
        
        // Return a default progress object for steps without progress
        return {
          id: null,
          userId,
          roadmapId,
          stepId: step.id,
          completed: false,
          quizScore: null,
          completedAt: null,
          step: {
            id: step.id,
            title: step.title,
            order: step.order,
            roadmapId
          },
          roadmap: {
            id: roadmapId,
            title: roadmap.title,
            topic: roadmap.topic,
            difficulty: roadmap.difficulty
          }
        };
      });
      
      return NextResponse.json({ 
        success: true, 
        progress: completeProgress,
        roadmapTitle: roadmap.title
      });
    }
    
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
    const { userId, token } = await verifyAuth(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const { roadmapId, stepId, completed, quizScore } = await request.json();
    
    if (!roadmapId || !stepId) {
      return NextResponse.json(
        { success: false, error: 'Roadmap ID and Step ID are required' },
        { status: 400 }
      );
    }
    
    // Check if user progress already exists
    const existingProgress = await prisma.userProgress.findFirst({
      where: {
        userId,
        roadmapId,
        stepId
      }
    });
    
    let userProgress;
    
    if (existingProgress) {
      // Update existing progress
      userProgress = await prisma.userProgress.update({
        where: { id: existingProgress.id },
        data: {
          completed: completed !== undefined ? completed : existingProgress.completed,
          quizScore: quizScore !== undefined ? quizScore : existingProgress.quizScore,
          completedAt: completed ? new Date() : existingProgress.completedAt
        }
      });
    } else {
      // Create new progress
      userProgress = await prisma.userProgress.create({
        data: {
          userId,
          roadmapId,
          stepId,
          completed: !!completed,
          quizScore,
          completedAt: completed ? new Date() : null
        }
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
