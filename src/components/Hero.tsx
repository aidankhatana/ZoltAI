import { useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be implemented to handle the search/query
    console.log('Search query:', searchQuery);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Learn <span className="text-primary">Anything</span> with AI-Powered Roadmaps
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              SophosAI creates personalized learning paths based on your goals and current skill level.
              Get a custom curriculum and start learning effectively today.
            </p>
            
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  className="flex-grow p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn-primary md:px-8">
                  Generate Roadmap
                </button>
              </div>
            </form>
            
            <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Popular searches:</span>
              <button 
                onClick={() => setSearchQuery('Learn Python Programming')}
                className="underline hover:text-primary"
              >
                Python Programming
              </button>
              <button 
                onClick={() => setSearchQuery('Learn Guitar')}
                className="underline hover:text-primary"
              >
                Guitar
              </button>
              <button 
                onClick={() => setSearchQuery('Learn Machine Learning')}
                className="underline hover:text-primary"
              >
                Machine Learning
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="flex-grow text-center text-sm text-gray-500 dark:text-gray-400">
                  Interactive Learning Roadmap
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">1. Python Basics (2 weeks)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Variables, data types, operators, control flow, functions, and basic data structures.
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">2. Object-Oriented Programming (1 week)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Classes, objects, inheritance, encapsulation, and polymorphism.
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">3. Working with Files & Libraries (1 week)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    File I/O, exception handling, and introduction to popular libraries.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 