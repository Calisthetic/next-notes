import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <head>
        <link rel="icon" href="favicon.ico" sizes="any" />
        <meta name="description" content="Next Notes" />
        <meta name="theme-color" content="#000000"/>
      </head> */}
      <body className={inter.className}>{children}</body>
    </html>
  )
}
