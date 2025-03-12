'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GuitarRoadmapPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  
  const roadmap = {
    id: 5,
    title: 'Learn Guitar from Scratch',
    description: 'From holding the guitar to playing your favorite songs with proper technique. This comprehensive roadmap guides beginners through all the essential skills needed to become a competent guitarist, focusing on both technique and musical understanding.',
    category: 'music',
    estimatedTime: '16 weeks',
    difficulty: 'Beginner',
    topic: 'Music',
    content: [
      {
        week: 1,
        title: 'Getting Started: Guitar Basics',
        description: 'Choose the right guitar and accessories; learn proper holding posture and understand guitar parts. Discover the fundamentals of guitar anatomy and begin your journey with the correct foundation.',
        details: [
          'Types of guitars: acoustic, electric, classical, and their differences',
          'Essential accessories: picks, capo, tuner, strap, case',
          'Understanding guitar anatomy: headstock, neck, body, bridge, frets',
          'Proper sitting posture for optimal playing comfort',
          'Correct hand positioning for fretting and strumming',
          'Numbering system for fingers and strings',
          'Guitar maintenance basics: string cleaning and instrument care',
          'Holding a pick correctly and alternative picking techniques',
          'Setting up your practice space effectively',
          'Understanding guitar amplifiers and effects (for electric guitar)'
        ],
        resources: [
          'Sweetwater: Beginner\'s Guide to Buying Your First Guitar (Sweetwater)',
          'JustinGuitar: Beginner Guitar Course Stage 1 (JustinGuitar)',
          'Andy Guitar: Complete Beginners Course (YouTube)',
          'Fender Play: Getting Started with Guitar (Fender)',
          'Guitar Tricks: Guitar Setup and Maintenance (Guitar Tricks)'
        ]
      },
      {
        week: 2,
        title: 'First Steps in Guitar Playing',
        description: 'Take your first steps in playing guitar by learning about tuning, string names, and basic finger exercises. Build hand strength and dexterity through simple exercises and begin to develop muscle memory.',
        details: [
          'Understanding standard tuning (EADGBE) and string names',
          'Basic finger exercises for building strength and dexterity',
          'Proper fretting technique to avoid buzzing and muting',
          'Introduction to tablature (tabs) and how to read them',
          'One-finger exercises on individual strings',
          'Avoiding common beginner mistakes and pain points',
          'Setting realistic practice goals and building a schedule',
          'Developing calluses and hand strength safely',
          'Chromatic exercises across the fretboard',
          'Proper warm-up routines before practice sessions'
        ],
        resources: [
          'Fender Play: First Steps and String Names (Fender)',
          'Justin Guitar: Finger Gym for Beginners (JustinGuitar)',
          'Andy Guitar: Complete Guitar Warm-Up (YouTube)',
          'Guitar Tricks: Developing Good Practice Habits (Guitar Tricks)',
          'Premier Guitar: Building Hand Strength and Dexterity (Premier Guitar)'
        ]
      },
      {
        week: 3,
        title: 'Tuning and Basic Fretting',
        description: 'Learn tuning methods and begin basic fretting techniques. Master the art of getting your guitar in perfect tune and start making clean, clear notes on the fretboard.',
        details: [
          'Methods of tuning: using a digital tuner, tuning by ear, relative tuning',
          'Understanding pitch and how tuning affects sound quality',
          'Proper finger placement behind frets for clear tones',
          'Playing individual notes on different strings and frets',
          'Basic note navigation on the 1st and 2nd strings',
          'Using reference pitches to tune by ear',
          'Tuning with harmonics for advanced tuning',
          'One-octave exercises on a single string',
          'Troubleshooting common tuning problems',
          'Different tuning standards (standard, drop D, half-step down)'
        ],
        resources: [
          'Fender Tune App for Mobile Devices (Fender)',
          'JustinGuitar: How to Tune Your Guitar (YouTube)',
          'Music Radar: Mastering Guitar Tuning (Music Radar)',
          'Guitar World: Alternative Tunings Guide (Guitar World)',
          'Ultimate Guitar: Tuning Guide and Reference (Ultimate Guitar)'
        ]
      },
      {
        week: 4,
        title: 'Basic Techniques: Strumming and Picking',
        description: 'Practice strumming, picking techniques; play open strings and simple melodies. Develop a sense of rhythm and timing while learning to coordinate both hands for basic guitar playing.',
        details: [
          'Introduction to different pick thicknesses and materials',
          'Downstroke and upstroke strumming techniques',
          'Alternating picking patterns for single notes',
          'Hand synchronization between strumming and fretting',
          'Playing simple one-string melodies',
          'Developing a consistent picking attack',
          'Managing pick grip and angle for different sounds',
          'Palm muting basics for controlling string resonance',
          'Economy of motion in right-hand technique',
          'Playing simple melodies using multiple strings'
        ],
        resources: [
          'Guitar Lessons: Essential Strumming Patterns for Beginners (Guitar Lessons)',
          'Justin Guitar: Picking Techniques and Exercises (JustinGuitar)',
          'Fender Play: Strumming and Picking Basics (Fender)',
          'Guitareo: Developing Your Picking Technique (Guitareo)',
          'Troy Grady: Introduction to Picking Mechanics (YouTube)'
        ]
      },
      {
        week: 5,
        title: 'First Chords: The Foundation',
        description: 'Learn open chords: Em, Am, and D; practice switching between them. Master these fundamental chord shapes that form the basis of countless songs across many genres.',
        details: [
          'Understanding chord diagrams and chord notation',
          'Finger placement for E minor and A minor chords',
          'Proper technique for the D major chord',
          'Exercises for clean chord transitions',
          'Basic chord progressions using Em, Am, and D',
          'Common finger placement mistakes and how to correct them',
          'Strumming patterns for chord practice',
          'Simple songs using these three chords',
          'Muting unwanted string noise when playing chords',
          'Visualizing chord shapes on the fretboard'
        ],
        resources: [
          'Justin Guitar: First Chords Module (JustinGuitar)',
          'Ultimate Guitar: Beginner Chord Library (Ultimate Guitar)',
          'Andy Guitar: Easy 3-Chord Songs (YouTube)',
          'Fender Play: Beginner Chord Lessons (Fender)',
          'ChordBank App: Interactive Chord Learning (ChordBank)'
        ]
      },
      {
        week: 6,
        title: 'Expanding Chord Vocabulary',
        description: 'Learn additional open chords: G, C; practice chord progressions. Build on your foundation by adding more essential chord shapes to your repertoire, enabling you to play a wider variety of songs.',
        details: [
          'Finger placement for G major and C major chords',
          'Common chord progressions in popular music: G-C-D, Em-C-G, etc.',
          'Efficient transitions between all learned chords',
          'Understanding chord families and relationships',
          'Introduction to the CAGED system of chord shapes',
          'Playing along with backing tracks using chord progressions',
          'Songs that use G, C, D, Em, and Am chords',
          'Rhythm variations when playing chord progressions',
          'Introducing partial chord shapes and "cheat" versions',
          'Building finger independence through chord practice'
        ],
        resources: [
          'Guitar Tricks: Essential Chord Progressions (Guitar Tricks)',
          'Justin Guitar: Chord Changing Exercises (JustinGuitar)',
          'Ultimate Guitar: Easy Songs for Beginners (Ultimate Guitar)',
          'Acoustic Life: CAGED System Introduction (Acoustic Life)',
          'Jamplay: Building Chord Vocabulary (Jamplay)'
        ]
      },
      {
        week: 7,
        title: 'Rhythm Foundations',
        description: 'Develop basic rhythm skills and timing; practice strumming with a metronome. Begin to internalize the pulse of music and learn how guitarists keep time while playing.',
        details: [
          'Understanding time signatures, particularly 4/4 time',
          'Quarter note, eighth note, and sixteenth note strumming patterns',
          'Using a metronome to develop consistent timing',
          'Down-up strumming patterns and counting techniques',
          'Palm muting for rhythmic control',
          'Accenting specific beats in a measure',
          'Introduction to syncopation in strumming patterns',
          'Maintaining consistent tempo during chord changes',
          'Common strumming patterns in folk, rock, and pop music',
          'Dynamics in rhythm playing: quiet vs. loud strumming'
        ],
        resources: [
          'Metronome Online: Web-Based Metronome Tool (Metronome Online)',
          'Guitar World: Essential Rhythm Lessons (Guitar World)',
          'Justin Guitar: Rhythm Guitar Course (JustinGuitar)',
          'Pro Metronome App: Advanced Rhythm Training (Pro Metronome)',
          'Drumeo: Understanding Rhythm from a Drummer\'s Perspective (Drumeo)'
        ]
      },
      {
        week: 8,
        title: 'Advanced Rhythm and Song Structure',
        description: 'Explore complex strumming patterns and song structures; play songs with varied rhythms. Apply your rhythmic skills to realistic musical contexts and learn to navigate different sections of songs.',
        details: [
          'Introduction to song structures: verse, chorus, bridge',
          'Developing dynamic control in rhythm playing',
          'Advanced strumming patterns with rhythm variations',
          'Using rhythm to express emotion in music',
          'Counting and playing triplet patterns',
          'Techniques for smooth transitions between song sections',
          'Incorporating rests and stops in rhythm playing',
          'Matching strumming patterns to song genres',
          'Introduction to rhythmic fills between chords',
          'Playing along with recorded music to develop rhythm'
        ],
        resources: [
          'Guitar Compass: Advanced Strumming Patterns (Guitar Compass)',
          'Acoustic Guitar Magazine: Song Structure Tutorial (Acoustic Guitar)',
          'JamPlay: Dynamic Rhythm Playing (JamPlay)',
          'Guitar Tricks: Genre-Specific Rhythm Techniques (Guitar Tricks)',
          'Songsterr: Play-Along Songs with Rhythm Notation (Songsterr)'
        ]
      },
      {
        week: 9,
        title: 'Music Theory: Notes and Scales',
        description: 'Learn notes on the fretboard, major scales; understand scale construction. Begin to grasp the theoretical foundations that underpin all music and how they apply specifically to the guitar.',
        details: [
          'The musical alphabet and note locations on the fretboard',
          'Understanding the chromatic scale and half/whole steps',
          'Construction of the major scale and its formula (W-W-H-W-W-W-H)',
          'Learning the C major scale in open position',
          'Relationship between scales and keys in music',
          'Using octave shapes to navigate the fretboard',
          'Introduction to the circle of fifths',
          'Scale degrees and their functions (tonic, dominant, etc.)',
          'Practicing scales with correct fingering techniques',
          'Connecting theory to practical guitar playing'
        ],
        resources: [
          'Music Theory for Guitar: Interactive Fretboard Learning (Music Theory)',
          'Justin Guitar: Practical Music Theory for Guitarists (JustinGuitar)',
          'Fretboard Logic: Scale and Chord Theory (Book)',
          'Guitar Tricks: Music Theory Fundamentals (Guitar Tricks)',
          'Circle of Fifths App: Music Theory Tool (Circle of Fifths)'
        ]
      },
      {
        week: 10,
        title: 'Chord Theory and Progressions',
        description: 'Understand chord formation; learn chord progressions in different keys. Explore how chords are constructed from scales and how they function together in musical contexts.',
        details: [
          'Chord construction using triads (root, third, fifth)',
          'Major, minor, and dominant seventh chord formulas',
          'Roman numeral analysis of chord progressions',
          'Common chord progressions in major keys (I-IV-V, I-vi-IV-V, etc.)',
          'Understanding chord substitutions and variants',
          'Transposing chord progressions to different keys',
          'Relationship between chords and the major scale',
          'Introduction to suspended and augmented chords',
          'Using a capo to change keys while maintaining chord shapes',
          'Identifying chord progressions in popular songs'
        ],
        resources: [
          'Music Theory for Songwriters: Chord Progression Guide (Hooktheory)',
          'Justin Guitar: Practical Chord Theory (JustinGuitar)',
          'Guitar Music Theory: Interactive Chord Construction (Guitar Music Theory)',
          'Rick Beato: Understanding Harmony (YouTube)',
          'Chord Wheel: The Ultimate Tool for All Musicians (Book)'
        ]
      },
      {
        week: 11,
        title: 'Introduction to Barre Chords',
        description: 'Learn basic barre chord shapes; practice finger strength and placement. Master these versatile chord shapes that can be moved around the fretboard to play any chord in any key.',
        details: [
          'Technique for proper barre formation with the index finger',
          'E-shape and A-shape barre chord foundations',
          'Exercises for building barre chord strength and endurance',
          'Moving barre shapes to create different chords',
          'Common problems with barre chords and their solutions',
          'Partial barre techniques for easier execution',
          'Transitioning between open chords and barre chords',
          'Using barre chords in simple songs and progressions',
          'Alternative fingerings for challenging barre shapes',
          'Physical conditioning for barre chord mastery'
        ],
        resources: [
          'Justin Guitar: Barre Chord Survival Guide (JustinGuitar)',
          'Guitar World: Mastering Barre Chords (Guitar World)',
          'Fender Play: Barre Chord Essentials (Fender)',
          'Guitar Tricks: Barre Chord Workout (Guitar Tricks)',
          'Andy Guitar: Barre Chord Technique Tutorial (YouTube)'
        ]
      },
      {
        week: 12,
        title: 'Advanced Chord Techniques',
        description: 'Practice finger independence with complex chord shapes; explore extended chords. Build on your chord knowledge with more sophisticated voicings that add color and emotion to your playing.',
        details: [
          'Adding extensions to basic chords (7ths, 9ths, etc.)',
          'Power chords and their use in rock and metal music',
          'Suspended chords (sus2, sus4) and their resolution',
          'Slash chords and inversions for smoother voice leading',
          'Exercises for finger independence and stretch',
          'Chord embellishments and variations',
          'Transitioning efficiently between complex chord shapes',
          'Jazz chord voicings and applications',
          'Playing chord melodies with bass notes and upper voicings',
          'Using movable chord shapes across the fretboard'
        ],
        resources: [
          'TrueFire: Chord Mastery Course (TrueFire)',
          'Jazz Guitar Lessons: Extended Chord Voicings (Jazz Guitar Lessons)',
          'Premier Guitar: Beyond Basic Chords (Premier Guitar)',
          'Guitar Compass: Finger Independence Exercises (Guitar Compass)',
          'Music Theory for Guitar: Advanced Chord Construction (Music Theory)'
        ]
      },
      {
        week: 13,
        title: 'Introduction to Soloing',
        description: 'Learn pentatonic scales for soloing; practice basic lead techniques. Begin your journey into guitar soloing with the most versatile and commonly used scale patterns in popular music.',
        details: [
          'The minor pentatonic scale pattern in first position',
          'Connecting pentatonic patterns across the fretboard',
          'Basic lead techniques: hammer-ons and pull-offs',
          'Introduction to string bending and vibrato',
          'Playing simple licks using the pentatonic scale',
          'Developing phrasing in guitar solos',
          'Targeting chord tones when soloing',
          'Rhythmic variety in lead playing',
          'Practicing with backing tracks in different keys',
          'The major pentatonic scale and its applications'
        ],
        resources: [
          'Guitar Lessons: Pentatonic Scale Mastery (Guitar Lessons)',
          'JamPlay: Lead Guitar Fundamentals (JamPlay)',
          'Justin Guitar: Lead Guitar Course (JustinGuitar)',
          'YouTube: Backing Tracks for Pentatonic Practice (YouTube)',
          'Guitar Tricks: Beginner Lead Techniques (Guitar Tricks)'
        ]
      },
      {
        week: 14,
        title: 'Improvisation Foundations',
        description: 'Practice improvising over chord progressions; learn to create melodic solos. Develop the ability to express yourself musically in the moment by applying scales and techniques to backing tracks.',
        details: [
          'Connecting scales to underlying chord progressions',
          'Developing a repertoire of licks and phrases',
          'Creating musical statements with beginning, middle, and end',
          'Playing over 12-bar blues progressions',
          'Using space effectively in solos',
          'Techniques for building tension and release',
          'Call and response phrasing in improvisation',
          'Speed control and dynamic expression',
          'Mixing pentatonic and major scales in solos',
          'Developing your own unique soloing style'
        ],
        resources: [
          'JamTrackCentral: Improvisation Backing Tracks (JamTrackCentral)',
          'Stich Method: Improvisation Concepts (YouTube)',
          'Guitar Tricks: Creating Musical Solos (Guitar Tricks)',
          'Rick Beato: The Language of Improvisation (YouTube)',
          'TrueFire: Improvisation Master Class (TrueFire)'
        ]
      },
      {
        week: 15,
        title: 'Songwriting and Arrangement',
        description: 'Learn basic songwriting concepts; practice composing original pieces. Begin to create your own music by applying everything you\'ve learned about chords, rhythm, and melody.',
        details: [
          'Song structure and form (verse-chorus-bridge)',
          'Developing chord progressions for different song sections',
          'Creating memorable hooks and riffs',
          'Writing melodies that complement chord progressions',
          'Techniques for overcoming writer\'s block',
          'Lyric writing fundamentals',
          'Guitar-specific arrangement techniques',
          'Recording your ideas with basic audio tools',
          'Developing intro and outro sections',
          'Arranging songs for solo guitar performance'
        ],
        resources: [
          'SongTrust: Songwriting Fundamentals (SongTrust)',
          'Berklee Online: Introduction to Songwriting (Berklee)',
          'Guitar World: Writing Guitar-Based Songs (Guitar World)',
          'Andrea Stolpe: Popular Lyric Writing (Book)',
          'Pat Pattison: Writing Better Lyrics (Book)'
        ]
      },
      {
        week: 16,
        title: 'Performance and Advanced Techniques',
        description: 'Practice performing complete songs; refine technique and style. Bring everything together to prepare for performing in front of others, whether in informal settings or on stage.',
        details: [
          'Preparing a setlist of songs for performance',
          'Techniques for managing performance anxiety',
          'Proper amplification and sound settings for live playing',
          'Stage presence and audience engagement',
          'Transitioning smoothly between songs',
          'Advanced right-hand techniques: fingerpicking, hybrid picking',
          'Recording and evaluating your performances',
          'Incorporating dynamics and expression in performance',
          'Equipment considerations for different performance scenarios',
          'Long-term practice strategies for continued improvement'
        ],
        resources: [
          'Musicians Institute: Performance Preparation (Musicians Institute)',
          'Berklee Online: Stage Performance Techniques (Berklee)',
          'Guitar Player: Mastering Live Performance (Guitar Player)',
          'Tom Hess: Overcoming Stage Fright (Tom Hess)',
          'Home Recording Academy: Recording Guitar (Home Recording Academy)'
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