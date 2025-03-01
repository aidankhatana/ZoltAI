# SophosAI - Personalized Learning Path Generator

SophosAI is an AI-powered platform that creates personalized learning paths based on users' learning goals and current skill levels. The application leverages advanced technologies to provide customized curricula, adaptive quizzes, and interactive roadmaps with estimated completion times.

## Features

- **AI-Generated Roadmaps**: Personalized learning paths created by AI based on specific goals and skill levels
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
- `/src/components`: Reusable React components
- `/src/styles`: Global styles and Tailwind CSS configuration
- `/src/lib`: Utility functions and libraries
- `/src/hooks`: Custom React hooks

## Future Development

- Integration with Gemini API for generating actual learning content
- Knowledge graph-based recommendation system
- Advanced adaptive quiz functionality
- User dashboard with progress metrics
- Social features for community learning

## License

This project is licensed under the MIT License - see the LICENSE file for details.