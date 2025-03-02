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
function generateFallbackRoadmap({ topic, skillLevel }: { topic: string; skillLevel: string }): RoadmapStructure {
  return {
    title: `Learning ${topic} - ${skillLevel} Level`,
    description: `A structured roadmap to learn ${topic} for ${skillLevel} learners. This is a demo roadmap used when the AI service is unavailable.`,
    topic: topic,
    difficulty: skillLevel,
    estimatedTime: "4 weeks",
    steps: [
      {
        title: "Introduction to the Fundamentals",
        description: "Learn the basic concepts and principles",
        order: 1,
        estimatedTime: "3 days",
        content: `This is a placeholder content for the introduction to ${topic}. In a real roadmap, this would contain 500-1000 words of educational content.`,
        resources: [
          {
            title: "Beginner's Guide",
            url: "https://example.com/beginners-guide",
            type: "article"
          },
          {
            title: "Introduction Video Series",
            url: "https://example.com/intro-videos",
            type: "video"
          }
        ]
      },
      {
        title: "Core Techniques",
        description: "Master the essential techniques and methodologies",
        order: 2,
        estimatedTime: "5 days",
        content: `This is placeholder content for core techniques in ${topic}. In a real roadmap, this would contain detailed explanations and examples.`,
        resources: [
          {
            title: "Essential Techniques Handbook",
            url: "https://example.com/handbook",
            type: "book"
          },
          {
            title: "Practice Exercises",
            url: "https://example.com/exercises",
            type: "tutorial"
          }
        ]
      },
      {
        title: "Advanced Concepts",
        description: "Expand your knowledge with advanced topics",
        order: 3,
        estimatedTime: "1 week",
        content: `This is placeholder content for advanced concepts in ${topic}. This would normally include detailed explanations of complex topics.`,
        resources: [
          {
            title: "Advanced Topics Course",
            url: "https://example.com/advanced-course",
            type: "video"
          },
          {
            title: "Research Papers Collection",
            url: "https://example.com/research",
            type: "article"
          }
        ]
      },
      {
        title: "Practical Application",
        description: "Apply your knowledge in real-world scenarios",
        order: 4,
        estimatedTime: "10 days",
        content: `This is placeholder content for practical applications of ${topic}. This section would normally provide guidance on implementing what you've learned.`,
        resources: [
          {
            title: "Case Studies",
            url: "https://example.com/case-studies",
            type: "article"
          },
          {
            title: "Project Tutorials",
            url: "https://example.com/projects",
            type: "tutorial"
          }
        ]
      },
      {
        title: "Mastery and Next Steps",
        description: "Achieve mastery and explore further learning paths",
        order: 5,
        estimatedTime: "1 week",
        content: `This is placeholder content for mastery of ${topic}. This would contain information about advanced specializations and career paths.`,
        resources: [
          {
            title: "Expert Interviews",
            url: "https://example.com/expert-interviews",
            type: "video"
          },
          {
            title: "Community Resources",
            url: "https://example.com/community",
            type: "article"
          }
        ]
      }
    ]
  };
}

export interface QuizStructure {
  questions: {
    text: string;
    options: string[];
    correctOption: number;
    explanation: string;
  }[];
}

// Interface for quiz generation parameters
export interface QuizGenerationParams {
  stepContent: string;
  stepTitle?: string;
  difficulty?: string;
}

export async function generateQuiz({
  stepContent,
  stepTitle = '',
  difficulty = 'intermediate'
}: QuizGenerationParams): Promise<QuizStructure> {
  try {
    console.log(`Generating quiz for ${stepTitle ? `"${stepTitle}"` : 'content'} at ${difficulty} level`);
    
    const prompt = `
    Based on the following educational content, create a quiz to test the learner's understanding.
    Create 3-5 multiple-choice questions appropriate for a ${difficulty} skill level.
    ${stepTitle ? `The content is about: "${stepTitle}"` : ''}

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
      const quiz: QuizStructure = JSON.parse(jsonMatch[0]);
      
      // Validate that the quiz has the expected structure
      if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
        throw new Error('AI generated an invalid quiz structure');
      }
      
      return quiz;
    } catch (apiError) {
      console.error('API error in generateQuiz:', apiError);
      
      // If in development environment, provide a fallback demo quiz
      if (process.env.NODE_ENV === 'development') {
        console.log('Using fallback demo quiz data');
        return generateFallbackQuiz({ stepContent, difficulty });
      }
      
      // Otherwise rethrow with better error message
      throw new Error(handleModelErrors(apiError));
    }
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw new Error(`Failed to generate quiz: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fallback function to generate a demo quiz when the API fails
function generateFallbackQuiz({
  stepContent,
  stepTitle = '',
  difficulty = 'intermediate'
}: QuizGenerationParams): QuizStructure {
  // Extract some keywords from the content to make the quiz somewhat relevant
  const contentSample = stepContent.substring(0, 100).replace(/[^\w\s]/gi, '');
  const keywords = contentSample.split(' ')
    .filter(word => word.length > 4)
    .slice(0, 3);
  
  return {
    questions: [
      {
        text: `Which of the following best describes the main focus of this content?`,
        options: [
          `Understanding the fundamentals of the subject`,
          `Advanced techniques and methodologies`,
          `Practical applications in real-world scenarios`,
          `Historical development of key concepts`
        ],
        correctOption: 0,
        explanation: "This content primarily focuses on fundamental concepts to build a strong foundation of understanding."
      },
      {
        text: `What would be the most appropriate next step after mastering this content?`,
        options: [
          `Review the basics again`,
          `Move on to more advanced topics`,
          `Practice with real-world examples`,
          `Teach the concepts to others`
        ],
        correctOption: 2,
        explanation: "After understanding the concepts, applying them to practical examples helps reinforce learning."
      },
      {
        text: `How would you best describe the level of this content?`,
        options: [
          `Introductory ${keywords[0] || 'beginner'} level`,
          `Intermediate ${keywords[1] || 'practical'} application`,
          `Advanced ${keywords[2] || 'specialized'} knowledge`,
          `Expert research level`
        ],
        correctOption: difficulty.toLowerCase().includes('begin') ? 0 : 
                       difficulty.toLowerCase().includes('inter') ? 1 : 
                       difficulty.toLowerCase().includes('advan') ? 2 : 1,
        explanation: `This content is designed for ${difficulty} learners, focusing on appropriate depth and complexity.`
      }
    ]
  };
}

// Interface for step content generation parameters
export interface StepContentGenerationParams {
  topic: string;
  stepTitle: string;
  skillLevel: string;
}

export async function generateStepContent({
  topic,
  stepTitle,
  skillLevel
}: StepContentGenerationParams): Promise<string> {
  try {
    console.log(`Generating step content for: ${stepTitle} (${topic}) at ${skillLevel} level`);
    
    const prompt = `
    Create detailed educational content for a step in a learning roadmap about ${topic}.
    The step is titled "${stepTitle}" and is targeted at ${skillLevel} level learners.
    
    The content should be comprehensive, educational, and include:
    - Clear explanations of concepts
    - Examples where appropriate
    - Practical applications
    - Tips for better understanding
    
    Write between 500-1000 words of high-quality educational content.
    `;

    try {
      // Attempt to generate content with Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (apiError) {
      console.error('API error in generateStepContent:', apiError);
      
      // If in development environment, provide fallback content
      if (process.env.NODE_ENV === 'development') {
        console.log('Using fallback demo step content');
        return generateFallbackStepContent({ topic, stepTitle, skillLevel });
      }
      
      // Otherwise rethrow with better error message
      throw new Error(handleModelErrors(apiError));
    }
  } catch (error) {
    console.error('Error generating step content:', error);
    throw new Error(`Failed to generate step content: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fallback function to generate demo step content when the API fails
function generateFallbackStepContent({ topic, stepTitle, skillLevel }: StepContentGenerationParams): string {
  return `
# ${stepTitle}

## Introduction to ${topic}

This is a placeholder for detailed educational content about ${topic}, specifically focusing on "${stepTitle}" for ${skillLevel} level learners. In a complete implementation, this section would contain 500-1000 words of high-quality content.

## Key Concepts

When learning about ${topic}, especially at the ${stepTitle} stage, it's important to understand several fundamental concepts:

1. **Foundational Principles**: Understanding the basic building blocks is essential before moving to more complex topics.
   
2. **Practical Applications**: Seeing how these concepts apply in real-world scenarios helps reinforce learning.

3. **Common Challenges**: Being aware of typical obstacles that learners face can help you navigate your learning journey more effectively.

## Examples and Exercises

In a complete lesson, this section would provide concrete examples and practice exercises to help solidify your understanding. These would be tailored to your ${skillLevel} skill level.

## Further Resources

To continue learning about this topic, consider exploring:
- Online tutorials specific to ${topic}
- Practice projects that implement the concepts covered in ${stepTitle}
- Community forums where you can ask questions and share insights with other learners

## Summary

This placeholder content represents what would normally be a comprehensive educational resource on ${stepTitle} within the broader subject of ${topic}. When properly implemented with the Gemini API, this content would be rich, informative, and tailored specifically to your learning needs.
`;
} 