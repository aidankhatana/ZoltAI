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

// Get quiz by step ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const stepId = params.id;
    
    // Verify step exists
    const step = await prisma.step.findUnique({
      where: { id: stepId },
      include: {
        roadmap: {
          select: {
            isPublic: true,
            userId: true
          }
        }
      }
    });

    if (!step) {
      return NextResponse.json(
        { error: 'Step not found' },
        { status: 404 }
      );
    }

    // Check if user has access to this step's roadmap
    if (!step.roadmap.isPublic) {
      const user = getUserFromToken(request);
      
      if (!user || (step.roadmap.userId && user.id !== step.roadmap.userId)) {
        return NextResponse.json(
          { error: 'Unauthorized to access this quiz' },
          { status: 403 }
        );
      }
    }

    // Get quiz for this step
    const quiz = await prisma.quiz.findUnique({
      where: { stepId },
      include: {
        questions: {
          select: {
            id: true,
            text: true,
            options: true,
            // Don't include correct answer in initial fetch
          }
        }
      }
    });

    if (!quiz) {
      return NextResponse.json(
        { error: 'No quiz available for this step' },
        { status: 404 }
      );
    }

    return NextResponse.json({ quiz });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quiz' },
      { status: 500 }
    );
  }
}

// Submit quiz answers
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const stepId = params.id;
    const user = getUserFromToken(request);
    const { answers } = await request.json();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Answers must be an array' },
        { status: 400 }
      );
    }

    // Get step and roadmap
    const step = await prisma.step.findUnique({
      where: { id: stepId },
      select: {
        id: true,
        roadmapId: true
      }
    });

    if (!step) {
      return NextResponse.json(
        { error: 'Step not found' },
        { status: 404 }
      );
    }

    // Get quiz with correct answers
    const quiz = await prisma.quiz.findUnique({
      where: { stepId },
      include: {
        questions: {
          select: {
            id: true,
            correctOption: true,
            explanation: true
          }
        }
      }
    });

    if (!quiz) {
      return NextResponse.json(
        { error: 'No quiz available for this step' },
        { status: 404 }
      );
    }

    // Grade the quiz
    const questionMap = new Map(quiz.questions.map(q => [q.id, q]));
    let correctCount = 0;
    const results: Array<{
      questionId: string;
      correct: boolean;
      explanation: string | null;
    }> = [];

    answers.forEach((answer: { questionId: string; selectedOption: number }) => {
      const question = questionMap.get(answer.questionId);
      
      if (question) {
        const isCorrect = answer.selectedOption === question.correctOption;
        results.push({
          questionId: answer.questionId,
          correct: isCorrect,
          explanation: question.explanation || null
        });
        
        if (isCorrect) {
          correctCount++;
        }
      }
    });

    const totalQuestions = quiz.questions.length;
    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Update user progress
    await prisma.userProgress.upsert({
      where: {
        userId_roadmapId_stepId: {
          userId: user.id,
          roadmapId: step.roadmapId,
          stepId
        }
      },
      update: {
        quizScore: score,
        completed: score >= 70, // Mark as completed if score is at least 70%
        completedAt: score >= 70 ? new Date() : undefined
      },
      create: {
        userId: user.id,
        roadmapId: step.roadmapId,
        stepId,
        quizScore: score,
        completed: score >= 70,
        completedAt: score >= 70 ? new Date() : undefined
      }
    });

    return NextResponse.json({
      score,
      totalQuestions,
      correctCount,
      results,
      passed: score >= 70
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json(
      { error: 'Failed to process quiz submission' },
      { status: 500 }
    );
  }
} 