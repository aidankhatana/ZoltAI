'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useRoadmaps } from '@/contexts/RoadmapContext';

const skillLevels = [
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' },
];

const popularTopics = [
  'JavaScript', 'Python', 'Data Science', 'Machine Learning',
  'Web Development', 'React', 'UX Design', 'Digital Marketing',
  'SQL', 'Cloud Computing', 'Cybersecurity', 'Mobile Development'
];

export default function RoadmapGenerator() {
  const router = useRouter();
  const { user } = useAuth();
  const { createRoadmap, loading, error } = useRoadmaps();
  
  const [topic, setTopic] = useState('');
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPopularTopic, setSelectedPopularTopic] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectPopularTopic = (topic: string) => {
    setTopic(topic);
    setSelectedPopularTopic(topic);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setErrorMessage('Please enter a topic');
      return;
    }
    
    setIsGenerating(true);
    setErrorMessage('');
    
    try {
      // Store the current URL to check if navigation has occurred
      const startUrl = window.location.href;
      
      const result = await createRoadmap(topic, skillLevel, additionalInfo, isPublic);
      
      if (result.success && result.roadmapId) {
        // Don't redirect immediately - set a loading state and let the user know what's happening
        const roadmapId = result.roadmapId;
        
        // Show a preparation message for a moment
        setIsGenerating(true);
        
        // Use a more substantial delay to ensure state is fully synchronized
        setTimeout(() => {
          // Only redirect if we're still on the same page (user hasn't navigated away)
          if (window.location.href === startUrl) {
            router.push(`/roadmaps/${roadmapId}`);
          }
        }, 800);
      } else {
        setErrorMessage(result.error || 'Failed to create roadmap');
        setIsGenerating(false);
      }
    } catch (error) {
      console.error('Error creating roadmap:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-500 to-amber-500 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">
            Create Your Custom Learning Roadmap
          </h1>
          
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="topic" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  What do you want to learn?
                </label>
                <input
                  id="topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic (e.g., Knitting, Algebra, Web Development)"
                  className="w-full p-4 rounded-lg border border-gray-300 bg-white dark:bg-slate-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500 text-base"
                  required
                />
              </div>

              <div className="mb-6">
                <p className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Popular Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularTopics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        selectedPopularTopic === topic
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700'
                      }`}
                      onClick={() => selectPopularTopic(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Current Skill Level
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {skillLevels.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      className={`py-3 px-4 rounded-lg text-center text-sm font-medium transition-colors ${
                        skillLevel === level.id
                          ? 'bg-sunset-600 text-white'
                          : 'bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700'
                      }`}
                      onClick={() => setSkillLevel(level.id)}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="additionalInfo" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Additional Information (Optional)
                </label>
                <textarea
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Any specific areas or technologies you're interested in? Or specific goals you want to achieve?"
                  className="w-full p-4 rounded-lg border border-gray-300 bg-white dark:bg-slate-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-sunset-500 focus:border-sunset-500 text-base"
                  rows={5}
                ></textarea>
              </div>
            
              {user && (
                <div className="mb-6 flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="w-4 h-4 text-sunset-600 bg-gray-100 border-gray-300 rounded focus:ring-sunset-500 dark:focus:ring-sunset-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-slate-800 dark:border-gray-600"
                  />
                  <label htmlFor="isPublic" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Make this roadmap public so others can learn from it
                  </label>
                </div>
              )}
            
              {errorMessage && (
                <div className="mb-6 p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                  <p>{errorMessage}</p>
                </div>
              )}
            
              <button
                type="submit"
                disabled={isGenerating || !topic.trim()}
                className={`w-full py-4 px-5 text-center font-medium rounded-lg text-white ${
                  isGenerating || !topic.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-sunset-600 hover:bg-sunset-700'
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating your roadmap...
                  </span>
                ) : (
                  'Generate Learning Roadmap'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 