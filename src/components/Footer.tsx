import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">SophosAI</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Personalized learning paths powered by AI. Learn anything with a customized roadmap tailored to your goals.
            </p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-4 text-gray-800 dark:text-white">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-gray-600 hover:text-primary dark:text-gray-300">Features</Link></li>
              <li><Link href="/roadmaps" className="text-gray-600 hover:text-primary dark:text-gray-300">Roadmaps</Link></li>
              <li><Link href="/pricing" className="text-gray-600 hover:text-primary dark:text-gray-300">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-4 text-gray-800 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-600 hover:text-primary dark:text-gray-300">Blog</Link></li>
              <li><Link href="/documentation" className="text-gray-600 hover:text-primary dark:text-gray-300">Documentation</Link></li>
              <li><Link href="/support" className="text-gray-600 hover:text-primary dark:text-gray-300">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold mb-4 text-gray-800 dark:text-white">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-primary dark:text-gray-300">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-primary dark:text-gray-300">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-primary dark:text-gray-300">Privacy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-primary dark:text-gray-300">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} SophosAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 