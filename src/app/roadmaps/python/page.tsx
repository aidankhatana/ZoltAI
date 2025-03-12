'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PythonRoadmapPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  
  const roadmap = {
    id: 1,
    title: 'Learn Python Programming',
    description: 'This roadmap takes you from a beginner to a professional Python developer, focusing on algorithms and data structures.',
    category: 'programming',
    estimatedTime: '12 weeks',
    difficulty: 'Beginner to Advanced',
    topic: 'Python Programming',
    content: [
      {
        week: 1,
        title: 'Introduction to Python',
        description: 'Learn basic syntax, variables, data types, operators; understand control structures like if-else and loops. Set up your development environment with Python and an IDE like VS Code or PyCharm. Write your first Python programs including "Hello World" and simple calculations. Practice using the Python interpreter and running scripts.',
        details: [
          'Setting up Python and a code editor/IDE',
          'Understanding Python\'s philosophy and zen',
          'Basic syntax: indentation, comments, statements',
          'Variables, naming conventions, and keywords',
          'Data types: integers, floats, strings, booleans',
          'Basic operators: arithmetic, comparison, logical',
          'String operations and formatting',
          'Input/output with print() and input()',
          'Conditional statements (if, elif, else)',
          'Loops: for loops with range() and while loops'
        ],
        resources: [
          'Python official documentation (Python.org)',
          'W3Schools Python tutorial (W3Schools)',
          'Automate the Boring Stuff with Python (Book by Al Sweigart)',
          'Codecademy: Learn Python 3 (Interactive)',
          'Real Python: Python Basics (Tutorial)'
        ]
      },
      {
        week: 2,
        title: 'Functions and Modules',
        description: 'Define functions, understand scope and parameters, learn lambda functions, and work with built-in functions. Import and use modules from Python\'s standard library. Create your own modules and understand namespaces. Explore Python packages and virtual environments.',
        details: [
          'Function definition and calling',
          'Function parameters: positional, keyword, default, variable-length (*args, **kwargs)',
          'Return values and multiple returns',
          'Variable scope: local, enclosing, global, built-in (LEGB rule)',
          'Anonymous functions with lambda',
          'Built-in functions (map, filter, zip, enumerate, etc.)',
          'Importing modules: import statement and from-import syntax',
          'Common standard library modules (math, random, datetime, os)',
          'Creating custom modules and packages',
          'Introduction to pip and virtual environments'
        ],
        resources: [
          'Python documentation on functions and modules (Python Docs)',
          'Real Python: Python Modules and Packages (Tutorial)',
          'Python Tricks by Dan Bader (Book)',
          'Python Standard Library by Example (Book)',
          'LearnPython.org Function Tutorial (Interactive)'
        ]
      },
      {
        week: 3,
        title: 'Data Structures in Python',
        description: 'Explore lists, tuples, sets, dictionaries; learn operations and methods for each data structure. Understand when to use each type, list comprehensions, dictionary comprehensions, and nested data structures. Practice slicing and iterating through collections.',
        details: [
          'Lists: creation, accessing, slicing, methods, nested lists',
          'Tuples: immutability, packing, unpacking, named tuples',
          'Sets: unordered collections, operations, methods, frozensets',
          'Dictionaries: key-value pairs, methods, defaultdict, Counter',
          'List comprehensions and generator expressions',
          'Dictionary comprehensions',
          'Choosing the right data structure for different scenarios',
          'Nested data structures and working with JSON-like data',
          'Collections module (namedtuple, defaultdict, Counter, deque)',
          'Advanced slicing and unpacking techniques'
        ],
        resources: [
          'Python documentation on data structures',
          'GeeksforGeeks: Python Data Structures',
          'Real Python: Python Data Structures (Tutorial)',
          'DataCamp: Python Data Science Toolbox',
          'Fluent Python by Luciano Ramalho (Book, Chapter on Data Structures)'
        ]
      },
      {
        week: 4,
        title: 'File Handling and Input/Output',
        description: 'Read from and write to files; handle standard input and output. Work with different file formats including text, CSV, JSON, and binary files. Understand file paths, error handling when working with files, and context managers with the "with" statement.',
        details: [
          'File objects and open() function',
          'Reading and writing text files',
          'Using "with" statement for file operations',
          'File modes (read, write, append, binary)',
          'Working with file paths using os.path and pathlib',
          'CSV module for reading and writing CSV files',
          'JSON module for working with JSON data',
          'Binary file I/O and struct module',
          'Pickle for Python object serialization',
          'Error handling with try-except for file operations'
        ],
        resources: [
          'Python documentation on file I/O (Python Docs)',
          'Real Python: Working with Files in Python',
          'Automate the Boring Stuff with Python (Chapter on Files)',
          'GeeksforGeeks: File Handling in Python',
          'Python Cookbook by David Beazley (Chapter 5: Files and I/O)'
        ]
      },
      {
        week: 5,
        title: 'Object-Oriented Programming',
        description: 'Learn classes, objects, inheritance, polymorphism; understand encapsulation and abstraction. Define classes with attributes and methods, use constructors, implement inheritance hierarchies, and apply special methods (magic methods) to customize object behavior.',
        details: [
          'Classes, objects, and instances',
          'Class attributes vs instance attributes',
          'Methods, constructors (__init__), and self parameter',
          'Encapsulation and access modifiers (public, protected, private)',
          'Inheritance: single, multiple, and multi-level',
          'Method overriding and super() function',
          'Polymorphism and duck typing',
          'Abstract classes and interfaces with ABC module',
          'Special methods (__str__, __repr__, __eq__, __lt__, etc.)',
          'Property decorators, getters, and setters'
        ],
        resources: [
          'OOP tutorials (Real Python)',
          'Python documentation on classes',
          'Python 3 Object-Oriented Programming by Dusty Phillips (Book)',
          'Corey Schafer: OOP YouTube Series',
          'GeeksforGeeks: Object Oriented Programming in Python'
        ]
      },
      {
        week: 6,
        title: 'Advanced Python Concepts',
        description: 'Study generators, iterators, decorators; explore context managers and with statements. Understand functional programming concepts in Python, closures, meta programming, and advanced error handling techniques.',
        details: [
          'Iterators and the iterator protocol (__iter__, __next__)',
          'Generators and yield statements',
          'Generator expressions and advanced generator patterns',
          'Decorators: creating and using function decorators',
          'Advanced decorators with parameters and class decorators',
          'Context managers and creating your own with __enter__ and __exit__',
          'Closures and function factories',
          'Functional programming in Python (map, filter, reduce)',
          'Error handling: try, except, else, finally, and custom exceptions',
          'Metaprogramming and introspection'
        ],
        resources: [
          'Advanced Python tutorials',
          'Fluent Python by Luciano Ramalho (Book)',
          'Real Python: Python Decorators 101',
          'Python Cookbook by David Beazley (Advanced Topics)',
          'Raymond Hettinger: Beyond PEP 8 (PyCon Talk)'
        ]
      },
      {
        week: 7,
        title: 'Introduction to Data Structures',
        description: 'Understand arrays, linked lists, stacks, queues; implement these fundamental data structures in Python. Learn about time and space complexity, and apply these structures to solve programming problems.',
        details: [
          'Introduction to algorithms and complexity analysis',
          'Arrays and dynamic arrays (lists in Python)',
          'Implementing and using stacks (LIFO)',
          'Queues (FIFO) and double-ended queues',
          'Priority queues and heaps',
          'Linked lists: singly linked and doubly linked',
          'Implementing linked lists in Python',
          'Practical applications of stacks and queues',
          'Memory management and performance considerations',
          'Introduction to problem-solving with data structures'
        ],
        resources: [
          'GeeksforGeeks: Data Structures',
          'LeetCode problems (Easy difficulty)',
          'Problem Solving with Algorithms and Data Structures using Python (Book)',
          'Cracking the Coding Interview (Book, relevant Python sections)',
          'MIT OpenCourseWare: Introduction to Algorithms (6.006)'
        ]
      },
      {
        week: 8,
        title: 'Trees and Graphs',
        description: 'Learn binary trees, binary search trees; explore graph representations and traversals. Implement tree and graph algorithms in Python, and understand their applications in solving complex problems.',
        details: [
          'Tree concepts and terminology',
          'Binary trees and binary tree traversals (inorder, preorder, postorder)',
          'Binary search trees (BST): implementation and operations',
          'Tree balancing algorithms: AVL trees, Red-Black trees',
          'Heaps and heap operations',
          'Graph representations: adjacency matrix, adjacency list',
          'Graph traversals: breadth-first search (BFS), depth-first search (DFS)',
          'Directed vs undirected graphs',
          'Weighted graphs and paths',
          'Applications of trees and graphs in real-world problems'
        ],
        resources: [
          'GeeksforGeeks: Trees and Graphs',
          'Coursera: Data Structures and Algorithms Specialization',
          'Visualgo.net: Visualizing Data Structures and Algorithms',
          'LeetCode: Tree and Graph Problem Sets',
          'Algorithms by Robert Sedgewick (Book, Parts on Trees and Graphs)'
        ]
      },
      {
        week: 9,
        title: 'Sorting Algorithms',
        description: 'Study bubble sort, selection sort, insertion sort; implement merge sort, quick sort in Python. Analyze the time and space complexity of different sorting algorithms and understand their trade-offs.',
        details: [
          'Simple sorting algorithms: bubble sort, selection sort, insertion sort',
          'Analysis of simple sorting algorithms',
          'Divide and conquer approach',
          'Merge sort: implementation and analysis',
          'Quick sort: implementation, pivoting strategies, and analysis',
          'Heap sort and its relation to priority queues',
          'Counting sort, radix sort, and bucket sort',
          'Python\'s built-in sort and sorted() functions (Timsort)',
          'Stable vs unstable sorting',
          'When to use different sorting algorithms'
        ],
        resources: [
          'GeeksforGeeks: Sorting Algorithms',
          'Khan Academy: Sorting Algorithms',
          'VisuAlgo: Sorting Visualization',
          'Introduction to Algorithms (Book, Sorting Chapters)',
          'Python Implementation of Sorting Algorithms GitHub Repository'
        ]
      },
      {
        week: 10,
        title: 'Searching Algorithms',
        description: 'Learn linear search, binary search; explore hash tables and implementations. Understand the efficiency of different search techniques and when to apply each method.',
        details: [
          'Linear search and its applications',
          'Binary search on sorted arrays',
          'Recursive vs iterative binary search',
          'Hashing concepts and hash functions',
          'Hash tables: implementation and collision resolution strategies',
          'Python dictionaries and sets (hash table implementations)',
          'Search trees: BST, AVL, Red-Black',
          'String searching algorithms: naive, KMP, Rabin-Karp',
          'Trie data structure for efficient string searches',
          'Practical applications of searching algorithms'
        ],
        resources: [
          'GeeksforGeeks: Searching Algorithms',
          'W3Schools: Python Search Algorithms',
          'Algorithms by Robert Sedgewick (Book, Searching Chapters)',
          'LeetCode: Binary Search Problems',
          'Visualgo.net: Search Algorithm Visualizations'
        ]
      },
      {
        week: 11,
        title: 'Dynamic Programming and Recursion',
        description: 'Understand recursion and its applications; tackle basic dynamic programming problems. Learn techniques for optimizing recursive solutions and apply dynamic programming to solve complex problems efficiently.',
        details: [
          'Recursion fundamentals: base cases and recursive cases',
          'Recursive problem solving techniques',
          'Call stack and memory considerations in recursion',
          'Memoization to optimize recursive solutions',
          'Dynamic programming principles: optimal substructure and overlapping subproblems',
          'Top-down vs bottom-up dynamic programming',
          'Classic dynamic programming problems: Fibonacci, knapsack, coin change',
          'String-related dynamic programming: edit distance, longest common subsequence',
          'Matrix chain multiplication and other advanced problems',
          'Converting recursive solutions to dynamic programming'
        ],
        resources: [
          'GeeksforGeeks: Dynamic Programming',
          'Udemy: Dynamic Programming Courses',
          'Elements of Programming Interviews (Book, DP sections)',
          'Dynamic Programming for Coding Interviews (Book)',
          'LeetCode: Dynamic Programming Problem Set'
        ]
      },
      {
        week: 12,
        title: 'Algorithm Analysis and Big O Notation',
        description: 'Study time and space complexity; analyze algorithms. Learn to evaluate and compare algorithm efficiency, optimize code, and select appropriate data structures and algorithms for different scenarios.',
        details: [
          'Introduction to algorithmic efficiency',
          'Big O, Big Omega, and Big Theta notations',
          'Analyzing time complexity of algorithms',
          'Analyzing space complexity of algorithms',
          'Common complexity classes: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)',
          'Amortized analysis of algorithms',
          'Best, worst, and average case analysis',
          'Trade-offs between time and space complexity',
          'Optimizing algorithms for specific constraints',
          'Real-world performance vs theoretical complexity'
        ],
        resources: [
          'GeeksforGeeks: Analysis of Algorithms',
          'MIT OpenCourseWare: Introduction to Algorithms',
          'Introduction to Algorithms by CLRS (Book)',
          'Big-O Cheat Sheet (bigocheatsheet.com)',
          'Algorithms by Robert Sedgewick (Book, Complexity Analysis Chapters)'
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