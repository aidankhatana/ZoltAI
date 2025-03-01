# SophosAI - Personalized Learning Path Generator

SophosAI is an AI-powered platform that creates personalized learning paths based on users' learning goals and current skill levels. The application leverages advanced technologies to provide customized curricula, adaptive quizzes, and interactive roadmaps with estimated completion times.

## Features

- **AI-Generated Roadmaps**: Personalized learning paths created by AI based on specific goals and skill levels
- **Skill Level Assessment**: Interactive assessment to determine the user's current knowledge level
- **Custom Roadmap Generator**: Creates tailored learning paths based on topic and skill level
- **Interactive Content**: Step-by-step guides and tutorials tailored to each stage of the learning journey
- **Adaptive Learning**: Curriculum that adjusts based on performance on quizzes and exercises
- **Time Estimates**: Detailed information on how long each step will take
- **Progress Tracking**: Monitor advancement through the roadmap with statistics and metrics
- **User Authentication**: Secure login and registration for personalized experiences

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **Authentication**: NextAuth.js
- **AI Integration**: Google Gemini API (planned integration)
- **Deployment**: Ready for deployment on Vercel or similar platforms

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 8.x or later

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/sophosai.git
   cd sophosai
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/src/app`: Next.js app directory (pages and layouts)
  - `/src/app/assessment`: Skill level assessment page
  - `/src/app/roadmap-generator`: Custom roadmap generator page
  - `/src/app/roadmaps`: Explore existing roadmaps page
  - `/src/app/about`: About page with mission and features
  - `/src/app/login` & `/src/app/register`: Authentication pages
- `/src/components`: Reusable React components
  - `/src/components/SkillLevelAssessment`: Component for assessing user skill level
- `/src/styles`: Global styles and Tailwind CSS configuration
- `/src/lib`: Utility functions and libraries
- `/src/hooks`: Custom React hooks

## Key Features Explained

### Skill Level Assessment
The assessment page allows users to select their current skill level in a specific topic. This information is used to generate a personalized learning roadmap tailored to their needs.

### Roadmap Generator
The roadmap generator creates a detailed learning path with:
- Modules organized by difficulty level
- Specific topics within each module
- Recommended resources for each topic
- Estimated completion time
- Visual progress tracking

### Roadmaps Explorer
Browse through pre-generated roadmaps for popular topics or create a custom roadmap for any subject you want to learn.

## Future Development

- Integration with Gemini API for generating actual learning content
- Knowledge graph-based recommendation system
- Advanced adaptive quiz functionality
- User dashboard with progress metrics
- Social features for community learning
- Mobile application for learning on the go

## License

This project is licensed under the MIT License - see the LICENSE file for details.