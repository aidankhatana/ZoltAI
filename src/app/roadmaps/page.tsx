'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RoadmapsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [topicInput, setTopicInput] = useState('');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'programming', name: 'Programming' },
    { id: 'design', name: 'Design' },
    { id: 'business', name: 'Business' },
    { id: 'music', name: 'Music' },
    { id: 'languages', name: 'Languages' }
  ];

  const roadmaps = [
    {
      id: 1,
      title: 'Learn Python Programming',
      description: 'This roadmap takes you from a beginner to a professional Python developer, focusing on algorithms and data structures.',
      category: 'programming',
      estimatedTime: '12 weeks',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      popularity: 4.9,
      content: [
        {
          week: 1,
          title: 'Introduction to Python',
          description: 'Learn basic syntax, variables, data types, operators; understand control structures like if-else and loops.',
          resources: ['Python official documentation (Python Docs)', 'W3Schools Python tutorial (W3Schools)']
        },
        {
          week: 2,
          title: 'Functions and Modules',
          description: 'Define functions, understand scope; import and use modules.',
          resources: ['Python documentation on functions and modules (Python Docs)']
        },
        {
          week: 3,
          title: 'Data Structures in Python',
          description: 'Explore lists, tuples, sets, dictionaries; learn operations and methods.',
          resources: ['Python documentation', 'tutorials on data structures (GeeksforGeeks)']
        },
        {
          week: 4,
          title: 'File Handling and Input/Output',
          description: 'Read from and write to files; handle standard input and output.',
          resources: ['Python documentation on file I/O (Python Docs)']
        },
        {
          week: 5,
          title: 'Object-Oriented Programming',
          description: 'Learn classes, objects, inheritance, polymorphism; understand encapsulation and abstraction.',
          resources: ['OOP tutorials (Real Python)']
        },
        {
          week: 6,
          title: 'Advanced Python Concepts',
          description: 'Study generators, iterators, decorators; explore context managers and with statements.',
          resources: ['Advanced Python tutorials, books (Fluent Python)']
        },
        {
          week: 7,
          title: 'Introduction to Data Structures',
          description: 'Understand arrays, linked lists, stacks, queues; implement in Python.',
          resources: ['GeeksforGeeks (GeeksforGeeks)', 'LeetCode problems (LeetCode)']
        },
        {
          week: 8,
          title: 'Trees and Graphs',
          description: 'Learn binary trees, binary search trees; explore graph representations and traversals.',
          resources: ['GeeksforGeeks (GeeksforGeeks)', 'Coursera courses (Coursera)']
        },
        {
          week: 9,
          title: 'Sorting Algorithms',
          description: 'Study bubble sort, selection sort, insertion sort; implement merge sort, quick sort in Python.',
          resources: ['GeeksforGeeks (GeeksforGeeks)', 'Khan Academy (Khan Academy)']
        },
        {
          week: 10,
          title: 'Searching Algorithms',
          description: 'Learn linear search, binary search; explore hash tables and implementations.',
          resources: ['GeeksforGeeks (GeeksforGeeks)', 'W3Schools (W3Schools)']
        },
        {
          week: 11,
          title: 'Dynamic Programming and Recursion',
          description: 'Understand recursion and its applications; tackle basic dynamic programming problems.',
          resources: ['GeeksforGeeks (GeeksforGeeks)', 'Udemy courses (Udemy)']
        },
        {
          week: 12,
          title: 'Algorithm Analysis and Big O Notation',
          description: 'Study time and space complexity; analyze algorithms.',
          resources: ['GeeksforGeeks (GeeksforGeeks)', 'MIT OpenCourseWare (MIT OCW)']
        }
      ]
    },
    {
      id: 2,
      title: 'Web Development Fundamentals',
      description: 'Learn HTML, CSS, and JavaScript from the ground up to create responsive websites. Master front-end technologies and build interactive web pages.',
      category: 'programming',
      estimatedTime: '8 weeks',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      popularity: 4.8,
      content: [
        {
          week: 1,
          title: 'Introduction to HTML',
          description: 'Learn basic HTML tags and structure; create a simple HTML page.',
          resources: ['W3Schools HTML tutorial (W3Schools)', 'MDN Web Docs (MDN)']
        },
        {
          week: 2,
          title: 'HTML Forms and Semantics',
          description: 'Study forms, input types, and semantic tags; practice creating forms.',
          resources: ['HTML5 tutorials (HTML5 Rocks)', 'CodePen examples (CodePen)']
        },
        {
          week: 3,
          title: 'Introduction to CSS',
          description: 'Learn CSS basics: selectors, properties, values; understand the box model and layout.',
          resources: ['W3Schools CSS tutorial (W3Schools)', 'CSS-Tricks (CSS-Tricks)']
        },
        {
          week: 4,
          title: 'CSS Styling and Layout',
          description: 'Explore CSS positioning, floats, and flexbox; practice responsive designs.',
          resources: ['FreeCodeCamp CSS challenges (FreeCodeCamp)', 'CSS Grid tutorials (CSS Grid)']
        },
        {
          week: 5,
          title: 'Introduction to JavaScript',
          description: 'Learn JavaScript basics: variables, functions, control structures; understand DOM manipulation.',
          resources: ['W3Schools JavaScript tutorial (W3Schools)', 'JavaScript.info (JavaScript.info)']
        },
        {
          week: 6,
          title: 'JavaScript Events and Interactivity',
          description: 'Study event listeners and user interactions; practice creating interactive elements.',
          resources: ['MDN Web Docs on events (MDN)', 'JavaScript tutorials on YouTube (YouTube)']
        },
        {
          week: 7,
          title: 'Advanced CSS and JavaScript Integration',
          description: 'Learn CSS animations and transitions; integrate JavaScript with CSS for dynamic styling.',
          resources: ['CSS Animation tutorials (Animista)', 'JavaScript and CSS integration guides (CSS-Tricks)']
        },
        {
          week: 8,
          title: 'Building a Complete Website',
          description: 'Plan and design a simple website; implement using HTML, CSS, and JavaScript; test and debug.',
          resources: ['Project ideas from GitHub (GitHub)', 'Web development communities (Stack Overflow)']
        }
      ]
    },
    {
      id: 3,
      title: 'UI/UX Design Essentials',
      description: 'Master user-centered design principles to create intuitive and beautiful interfaces. This roadmap guides you through the fundamentals of UI/UX design, from understanding design thinking to building your portfolio.',
      category: 'design',
      estimatedTime: '10 weeks',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      popularity: 4.7,
      content: [
        {
          week: 1,
          title: 'Introduction to UI/UX Design',
          description: 'Understand UI vs. UX; learn the design process and user-centered design.',
          resources: ['UX Design Institute (UX Design Institute)', 'Interaction Design Foundation (Interaction Design)']
        },
        {
          week: 2,
          title: 'Design Thinking',
          description: 'Learn design thinking methodology; practice empathy, define, ideate, prototype, test.',
          resources: ['Stanford d.school (Stanford d.school)', 'Design Thinking courses on Coursera (Coursera)']
        },
        {
          week: 3,
          title: 'User Research',
          description: 'Study user research methods: surveys, interviews, usability testing; conduct small projects.',
          resources: ['UX Research tutorials (Nielsen Norman Group)', 'User Interviews book (User Interviews)']
        },
        {
          week: 4,
          title: 'Information Architecture',
          description: 'Organize and structure content; learn sitemaps, wireframes, navigation.',
          resources: ['Information Architecture for the Web (IA for Web)', 'IA tutorials (Boxes and Arrows)']
        },
        {
          week: 5,
          title: 'Visual Design Principles',
          description: 'Learn color theory, typography, composition; practice creating visual designs.',
          resources: ['Design Principles by Google (Google Design)', 'Design Courses on Skillshare (Skillshare)']
        },
        {
          week: 6,
          title: 'Interaction Design',
          description: 'Design interactions and user flows; understand prototyping tools like Figma, Sketch.',
          resources: ['Interaction Design Foundation (Interaction Design)', 'Figma tutorials (Figma)']
        },
        {
          week: 7,
          title: 'Accessibility and Inclusive Design',
          description: 'Design for accessibility and inclusivity; understand WCAG guidelines.',
          resources: ['Web Accessibility tutorials (WebAIM)', 'Inclusive Design courses (Microsoft Design)']
        },
        {
          week: 8,
          title: 'Design Systems',
          description: 'Create and use design systems; understand components, patterns, style guides.',
          resources: ['Design System Handbook (Design System Handbook)', 'Design Systems Conference talks (Design Systems Conf)']
        },
        {
          week: 9,
          title: 'Project Management for Designers',
          description: 'Manage design projects, timelines, stakeholders; understand design documentation.',
          resources: ['Design Project Management books (Project Management)', 'Courses on Udemy (Udemy)']
        },
        {
          week: 10,
          title: 'Building a Design Portfolio',
          description: 'Create a portfolio showcasing your work; practice presenting designs and reflecting on process.',
          resources: ['Portfolio tutorials (Behance)', 'Design communities like Dribbble, Behance (Dribbble)']
        }
      ]
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      description: 'Develop comprehensive digital marketing strategies to grow online presence and conversions. This roadmap guides you through the essential channels and tactics of modern digital marketing, from audience research to automation.',
      category: 'business',
      estimatedTime: '6 weeks',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      popularity: 4.6,
      content: [
        {
          week: 1,
          title: 'Introduction to Digital Marketing',
          description: 'Understand digital marketing importance; learn channels like social media, email, search, content.',
          resources: ['HubSpot Academy (HubSpot)', 'Digital Marketing Institute (DMI)']
        },
        {
          week: 2,
          title: 'Target Audience and Buyer Personas',
          description: 'Define and understand target audience; create buyer personas for tailored strategies.',
          resources: ['HubSpot\'s Guide to Creating Buyer Personas (HubSpot)', 'MarketingSherpa (MarketingSherpa)']
        },
        {
          week: 3,
          title: 'Content Marketing',
          description: 'Understand content\'s role in digital marketing; create and distribute valuable content.',
          resources: ['Content Marketing Institute (CMI)', 'Copyblogger (Copyblogger)']
        },
        {
          week: 4,
          title: 'Search Engine Optimization (SEO)',
          description: 'Learn on-page and off-page optimization; improve website visibility in search engines.',
          resources: ['MOZ (MOZ)', 'SEMrush tutorials (SEMrush)']
        },
        {
          week: 5,
          title: 'Social Media Marketing',
          description: 'Learn social media platforms and uses; develop strategy to engage audience.',
          resources: ['Hootsuite Academy (Hootsuite)', 'Social Media Today (Social Media Today)']
        },
        {
          week: 6,
          title: 'Email Marketing and Automation',
          description: 'Build and manage email lists; learn best practices and automation tools.',
          resources: ['Mailchimp (Mailchimp)', 'HubSpot Email Marketing courses (HubSpot)']
        }
      ]
    },
    {
      id: 5,
      title: 'Learn Guitar from Scratch',
      description: 'From holding the guitar to playing your favorite songs with proper technique. This comprehensive roadmap guides beginners through all the essential skills needed to become a competent guitarist, focusing on both technique and musical understanding.',
      category: 'music',
      estimatedTime: '16 weeks',
      image: '/images/guitarist-mountains.png',
      popularity: 4.9,
      content: [
        {
          week: 1,
          title: 'Getting Started: Guitar Basics',
          description: 'Choose the right guitar and accessories; learn proper holding posture and understand guitar parts.',
          resources: ['Sweetwater: Beginner\'s Guide to Buying Your First Guitar (Sweetwater)', 'JustinGuitar: Beginner Guitar Course Stage 1 (JustinGuitar)']
        },
        {
          week: 2,
          title: 'First Steps in Guitar Playing',
          description: 'Take your first steps in playing guitar by learning about tuning, string names, and basic finger exercises.',
          resources: ['Fender Play: First Steps and String Names (Fender)', 'Justin Guitar: Finger Gym for Beginners (JustinGuitar)']
        },
        {
          week: 3,
          title: 'Tuning and Basic Fretting',
          description: 'Learn tuning methods and begin basic fretting techniques.',
          resources: ['Fender Tune App for Mobile Devices (Fender)', 'JustinGuitar: How to Tune Your Guitar (YouTube)']
        },
        {
          week: 4,
          title: 'Basic Techniques: Strumming and Picking',
          description: 'Practice strumming, picking techniques; play open strings and simple melodies.',
          resources: ['Guitar Lessons: Essential Strumming Patterns for Beginners (Guitar Lessons)', 'Justin Guitar: Picking Techniques and Exercises (JustinGuitar)']
        },
        {
          week: 5,
          title: 'First Chords: The Foundation',
          description: 'Learn open chords: Em, Am, and D; practice switching between them.',
          resources: ['Justin Guitar: First Chords Module (JustinGuitar)', 'Ultimate Guitar: Beginner Chord Library (Ultimate Guitar)']
        },
        {
          week: 6,
          title: 'Expanding Chord Vocabulary',
          description: 'Learn additional open chords: G, C; practice chord progressions.',
          resources: ['Guitar Tricks: Essential Chord Progressions (Guitar Tricks)', 'Justin Guitar: Chord Changing Exercises (JustinGuitar)']
        },
        {
          week: 7,
          title: 'Rhythm Foundations',
          description: 'Develop basic rhythm skills and timing; practice strumming with a metronome.',
          resources: ['Metronome Online: Web-Based Metronome Tool (Metronome Online)', 'Guitar World: Essential Rhythm Lessons (Guitar World)']
        },
        {
          week: 8,
          title: 'Advanced Rhythm and Song Structure',
          description: 'Explore complex strumming patterns and song structures; play songs with varied rhythms.',
          resources: ['Guitar Compass: Advanced Strumming Patterns (Guitar Compass)', 'Acoustic Guitar Magazine: Song Structure Tutorial (Acoustic Guitar)']
        },
        {
          week: 9,
          title: 'Music Theory: Notes and Scales',
          description: 'Learn notes on the fretboard, major scales; understand scale construction.',
          resources: ['Music Theory for Guitar: Interactive Fretboard Learning (Music Theory)', 'Justin Guitar: Practical Music Theory for Guitarists (JustinGuitar)']
        },
        {
          week: 10,
          title: 'Chord Theory and Progressions',
          description: 'Understand chord formation; learn chord progressions in different keys.',
          resources: ['Music Theory for Songwriters: Chord Progression Guide (Hooktheory)', 'Justin Guitar: Practical Chord Theory (JustinGuitar)']
        },
        {
          week: 11,
          title: 'Introduction to Barre Chords',
          description: 'Learn basic barre chord shapes; practice finger strength and placement.',
          resources: ['Justin Guitar: Barre Chord Survival Guide (JustinGuitar)', 'Guitar World: Mastering Barre Chords (Guitar World)']
        },
        {
          week: 12,
          title: 'Advanced Chord Techniques',
          description: 'Practice finger independence with complex chord shapes; explore extended chords.',
          resources: ['TrueFire: Chord Mastery Course (TrueFire)', 'Jazz Guitar Lessons: Extended Chord Voicings (Jazz Guitar Lessons)']
        },
        {
          week: 13,
          title: 'Introduction to Soloing',
          description: 'Learn pentatonic scales for soloing; practice basic lead techniques.',
          resources: ['Guitar Lessons: Pentatonic Scale Mastery (Guitar Lessons)', 'JamPlay: Lead Guitar Fundamentals (JamPlay)']
        },
        {
          week: 14,
          title: 'Improvisation Foundations',
          description: 'Practice improvising over chord progressions; learn to create melodic solos.',
          resources: ['JamTrackCentral: Improvisation Backing Tracks (JamTrackCentral)', 'Stich Method: Improvisation Concepts (YouTube)']
        },
        {
          week: 15,
          title: 'Songwriting and Arrangement',
          description: 'Learn basic songwriting concepts; practice composing original pieces.',
          resources: ['SongTrust: Songwriting Fundamentals (SongTrust)', 'Berklee Online: Introduction to Songwriting (Berklee)']
        },
        {
          week: 16,
          title: 'Performance and Advanced Techniques',
          description: 'Practice performing complete songs; refine technique and style.',
          resources: ['Musicians Institute: Performance Preparation (Musicians Institute)', 'Berklee Online: Stage Performance Techniques (Berklee)']
        }
      ]
    },
    {
      id: 6,
      title: 'Spanish for Beginners',
      description: 'Learn basic Spanish vocabulary, grammar, and conversation skills for everyday use. This comprehensive roadmap will guide you through the fundamentals of Spanish, from pronunciation to basic conversation, helping you build a solid foundation in one of the world\'s most widely spoken languages.',
      category: 'languages',
      estimatedTime: '8 weeks',
      image: '/images/spanish-stock.png',
      popularity: 4.7,
      content: [
        {
          week: 1,
          title: 'Introduction to Spanish',
          description: 'Learn Spanish alphabet, pronunciation; practice greetings, introductions. Discover the sounds of Spanish and begin to understand how the language works while acquiring your first practical phrases for everyday interactions.',
          resources: ['Duolingo: Spanish Course for Beginners (Duolingo)', 'Babbel: Spanish Pronunciation Course (Babbel)', 'SpanishPod101: Introduction to Spanish (SpanishPod101)']
        },
        {
          week: 2,
          title: 'Basic Vocabulary and Phrases',
          description: 'Learn numbers, colors, days, months; practice common everyday phrases. Build your core vocabulary with essential words and expressions that will help you navigate basic conversations and daily situations.',
          resources: ['Quizlet: Spanish Vocabulary Flashcards (Quizlet)', 'Memrise: Spanish Vocabulary Course (Memrise)', 'StudySpanish: Basic Vocabulary Lists (StudySpanish)']
        },
        {
          week: 3,
          title: 'Grammar Basics',
          description: 'Study articles, nouns, adjectives; understand basic sentence structure. Explore the building blocks of Spanish grammar to form simple yet correct sentences, focusing on gender agreement and basic syntax.',
          resources: ['StudySpanish: Grammar Tutorial Series (StudySpanish)', 'Spanish Grammar in Context by Javier Muñoz-Basols (Book)', 'Lingolia Spanish: Grammar Explanations and Exercises (Lingolia)']
        },
        {
          week: 4,
          title: 'Verbs and Conjugation',
          description: 'Learn present tense of regular verbs; practice forming simple sentences. Master the art of Spanish verb conjugation starting with the present tense, allowing you to express actions and states in the here and now.',
          resources: ['Conjuguemos: Verb Conjugation Practice (Conjuguemos)', 'Duolingo: Present Tense Lessons (Duolingo)', 'SpanishDict: Verb Conjugation Charts (SpanishDict)']
        },
        {
          week: 5,
          title: 'Conversation Practice',
          description: 'Learn asking, answering basic questions; practice ordering, shopping scenarios. Apply your growing knowledge to real-life conversations and scenarios that you might encounter while traveling or meeting Spanish speakers.',
          resources: ['iTalki: One-on-one Spanish Tutoring (iTalki)', 'Tandem: Language Exchange App (Tandem)', 'SpanishPod101: Conversational Spanish (SpanishPod101)']
        },
        {
          week: 6,
          title: 'More Vocabulary and Idioms',
          description: 'Expand vocabulary with common words, phrases; learn idiomatic expressions. Enrich your Spanish by adding colorful expressions, idioms, and topic-specific vocabulary that will make your language sound more natural and nuanced.',
          resources: ['LingQ: Spanish Vocabulary Builder (LingQ)', 'Why Not Spanish: Idioms and Expressions (YouTube)', 'Easy Spanish: Street Interviews with Spanish Speakers (YouTube)']
        },
        {
          week: 7,
          title: 'Past and Future Tenses',
          description: 'Learn basic past, future verb forms; practice using in sentences. Begin to move beyond the present tense by learning how to talk about past events and future plans, significantly expanding your ability to communicate.',
          resources: ['SpanishPod101: Past Tense Lessons (SpanishPod101)', 'Busuu: Past Tense Exercises (Busuu)', 'StudySpanish: Preterite vs. Imperfect Explanation (StudySpanish)']
        },
        {
          week: 8,
          title: 'Review and Practice',
          description: 'Review all material; practice speaking, listening, reading, writing. Consolidate everything you\'ve learned through comprehensive practice in all language skills, identifying strengths and areas that need more attention.',
          resources: ['ExamTime: Spanish Practice Tests (ExamTime)', 'HelloTalk: Find Spanish Conversation Partners (HelloTalk)', 'Readlang: Spanish Reading Practice (Readlang)']
        }
      ]
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be implemented to handle the search query
    console.log('Search query:', searchQuery);
  };

  const filteredRoadmaps = roadmaps.filter(roadmap => {
    const matchesCategory = selectedCategory === 'all' || roadmap.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      roadmap.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateCustomRoadmap = (e: React.FormEvent) => {
    e.preventDefault();
    if (topicInput.trim()) {
      window.location.href = `/assessment?topic=${encodeURIComponent(topicInput.trim())}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col theme-sunset">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-sunset">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Discover Learning Roadmaps
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/80 max-w-3xl mx-auto mb-10"
            >
              Explore our most popular AI-generated learning paths or create your own
            </motion.p>
            
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto mb-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search for roadmaps..."
                  className="flex-grow p-4 rounded-lg border border-sunset-300 bg-white/90 focus:ring-2 focus:ring-sunset-400 focus:border-sunset-400 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn-primary md:px-8">
                  Search
                </button>
              </div>
            </motion.form>
          </div>
        </section>

        {/* Categories and Roadmaps Section */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            {/* Categories Filter */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-sunset-500 text-white'
                      : 'bg-sunset-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-sunset-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Roadmaps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRoadmaps.map((roadmap, index) => (
                <motion.div
                  key={roadmap.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="roadmap-card group"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={roadmap.image} 
                      alt={roadmap.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-sunset-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {roadmap.popularity}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{roadmap.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{roadmap.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <svg className="w-5 h-5 mr-1 text-sunset-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {roadmap.estimatedTime}
                      </span>
                      <Link 
                        href={roadmap.id === 1 
                          ? `/roadmaps/python`
                          : roadmap.id === 2
                            ? `/roadmaps/webdev`
                            : roadmap.id === 3
                              ? `/roadmaps/uiux`
                              : roadmap.id === 4
                                ? `/roadmaps/digitalmarketing`
                                : roadmap.id === 5
                                  ? `/roadmaps/guitar`
                                  : roadmap.id === 6
                                    ? `/roadmaps/spanish`
                                    : `/assessment?topic=${encodeURIComponent(roadmap.title)}`}
                        className="btn-primary text-sm py-1 px-4"
                      >
                        View Roadmap
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredRoadmaps.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  No roadmaps found. Try a different search or category.
                </p>
              </div>
            )}
            
            {/* Create Custom Roadmap CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 bg-sunset-50 dark:bg-slate-800 p-8 rounded-xl text-center"
            >
              <h2 className="text-2xl font-bold text-sunset-700 dark:text-sunset-300 mb-4">
                Don't see what you're looking for?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                Create a completely personalized learning roadmap tailored to your specific goals and current skill level.
              </p>
              <form onSubmit={handleCreateCustomRoadmap} className="max-w-xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="What do you want to learn? (e.g., Python, Digital Marketing)"
                    className="flex-grow p-4 rounded-lg border border-sunset-300 bg-white/90 focus:ring-2 focus:ring-sunset-400 focus:border-sunset-400 text-base"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    required
                  />
                  <button 
                    type="submit" 
                    className="btn-primary md:px-8"
                  >
                    Create Custom Roadmap
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
} 