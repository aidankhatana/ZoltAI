'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RoadmapGeneratorPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') || 'programming';
  const level = searchParams.get('level') || 'beginner';
  
  const [isLoading, setIsLoading] = useState(true);
  const [roadmap, setRoadmap] = useState<any>(null);

  useEffect(() => {
    // Simulate API call to generate roadmap
    const timer = setTimeout(() => {
      // This would be replaced with an actual API call in a real application
      const generatedRoadmap = generateMockRoadmap(topic, level);
      setRoadmap(generatedRoadmap);
      setIsLoading(false);
    }, 2500); // Simulate loading time
    
    return () => clearTimeout(timer);
  }, [topic, level]);

  return (
    <main className="flex flex-col min-h-screen theme-sunset">
      {/* Hero Section */}
      <section className="bg-gradient-sunset py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Learning Roadmap
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Personalized for {topic} at {level} level
            </p>
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-12 flex-grow bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <LoadingState />
          ) : (
            <RoadmapDisplay roadmap={roadmap} />
          )}
        </div>
      </section>
    </main>
  );
}

const LoadingState = () => (
  <div className="max-w-4xl mx-auto text-center py-12">
    <motion.div
      animate={{ 
        rotate: 360,
      }}
      transition={{ 
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }}
      className="w-16 h-16 border-4 border-sunset-200 border-t-sunset-600 rounded-full mx-auto mb-6"
    />
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
      Generating Your Personalized Roadmap
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
      Our AI is crafting a learning path tailored to your skill level and goals...
    </p>
  </div>
);

const RoadmapDisplay = ({ roadmap }: { roadmap: any }) => (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {roadmap.title}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        {roadmap.description}
      </p>
      <div className="flex justify-center gap-4 mb-8">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-sunset-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-700 dark:text-gray-300">Estimated time: {roadmap.estimatedTime}</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-sunset-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          <span className="text-gray-700 dark:text-gray-300">Difficulty: {roadmap.difficulty}</span>
        </div>
      </div>
    </div>

    <div className="space-y-8">
      {roadmap.modules.map((module: any, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Module {index + 1}: {module.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {module.description}
            </p>
            
            <div className="space-y-4">
              {module.topics.map((topic: any, topicIndex: number) => (
                <div key={topicIndex} className="pl-4 border-l-2 border-sunset-500">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {topic.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {topic.description}
                  </p>
                  {topic.resources && (
                    <div className="mt-2">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Recommended resources:
                      </span>
                      <ul className="mt-1 space-y-1">
                        {topic.resources.map((resource: any, resourceIndex: number) => (
                          <li key={resourceIndex} className="text-sm">
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sunset-600 hover:text-sunset-700 dark:text-sunset-400 dark:hover:text-sunset-300"
                            >
                              {resource.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mt-12 text-center">
      <Link 
        href="/roadmaps"
        className="btn-primary bg-sunset-600 hover:bg-sunset-700 py-3 px-8 inline-block"
      >
        Explore More Roadmaps
      </Link>
    </div>
  </div>
);

// Mock data generator function
function generateMockRoadmap(topic: string, level: string) {
  // This would be replaced with an actual API call in a real application
  const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
  
  const difficultyMap: Record<string, string> = {
    'beginner': 'Beginner',
    'novice': 'Novice',
    'intermediate': 'Intermediate',
    'advanced': 'Advanced',
    'expert': 'Expert'
  };

  const timeMap: Record<string, string> = {
    'beginner': '3-4 months',
    'novice': '2-3 months',
    'intermediate': '2-3 months',
    'advanced': '3-4 months',
    'expert': '4-6 months'
  };

  return {
    title: `Complete ${capitalizedTopic} Learning Path`,
    description: `A comprehensive roadmap to master ${topic} designed specifically for ${level} level learners. This path will guide you through all the essential concepts and skills needed to become proficient.`,
    estimatedTime: timeMap[level] || '3 months',
    difficulty: difficultyMap[level] || 'Intermediate',
    modules: [
      {
        title: 'Fundamentals',
        description: 'Master the core concepts and building blocks',
        topics: [
          {
            title: 'Core Concepts',
            description: 'Understanding the basic principles and terminology',
            resources: [
              { title: 'Introduction to Fundamentals', url: '#' },
              { title: 'Core Concepts Explained', url: '#' }
            ]
          },
          {
            title: 'Essential Tools',
            description: 'Setting up your environment and learning the basic tools',
            resources: [
              { title: 'Getting Started with Tools', url: '#' },
              { title: 'Environment Setup Guide', url: '#' }
            ]
          }
        ]
      },
      {
        title: 'Intermediate Concepts',
        description: 'Build on the fundamentals with more advanced topics',
        topics: [
          {
            title: 'Advanced Techniques',
            description: 'Taking your skills to the next level with more complex approaches',
            resources: [
              { title: 'Advanced Techniques Guide', url: '#' },
              { title: 'Practice Problems', url: '#' }
            ]
          },
          {
            title: 'Best Practices',
            description: 'Learn industry standards and optimization methods',
            resources: [
              { title: 'Industry Best Practices', url: '#' },
              { title: 'Optimization Techniques', url: '#' }
            ]
          }
        ]
      },
      {
        title: 'Practical Application',
        description: 'Apply your knowledge to real-world projects',
        topics: [
          {
            title: 'Project Implementation',
            description: 'Building complete projects from start to finish',
            resources: [
              { title: 'Project Tutorial', url: '#' },
              { title: 'Case Studies', url: '#' }
            ]
          },
          {
            title: 'Problem Solving',
            description: 'Tackling common challenges and troubleshooting issues',
            resources: [
              { title: 'Problem Solving Techniques', url: '#' },
              { title: 'Troubleshooting Guide', url: '#' }
            ]
          }
        ]
      }
    ]
  };
} 