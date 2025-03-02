import { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedTime: string;
  content?: string;
  resources?: RoadmapResource[];
  quiz?: Quiz;
}

interface RoadmapResource {
  id: string;
  title: string;
  url: string;
  type: string;
}

interface Quiz {
  id: string;
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctOption?: number;
  explanation?: string;
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: string;
  estimatedTime: string;
  isPublic: boolean;
  userId?: string;
  steps: RoadmapStep[];
  user?: {
    id: string;
    name: string;
  };
}

interface UserProgress {
  roadmap: {
    id: string;
    title: string;
    topic: string;
    difficulty: string;
  };
  steps: {
    stepId: string;
    step: {
      id: string;
      title: string;
      order: number;
    };
    completed: boolean;
    quizScore?: number;
    completedAt?: string;
  }[];
}

interface RoadmapContextType {
  roadmaps: Roadmap[];
  currentRoadmap: Roadmap | null;
  userProgress: UserProgress[];
  loading: boolean;
  error: string | null;
  fetchRoadmaps: (isPublic?: boolean, topic?: string) => Promise<void>;
  fetchRoadmap: (id: string) => Promise<Roadmap | null>;
  createRoadmap: (topic: string, skillLevel: string, additionalInfo?: string, isPublic?: boolean) => Promise<{ success: boolean; roadmapId?: string; error?: string }>;
  updateProgress: (roadmapId: string, stepId: string, completed: boolean, quizScore?: number) => Promise<boolean>;
  fetchUserProgress: () => Promise<void>;
  fetchRoadmapProgress: (roadmapId: string) => Promise<UserProgress | null>;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export const RoadmapProvider = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAuth();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [currentRoadmap, setCurrentRoadmap] = useState<Roadmap | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoadmaps = async (isPublic = true, topic?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      let url = `/api/roadmaps?public=${isPublic}`;
      
      if (topic) {
        url += `&topic=${encodeURIComponent(topic)}`;
      }
      
      if (user) {
        url += `&userId=${user.id}`;
      }
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch roadmaps');
      }
      
      const data = await response.json();
      setRoadmaps(data.roadmaps);
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoadmap = async (id: string): Promise<Roadmap | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Implement AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
      
      try {
        const response = await fetch(`/api/roadmaps/${id}`, { 
          headers,
          signal: controller.signal,
          cache: 'no-store' // Prevent caching issues
        });
        
        clearTimeout(timeoutId); // Clear timeout if response received
        
        if (!response.ok) {
          const data = await response.json().catch(() => ({ error: `Server returned ${response.status}` }));
          throw new Error(data.error || `Failed to fetch roadmap (${response.status})`);
        }
        
        const data = await response.json();
        
        if (!data.roadmap) {
          throw new Error('Invalid roadmap data received from server');
        }
        
        setCurrentRoadmap(data.roadmap);
        return data.roadmap;
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
          throw new Error('Request timed out while loading roadmap');
        }
        throw fetchError;
      }
    } catch (error) {
      console.error('Error fetching roadmap:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createRoadmap = async (
    topic: string,
    skillLevel: string,
    additionalInfo = '',
    isPublic = false
  ): Promise<{ success: boolean; roadmapId?: string; error?: string }> => {
    try {
      setLoading(true);
      setError(null);
      
      if (!token) {
        return { success: false, error: 'You must be logged in to create a roadmap' };
      }

      const response = await fetch('/api/roadmaps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          topic,
          skillLevel,
          additionalInfo,
          isPublic
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create roadmap');
      }
      
      // Add the new roadmap to the list
      setRoadmaps(prev => [data.roadmap, ...prev]);
      
      return { 
        success: true, 
        roadmapId: data.roadmap.id 
      };
    } catch (error) {
      console.error('Error creating roadmap:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (
    roadmapId: string,
    stepId: string,
    completed: boolean,
    quizScore?: number
  ): Promise<boolean> => {
    try {
      if (!token) {
        setError('You must be logged in to update progress');
        return false;
      }

      const response = await fetch('/api/users/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          roadmapId,
          stepId,
          completed,
          quizScore
        })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update progress');
      }

      // Update local state with the new progress
      await fetchUserProgress();
      
      return true;
    } catch (error) {
      console.error('Error updating progress:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      return false;
    }
  };

  const fetchUserProgress = async (): Promise<void> => {
    try {
      if (!user || !token) {
        setUserProgress([]);
        return;
      }

      const response = await fetch('/api/users/progress', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch user progress');
      }
      
      const data = await response.json();
      setUserProgress(data.progress);
    } catch (error) {
      console.error('Error fetching user progress:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  const fetchRoadmapProgress = async (roadmapId: string): Promise<UserProgress | null> => {
    try {
      if (!user || !token) {
        return null;
      }

      const response = await fetch(`/api/users/progress?roadmapId=${roadmapId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch roadmap progress');
      }
      
      const data = await response.json();
      return data.progress[0] || null;
    } catch (error) {
      console.error('Error fetching roadmap progress:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      return null;
    }
  };

  return (
    <RoadmapContext.Provider
      value={{
        roadmaps,
        currentRoadmap,
        userProgress,
        loading,
        error,
        fetchRoadmaps,
        fetchRoadmap,
        createRoadmap,
        updateProgress,
        fetchUserProgress,
        fetchRoadmapProgress
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmaps = (): RoadmapContextType => {
  const context = useContext(RoadmapContext);
  
  if (context === undefined) {
    throw new Error('useRoadmaps must be used within a RoadmapProvider');
  }
  
  return context;
}; 