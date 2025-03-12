'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WebDevRoadmapPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  
  const roadmap = {
    id: 2,
    title: 'Web Development Fundamentals',
    description: 'Learn HTML, CSS, and JavaScript to create responsive websites from scratch. This roadmap takes you from the basics of web technologies to building complete interactive websites.',
    category: 'programming',
    estimatedTime: '8 weeks',
    difficulty: 'Beginner to Intermediate',
    topic: 'Web Development',
    content: [
      {
        week: 1,
        title: 'Introduction to HTML',
        description: 'Learn basic HTML tags and structure; create a simple HTML page. Understand the fundamentals of web page architecture, document structure, and proper usage of semantic elements. Build foundational skills in creating accessible and well-structured web content.',
        details: [
          'Web development overview and how the web works',
          'Setting up development environment (text editor, browser tools)',
          'HTML document structure and DOCTYPE declaration',
          'Essential HTML tags (headings, paragraphs, links, images)',
          'Lists (ordered, unordered, and definition lists)',
          'Tables for structured data presentation',
          'Div and span elements for content organization',
          'HTML comments and best practices for code documentation',
          'Basic accessibility considerations and alt attributes',
          'HTML validation tools and debugging common errors'
        ],
        resources: [
          'W3Schools HTML tutorial (W3Schools)',
          'MDN Web Docs: HTML basics (MDN)',
          'HTML Essential Training (LinkedIn Learning)',
          'HTML Crash Course For Absolute Beginners (YouTube: Traversy Media)',
          'HTML5 & CSS3 Fundamentals: Development for Absolute Beginners (Microsoft)'
        ]
      },
      {
        week: 2,
        title: 'HTML Forms and Semantics',
        description: 'Study forms, input types, and semantic tags; practice creating forms. Learn how to build user-friendly and accessible forms for data collection. Explore modern HTML5 semantic elements and how they improve page structure and SEO.',
        details: [
          'HTML5 semantic elements (header, nav, main, section, article, footer)',
          'Form creation and attributes (action, method, enctype)',
          'Input types and attributes (text, email, password, checkbox, radio)',
          'Form validation with HTML5 attributes (required, pattern, min/max)',
          'Select menus, textarea, and fieldset elements',
          'HTML5 input types (date, color, range, search, etc.)',
          'Custom data attributes (data-*)',
          'Embedding media (audio, video, iframe)',
          'Microdata and rich snippets for SEO',
          'Web accessibility standards (WCAG) and ARIA roles'
        ],
        resources: [
          'HTML5 Forms tutorial (HTML5 Rocks)',
          'CodePen examples of creative forms (CodePen)',
          'MDN Web Docs: HTML forms (MDN)',
          'A Guide To HTML5 Semantics (Smashing Magazine)',
          'Accessibility in HTML Forms (WebAIM)'
        ]
      },
      {
        week: 3,
        title: 'Introduction to CSS',
        description: 'Learn CSS basics: selectors, properties, values; understand the box model and layout. Discover how to style your HTML elements, apply colors, formatting, and basic layouts. Grasp the fundamental concepts of the CSS box model and how it affects element rendering.',
        details: [
          'CSS syntax and integration methods (inline, internal, external)',
          'Selectors (element, class, ID, attribute, pseudo-classes)',
          'CSS specificity and the cascade',
          'Color properties and values (hex, RGB, HSL)',
          'Typography and text styling (font family, size, weight, line height)',
          'The CSS box model (content, padding, border, margin)',
          'Units of measurement (px, em, rem, %, vh/vw)',
          'Basic CSS reset and normalization',
          'Browser developer tools for CSS inspection and debugging',
          'Vendor prefixes and browser compatibility'
        ],
        resources: [
          'W3Schools CSS tutorial (W3Schools)',
          'CSS-Tricks: A Complete Guide to the Box Model',
          'Learn CSS (web.dev by Google)',
          'CSS Diner - CSS Selector Game',
          'MDN Web Docs: CSS basics (MDN)'
        ]
      },
      {
        week: 4,
        title: 'CSS Styling and Layout',
        description: 'Explore CSS positioning, floats, and flexbox; practice responsive designs. Master different layout techniques to position elements on a page. Learn how to create mobile-friendly, responsive layouts that adapt to different screen sizes.',
        details: [
          'CSS positioning methods (static, relative, absolute, fixed, sticky)',
          'Float-based layouts and clearfix techniques',
          'Flexbox model (container properties, item properties)',
          'CSS Grid layout system',
          'Media queries and responsive design principles',
          'Mobile-first approach to design',
          'CSS frameworks introduction (Bootstrap overview)',
          'Common layout patterns and techniques',
          'Responsive images and media',
          'CSS custom properties (variables) for maintainable code'
        ],
        resources: [
          'FreeCodeCamp CSS challenges (FreeCodeCamp)',
          'Flexbox Froggy - A game for learning Flexbox',
          'CSS Grid Garden - A game for learning CSS grid',
          'A Complete Guide to Flexbox (CSS-Tricks)',
          'Responsive Web Design Fundamentals (Udacity)'
        ]
      },
      {
        week: 5,
        title: 'Introduction to JavaScript',
        description: 'Learn JavaScript basics: variables, functions, control structures; understand DOM manipulation. Start writing scripts to make your pages interactive. Learn how to access and modify HTML elements using the Document Object Model (DOM).',
        details: [
          'JavaScript syntax, variables (var, let, const), and data types',
          'Operators and expressions',
          'Control structures (if statements, switch, loops)',
          'Functions (declarations, expressions, arrow functions)',
          'Arrays and array methods',
          'Objects and object methods',
          'The Document Object Model (DOM)',
          'Selecting and manipulating DOM elements',
          'Events and event handling basics',
          'Debugging JavaScript using browser developer tools'
        ],
        resources: [
          'W3Schools JavaScript tutorial (W3Schools)',
          'JavaScript.info - The Modern JavaScript Tutorial',
          'MDN Web Docs: JavaScript Guide (MDN)',
          'Eloquent JavaScript (Free Online Book)',
          'FreeCodeCamp JavaScript Algorithms and Data Structures Certification'
        ]
      },
      {
        week: 6,
        title: 'JavaScript Events and Interactivity',
        description: 'Study event listeners and user interactions; practice creating interactive elements. Build dynamic and engaging user interfaces by handling user events like clicks, mouse movements, and keyboard input. Learn to create form validations and interactive components.',
        details: [
          'Event types (click, submit, keyup, mouseenter, etc.)',
          'Event bubbling, capturing, and delegation',
          'Form validation with JavaScript',
          'Creating and removing elements dynamically',
          'Local storage and session storage',
          'JSON data format and parsing',
          'Introduction to asynchronous JavaScript',
          'Fetch API for basic AJAX requests',
          'Error handling with try/catch',
          'Creating interactive UI components (dropdown menus, modals, tabs)'
        ],
        resources: [
          'MDN Web Docs on events (MDN)',
          'JavaScript Event Listeners Tutorial (JavaScript.info)',
          'Build 15 JavaScript Projects - Vanilla JavaScript Course (YouTube)',
          '30 Day Vanilla JS Coding Challenge (JavaScript30)',
          'You Don\'t Know JS: Async & Performance (Book)'
        ]
      },
      {
        week: 7,
        title: 'Advanced CSS and JavaScript Integration',
        description: 'Learn CSS animations and transitions; integrate JavaScript with CSS for dynamic styling. Create engaging visual effects using CSS animations, and learn how to trigger and control these effects with JavaScript for more complex interactions.',
        details: [
          'CSS transitions and timing functions',
          'CSS transforms (translate, rotate, scale, skew)',
          'CSS animations and keyframes',
          'JavaScript animation libraries overview (GSAP, Anime.js)',
          'DOM manipulation for style changes',
          'Class toggling for state-based styling',
          'Creating interactive navigation menus',
          'Building image sliders and carousels',
          'Implementing smooth scrolling effects',
          'Optimizing animations for performance'
        ],
        resources: [
          'CSS Animation tutorials (Animista)',
          'JavaScript and CSS integration guides (CSS-Tricks)',
          'MDN Web Docs: Using CSS transitions (MDN)',
          'Advanced CSS Animation Techniques (Smashing Magazine)',
          'GSAP Animation Library Documentation (GreenSock)'
        ]
      },
      {
        week: 8,
        title: 'Building a Complete Website',
        description: 'Plan and design a simple website; implement using HTML, CSS, and JavaScript; test and debug. Apply all the skills learned in previous weeks to create a complete, functional website. Learn about project planning, implementation, testing, and deployment.',
        details: [
          'Website planning and wireframing',
          'Project folder structure and organization',
          'Combining HTML, CSS, and JavaScript effectively',
          'Responsive design implementation for all devices',
          'Cross-browser compatibility testing',
          'Performance optimization techniques',
          'Basic SEO considerations',
          'Deployment options and publishing a website',
          'GitHub Pages for hosting static websites',
          'Next steps and continued learning in web development'
        ],
        resources: [
          'Project ideas from GitHub (GitHub)',
          'Web development communities (Stack Overflow)',
          'The Front-End Checklist (GitHub)',
          'Google Lighthouse for website auditing',
          'Deploying Static Websites to Netlify/Vercel (Documentation)'
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