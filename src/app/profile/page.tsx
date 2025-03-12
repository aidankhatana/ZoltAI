'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useRoadmaps } from '@/contexts/RoadmapContext';

interface Roadmap {
  id: string;
  title: string;
  topic: string;
  difficulty: string;
  progress: number;
  lastAccessed: string;
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { deleteRoadmap } = useRoadmaps();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRoadmaps, setUserRoadmaps] = useState<Roadmap[]>([]);
  const [activeTab, setActiveTab] = useState('in-progress');
  const [deletingRoadmapId, setDeletingRoadmapId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchUserRoadmaps = async () => {
      try {
        setIsLoading(true);
        
        // Fetch user's roadmaps from the roadmaps API
        const roadmapsResponse = await fetch(`/api/roadmaps?userId=${user.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!roadmapsResponse.ok) {
          throw new Error('Failed to fetch user roadmaps');
        }
        
        const roadmapsData = await roadmapsResponse.json();
        
        // Fetch progress data to combine with roadmaps
        const progressResponse = await fetch('/api/users/progress', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!progressResponse.ok) {
          throw new Error('Failed to fetch user progress');
        }
        
        const progressData = await progressResponse.json();
        
        // Create a map of roadmap IDs to progress information
        const progressMap = new Map();
        
        progressData.progress?.forEach((item: any) => {
          if (item.roadmap && item.steps) {
            const roadmapId = item.roadmap.id;
            const totalSteps = item.steps.length;
            const completedSteps = item.steps.filter((step: any) => step.completed).length;
            const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
            
            progressMap.set(roadmapId, {
              progress,
              lastAccessed: item.steps.length > 0 
                ? new Date(Math.max(...item.steps.map((s: any) => s.completedAt ? new Date(s.completedAt).getTime() : 0))).toLocaleDateString()
                : 'Not started'
            });
          }
        });
        
        // Combine roadmap data with progress data
        const userRoadmapsWithProgress = roadmapsData.roadmaps.map((roadmap: any) => ({
          id: roadmap.id,
          title: roadmap.title,
          topic: roadmap.topic,
          difficulty: roadmap.difficulty || 'Beginner',
          progress: progressMap.has(roadmap.id) ? progressMap.get(roadmap.id).progress : 0,
          lastAccessed: progressMap.has(roadmap.id) ? progressMap.get(roadmap.id).lastAccessed : 'Not started yet'
        }));
        
        setUserRoadmaps(userRoadmapsWithProgress);
      } catch (error) {
        console.error('Error fetching user roadmaps:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRoadmaps();
  }, [user, router]);

  // Add a handler for deleting roadmaps
  const handleDeleteRoadmap = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this roadmap? This action cannot be undone.')) {
      setDeletingRoadmapId(id);
      
      try {
        const success = await deleteRoadmap(id);
        
        if (success) {
          // Remove the roadmap from the local state
          setUserRoadmaps(prevRoadmaps => prevRoadmaps.filter(roadmap => roadmap.id !== id));
          alert('Roadmap deleted successfully');
        } else {
          alert('Failed to delete roadmap. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting roadmap:', error);
        alert('An error occurred while deleting the roadmap.');
      } finally {
        setDeletingRoadmapId(null);
      }
    }
  };

  if (!user) return null;

  // Filter roadmaps based on active tab
  const filteredRoadmaps = userRoadmaps.filter(roadmap => {
    if (activeTab === 'in-progress') return roadmap.progress > 0 && roadmap.progress < 100;
    if (activeTab === 'completed') return roadmap.progress === 100;
    return true; // 'all' tab
  });

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-amber-500';
    if (progress < 70) return 'bg-amber-600';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-500 to-amber-500 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden">
            {/* Profile Header */}
            <div className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-5">
                  <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold">
                    {user.name?.substring(0, 1).toUpperCase() || user.email?.substring(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{user.name || 'Learner'}</h1>
                    <p className="text-blue-100">{user.email}</p>
                    <p className="mt-2 text-sm text-blue-100">
                      Member since {new Date(user.createdAt instanceof Date ? user.createdAt : user.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-6 md:mt-0">
                  <button 
                    onClick={() => router.push('/roadmap-generator')}
                    className="px-5 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors mr-3"
                  >
                    Create New Roadmap
                  </button>
                  <button 
                    onClick={logout}
                    className="px-5 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Body */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Learning Journey</h2>
              
              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 p-6 rounded-xl text-white shadow-md">
                  <h3 className="text-lg font-medium mb-2">Roadmaps</h3>
                  <p className="text-3xl font-bold">{userRoadmaps.length}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 p-6 rounded-xl text-white shadow-md">
                  <h3 className="text-lg font-medium mb-2">Completed</h3>
                  <p className="text-3xl font-bold">{userRoadmaps.filter(r => r.progress === 100).length}</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-6 rounded-xl text-white shadow-md">
                  <h3 className="text-lg font-medium mb-2">In Progress</h3>
                  <p className="text-3xl font-bold">{userRoadmaps.filter(r => r.progress > 0 && r.progress < 100).length}</p>
                </div>
              </div>

              {/* Roadmaps Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="flex space-x-8">
                  {['all', 'in-progress', 'completed'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab
                          ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Roadmaps List */}
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredRoadmaps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRoadmaps.map((roadmap) => (
                    <motion.div
                      key={roadmap.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <Link href={`/roadmaps/${roadmap.id}`}>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                {roadmap.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {roadmap.topic} • {roadmap.difficulty}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {roadmap.progress}%
                            </span>
                            <button
                              onClick={(e) => handleDeleteRoadmap(roadmap.id, e)}
                              disabled={deletingRoadmapId === roadmap.id}
                              className="text-red-500 hover:text-red-700 transition-colors p-1"
                              title="Delete roadmap"
                            >
                              {deletingRoadmapId === roadmap.id ? (
                                <span className="animate-pulse">...</span>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                          <div 
                            className={`h-2.5 rounded-full ${getProgressColor(roadmap.progress)}`} 
                            style={{ width: `${roadmap.progress}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                          <span>Last updated: {roadmap.lastAccessed}</span>
                          <Link href={`/roadmaps/${roadmap.id}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                            Continue →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🧭</div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No roadmaps found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Start your learning journey by creating a new roadmap</p>
                  <button
                    onClick={() => router.push('/roadmap-generator')}
                    className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Create Your First Roadmap
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 