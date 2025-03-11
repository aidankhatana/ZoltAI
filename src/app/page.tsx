'use client';

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CTA from '@/components/CTA';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col dark:bg-slate-900">
      <main className="flex-grow">
        <Hero />
        <Features />
        <CTA />
      </main>
    </div>
  );
} 