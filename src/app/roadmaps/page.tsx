'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function RoadmapsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'programming', name: 'Programming' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' },
    { id: 'music', name: 'Music' },
    { id: 'languages', name: 'Languages' }
  ];

  const roadmaps = [
    {
      id: 1,
      title: 'Learn Python Programming',
      description: 'From beginner to professional Python developer with algorithms and data structures.',
      category: 'programming',
      estimatedTime: '12 weeks',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      popularity: 4.9
    },
    {
      id: 2,
      title: 'Web Development Fundamentals',
      description: 'Learn HTML, CSS, and JavaScript from the ground up to create responsive websites.',
      category: 'programming',
      estimatedTime: '8 weeks',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      popularity: 4.8
    },
    {
      id: 3,
      title: 'UI/UX Design Essentials',
      description: 'Master the principles of user-centered design to create intuitive and beautiful interfaces.',
      category: 'design',
      estimatedTime: '10 weeks',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      popularity: 4.7
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      description: 'Develop comprehensive digital marketing strategies to grow online presence and conversions.',
      category: 'business',
      estimatedTime: '6 weeks',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      popularity: 4.6
    },
    {
      id: 5,
      title: 'Learn Guitar from Scratch',
      description: 'From holding the guitar to playing your favorite songs with proper technique.',
      category: 'music',
      estimatedTime: '16 weeks',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      popularity: 4.9
    },
    {
      id: 6,
      title: 'Spanish for Beginners',
      description: 'Learn basic Spanish vocabulary, grammar, and conversation skills for everyday use.',
      category: 'languages',
      estimatedTime: '14 weeks',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      popularity: 4.7
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be implemented to handle the search query
    console.log('Search query:', searchQuery);
  };

  const filteredRoadmaps = roadmaps.filter(roadmap => {
    const matchesCategory = selectedCategory === 'all' || roadmap.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      roadmap.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Discover Learning Roadmaps
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
            >
              Explore our most popular AI-generated learning paths or create your own
            </motion.p>
            
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto mb-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search for roadmaps..."
                  className="flex-grow p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn-primary md:px-8">
                  Search
                </button>
              </div>
            </motion.form>
          </div>
        </section>

        {/* Categories and Roadmaps Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            {/* Categories Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Roadmaps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRoadmaps.map((roadmap, index) => (
                <motion.div
                  key={roadmap.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                >
                  <div className="h-48 relative">
                    <img 
                      src={roadmap.image} 
                      alt={roadmap.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                      ★ {roadmap.popularity}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{roadmap.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{roadmap.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {roadmap.estimatedTime}
                      </span>
                      <button className="btn-primary text-sm py-1">View Roadmap</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredRoadmaps.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  No roadmaps found. Try a different search or category.
                </p>
              </div>
            )}
            
            {/* Create Custom Roadmap CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Don't see what you're looking for?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                Create a completely personalized learning roadmap tailored to your specific goals and current skill level.
              </p>
              <button className="btn-primary text-lg py-3 px-8">
                Create Custom Roadmap
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 