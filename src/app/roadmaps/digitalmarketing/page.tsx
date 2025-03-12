'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DigitalMarketingRoadmapPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  
  const roadmap = {
    id: 4,
    title: 'Digital Marketing Strategy',
    description: 'Develop comprehensive digital marketing strategies to grow online presence and conversions. This roadmap guides you through the essential channels and tactics of modern digital marketing, from audience research to automation.',
    category: 'business',
    estimatedTime: '6 weeks',
    difficulty: 'Beginner to Intermediate',
    topic: 'Digital Marketing',
    content: [
      {
        week: 1,
        title: 'Introduction to Digital Marketing',
        description: 'Understand digital marketing importance; learn channels like social media, email, search, content. Explore the fundamentals of digital marketing and how various channels work together to create effective marketing campaigns in the digital landscape.',
        details: [
          'The evolution of marketing: from traditional to digital',
          'Key digital marketing channels overview (search, social, email, content)',
          'Digital marketing funnel and customer journey stages',
          'Setting SMART goals for digital marketing campaigns',
          'Introduction to digital marketing metrics and KPIs',
          'Digital marketing roles and required skill sets',
          'Understanding the digital consumer behavior',
          'Identifying digital touchpoints in the customer journey',
          'Digital marketing tools landscape and categories',
          'Ethical considerations in digital marketing'
        ],
        resources: [
          'HubSpot Academy: Digital Marketing Certification Course (HubSpot)',
          'Digital Marketing Institute: Introduction to Digital Marketing (DMI)',
          'Google Digital Garage: Fundamentals of Digital Marketing (Google)',
          'Coursera: Digital Marketing Strategy (University of Illinois)',
          'Neil Patel\'s Digital Marketing Blog (Neil Patel)'
        ]
      },
      {
        week: 2,
        title: 'Target Audience and Buyer Personas',
        description: 'Define and understand target audience; create buyer personas for tailored strategies. Learn how to research, identify, and document your ideal customers to create more relevant marketing content and campaigns that resonate with specific audience segments.',
        details: [
          'Market segmentation principles and approaches',
          'Audience research methods: surveys, interviews, analytics',
          'Creating detailed buyer personas: demographics, psychographics, behaviors',
          'Understanding customer pain points and motivations',
          'Mapping content and messaging to buyer\'s journey stages',
          'Using social listening tools for audience insights',
          'Competitive analysis for audience intelligence',
          'Creating empathy maps to understand customer perspectives',
          'Analyzing website analytics for visitor insights',
          'Testing and refining personas with real-world feedback'
        ],
        resources: [
          'HubSpot\'s Make My Persona Tool (HubSpot)',
          'MarketingSherpa: Customer First Marketing (MarketingSherpa)',
          'Ahrefs: How to Define Your Target Audience (Ahrefs)',
          'User Persona Template Bundle (Xtensio)',
          'The Beginner\'s Guide to Marketing Personas (Buffer)'
        ]
      },
      {
        week: 3,
        title: 'Content Marketing',
        description: 'Understand content\'s role in digital marketing; create and distribute valuable content. Learn how to plan, create, and distribute relevant and consistent content to attract and engage a clearly defined audience, ultimately driving profitable customer action.',
        details: [
          'Content marketing strategy development process',
          'Content types and formats for different objectives',
          'Creating a content calendar and editorial plan',
          'Keyword research for content creation',
          'Storytelling techniques in content marketing',
          'Content distribution channels and promotion strategies',
          'Content performance measurement and analytics',
          'Content repurposing techniques to maximize ROI',
          'User-generated content strategies and implementation',
          'Content optimization for search engines and conversions'
        ],
        resources: [
          'Content Marketing Institute: Getting Started Guide (CMI)',
          'Copyblogger: Content Marketing 101 (Copyblogger)',
          'Semrush: Content Marketing Toolkit (Semrush)',
          'Ann Handley\'s "Everybody Writes" Book (Book)',
          'CoSchedule: Content Marketing Strategy Guide (CoSchedule)'
        ]
      },
      {
        week: 4,
        title: 'Search Engine Optimization (SEO)',
        description: 'Learn on-page and off-page optimization; improve website visibility in search engines. Discover techniques to enhance your website\'s ranking in search engine results pages, increase organic traffic, and understand the technical aspects of SEO implementation.',
        details: [
          'SEO fundamentals and ranking factors overview',
          'On-page SEO elements: title tags, meta descriptions, headers',
          'Keyword research and competitive analysis',
          'Technical SEO: site speed, mobile optimization, indexation',
          'Creating SEO-optimized content',
          'Off-page SEO and link building strategies',
          'Local SEO best practices and techniques',
          'Voice search optimization',
          'SEO tools and performance measurement',
          'Google algorithm updates and SEO adaptations'
        ],
        resources: [
          'MOZ: The Beginner\'s Guide to SEO (MOZ)',
          'SEMrush Academy: SEO Fundamentals Course (SEMrush)',
          'Google Search Central Documentation (Google)',
          'Ahrefs: SEO Learning Hub (Ahrefs)',
          'Backlinko: SEO Marketing Hub (Backlinko)'
        ]
      },
      {
        week: 5,
        title: 'Social Media Marketing',
        description: 'Learn social media platforms and uses; develop strategy to engage audience. Explore how to effectively use social media platforms to build brand awareness, drive website traffic, and engage with your audience through organic content and paid advertising.',
        details: [
          'Social media platform comparison and selection',
          'Developing a social media marketing strategy',
          'Content creation for different social networks',
          'Community management and engagement techniques',
          'Social media advertising fundamentals',
          'Audience targeting options across platforms',
          'Social media analytics and performance tracking',
          'Social media tools for scheduling and management',
          'Influencer marketing on social platforms',
          'Social media trends and emerging platforms'
        ],
        resources: [
          'Hootsuite Academy: Social Media Marketing Courses (Hootsuite)',
          'Social Media Examiner: How to Use Social Media for Business (SME)',
          'Buffer\'s Social Media Marketing Guide (Buffer)',
          'Facebook Blueprint Courses (Facebook)',
          'Sprout Social: Social Media Marketing Strategy (Sprout Social)'
        ]
      },
      {
        week: 6,
        title: 'Email Marketing and Automation',
        description: 'Build and manage email lists; learn best practices and automation tools. Master the art of creating effective email campaigns, building engaged subscriber lists, and implementing marketing automation to nurture leads and improve conversions.',
        details: [
          'Email marketing strategy and planning',
          'Building and growing your email list ethically',
          'Email deliverability best practices',
          'Crafting effective subject lines and email copy',
          'Email design principles and responsive templates',
          'Segmentation and personalization techniques',
          'A/B testing in email marketing',
          'Marketing automation workflows and triggers',
          'Email analytics and performance metrics',
          'Compliance with email regulations (GDPR, CAN-SPAM)'
        ],
        resources: [
          'Mailchimp Marketing Library: Email Marketing Guides (Mailchimp)',
          'HubSpot Email Marketing Certification Course (HubSpot)',
          'Really Good Emails: Email Design Inspiration (Really Good Emails)',
          'Email on Acid: Email Testing Resources (Email on Acid)',
          'Litmus: Email Marketing Blog and Resources (Litmus)'
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