import Navbar from '@/components/Navbar'
import './globals.css'
import TopLoaderBar from '@/components/TopLoaderBar'
import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Promptify - Open-Source AI Prompt Platform for Developers',
  description: 'Promptify is an open-source AI prompting tool for the modern world. Discover, create, and share creative prompts. Enhance your development process and leverage the power of AI in your projects.',
  keywords: ['promptify', 'open-source', 'AI prompt platform', 'developers', 'development process', 'creative ideas', 'artificial intelligence'],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopLoaderBar />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
