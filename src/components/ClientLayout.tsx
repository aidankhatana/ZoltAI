'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { RoadmapProvider } from '@/contexts/RoadmapContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <RoadmapProvider>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </RoadmapProvider>
    </AuthProvider>
  );
} 