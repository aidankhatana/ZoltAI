import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-sunset-50 dark:bg-gray-900 border-t border-sunset-100 dark:border-sunset-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-sunset-700 dark:text-sunset-300">SophosAI</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Personalized learning paths powered by AI. Learn anything with a customized roadmap tailored to your goals.
            </p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-4 text-sunset-700 dark:text-sunset-300">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-gray-600 hover:text-sunset-600 dark:text-gray-300 dark:hover:text-sunset-400">Features</Link></li>
              <li><Link href="/roadmaps" className="text-gray-600 hover:text-sunset-600 dark:text-gray-300 dark:hover:text-sunset-400">Roadmaps</Link></li>
              <li><Link href="/pricing" className="text-gray-600 hover:text-sunset-600 dark:text-gray-300 dark:hover:text-sunset-400">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-4 text-sunset-700 dark:text-sunset-300">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-600 hover:text-sunset-600 dark:text-gray-300 dark:hover:text-sunset-400">Blog</Link></li>
              <li><Link href="/documentation" className="text-gray-600 hover:text-sunset-600 dark:text-gray-300 dark:hover:text-sunset-400">Documentation</Link></li>
              <li><Link href="/support" className="text-gray-600 hover:text-sunset-600 dark:text-gray-300 dark:hover:text-sunset-400">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-4 text-sunset-700 dark:text-sunset-300">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-sunset-600 dark:text-gray-300 dark:hover:text-sunset-400">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-sunset-600 dark:text-gray-300 dark:hover:text-sunset-400">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-sunset-600 dark:text-gray-300 dark:hover:text-sunset-400">Privacy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-sunset-600 dark:text-gray-300 dark:hover:text-sunset-400">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-sunset-100 dark:border-sunset-900/50">
          <p className="text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} SophosAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 