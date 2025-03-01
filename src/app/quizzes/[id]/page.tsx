'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface QuizPageProps {
  params: {
    id: string;
  };
}

interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctOption?: number;
  explanation?: string;
}

interface Quiz {
  id: string;
  questions: QuizQuestion[];
  stepId: string;
  step: {
    id: string;
    title: string;
    roadmapId: string;
  };
}

export default function QuizPage({ params }: QuizPageProps) {
  const { id } = params; // This is the step ID
  const router = useRouter();
  const { user, token } = useAuth();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState<{
    score: number;
    totalQuestions: number;
    correctCount: number;
    results: { correct: boolean; selectedOption: number; correctOption: number }[];
  } | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!token) {
          router.push('/login?redirect=' + encodeURIComponent(`/quizzes/${id}`));
          return;
        }
        
        const response = await fetch(`/api/quizzes/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch quiz');
        }
        
        const data = await response.json();
        setQuiz(data.quiz);
        
        // Initialize selected answers array with -1 for each question (no selection)
        if (data.quiz && data.quiz.questions) {
          setSelectedAnswers(new Array(data.quiz.questions.length).fill(-1));
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuiz();
  }, [id, token, router]);

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (submitted || quizResults) return; // Prevent changing answers after submission
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    try {
      setSubmitted(true);
      
      if (!token || !quiz) {
        setError('You must be logged in to submit the quiz');
        return;
      }
      
      const response = await fetch(`/api/quizzes/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          answers: selectedAnswers
        })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit quiz');
      }
      
      const data = await response.json();
      setQuizResults(data);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Quiz</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            &larr; Go back
          </button>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h2 className="text-xl font-semibold text-yellow-700 mb-2">Quiz Not Found</h2>
          <p className="text-yellow-600">The quiz you are looking for does not exist or you don't have permission to view it.</p>
          <button 
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            &larr; Go back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];
  const allQuestionsAnswered = selectedAnswers.every(answer => answer !== -1);
  
  // Render quiz results if available
  if (quizResults) {
    const passedQuiz = quizResults.score >= 70;
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link 
            href={`/roadmaps/${quiz.step.roadmapId}`}
            className="text-blue-600 hover:text-blue-800 flex items-center mb-6"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Roadmap
          </Link>
          
          <div className={`p-6 rounded-lg ${
            passedQuiz ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-2 ${
              passedQuiz ? 'text-green-700' : 'text-yellow-700'
            }`}>
              {passedQuiz ? 'Quiz Passed! 🎉' : 'Quiz Results'}
            </h2>
            
            <div className="flex items-center mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div 
                  className={`h-2.5 rounded-full ${passedQuiz ? 'bg-green-600' : 'bg-yellow-500'}`} 
                  style={{ width: `${quizResults.score}%` }}
                ></div>
              </div>
              <span className="text-gray-700 font-medium">{quizResults.score}%</span>
            </div>
            
            <p className="mb-6">
              You answered {quizResults.correctCount} out of {quizResults.totalQuestions} questions correctly.
              {passedQuiz 
                ? ' Great job! You can now move on to the next step.' 
                : ' Review the material and try again to improve your score.'}
            </p>
            
            <div className="space-y-6 mb-6">
              {quiz.questions.map((question, index) => {
                const result = quizResults.results[index];
                const isCorrect = result.correct;
                
                return (
                  <div 
                    key={question.id} 
                    className={`p-4 rounded-lg ${
                      isCorrect ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    <h3 className="font-medium mb-2">Question {index + 1}: {question.text}</h3>
                    
                    <div className="space-y-2 mb-3">
                      {question.options.map((option, optionIndex) => (
                        <div 
                          key={optionIndex}
                          className={`p-2 rounded ${
                            optionIndex === result.selectedOption && optionIndex === result.correctOption
                              ? 'bg-green-200 border border-green-300'
                              : optionIndex === result.selectedOption
                              ? 'bg-red-200 border border-red-300'
                              : optionIndex === result.correctOption
                              ? 'bg-green-200 border border-green-300'
                              : 'bg-white border border-gray-200'
                          }`}
                        >
                          {option}
                          {optionIndex === result.correctOption && (
                            <span className="ml-2 text-green-600">✓</span>
                          )}
                          {optionIndex === result.selectedOption && optionIndex !== result.correctOption && (
                            <span className="ml-2 text-red-600">✗</span>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {question.explanation && (
                      <div className="text-sm bg-white p-3 rounded border border-gray-200">
                        <span className="font-medium">Explanation: </span>
                        {question.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between">
              <Link 
                href={`/roadmaps/${quiz.step.roadmapId}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium"
              >
                Return to Roadmap
              </Link>
              
              {!passedQuiz && (
                <button
                  onClick={() => {
                    setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
                    setCurrentQuestion(0);
                    setSubmitted(false);
                    setQuizResults(null);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md text-sm font-medium"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render quiz questions
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href={`/roadmaps/${quiz.step.roadmapId}`}
          className="text-blue-600 hover:text-blue-800 flex items-center mb-6"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Roadmap
        </Link>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-blue-50 border-b border-blue-100">
            <h1 className="text-2xl font-bold text-gray-900">Quiz: {quiz.step.title}</h1>
            <p className="text-gray-600 mt-1">
              Test your knowledge to complete this step.
            </p>
            
            <div className="flex mt-4">
              {quiz.questions.map((_, index) => (
                <div 
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm ${
                    index === currentQuestion
                      ? 'bg-blue-500 text-white'
                      : selectedAnswers[index] !== -1
                      ? 'bg-green-200 text-green-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                  style={{ cursor: 'pointer' }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">
                Question {currentQuestion + 1} of {quiz.questions.length}: {currentQuestionData.text}
              </h2>
              
              <div className="space-y-3">
                {currentQuestionData.options.map((option, index) => (
                  <div 
                    key={index}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedAnswers[currentQuestion] === index
                        ? 'bg-blue-50 border-blue-300'
                        : 'hover:bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[currentQuestion] === index && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      {option}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={goToPreviousQuestion}
                disabled={currentQuestion === 0}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentQuestion === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Previous
              </button>
              
              {currentQuestion < quiz.questions.length - 1 ? (
                <button
                  onClick={goToNextQuestion}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={!allQuestionsAnswered}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    allQuestionsAnswered
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        </div>
        
        {!allQuestionsAnswered && currentQuestion === quiz.questions.length - 1 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
            Please answer all questions before submitting the quiz.
          </div>
        )}
      </div>
    </div>
  );
} 