import type { Metadata } from 'next'
import './globals.css'
import { Inter as FontSans } from "next/font/google"
import { cn } from '../lib/utils'
import Header from '../components/ui/header'

export const metadata: Metadata = {
  title: 'Next Notes',
  description: 'Fun project for myself',
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/logo.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '322x322',
      url: '/logo.png',
    },
  ],
}

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-primary font-sans antialiased text-primary-foreground",
        fontSans.variable
      )}>
        <Header />
        <main className='flex flex-col min-h-screen pt-10 sm:pt-12'>
          <div className='min-h-[calc(100dvh-40px)] sm:min-h-[calc(100dvh-48px)]'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
