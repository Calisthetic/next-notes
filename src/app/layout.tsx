import type { Metadata } from 'next'
import './globals.css'
import { Inter as FontSans } from "next/font/google"
import { cn } from '../lib/utils'

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
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        {children}
      </body>
    </html>
  )
}
