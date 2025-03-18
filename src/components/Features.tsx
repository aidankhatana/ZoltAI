import { motion } from 'framer-motion';
import Link from 'next/link';

const Features = () => {
  const features = [
    {
      title: 'AI-Powered Personalization',
      description: 'Get learning paths tailored to your goals, skill level, and learning style with our advanced AI technology.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Interactive Learning Experience',
      description: 'Engage with dynamic content, quizzes, and progress tracking to ensure effective learning.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
    },
    {
      title: 'Smart Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and adaptive recommendations.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Flexible Learning Schedule',
      description: 'Learn at your own pace with customizable timeframes and milestone tracking.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const exampleRoadmaps = [
    {
      title: 'Python Programming',
      category: 'Programming',
      time: '8 weeks',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Learn Python from basics to advanced concepts and real-world applications',
      link: '/roadmaps/python'
    },
    {
      title: 'Digital Marketing',
      category: 'Business',
      time: '8 weeks',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: 'Learn the fundamentals of digital marketing and growth strategies',
      link: '/roadmaps/digital-marketing'
    },
    {
      title: 'Guitar Mastery',
      category: 'Music',
      time: '16 weeks',
      image: '/images/guitarist-mountains.png',
      description: 'From basic chords to advanced techniques and music theory',
      link: '/roadmaps/guitar'
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Transform Your Learning Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Our AI-powered platform creates personalized learning experiences that adapt to your needs and help you achieve your goals faster.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-sunset-50 dark:bg-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-block p-3 bg-sunset-500/10 rounded-lg text-sunset-600 dark:text-sunset-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Popular Learning Paths
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our most popular AI-generated learning roadmaps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {exampleRoadmaps.map((roadmap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="roadmap-card group"
            >
              <Link href={roadmap.link}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={roadmap.image}
                    alt={roadmap.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <span className="text-xs font-semibold px-2 py-1 bg-sunset-500 rounded-full text-white mb-2 inline-block">
                        {roadmap.category}
                      </span>
                      <h3 className="text-xl font-bold text-white">{roadmap.title}</h3>
                      <p className="text-white/80 text-sm mt-1">{roadmap.description}</p>
                      <p className="text-white/80 text-sm flex items-center mt-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {roadmap.time}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/roadmaps" className="inline-block btn-primary bg-sunset-600 hover:bg-sunset-700 px-8 py-3">
            Explore All Roadmaps
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features; 