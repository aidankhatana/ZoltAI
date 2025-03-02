'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          About SophosAI
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            SophosAI is an innovative platform designed to revolutionize personalized learning
            through artificial intelligence. Our mission is to make education more accessible, 
            engaging, and tailored to each individual's unique learning style.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">
            Our Vision
          </h2>
          
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            We believe that everyone deserves a learning experience that adapts to their needs,
            pace, and interests. By leveraging the latest advancements in artificial intelligence,
            we create customized learning roadmaps that help learners achieve their goals efficiently.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">
            How It Works
          </h2>
          
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            SophosAI analyzes your learning preferences, existing knowledge, and goals to create
            a personalized learning pathway. Our algorithm continuously adapts based on your progress,
            ensuring that your learning journey is always optimized for your success.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">
            Join Us
          </h2>
          
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            Whether you're looking to master a new skill, advance in your career, or explore a 
            new hobby, SophosAI is here to guide you every step of the way. Start your 
            personalized learning journey today!
          </p>
        </div>
      </div>
    </div>
  );
}