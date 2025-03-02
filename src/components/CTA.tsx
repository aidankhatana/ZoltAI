'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="py-20 bg-sunset-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to start your learning journey?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Create your personalized learning roadmap today and transform your educational experience with AI-powered guidance tailored specifically to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/assessment" 
                className="btn-primary bg-sunset-600 hover:bg-sunset-700 dark:bg-sunset-700 dark:hover:bg-sunset-600 text-center"
              >
                Start Free Assessment
              </Link>
              <Link 
                href="/roadmaps" 
                className="btn-secondary text-center"
              >
                Explore Roadmaps
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Students learning together" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 