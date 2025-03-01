import { NextRequest, NextResponse } from 'next/server';
import { generateRoadmap, generateStepContent, generateQuiz } from '@/lib/gemini';
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

export async function POST(request: NextRequest) {
  try {
    // Get user from token (optional - public roadmaps allowed)
    const user = getUserFromToken(request);
    
    const { topic, skillLevel, additionalInfo, isPublic = false } = await request.json();

    if (!topic || !skillLevel) {
      return NextResponse.json(
        { error: 'Topic and skill level are required' },
        { status: 400 }
      );
    }

    // Step 1: Generate roadmap structure
    const roadmapData = await generateRoadmap({
      topic,
      skillLevel,
      additionalInfo
    });

    // Step 2: Start a transaction to create the roadmap and steps
    const createdRoadmap = await prisma.$transaction(async (tx) => {
      // Create roadmap
      const roadmap = await tx.roadmap.create({
        data: {
          title: roadmapData.title,
          description: roadmapData.description,
          topic,
          difficulty: roadmapData.difficulty,
          estimatedTime: roadmapData.estimatedTime,
          isPublic,
          userId: user?.id // Link to user if authenticated
        }
      });

      // Create steps with content
      for (const [index, step] of roadmapData.steps.entries()) {
        // Generate detailed content for this step
        const content = await generateStepContent({
          topic,
          stepTitle: step.title,
          skillLevel
        });

        // Generate quiz for this step
        const quizData = await generateQuiz({
          stepTitle: step.title,
          stepContent: content
        });

        // Create step
        const createdStep = await tx.step.create({
          data: {
            title: step.title,
            description: step.description,
            order: step.order || index + 1,
            estimatedTime: step.estimatedTime,
            content,
            roadmapId: roadmap.id,
            resources: {
              create: step.resources.map((resource: any) => ({
                title: resource.title,
                url: resource.url,
                type: resource.type
              }))
            }
          }
        });

        // Create quiz for this step
        if (quizData && quizData.questions && quizData.questions.length > 0) {
          const quiz = await tx.quiz.create({
            data: {
              stepId: createdStep.id,
              questions: {
                create: quizData.questions.map((q: any) => ({
                  text: q.text,
                  options: q.options,
                  correctOption: q.correctOption,
                  explanation: q.explanation
                }))
              }
            }
          });
        }
      }

      // Return created roadmap with all relations
      return tx.roadmap.findUnique({
        where: { id: roadmap.id },
        include: {
          steps: {
            include: {
              resources: true,
              quiz: {
                include: {
                  questions: true
                }
              }
            },
            orderBy: {
              order: 'asc'
            }
          }
        }
      });
    });

    return NextResponse.json({
      message: 'Roadmap created successfully',
      roadmap: createdRoadmap
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating roadmap:', error);
    return NextResponse.json(
      { error: 'Failed to create roadmap' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const isPublic = searchParams.get('public') === 'true';
    const topic = searchParams.get('topic');
    
    const user = getUserFromToken(request);
    
    // Build query filters
    const filters: any = {};
    
    if (isPublic) {
      filters.isPublic = true;
    }
    
    if (userId) {
      filters.userId = userId;
    }
    
    if (topic) {
      filters.topic = {
        contains: topic,
        mode: 'insensitive'
      };
    }
    
    // If user is requesting their own roadmaps, we can show private ones too
    if (user && user.id === userId) {
      // Let them see all their roadmaps, both public and private
      delete filters.isPublic;
    } else if (!isPublic && !user) {
      // If not public and no authenticated user, return error
      return NextResponse.json(
        { error: 'Authentication required to view private roadmaps' },
        { status: 401 }
      );
    }
    
    // Get roadmaps
    const roadmaps = await prisma.roadmap.findMany({
      where: filters,
      include: {
        steps: {
          select: {
            id: true,
            title: true,
            description: true,
            order: true,
            estimatedTime: true
          },
          orderBy: {
            order: 'asc'
          }
        },
        user: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json({ roadmaps });
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    return NextResponse.json(
      { error: 'Failed to fetch roadmaps' },
      { status: 500 }
    );
  }
} 