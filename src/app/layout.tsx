import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import ClientLayout from '@/components/ClientLayout'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZoltAI - Learning Pathways',
  description: 'Create your personalized learning pathway',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
} 