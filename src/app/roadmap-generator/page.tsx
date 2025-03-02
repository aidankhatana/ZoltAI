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

  const selectPopularTopic = (topic: string) => {
    setTopic(topic);
    setSelectedPopularTopic(topic);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      alert('Please enter a topic');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const result = await createRoadmap(topic, skillLevel, additionalInfo, isPublic);
      
      if (result.success && result.roadmapId) {
        router.push(`/roadmaps/${result.roadmapId}`);
      } else {
        alert(result.error || 'Failed to create roadmap');
      }
    } catch (error) {
      console.error('Error creating roadmap:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Create Your Custom Learning Roadmap</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What do you want to learn?
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter a topic (e.g., JavaScript, Machine Learning, Web Development)"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Popular Topics
            </label>
            <div className="flex flex-wrap gap-2">
              {popularTopics.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedPopularTopic === t
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={() => selectPopularTopic(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Current Skill Level
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {skillLevels.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  className={`px-4 py-3 rounded-md text-center transition-colors ${
                    skillLevel === level.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={() => setSkillLevel(level.id)}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Information (Optional)
            </label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Any specific areas or technologies you're interested in? Or specific goals you want to achieve?"
              rows={4}
            ></textarea>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Make this roadmap public so others can benefit
              </label>
            </div>
          </div>
          
          {!user && (
            <div className="mb-6 bg-yellow-50 p-4 rounded-md border border-yellow-200">
              <p className="text-yellow-700 text-sm">
                <span className="font-medium">Note:</span> You're not logged in. To save this roadmap to your account and track your progress, please{' '}
                <a href="/login" className="text-blue-600 hover:underline">
                  log in
                </a>{' '}
                or{' '}
                <a href="/register" className="text-blue-600 hover:underline">
                  register
                </a>
                .
              </p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded relative mb-6">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className={`px-6 py-3 rounded-md font-medium text-white ${
                isGenerating || !topic.trim()
                  ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'
              }`}
            >
              {isGenerating ? 'Generating Roadmap...' : 'Generate My Roadmap'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>
            <span className="font-medium text-gray-900">Enter your topic:</span> Specify what you want to learn.
          </li>
          <li>
            <span className="font-medium text-gray-900">Select your skill level:</span> This helps us tailor the content to your experience.
          </li>
          <li>
            <span className="font-medium text-gray-900">Add details (optional):</span> Include any specific focuses or goals.
          </li>
          <li>
            <span className="font-medium text-gray-900">Generate your roadmap:</span> Our AI creates a personalized learning path with step-by-step guidance.
          </li>
          <li>
            <span className="font-medium text-gray-900">Track your progress:</span> Follow the roadmap at your own pace and mark steps as completed.
          </li>
        </ol>
      </div>
    </div>
  );
} 