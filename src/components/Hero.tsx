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
    <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 dark:bg-slate-900 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Unlock Your Learning Journey with <span className="text-amber-200">AI-Powered</span> Roadmaps
            </h1>
            <p className="text-xl text-white mb-8">
              Explore curated learning paths or create your own with ZoltAI's AI-driven tools
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link 
                href="/roadmaps" 
                className="bg-white hover:bg-amber-50 text-orange-600 font-medium py-4 px-8 rounded-lg transition-colors"
              >
                Explore Roadmaps
              </Link>
              <Link 
                href="/register" 
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-4 px-8 rounded-lg transition-colors"
              >
                Sign Up to Get Started
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-2 text-sm text-white/80 justify-center lg:justify-start">
              <span>Popular topics:</span>
              {['Programming', 'JavaScript', 'Design', 'Business', 'Music', 'Languages'].map((topic) => (
                <Link 
                  key={topic}
                  href={`/roadmaps?category=${topic.toLowerCase()}`}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition duration-200"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/90 dark:bg-slate-900/90 rounded-xl shadow-xl p-6 md:p-8 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="flex-grow text-center text-sm text-gray-500 dark:text-gray-400">
                  Python Learning Roadmap
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-900/40 p-4 rounded-lg border-l-4 border-amber-500">
                  <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">1. Python Fundamentals (2 weeks)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Variables, data types, operators, control flow, and functions
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    14 days • 2-3 hours/day
                  </div>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/40 p-4 rounded-lg border-l-4 border-amber-500">
                  <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">2. Data Structures (1 week)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Lists, dictionaries, sets, tuples, and working with collections
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    7 days • 2-3 hours/day
                  </div>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/40 p-4 rounded-lg border-l-4 border-amber-500">
                  <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">3. File Handling & APIs (1 week)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Reading/writing files, working with JSON, and API requests
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    7 days • 2-3 hours/day
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link href="/roadmaps/python" className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  View Full Roadmap
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