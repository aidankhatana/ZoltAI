import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface RoadmapStructure {
  title: string;
  description: string;
  topic: string;
  difficulty: string;
  estimatedTime: string;
  steps: {
    title: string;
    description: string;
    order: number;
    estimatedTime: string;
    content: string;
    resources: {
      title: string;
      url: string;
      type: string;
    }[];
  }[];
}

export interface QuizStructure {
  questions: {
    text: string;
    options: string[];
    correctOption: number;
    explanation: string;
  }[];
}

export async function generateRoadmap(
  topic: string,
  skillLevel: string,
  additionalInfo?: string
): Promise<RoadmapStructure> {
  try {
    const prompt = `
    Create a detailed learning roadmap for ${topic} at the ${skillLevel} skill level.
    ${additionalInfo ? `Additional context: ${additionalInfo}` : ''}
    
    The response should be a JSON object with the following structure:
    {
      "title": "Title of the roadmap",
      "description": "Brief overview of the roadmap",
      "topic": "${topic}",
      "difficulty": "${skillLevel}",
      "estimatedTime": "Estimated time to complete the entire roadmap (e.g., '4 weeks')",
      "steps": [
        {
          "title": "Step title",
          "description": "Brief description of this step",
          "order": 1,
          "estimatedTime": "Time estimate for this step (e.g., '2 days')",
          "content": "Detailed educational content for this step, including explanations, examples, and exercises (500-1000 words)",
          "resources": [
            {
              "title": "Resource name",
              "url": "URL to the resource",
              "type": "video/article/book/tutorial"
            }
          ]
        }
      ]
    }
    
    Create between 5-8 steps that build logically on each other. Each step should provide enough content for a student to understand the concepts without needing to immediately access external resources.
    For each step, include 2-3 high-quality resources that reinforce the content.
    Make sure all URLs are valid and point to real, existing resources.
    Ensure estimated times are realistic.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Could not extract valid JSON from AI response');
    }
    
    // Parse the JSON string into an object
    const roadmap: RoadmapStructure = JSON.parse(jsonMatch[0]);
    
    // Validate that the roadmap has the expected structure
    if (!roadmap.title || !roadmap.description || !Array.isArray(roadmap.steps) || roadmap.steps.length === 0) {
      throw new Error('AI generated an invalid roadmap structure');
    }
    
    return roadmap;
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw new Error(`Failed to generate roadmap: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateQuiz(stepContent: string, difficulty: string): Promise<QuizStructure> {
  try {
    const prompt = `
    Based on the following educational content, create a quiz to test the learner's understanding.
    Create 3-5 multiple-choice questions appropriate for a ${difficulty} skill level.

    Content:
    ${stepContent}

    The response should be a JSON object with the following structure:
    {
      "questions": [
        {
          "text": "Question text goes here?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctOption": 2, // Index of the correct option (0-based)
          "explanation": "Explanation of why this answer is correct"
        }
      ]
    }

    Make sure questions test different aspects of the content and vary in difficulty.
    Provide clear explanations for the correct answers that reinforce key concepts.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Could not extract valid JSON from AI response');
    }
    
    // Parse the JSON string into an object
    const quiz: QuizStructure = JSON.parse(jsonMatch[0]);
    
    // Validate that the quiz has the expected structure
    if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
      throw new Error('AI generated an invalid quiz structure');
    }
    
    return quiz;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw new Error(`Failed to generate quiz: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateStepContent(topic: string, stepTitle: string, difficulty: string): Promise<string> {
  try {
    const prompt = `
    Create detailed educational content for a step in a learning roadmap about ${topic}.
    The step is titled "${stepTitle}" and is targeted at ${difficulty} level learners.
    
    The content should be comprehensive, educational, and include:
    - Clear explanations of concepts
    - Examples where appropriate
    - Practical applications
    - Tips for better understanding
    
    Write between 500-1000 words of high-quality educational content.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating step content:', error);
    throw new Error(`Failed to generate step content: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 