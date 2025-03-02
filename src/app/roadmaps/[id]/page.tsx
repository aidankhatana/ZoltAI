'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRoadmaps } from '@/contexts/RoadmapContext';

interface RoadmapPageProps {
  params: {
    id: string;
  };
}

// Simple function to convert markdown to HTML if needed
function markdownToHtml(content: string) {
  return content
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gm, '<em>$1</em>')
    .replace(/\n/gm, '<br />');
}

export default function RoadmapPage({ params }: RoadmapPageProps) {
  const { id } = params;
  const router = useRouter();
  const { user } = useAuth();
  const { fetchRoadmap, currentRoadmap, loading: contextLoading, error, updateProgress, fetchRoadmapProgress } = useRoadmaps();
  
  const [progressData, setProgressData] = useState<any>(null);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<{[key: string]: boolean}>({});
  const [pageLoading, setPageLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Memoize the loadRoadmap function to prevent unnecessary re-renders
  const loadRoadmap = useCallback(async () => {
    setPageLoading(true);
    setLoadingError(null);
    
    try {
      // Add timeout protection to prevent hanging requests
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timed out')), 10000)
      );
      
      // Race the fetch with a timeout
      const roadmapData = await Promise.race([
        fetchRoadmap(id),
        timeoutPromise
      ]) as any;
      
      if (!roadmapData) {
        throw new Error('Failed to load roadmap data');
      }
      
      // Load progress data if user is logged in
      if (user) {
        try {
          const progress = await fetchRoadmapProgress(id);
          setProgressData(progress);
        } catch (progressError) {
          console.error('Error loading progress:', progressError);
          // Continue even if progress fails to load
        }
      }
      
      // Ensure the step data is expanded for the first step by default
      if (roadmapData.steps && roadmapData.steps.length > 0) {
        setIsExpanded(prev => ({
          ...prev,
          [roadmapData.steps[0].id]: true
        }));
        setActiveStep(roadmapData.steps[0].id);
      }
      
      // Set a short delay to ensure content is properly rendered before showing
      setTimeout(() => {
        setContentReady(true);
        setPageLoading(false);
      }, 300);
      
    } catch (err) {
      console.error("Error loading roadmap:", err);
      setLoadingError(err instanceof Error ? err.message : 'Failed to load roadmap');
      setPageLoading(false);
    }
  }, [id, user, fetchRoadmap, fetchRoadmapProgress]);

  useEffect(() => {
    let isMounted = true;
    
    if (isMounted) {
      loadRoadmap();
    }
    
    return () => {
      isMounted = false;
    };
  }, [loadRoadmap]);
  
  // Add retry functionality
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    loadRoadmap();
  };

  // Show loading UI until content is ready
  if (pageLoading || contextLoading || !contentReady) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-700 dark:to-orange-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your personalized learning journey...</p>
            {retryCount > 0 && (
              <p className="mt-2 text-sm text-amber-600">Retry attempt {retryCount}...</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show error UI if there's an error
  if (error || loadingError) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-700 dark:to-orange-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">Error Loading Roadmap</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{error || loadingError}</p>
          <div className="flex space-x-4">
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => router.push('/roadmaps')}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              &larr; Back to Roadmaps
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentRoadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-700 dark:to-orange-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-3">Roadmap Not Found</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The roadmap you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Link 
            href="/roadmaps" 
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors inline-block"
          >
            &larr; Back to Roadmaps
          </Link>
        </div>
      </div>
    );
  }

  const toggleStepExpand = (stepId: string) => {
    setIsExpanded(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  const selectStep = (stepId: string) => {
    setActiveStep(stepId);
  };
  
  const markStepComplete = async (stepId: string, completed: boolean) => {
    try {
      await updateProgress(id, stepId, completed);
      // Update the local progress data
      if (progressData) {
        const updatedProgressData = {...progressData};
        const stepIndex = updatedProgressData.steps.findIndex((s: any) => s.stepId === stepId);
        
        if (stepIndex !== -1) {
          updatedProgressData.steps[stepIndex].completed = completed;
          setProgressData(updatedProgressData);
        }
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  // Calculate overall progress
  const totalSteps = currentRoadmap.steps.length;
  const completedSteps = progressData 
    ? progressData.steps?.filter((s: any) => s.completed).length || 0
    : 0;
  const overallProgress = totalSteps > 0 
    ? Math.round((completedSteps / totalSteps) * 100) 
    : 0;
  
  // Determine the active step's content if one is selected
  const activeStepData = activeStep 
    ? currentRoadmap.steps.find(step => step.id === activeStep) 
    : null;
  
  // Function to determine if a step is completed
  const isStepCompleted = (stepId: string) => {
    if (!progressData || !progressData.steps) return false;
    const step = progressData.steps.find((s: any) => s.stepId === stepId);
    return step ? step.completed : false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-700 dark:to-orange-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Roadmap Header */}
          <div className="bg-white dark:bg-gray-800 rounded-t-xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 px-6 py-8 text-white">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{currentRoadmap.title}</h1>
                  <p className="text-amber-100 mt-2">{currentRoadmap.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-800 bg-opacity-30 text-amber-100">
                      {currentRoadmap.topic}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-800 bg-opacity-30 text-amber-100">
                      {currentRoadmap.difficulty}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-800 bg-opacity-30 text-amber-100">
                      ~{currentRoadmap.estimatedTime}
                    </span>
                  </div>
                </div>
                
                {user && progressData && (
                  <div className="bg-white/10 dark:bg-black/20 p-4 rounded-lg backdrop-blur-sm w-full md:w-64">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-amber-100">Your Progress</p>
                      <p className="text-sm font-bold text-white">{overallProgress}%</p>
                    </div>
                    <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-500 ease-out" 
                        style={{ width: `${overallProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/20">
                <Link 
                  href="/roadmaps" 
                  className="text-amber-100 hover:text-white flex items-center transition-colors text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Roadmaps
                </Link>
                
                <div className="bg-white/20 dark:bg-gray-800/30 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <p className="text-white text-sm">
                    <span className="font-bold">{completedSteps}</span> of <span className="font-bold">{totalSteps}</span> steps completed
                  </p>
                </div>
              </div>
            </div>
            
            {/* Two-Column Layout for Content */}
            <div className="flex flex-col md:flex-row">
              {/* Left Sidebar - Steps List */}
              <div className="w-full md:w-1/3 p-6 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-850 overflow-y-auto">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Roadmap Steps</h2>
                
                <div className="space-y-2">
                  {currentRoadmap.steps.map((step, index) => {
                    const completed = isStepCompleted(step.id);
                    return (
                      <div 
                        key={step.id}
                        className={`rounded-lg border ${
                          activeStep === step.id 
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-500' 
                            : completed 
                              ? 'border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800' 
                              : 'border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700'
                        }`}
                      >
                        <div 
                          className="p-4 cursor-pointer"
                          onClick={() => toggleStepExpand(step.id)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mr-3 ${
                                completed 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                              }`}>
                                {completed ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <span className="text-xs font-medium">{index + 1}</span>
                                )}
                              </div>
                              <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                {step.title}
                              </h3>
                            </div>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-5 w-5 text-gray-400 transition-transform ${isExpanded[step.id] ? 'rotate-180' : ''}`} 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        
                        {isExpanded[step.id] && (
                          <div className="p-4 pt-0 border-t border-gray-100 dark:border-gray-700 space-y-3">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {step.description}
                            </p>
                            <div className="flex space-x-3">
                              <button
                                onClick={() => selectStep(step.id)}
                                className="px-3 py-1.5 rounded text-sm font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50 transition-colors"
                              >
                                View Details
                              </button>
                              
                              {user ? (
                                <button
                                  onClick={() => markStepComplete(step.id, !completed)}
                                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                                    completed 
                                      ? 'text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700' 
                                      : 'text-green-700 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50'
                                  }`}
                                >
                                  {completed ? 'Mark Incomplete' : 'Mark Complete'}
                                </button>
                              ) : (
                                <Link
                                  href="/login"
                                  className="px-3 py-1.5 rounded text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
                                >
                                  Login to Track
                                </Link>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  <div className="mt-8 text-center">
                    <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 p-4 rounded-lg inline-block">
                      <p className="font-semibold">
                        {overallProgress === 100 ? 'Congratulations! You\'ve completed this roadmap! 🎉' : 'You\'ve reached the end of this roadmap outline.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Content Area - Step Details */}
              <div className="w-full md:w-2/3 p-6 overflow-y-auto">
                {activeStepData ? (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {activeStepData.title}
                    </h2>
                    
                    <div className="prose dark:prose-invert max-w-none">
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: markdownToHtml(activeStepData.content || '') 
                        }} 
                      />
                    </div>
                    
                    {activeStepData.resources && activeStepData.resources.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Resources
                        </h3>
                        
                        <div className="space-y-3">
                          {activeStepData.resources.map((resource, index) => (
                            <a 
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mr-4">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13c-1.168-.776-2.754-1.253-4.5-1.253-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                </div>
                                <div>
                                  <h4 className="text-base font-medium text-gray-900 dark:text-white">{resource.title}</h4>
                                  <p className="text-sm text-blue-500 dark:text-blue-400 mt-1 break-all">{resource.url}</p>
                                  {resource.type && (
                                    <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded">
                                      {resource.type}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-16 w-16 text-amber-300 dark:text-amber-500 mb-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Select a step to view its details
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 max-w-md">
                      Click on a step from the list on the left and expand it to view its content, 
                      resources, and track your progress along the way.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 