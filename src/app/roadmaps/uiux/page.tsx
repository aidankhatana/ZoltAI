'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function UIUXRoadmapPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  
  const roadmap = {
    id: 3,
    title: 'UI/UX Design Essentials',
    description: 'Master user-centered design principles to create intuitive and beautiful interfaces. This roadmap guides you through the fundamentals of UI/UX design, from understanding design thinking to building your portfolio.',
    category: 'design',
    estimatedTime: '10 weeks',
    difficulty: 'Beginner to Intermediate',
    topic: 'Design',
    content: [
      {
        week: 1,
        title: 'Introduction to UI/UX Design',
        description: 'Understand UI vs. UX; learn the design process and user-centered design. Explore the differences between user interface and user experience design, learn about design principles, and understand the role of designers in product development.',
        details: [
          'Understanding the difference between UI and UX design',
          'History and evolution of user experience design',
          'The design process: discover, define, design, develop, deliver',
          'User-centered design principles and methodologies',
          'Role of designers in product teams',
          'Design thinking overview and mindset',
          'Basic tools used in UI/UX design',
          'Understanding user needs and business goals',
          'Introduction to user research and its importance',
          'Case studies of successful UI/UX design'
        ],
        resources: [
          'UX Design Institute: Introduction to UX Design (UX Design Institute)',
          'Interaction Design Foundation: What is UX Design? (Interaction Design)',
          'UX Crash Course: 31 Fundamentals (The UX Crash Course)',
          'Nielsen Norman Group: UX 101 Articles (Nielsen Norman Group)',
          'YouTube: The Futur - What is UX Design? (The Futur)'
        ]
      },
      {
        week: 2,
        title: 'Design Thinking',
        description: 'Learn design thinking methodology; practice empathy, define, ideate, prototype, test. Dive into the human-centered approach to innovation and problem-solving used by designers to match people\'s needs with feasible technology and viable business strategies.',
        details: [
          'The five stages of design thinking: empathize, define, ideate, prototype, test',
          'Empathy mapping and user personas',
          'Problem definition and framing techniques',
          'How to conduct effective brainstorming sessions',
          'Ideation methods and creative thinking exercises',
          'Low-fidelity prototyping methods',
          'User testing basics and gathering feedback',
          'Iterative design process and continuous improvement',
          'Case studies of design thinking in action',
          'Applying design thinking to real-world problems'
        ],
        resources: [
          'Stanford d.school: Introduction to Design Thinking (Stanford d.school)',
          'IDEO Design Thinking Resources (IDEO)',
          'Coursera: Design Thinking for Innovation (University of Virginia)',
          'Design Thinking Workshop Materials (Miro)',
          'The Design Thinking Playbook (Book)'
        ]
      },
      {
        week: 3,
        title: 'User Research',
        description: 'Study user research methods: surveys, interviews, usability testing; conduct small projects. Learn how to gather insights about user behaviors, needs, and motivations to inform your design decisions and create more user-centered products.',
        details: [
          'Qualitative vs. quantitative research methods',
          'Planning and conducting user interviews',
          'Creating effective surveys and questionnaires',
          'Usability testing methods and protocols',
          'Field studies and contextual inquiry',
          'Card sorting and tree testing for information architecture',
          'Analyzing and synthesizing research findings',
          'Creating research reports and presentations',
          'Ethical considerations in user research',
          'Recruiting participants for user research studies'
        ],
        resources: [
          'Nielsen Norman Group: User Research Methods (Nielsen Norman Group)',
          'Just Enough Research by Erika Hall (Book)',
          'User Interviews: How to Conduct Research (User Interviews)',
          'Maze: Remote Usability Testing Guide (Maze)',
          'Mixed Methods: UX Research Podcast (Mixed Methods)'
        ]
      },
      {
        week: 4,
        title: 'Information Architecture',
        description: 'Organize and structure content; learn sitemaps, wireframes, navigation. Discover how to create logical structures that help users understand where they are and where the information they want is located within a product.',
        details: [
          'Fundamentals of information architecture',
          'Content inventory and audit techniques',
          'Creating site maps and user flows',
          'Navigation patterns and best practices',
          'Card sorting and tree testing methods',
          'Wireframing: tools and techniques',
          'Low-fidelity vs. high-fidelity wireframes',
          'Content hierarchy and organization principles',
          'Mobile-first information architecture',
          'Testing and validating information architecture'
        ],
        resources: [
          'Information Architecture for the Web and Beyond (Book)',
          'Boxes and Arrows: Information Architecture articles (Boxes and Arrows)',
          'UX Booth: Complete Beginner\'s Guide to Information Architecture (UX Booth)',
          'Optimal Workshop: Information Architecture Tools (Optimal Workshop)',
          'Content Strategy for the Web by Kristina Halvorson (Book)'
        ]
      },
      {
        week: 5,
        title: 'Visual Design Principles',
        description: 'Learn color theory, typography, composition; practice creating visual designs. Master the fundamental principles that make designs visually appealing, communicative, and accessible to users.',
        details: [
          'Color theory: psychology, schemes, and accessibility',
          'Typography fundamentals and best practices',
          'Layout principles and grid systems',
          'Visual hierarchy and composition',
          'Design principles: proximity, alignment, repetition, contrast',
          'Gestalt principles in design',
          'Imagery selection and use in interfaces',
          'Responsive design considerations',
          'Creating mood boards and style tiles',
          'Brand identity integration in UI design'
        ],
        resources: [
          'Google Material Design Guidelines (Google Design)',
          'Skillshare: Fundamentals of Design (Skillshare)',
          'Refactoring UI by Adam Wathan & Steve Schoger (Book)',
          'Design Systems: A practical guide to creating design languages (Book)',
          'Laws of UX: Using Psychology to Design Better Products (Website)'
        ]
      },
      {
        week: 6,
        title: 'Interaction Design',
        description: 'Design interactions and user flows; understand prototyping tools like Figma, Sketch. Learn how to create meaningful and intuitive interactions between users and products, focusing on behaviors and feedback systems.',
        details: [
          'Fundamentals of interaction design',
          'Microinteractions and their importance',
          'Affordances, signifiers, and mental models',
          'Animation principles for UI design',
          'Introduction to Figma: interface and basic features',
          'Creating interactive prototypes in Figma',
          'Introduction to Sketch and other prototyping tools',
          'User flows and journey mapping',
          'Designing system states and feedback',
          'Mobile interaction patterns and gestures'
        ],
        resources: [
          'Interaction Design Foundation: Interaction Design Courses (Interaction Design)',
          'Figma Tutorial: Getting Started with Figma (Figma)',
          'About Face: The Essentials of Interaction Design by Alan Cooper (Book)',
          'UI Animation in Practice (Webflow University)',
          'Microinteractions: Designing with Details by Dan Saffer (Book)'
        ]
      },
      {
        week: 7,
        title: 'Accessibility and Inclusive Design',
        description: 'Design for accessibility and inclusivity; understand WCAG guidelines. Learn how to create products that can be used by people with a wide range of abilities, disabilities, and other characteristics.',
        details: [
          'Introduction to web accessibility and inclusive design',
          'WCAG 2.1 guidelines and compliance levels',
          'Designing for screen readers and assistive technologies',
          'Color contrast requirements and testing tools',
          'Typography and readability considerations',
          'Keyboard navigation and focus management',
          'Designing for different abilities and disabilities',
          'Inclusive design considerations beyond disabilities',
          'Accessibility testing methods and tools',
          'Legal requirements and business case for accessibility'
        ],
        resources: [
          'WebAIM: Web Accessibility In Mind (WebAIM)',
          'Microsoft Inclusive Design Toolkit (Microsoft Design)',
          'A11Y Project: Web Accessibility Checklist (A11Y Project)',
          'Designing for Accessibility is Designing for Everyone (YouTube)',
          'Inclusive Design Patterns by Heydon Pickering (Book)'
        ]
      },
      {
        week: 8,
        title: 'Design Systems',
        description: 'Create and use design systems; understand components, patterns, style guides. Learn to build and maintain scalable design systems that ensure consistency across products and increase design and development efficiency.',
        details: [
          'Introduction to design systems and their benefits',
          'Anatomy of a design system: principles, components, patterns',
          'Creating component libraries and style guides',
          'Atomic design methodology',
          'Design tokens and variables',
          'Documentation best practices for design systems',
          'Collaboration between designers and developers',
          'Design system governance and maintenance',
          'Implementing design systems in Figma/Sketch',
          'Case studies of successful design systems (Material, IBM, Atlassian)'
        ],
        resources: [
          'Design Systems Handbook (InVision)',
          'Atomic Design by Brad Frost (Book)',
          'Figma: Building a Design System (Figma)',
          'Design Systems Conference talks and recordings (Design Systems Conf)',
          'Design Better: Design Systems Handbook (InVision)'
        ]
      },
      {
        week: 9,
        title: 'Project Management for Designers',
        description: 'Manage design projects, timelines, stakeholders; understand design documentation. Learn the skills needed to effectively plan, execute, and deliver design projects while collaborating with cross-functional teams.',
        details: [
          'Design project management basics and methodologies',
          'Project planning, scheduling, and timelines',
          'Stakeholder management and communication',
          'Creating and presenting design documentation',
          'Design critiques and feedback sessions',
          'Working in agile and scrum environments',
          'Design QA and handoff to development',
          'Managing design iterations and revisions',
          'Creative briefs and project requirements',
          'Tools for design project management (Asana, Trello, etc.)'
        ],
        resources: [
          'Design Project Management by Peter L. Phillips (Book)',
          'Udemy: Product Design: The Delft Design Approach (Udemy)',
          'The Designer\'s Guide to Design Project Management (Medium)',
          'A Project Guide to UX Design by Russ Unger and Carolyn Chandler (Book)',
          'Agile for Everybody by Matt LeMay (Book)'
        ]
      },
      {
        week: 10,
        title: 'Building a Design Portfolio',
        description: 'Create a portfolio showcasing your work; practice presenting designs and reflecting on process. Learn how to effectively present your design work, communicate your process, and stand out in the competitive design industry.',
        details: [
          'Fundamentals of design portfolios',
          'Selecting and curating projects for your portfolio',
          'Storytelling and case study structure',
          'Portfolio platforms and tools (Behance, Dribbble, personal website)',
          'Documenting your design process effectively',
          'Creating compelling visual presentations',
          'Writing about design work and process',
          'Portfolio reviews and feedback',
          'Building your personal brand as a designer',
          'Presenting your work in interviews and design talks'
        ],
        resources: [
          'Behance: Creative Portfolio Platform (Behance)',
          'Dribbble: Design Portfolio Community (Dribbble)',
          'How to Create a Portfolio Website (YouTube)',
          'Portfolios for Designers by Sarah Doody (Course)',
          'Getting a Design Job: Portfolio Reviews and Tips (Medium)'
        ]
      }
    ]
  };

  // Find the active week content
  const activeWeekContent = roadmap.content.find(week => week.week === activeWeek);

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-500 to-orange-600 dark:bg-slate-900 dark:from-slate-900 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Roadmap Header */}
          <div className="bg-white dark:bg-slate-900 rounded-t-xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 px-6 py-8 text-white">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{roadmap.title}</h1>
                  <p className="text-amber-100 mt-2">{roadmap.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-800 bg-opacity-30 text-amber-100">
                      {roadmap.topic}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-800 bg-opacity-30 text-amber-100">
                      {roadmap.difficulty}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-800 bg-opacity-30 text-amber-100">
                      ~{roadmap.estimatedTime}
                    </span>
                  </div>
                </div>
                <Link 
                  href="/roadmaps"
                  className="bg-white text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors self-start"
                >
                  &larr; Back to Roadmaps
                </Link>
              </div>
            </div>
          </div>
          
          {/* Roadmap Content */}
          <div className="bg-white dark:bg-slate-900 rounded-b-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            {/* Left Sidebar - Week Navigation */}
            <div className="w-full md:w-1/3 bg-gray-50 dark:bg-slate-800 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Roadmap Weeks</h3>
              <div className="space-y-2 overflow-y-auto max-h-[70vh]">
                {roadmap.content.map((week) => (
                  <div 
                    key={week.week}
                    onClick={() => setActiveWeek(week.week)}
                    className={`cursor-pointer rounded-lg p-3 transition-colors ${
                      activeWeek === week.week 
                        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200' 
                        : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <h4 className="font-medium">Week {week.week}: {week.title}</h4>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Content Area - Week Details */}
            <div className="w-full md:w-2/3 p-6 overflow-y-auto bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
              {activeWeekContent ? (
                <div className="text-gray-900 dark:text-white">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Week {activeWeekContent.week}: {activeWeekContent.title}
                  </h2>
                  <div className="prose max-w-none dark:prose-invert">
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {activeWeekContent.description}
                    </p>
                    
                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                      {activeWeekContent.details.map((detail, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">
                          {detail}
                        </li>
                      ))}
                    </ul>
                    
                    <h3 className="text-lg font-semibold mb-2">Resources</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-6">
                      {activeWeekContent.resources.map((resource, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">
                          {resource}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={() => setActiveWeek(prev => Math.max(1, prev - 1))}
                        disabled={activeWeek === 1}
                        className={`px-4 py-2 rounded-lg ${
                          activeWeek === 1
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:hover:bg-amber-900/50'
                        }`}
                      >
                        &larr; Previous Week
                      </button>
                      <button
                        onClick={() => setActiveWeek(prev => Math.min(roadmap.content.length, prev + 1))}
                        disabled={activeWeek === roadmap.content.length}
                        className={`px-4 py-2 rounded-lg ${
                          activeWeek === roadmap.content.length
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:hover:bg-amber-900/50'
                        }`}
                      >
                        Next Week &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a week to view its details
                  </h3>
                  <p className="text-gray-600 dark:text-white max-w-md">
                    Click on a week from the list on the left to view its content and resources.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 