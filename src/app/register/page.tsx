'use client';

import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-primary inline-block">
            ZoltAI
          </Link>
          <h2 className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Create your account to get started
          </h2>
        </div>
        
        <AuthForm type="register" />
      </div>
    </div>
  );
}