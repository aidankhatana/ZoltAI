'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRoadmaps } from '@/contexts/RoadmapContext';

interface RoadmapPageProps {
  params: {
    id: string;
  };
}

export default function RoadmapPage({ params }: RoadmapPageProps) {
  const { id } = params;
  const router = useRouter();
  const { user } = useAuth();
  const { fetchRoadmap, currentRoadmap, loading, error, updateProgress, fetchRoadmapProgress } = useRoadmaps();
  
  const [progressData, setProgressData] = useState<any>(null);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const loadRoadmap = async () => {
      await fetchRoadmap(id);
      
      if (user) {
        const progress = await fetchRoadmapProgress(id);
        setProgressData(progress);
      }
    };
    
    loadRoadmap();
  }, [id, user]);

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
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Roadmap</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => router.push('/roadmaps')}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            &larr; Go back to roadmaps
          </button>
        </div>
      </div>
    );
  }

  if (!currentRoadmap) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h2 className="text-xl font-semibold text-yellow-700 mb-2">Roadmap Not Found</h2>
          <p className="text-yellow-600">The roadmap you are looking for does not exist or you don't have permission to view it.</p>
          <button 
            onClick={() => router.push('/roadmaps')}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            &larr; Go back to roadmaps
          </button>
        </div>
      </div>
    );
  }

  const toggleStepExpand = (stepId: string) => {
    setIsExpanded(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const isStepCompleted = (stepId: string) => {
    if (!progressData || !progressData.steps) return false;
    const stepProgress = progressData.steps.find((s: any) => s.stepId === stepId);
    return stepProgress?.completed || false;
  };

  const markStepComplete = async (stepId: string) => {
    if (!user) {
      router.push('/login?redirect=' + encodeURIComponent(`/roadmaps/${id}`));
      return;
    }

    const success = await updateProgress(id, stepId, true);
    if (success) {
      // Refresh progress data
      const progress = await fetchRoadmapProgress(id);
      setProgressData(progress);
    }
  };

  const calculateProgress = () => {
    if (!progressData || !progressData.steps || !currentRoadmap.steps) return 0;
    const completedSteps = progressData.steps.filter((s: any) => s.completed).length;
    return Math.round((completedSteps / currentRoadmap.steps.length) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Roadmap Header */}
        <div className="mb-8">
          <Link href="/roadmaps" className="text-blue-600 hover:text-blue-800 flex items-center mb-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Roadmaps
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">{currentRoadmap.title}</h1>
          <p className="text-gray-600 mb-4">{currentRoadmap.description}</p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {currentRoadmap.topic}
            </div>
            <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              {currentRoadmap.difficulty}
            </div>
            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {currentRoadmap.estimatedTime}
            </div>
          </div>
          
          {progressData && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-1">Your Progress: {calculateProgress()}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Roadmap Steps */}
        <div className="space-y-6">
          {currentRoadmap.steps.map((step, index) => {
            const isCompleted = isStepCompleted(step.id);
            const isExpand = isExpanded[step.id] || false;
            
            return (
              <div 
                key={step.id} 
                className={`border rounded-lg overflow-hidden ${
                  isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div 
                  className="p-4 cursor-pointer flex items-center justify-between"
                  onClick={() => toggleStepExpand(step.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="text-sm text-gray-500">{step.estimatedTime}</p>
                    </div>
                  </div>
                  <div>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transform ${isExpand ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                
                {isExpand && (
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-700 mb-4">{step.description}</p>
                    
                    {step.content && (
                      <div className="mb-6">
                        <h4 className="text-lg font-medium mb-2">Content</h4>
                        <div className="prose max-w-none">{step.content}</div>
                      </div>
                    )}
                    
                    {step.resources && step.resources.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-medium mb-2">Resources</h4>
                        <ul className="space-y-2">
                          {step.resources.map((resource) => (
                            <li key={resource.id} className="flex items-start">
                              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2 uppercase">
                                {resource.type}
                              </span>
                              <a 
                                href={resource.url} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {resource.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {step.quiz && (
                      <div className="mb-6">
                        <Link 
                          href={`/quizzes/${step.id}`}
                          className="text-purple-600 hover:text-purple-800 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                          </svg>
                          Take Quiz to Test Your Knowledge
                        </Link>
                      </div>
                    )}
                    
                    {!isCompleted && (
                      <button
                        onClick={() => markStepComplete(step.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 