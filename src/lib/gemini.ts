import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Initialize the Gemini API
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

// Initialize the API client with the correct API version
const genAI = new GoogleGenerativeAI(API_KEY);

// Configure model with safety settings
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-pro',
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});

// Helper function to handle API errors
const handleModelErrors = (error: any): string => {
  console.error('Gemini API error:', error);
  
  // Check for common error types
  if (error.message?.includes('not found for API version')) {
    return 'API configuration error: The model version is incorrect or not available. Please check your API key permissions.';
  }
  
  if (error.status === 403) {
    return 'Authentication error: Your API key may be invalid or expired.';
  }
  
  return `An error occurred with the AI service: ${error.message || 'Unknown error'}`;
};

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

// Interface for roadmap generation parameters
export interface RoadmapGenerationParams {
  topic: string;
  skillLevel: string;
  additionalInfo?: string;
}

export async function generateRoadmap({
  topic,
  skillLevel,
  additionalInfo
}: RoadmapGenerationParams): Promise<RoadmapStructure> {
  try {
    console.log(`Generating roadmap for: ${topic} at ${skillLevel} level`);
    
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

    try {
      // Attempt to generate content with Gemini
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
    } catch (apiError) {
      console.error('API error in generateRoadmap:', apiError);
      
      // If in development environment, provide a fallback demo roadmap
      if (process.env.NODE_ENV === 'development') {
        console.log('Using fallback demo roadmap data');
        return generateFallbackRoadmap({ topic, skillLevel });
      }
      
      // Otherwise rethrow with better error message
      throw new Error(handleModelErrors(apiError));
    }
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw new Error(`Failed to generate roadmap: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fallback function to generate a demo roadmap when the API fails
function generateFallbackRoadmap({ topic, skillLeve