import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface RoadmapGenerationParams {
  topic: string;
  skillLevel: string;
  additionalInfo?: string;
}

interface StepGenerationParams {
  topic: string;
  stepTitle: string;
  skillLevel: string;
}

interface QuizGenerationParams {
  stepTitle: string;
  stepContent: string;
}

export const generateRoadmap = async ({ topic, skillLevel, additionalInfo = '' }: RoadmapGenerationParams) => {
  try {
    const prompt = `
      Generate a detailed learning roadmap for the topic: "${topic}".
      The user's current skill level is: "${skillLevel}".
      Additional context: "${additionalInfo}".
      
      Format the response as a JSON object with the following structure:
      {
        "title": "A descriptive title for the roadmap",
        "description": "A detailed overview of what the user will learn",
        "estimatedTime": "Total estimated completion time (e.g., '6 weeks')",
        "difficulty": "The difficulty level",
        "steps": [
          {
            "title": "Step title",
            "description": "Brief description of this step",
            "order": 1,
            "estimatedTime": "Time to complete this step (e.g., '3 days')",
            "resources": [
              {
                "title": "Resource title",
                "url": "https://example.com/resource",
                "type": "article|video|book|course"
              }
            ]
          }
        ]
      }
      
      Ensure each step is logical and builds upon previous steps. Include 5-10 steps depending on the topic complexity.
      For each step, include 2-3 relevant resources.
      Make sure the estimated time is realistic and the entire roadmap follows a proper learning sequence.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error('Error parsing Gemini response as JSON:', error);
      throw new Error('Invalid response format from AI');
    }
  } catch (error) {
    console.error('Error generating roadmap with Gemini:', error);
    throw error;
  }
};

export const generateStepContent = async ({ topic, stepTitle, skillLevel }: StepGenerationParams) => {
  try {
    const prompt = `
      Generate comprehensive learning content for the step: "${stepTitle}" within the topic "${topic}".
      The user's skill level is: "${skillLevel}".
      
      Create educational content that:
      1. Explains core concepts clearly with examples
      2. Includes practical applications or exercises
      3. Has proper formatting with headings, bullet points, and code snippets if relevant
      4. Builds on previous knowledge but doesn't assume too much
      5. Is engaging and conversational in tone
      
      Make the content substantial enough to be valuable (at least 1000 words) but not overwhelming.
      Focus on clarity and practical understanding rather than just theoretical knowledge.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating step content with Gemini:', error);
    throw error;
  }
};

export const generateQuiz = async ({ stepTitle, stepContent }: QuizGenerationParams) => {
  try {
    const prompt = `
      Based on the following learning content about "${stepTitle}", generate a short quiz to test the user's understanding.
      
      Content: "${stepContent.substring(0, 2000)}..." (truncated for brevity)
      
      Format the response as a JSON object with the following structure:
      {
        "questions": [
          {
            "text": "Question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctOption": 0, // Index of the correct option (0-based)
            "explanation": "Explanation of why this answer is correct"
          }
        ]
      }
      
      Create 3-5 questions that:
      1. Test understanding of key concepts from the content
      2. Include a mix of easy and challenging questions
      3. Have clear, unambiguous answers
      4. Provide helpful explanations for the correct answers
      
      Each question should have 4 options with only one correct answer.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      return JSON.parse(text);
    } catch (error) {
      console.error('Error parsing Gemini quiz response as JSON:', error);
      throw new Error('Invalid quiz format from AI');
    }
  } catch (error) {
    console.error('Error generating quiz with Gemini:', error);
    throw error;
  }
}; 