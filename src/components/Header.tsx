'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  // This would be replaced with real auth state in a complete implementation
  const isLoggedIn = false;
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md dark:bg-gray-900 border-b border-sunset-100 dark:border-sunset-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary dark:text-white">
              ZoltAI
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <NavLink href="/" label="Home" pathname={pathname} />
            <NavLink href="/about" label="About" pathname={pathname} />
            <NavLink href="/roadmaps" label="Roadmaps" pathname={pathname} />
          </nav>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="btn-primary">
                  Dashboard
                </Link>
                <button className="btn-secondary">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-300">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
  pathname: string | null;
}

const NavLink = ({ href, label, pathname }: NavLinkProps) => {
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href}
      className={`text-base font-medium transition duration-150 ease-in-out ${
        isActive 
          ? 'text-primary border-b-2 border-primary dark:text-primary-300 dark:border-primary-300' 
          : 'text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-300'
      }`}
    >
      {label}
    </Link>
  );
};

export default Header; 