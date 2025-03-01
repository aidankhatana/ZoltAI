import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { RoadmapProvider } from '@/contexts/RoadmapContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SophosAI - Personalized Learning Paths',
  description: 'Create customized learning roadmaps with AI-powered guidance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} theme-sunset min-h-screen flex flex-col`}>
        <AuthProvider>
          <RoadmapProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </RoadmapProvider>
        </AuthProvider>
      </body>
    </html>
  )
} 