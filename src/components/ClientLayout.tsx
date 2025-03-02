'use client';

import { useState, useEffect } from 'react';
import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { RoadmapProvider } from '@/contexts/RoadmapContext';
import Navbar from './Navbar';
import Footer from './Footer';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AuthProvider>
      <RoadmapProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </RoadmapProvider>
    </AuthProvider>
  );
} 