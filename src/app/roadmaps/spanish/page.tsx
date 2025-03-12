'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SpanishRoadmapPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  
  const roadmap = {
    id: 6,
    title: 'Spanish for Beginners',
    description: 'Learn basic Spanish vocabulary, grammar, and conversation skills for everyday use. This comprehensive roadmap will guide you through the fundamentals of Spanish, from pronunciation to basic conversation, helping you build a solid foundation in one of the world\'s most widely spoken languages.',
    category: 'languages',
    estimatedTime: '8 weeks',
    difficulty: 'Beginner',
    topic: 'Languages',
    content: [
      {
        week: 1,
        title: 'Introduction to Spanish',
        description: 'Learn Spanish alphabet, pronunciation; practice greetings, introductions. Discover the sounds of Spanish and begin to understand how the language works while acquiring your first practical phrases for everyday interactions.',
        details: [
          'The Spanish alphabet (el alfabeto) and pronunciation rules',
          'Basic greetings: "Hola", "Buenos días", "Buenas tardes", "Buenas noches"',
          'Introducing yourself: "Me llamo...", "Soy de...", "Mucho gusto"',
          'Basic Spanish phonetics and accent marks',
          'Personal pronouns: yo, tú, él/ella, nosotros/as, vosotros/as, ellos/ellas',
          'Simple questions: "¿Cómo estás?", "¿De dónde eres?", "¿Cómo te llamas?"',
          'Numbers 1-20 (los números)',
          'Polite expressions: "por favor", "gracias", "de nada"',
          'Understanding Spanish dialects and regional differences',
          'Setting up a Spanish learning routine and practice strategies'
        ],
        resources: [
          'Duolingo: Spanish Course for Beginners (Duolingo)',
          'Babbel: Spanish Pronunciation Course (Babbel)',
          'SpanishPod101: Introduction to Spanish (SpanishPod101)',
          'Language Transfer: Complete Spanish (Audio Course)',
          'Forvo: Spanish Pronunciation Guide (Forvo)'
        ]
      },
      {
        week: 2,
        title: 'Basic Vocabulary and Phrases',
        description: 'Learn numbers, colors, days, months; practice common everyday phrases. Build your core vocabulary with essential words and expressions that will help you navigate basic conversations and daily situations.',
        details: [
          'Numbers 1-100 and basic counting',
          'Colors (los colores): rojo, azul, verde, amarillo, etc.',
          'Days of the week (los días de la semana) and months (los meses)',
          'Common phrases for shopping and ordering food',
          'Family members (la familia): madre, padre, hermano/a, etc.',
          'Time expressions and telling time (¿Qué hora es?)',
          'Weather vocabulary (el tiempo) and seasons (las estaciones)',
          'Basic adjectives for describing people and things',
          'Question words: qué, quién, cómo, cuándo, dónde, por qué',
          'Memorization techniques for vocabulary retention'
        ],
        resources: [
          'Quizlet: Spanish Vocabulary Flashcards (Quizlet)',
          'Memrise: Spanish Vocabulary Course (Memrise)',
          'StudySpanish: Basic Vocabulary Lists (StudySpanish)',
          'Drops: Spanish Visual Vocabulary App (Drops)',
          'WordReference: Spanish-English Dictionary (WordReference)'
        ]
      },
      {
        week: 3,
        title: 'Grammar Basics',
        description: 'Study articles, nouns, adjectives; understand basic sentence structure. Explore the building blocks of Spanish grammar to form simple yet correct sentences, focusing on gender agreement and basic syntax.',
        details: [
          'Definite articles (el, la, los, las) and indefinite articles (un, una, unos, unas)',
          'Noun gender (masculine/feminine) and number (singular/plural)',
          'Adjective agreement with nouns in gender and number',
          'Basic sentence structure in Spanish (Subject-Verb-Object)',
          'Negative sentences with "no"',
          'Possessive adjectives: mi, tu, su, nuestro/a, vuestro/a, su',
          'Demonstrative adjectives: este/a, ese/a, aquel/aquella',
          'Simple prepositions: a, de, en, con, por, para',
          'Common conjunctions: y, o, pero, porque',
          'Introduction to the concept of formal vs. informal speech (tú vs. usted)'
        ],
        resources: [
          'StudySpanish: Grammar Tutorial Series (StudySpanish)',
          'Spanish Grammar in Context by Javier Muñoz-Basols (Book)',
          'Lingolia Spanish: Grammar Explanations and Exercises (Lingolia)',
          'The Spanish Experiment: Basic Grammar Guides (Spanish Experiment)',
          'Fluencia: Interactive Grammar Lessons (Fluencia)'
        ]
      },
      {
        week: 4,
        title: 'Verbs and Conjugation',
        description: 'Learn present tense of regular verbs; practice forming simple sentences. Master the art of Spanish verb conjugation starting with the present tense, allowing you to express actions and states in the here and now.',
        details: [
          'Understanding verb infinitives (-ar, -er, -ir endings)',
          'Regular present tense conjugation patterns for -ar verbs',
          'Regular present tense conjugation patterns for -er and -ir verbs',
          'Common regular verbs: hablar, comer, vivir, etc.',
          'The irregular verbs ser and estar (to be) and their uses',
          'Other common irregular verbs: ir, hacer, tener, poder',
          'Asking questions using verbs',
          'Reflexive verbs and pronouns: me, te, se, nos, os, se',
          'Verb + infinitive constructions: querer, necesitar, poder + infinitive',
          'Using verbs in context with time expressions'
        ],
        resources: [
          'Conjuguemos: Verb Conjugation Practice (Conjuguemos)',
          'Duolingo: Present Tense Lessons (Duolingo)',
          'SpanishDict: Verb Conjugation Charts (SpanishDict)',
          'Butterfly Spanish: Verb Tutorials (YouTube)',
          'Conjugation Nation: Spanish Verb App (Conjugation Nation)'
        ]
      },
      {
        week: 5,
        title: 'Conversation Practice',
        description: 'Learn asking, answering basic questions; practice ordering, shopping scenarios. Apply your growing knowledge to real-life conversations and scenarios that you might encounter while traveling or meeting Spanish speakers.',
        details: [
          'Asking for and giving directions: ¿Dónde está...? ¿Cómo llego a...?',
          'Restaurant vocabulary and ordering food in Spanish',
          'Shopping expressions and bargaining phrases',
          'Making plans with friends: suggesting activities and times',
          'Talking about likes and dislikes with gustar and similar verbs',
          'Expressing agreement and disagreement',
          'Phone conversations and useful phrases',
          'Common conversation fillers and connectors',
          'Cultural etiquette in Spanish-speaking countries',
          'Active listening strategies and conversational responses'
        ],
        resources: [
          'iTalki: One-on-one Spanish Tutoring (iTalki)',
          'Tandem: Language Exchange App (Tandem)',
          'SpanishPod101: Conversational Spanish (SpanishPod101)',
          'Coffee Break Spanish: Conversation Lessons (Podcast)',
          'Pimsleur Spanish: Conversational Course (Pimsleur)'
        ]
      },
      {
        week: 6,
        title: 'More Vocabulary and Idioms',
        description: 'Expand vocabulary with common words, phrases; learn idiomatic expressions. Enrich your Spanish by adding colorful expressions, idioms, and topic-specific vocabulary that will make your language sound more natural and nuanced.',
        details: [
          'Vocabulary for travel and transportation',
          'Health and medical terms: parts of the body, common ailments',
          'Common Spanish idioms and expressions: "tener hambre", "hacer frío"',
          'Food and cuisine vocabulary from Spanish-speaking countries',
          'Work and profession-related vocabulary',
          'Hobbies and leisure activities vocabulary',
          'Common slang terms (appropriate for beginners)',
          'Expressions of emotion and feelings',
          'False friends (words that look similar to English but have different meanings)',
          'Regional vocabulary differences in Spanish-speaking countries'
        ],
        resources: [
          'LingQ: Spanish Vocabulary Builder (LingQ)',
          'Why Not Spanish: Idioms and Expressions (YouTube)',
          'Easy Spanish: Street Interviews with Spanish Speakers (YouTube)',
          'FluentU: Spanish Immersion Videos (FluentU)',
          'SpanishDict: Idioms Dictionary (SpanishDict)'
        ]
      },
      {
        week: 7,
        title: 'Past and Future Tenses',
        description: 'Learn basic past, future verb forms; practice using in sentences. Begin to move beyond the present tense by learning how to talk about past events and future plans, significantly expanding your ability to communicate.',
        details: [
          'Introduction to the preterite tense for completed past actions',
          'Regular preterite conjugation patterns',
          'Common irregular preterite verbs: ser, ir, hacer, estar',
          'Introduction to the imperfect tense for ongoing past actions',
          'When to use preterite vs. imperfect (basic distinctions)',
          'Introduction to the simple future tense',
          'Using "ir a + infinitive" for near future plans',
          'Time expressions used with past tenses: ayer, la semana pasada, etc.',
          'Time expressions used with future tenses: mañana, la próxima semana, etc.',
          'Creating simple narratives using past, present, and future'
        ],
        resources: [
          'SpanishPod101: Past Tense Lessons (SpanishPod101)',
          'Busuu: Past Tense Exercises (Busuu)',
          'StudySpanish: Preterite vs. Imperfect Explanation (StudySpanish)',
          'Notes in Spanish: Beginner Past Tense Podcast (Notes in Spanish)',
          'Professor Jason: Spanish Tenses Tutorials (YouTube)'
        ]
      },
      {
        week: 8,
        title: 'Review and Practice',
        description: 'Review all material; practice speaking, listening, reading, writing. Consolidate everything you\'ve learned through comprehensive practice in all language skills, identifying strengths and areas that need more attention.',
        details: [
          'Comprehensive vocabulary review across all topics',
          'Grammar review focusing on trouble spots',
          'Reading comprehension practice with simple Spanish texts',
          'Writing short paragraphs about yourself, daily activities, and plans',
          'Listening practice with slow Spanish audio',
          'Speaking practice: recording yourself and evaluating pronunciation',
          'Mock conversations covering common scenarios',
          'Self-assessment of strengths and weaknesses',
          'Setting goals for continuing Spanish learning',
          'Resources and strategies for intermediate Spanish study'
        ],
        resources: [
          'ExamTime: Spanish Practice Tests (ExamTime)',
          'HelloTalk: Find Spanish Conversation Partners (HelloTalk)',
          'Readlang: Spanish Reading Practice (Readlang)',
          'News in Slow Spanish: Beginner Articles (News in Slow Spanish)',
          'Common European Framework of Reference for Languages: Self-Assessment Grid (PDF)'
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