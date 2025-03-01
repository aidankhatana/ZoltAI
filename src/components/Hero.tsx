'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be implemented to handle the search/query
    console.log('Search query:', searchQuery);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-sunset dark:from-sunset-900 dark:to-sunset-800 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Learning Path <span className="text-sunset-200">Generator</span>
            </h1>
            <p className="text-xl text-white dark:text-sunset-100 mb-8">
              Discover your personalized learning journey with AI-powered roadmaps
            </p>
            
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  className="flex-grow p-4 rounded-lg border border-sunset-300 bg-white/90 focus:ring-2 focus:ring-sunset-400 focus:border-sunset-400 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn-primary md:px-8 bg-sunset-600 hover:bg-sunset-700">
                  Generate Path
                </button>
              </div>
            </form>
            
            <div className="flex flex-wrap gap-2 text-sm text-white/80">
              <span>Popular topics:</span>
              {['Guitar', 'JavaScript', 'Biology', 'Literature', 'Painting', 'Machine Learning'].map((topic) => (
                <button 
                  key={topic}
                  onClick={() => setSearchQuery(`Learn ${topic}`)}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition duration-200"
                >
                  {topic}
                </button>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-xl p-6 md:p-8 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="flex-grow text-center text-sm text-gray-500 dark:text-gray-400">
                  Example Learning Roadmap
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-sunset-50 dark:bg-sunset-900/40 p-4 rounded-lg border-l-4 border-sunset-500">
                  <h3 className="font-semibold text-sunset-700 dark:text-sunset-300 mb-2">1. JavaScript Fundamentals (2 weeks)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Variables, data types, operators, control flow, and functions
                  </p>
                </div>
                
                <div className="bg-sunset-50 dark:bg-sunset-900/40 p-4 rounded-lg border-l-4 border-sunset-500">
                  <h3 className="font-semibold text-sunset-700 dark:text-sunset-300 mb-2">2. DOM Manipulation (1 week)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Selecting elements, modifying content, event handling
                  </p>
                </div>
                
                <div className="bg-sunset-50 dark:bg-sunset-900/40 p-4 rounded-lg border-l-4 border-sunset-500">
                  <h3 className="font-semibold text-sunset-700 dark:text-sunset-300 mb-2">3. Async JavaScript (1 week)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Promises, async/await, and fetching data from APIs
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link href="/register" className="inline-block btn-primary bg-sunset-600 hover:bg-sunset-700">
                  Create Your Roadmap
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 