import Navbar from '@/components/Navbar'
import './globals.css'
import Footer from '@/components/Footer'
import TopLoaderBar from '@/components/TopLoaderBar'
import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Promptify - Open-Source AI Prompt Generator',
  description: 'Promptify is an open-source project that allows users to copy AI prompts effortlessly. Create engaging content, generate ideas, and explore the power of AI with ease.',
  keywords: ['promptify', 'open-source', 'AI prompt generator', 'artificial intelligence', 'content generation', 'idea generation'],
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopLoaderBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
