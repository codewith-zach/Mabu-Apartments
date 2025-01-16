import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Toaster } from "@/components/ui/toaster"
import ErrorBoundary from '@/components/error-boundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mabu Apartments',
  description: 'Luxury apartments for your stay in Abuja',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  )
}

