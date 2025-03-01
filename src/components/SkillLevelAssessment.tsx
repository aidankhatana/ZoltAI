'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillLevelAssessmentProps {
  topic: string;
  onSubmit: (level: string) => void;
}

const SkillLevelAssessment = ({ topic, onSubmit }: SkillLevelAssessmentProps) => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const skillLevels = [
    {
      id: 'beginner',
      name: 'Beginner',
      description: 'I\'m completely new to this topic'
    },
    {
      id: 'novice',
      name: 'Novice',
      description: 'I know some basics but need structured guidance'
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      description: 'I understand core concepts but want to deepen my knowledge'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'I\'m proficient but want to master advanced topics'
    },
    {
      id: 'expert',
      name: 'Expert',
      description: 'I\'m looking to specialize in niche areas of this topic'
    }
  ];

  const handleSubmit = () => {
    if (selectedLevel) {
      onSubmit(selectedLevel);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Assess Your Current Skill Level
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          To create a personalized learning path for <span className="text-sunset-500 font-semibold">{topic}</span>, we need to understand your current knowledge level.
        </p>
      </motion.div>

      <div className="space-y-4">
        {skillLevels.map((level, index) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div 
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedLevel === level.id 
                  ? 'border-sunset-500 bg-sunset-50 dark:bg-sunset-900/30' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-sunset-300 dark:hover:border-sunset-700'
              }`}
              onClick={() => setSelectedLevel(level.id)}
            >
              <div className="flex items-center">
                <div className="mr-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedLevel === level.id 
                      ? 'border-sunset-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {selectedLevel === level.id && (
                      <div className="w-3 h-3 rounded-full bg-sunset-500"></div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{level.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{level.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 text-center"
      >
        <button 
          onClick={handleSubmit}
          disabled={!selectedLevel}
          className={`btn-primary py-3 px-8 ${
            !selectedLevel 
              ? 'opacity-50 cursor-not-allowed' 
              : 'bg-sunset-600 hover:bg-sunset-700'
          }`}
        >
          Create My Learning Path
        </button>
      </motion.div>
    </div>
  );
};

export default SkillLevelAssessment; 