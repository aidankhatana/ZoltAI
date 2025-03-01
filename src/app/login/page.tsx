'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold text-primary inline-block">
              SophosAI
            </Link>
            <h2 className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              Sign in to your account to continue learning
            </h2>
          </div>
          
          <AuthForm type="login" />
        </div>
      </main>
      <Footer />
    </div>
  );
} 