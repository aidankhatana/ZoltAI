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
    <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-800 dark:to-amber-800 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover <span className="text-amber-200">Learning</span> Roadmaps
            </h1>
            <p className="text-xl text-white mb-8">
              Explore our most popular AI-generated learning paths or create your own
            </p>
            
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search for roadmaps..."
                  className="flex-grow p-4 rounded-lg border border-amber-300 bg-white/90 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-4 px-8 rounded-lg transition-colors">
                  Search
                </button>
              </div>
            </form>
            
            <div className="flex flex-wrap gap-2 text-sm text-white/80">
              <span>Popular topics:</span>
              {['Programming', 'JavaScript', 'Design', 'Business', 'Music', 'Languages'].map((topic) => (
                <button 
                  key={topic}
                  onClick={() => setSearchQuery(topic)}
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
            className="relative hidden md:block"
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
                <div className="bg-amber-50 dark:bg-amber-900/40 p-4 rounded-lg border-l-4 border-amber-500">
                  <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">1. JavaScript Fundamentals (2 weeks)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Variables, data types, operators, control flow, and functions
                  </p>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/40 p-4 rounded-lg border-l-4 border-amber-500">
                  <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">2. DOM Manipulation (1 week)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Selecting elements, modifying content, event handling
                  </p>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/40 p-4 rounded-lg border-l-4 border-amber-500">
                  <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">3. Async JavaScript (1 week)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Promises, async/await, and fetching data from APIs
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link href="/roadmap-generator" className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Create Your Roadmap
                </Link>
              </div>
        