'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SkillLevelAssessment from '@/components/SkillLevelAssessment';
import { motion } from 'framer-motion';

export default function AssessmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') || 'this subject';
  
  const handleSubmit = (level: string) => {
    // In a real application, you would send this data to your backend
    // For now, we'll just redirect to a success page with the parameters
    router.push(`/roadmap-generator?topic=${encodeURIComponent(topic)}&level=${encodeURIComponent(level)}`);
  };

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
              Skill Assessment
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Let's create a personalized learning path that matches your current skill level and goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Assessment Section */}
      <section className="py-12 flex-grow bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SkillLevelAssessment topic={topic} onSubmit={handleSubmit} />
        </div>
      </section>
    </main>
  );
} 