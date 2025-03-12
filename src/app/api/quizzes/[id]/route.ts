import { NextRequest, NextResponse } from 'next/server';
import pgClient from '@/lib/db/pg-client';
import { verifyAuth } from '@/lib/auth';

interface QuizQuestion {
  id: string;
  correctAnswer: string;
  correctOption: number;
}

// Get a quiz by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Find the quiz
    const quiz = await pgClient.quiz.findUnique(id, true);
    
    if (!quiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      quiz 
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quiz' },
      { status: 500 }
    );
  }
}

// Submit a quiz answer and get score
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await verifyAuth(request);
    const quizId = params.id;
    const { answers } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { success: false, error: 'Valid answers are required' },
        { status: 400 }
      );
    }
    
    // Get the quiz with questions and correct answers
    const quiz = await pgClient.quiz.findUnique(quizId, true);
    
    if (!quiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    // Score the quiz
    let correctAnswers = 0;
    const totalQuestions = quiz.questions.length;
    
    // Create a map of question IDs to correct answers
    const questionMap = new Map(
      quiz.questions.map((q: QuizQuestion) => [q.id, q.correctOption.toString()])
    );
    
    // Check each answer against the correct answer
    for (const answer of answers) {
      const { questionId, selectedAnswer } = answer;
      const correctAnswer = questionMap.get(questionId);
      
      if (correctAnswer && selectedAnswer === correctAnswer) {
        correctAnswers++;
      }
    }
    
    // Calculate score percentage
    const scorePercentage = totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;
    
    // Record the progress in UserProgress instead of quizAttempt
    if (quiz.step) {
      // Update the user's progress for this step
      const existingProgress = await pgClient.userProgress.findFirst({
        userId,
        roadmapId: quiz.step.roadmapId,
        stepId: quiz.step.id
      });

      if (existingProgress) {
        await pgClient.userProgress.update(
          { id: existingProgress.id }, 
          {
            quizScore: scorePercentage,
            completed: scorePercentage >= 70, 
            completedAt: scorePercentage >= 70 ? new Date() : existingProgress.completedAt
          }
        );
      } else {
        await pgClient.userProgress.create({
          userId,
          stepId: quiz.step.id,
          roadmapId: quiz.step.roadmapId,
          quizScore: scorePercentage,
          completed: scorePercentage >= 70,
          completedAt: scorePercentage >= 70 ? new Date() : null
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      score: {
        correct: correctAnswers,
        total: totalQuestions,
        percentage: scorePercentage
      },
      isPassing: scorePercentage >= 70
    });
  } catch (error) {
    console.error('Error scoring quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process quiz submission' },
      { status: 500 }
    );
  }
} 