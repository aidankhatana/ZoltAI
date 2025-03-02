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
  }, [id, user, fetchRoadmap, fetchRoadmapProgress]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-800 dark:to-amber-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your roadmap journey...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-800 dark:to-amber-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">Error Loading Roadmap</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/roadmaps')}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            &larr; Back to Roadmaps
          </button>
        </div>
      </div>
    );
  }

  if (!currentRoadmap) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-800 dark:to-amber-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-3">Roadmap Not Found</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The roadmap you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Link 
            href="/roadmaps" 
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors inline-block"
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

  const isStepCompleted = (stepId: string) => {
    return progressData?.completedSteps?.includes(stepId) || false;
  };

  const markStepComplete = async (stepId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      await updateProgress(currentRoadmap.id, stepId, true);
      const progress = await fetchRoadmapProgress(currentRoadmap.id);
      setProgressData(progress);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const calculateProgress = () => {
    if (!progressData?.completedSteps?.length || !currentRoadmap.steps.length) {
      return 0;
    }
    
    return Math.round((progressData.completedSteps.length / currentRoadmap.steps.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-800 dark:to-amber-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link 
            href="/roadmaps" 
            className="inline-flex items-center mb-6 text-white hover:text-amber-200 transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Roadmaps
          </Link>
          
          {/* Roadmap Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 transform hover:scale-[1.01] transition-all">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {currentRoadmap.title}
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {currentRoadmap.description}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                  {currentRoadmap.topic}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {currentRoadmap.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {currentRoadmap.estimatedTime}
                </span>
              </div>
              
              {user && (
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Progress</p>
                    <p className="text-sm font-bold text-orange-600 dark:text-orange-400">{progress}%</p>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 transition-all duration-500 ease-out" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Journey Trail */}
          <div className="relative mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Your Learning Trail</h2>
              {user ? (
                <div className="bg-white/20 dark:bg-gray-800/30 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <p className="text-white text-sm">
                    <span className="font-bold">{progressData?.completedSteps?.length || 0}</span> of <span className="font-bold">{currentRoadmap.steps.length}</span> steps completed
                  </p>
                </div>
              ) : (
                <Link href="/login" className="text-sm text-white hover:text-amber-200 transition-colors">
                  Sign in to track progress
                </Link>
              )}
            </div>
            
            {/* Timeline Steps */}
            <div className="relative">
              {/* Trail Path */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/30 dark:bg-white/20 rounded-full"></div>
              
              <div className="space-y-6">
                {currentRoadmap.steps.map((step, index) => {
                  const completed = isStepCompleted(step.id);
                  const expanded = isExpanded[step.id] || false;
                  
                  return (
                    <div key={step.id} className="relative animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
                      {/* Trail Marker */}
                      <div className={`absolute left-8 top-8 h-6 w-6 rounded-full border-4 transform -translate-x-1/2 z-10 transition-all duration-300 ${
                        completed 
                          ? 'bg-green-500 border-white shadow-lg shadow-green-500/20' 
                          : 'bg-white dark:bg-gray-200 border-orange-200 dark:border-orange-900'
                      }`}></div>
                      
                      <div className="ml-16">
                        <div className={`
                          bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300
                          ${expanded ? 'transform scale-[1.02] shadow-xl' : 'hover:shadow-lg'}
                        `}>
                          {/* Step Header - Always visible */}
                          <button
                            onClick={() => toggleStepExpand(step.id)}
                            className="flex w-full items-center text-left p-5 focus:outline-none"
                          >
                            <div className="flex-1">
                              <div className="flex items-center">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 mr-3">
                                  {index + 1}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                  {step.title}
                                </h3>
                                {completed && (
                                  <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                    Completed
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {step.description.length > 100 
                                  ? `${step.description.substring(0, 100)}...` 
                                  : step.description}
                              </p>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <div className={`p-2 rounded-full transition-colors ${
                                expanded 
                                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200' 
                                  : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                              }`}>
                                <svg 
                                  className={`h-5 w-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                          </button>
                          
                          {/* Expanded Content */}
                          {expanded && (
                            <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-700">
                              <div className="mt-4 prose dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300">
                                {step.content && step.content.includes('#') ? (
                                  <div dangerouslySetInnerHTML={{ __html: markdownToHtml(step.content) }} />
                                ) : (
                                  <div>
                                    {step.content?.split('\n').map((paragraph, i) => (
                                      <p key={i} className="mb-3">{paragraph}</p>
                                    ))}
                                  </div>
                                )}
                              </div>
                              
                              {/* Resources Section */}
                              {step.resources && step.resources.length > 0 && (
                                <div className="mt-6 bg-orange-50 dark:bg-gray-750 rounded-lg p-4">
                                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Learning Resources
                                  </h4>
                                  <ul className="grid gap-3 md:grid-cols-2">
                                    {step.resources.map((resource, resourceIndex) => (
                                      <li key={resourceIndex} className="flex bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                                        <div className={`
                                          flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center
                                          ${resource.type === 'video' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 
                                            resource.type === 'article' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 
                                            resource.type === 'book' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' : 
                                            'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'}
                                        `}>
                                          {resource.type === 'video' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                          ) : resource.type === 'article' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                          ) : resource.type === 'book' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                          ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                          )}
                                        </div>
                                        <div className="ml-3 flex-1">
                                          <a 
                                            href={resource.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="font-medium text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                                          >
                                            {resource.title}
                                          </a>
                                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">{resource.type}</p>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {/* Actions */}
                              <div className="mt-6 flex justify-between items-center">
                                {user ? (
                                  <button
                                    onClick={() => markStepComplete(step.id)}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                      completed 
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                                        : 'bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600'
                                    }`}
                                  >
                                    {completed ? (
                                      <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        Completed
                                      </span>
                                    ) : 'Mark as Complete'}
                                  </button>
                                ) : (
                                  <Link 
                                    href="/login" 
                                    className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
                                  >
                                    Log in to track progress
                                  </Link>
                                )}
                                
                                {index < currentRoadmap.steps.length - 1 && (
                                  <button
                                    onClick={() => toggleStepExpand(currentRoadmap.steps[index + 1].id)}
                                    className="flex items-center text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                                  >
                                    Next Step
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* End of trail marker */}
                <div className="relative">
                  <div className="absolute left-8 top-0 h-8 w-1 bg-white/30 dark:bg-white/20"></div>
                  <div className="absolute left-8 top-8 h-8 w-8 rounded-full bg-amber-500 border-4 border-white shadow-lg transform -translate-x-1/2 z-10"></div>
                  <div className="ml-16 pt-6">
                    <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 p-4 rounded-lg inline-block">
                      <p className="font-semibold">
                        {progress === 100 ? 'Congratulations! You\'ve completed this roadmap! 🎉' : 'You\'ve reached the end of this roadmap outline.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 