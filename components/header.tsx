'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isAtTop, setIsAtTop] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isAtTop ? 'bg-transparent' : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className={`text-2xl font-bold ${isAtTop ? 'text-white' : 'text-primary'}`}>MABU</span>
          <span className={`text-lg ${isAtTop ? 'text-white' : 'text-primary'}`}>Apartments</span>
        </Link>
        <nav className={`hidden md:flex space-x-6 ${isAtTop ? 'text-white' : 'text-primary'}`}>
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/rooms" className="text-sm font-medium transition-colors hover:text-primary">
            Rooms
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button className="hidden md:inline-flex">Book Now</Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background">
          <nav className="flex flex-col items-center py-4">
            <Link href="/" className="py-2 text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/rooms" className="py-2 text-sm font-medium transition-colors hover:text-primary">
              Rooms
            </Link>
            <Link href="/about" className="py-2 text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="py-2 text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
            <Button className="mt-4">Book Now</Button>
          </nav>
        </div>
      )}
    </header>
  )
}
