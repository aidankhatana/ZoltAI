// Add or update existing types

export interface Resource {
  title: string;
  type: string;
  url: string;
}

export interface Milestone {
  title: string;
  description: string;
  duration: string;
  skills: string[];
  resources?: Resource[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: string;
  milestones: Milestone[];
}

// Keep any other existing types 