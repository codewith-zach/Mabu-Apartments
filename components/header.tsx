'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

  // If menu is open, use off-white background instantly.
  // Otherwise, fall back to scroll-based logic.
  const headerBackgroundClass = isMobileMenuOpen
    ? 'bg-[#f9f8f6]'
    : isAtTop
      ? 'bg-transparent'
      : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${headerBackgroundClass}`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className={`text-2xl font-bold ${isMobileMenuOpen ? 'text-black' : (isAtTop ? 'text-white' : 'text-primary')}`}>
            MABU
          </span>
          <span className={`text-lg ${isMobileMenuOpen ? 'text-black' : (isAtTop ? 'text-white' : 'text-primary')}`}>
            Apartments
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {!isMobileMenuOpen && (
           <Button className="inline-flex bg-[#978667] hover:bg-[#4B514C] text-white font-semibold">
           Book Now
         </Button>
          
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 transition-transform duration-200 hover:scale-105"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Overlay behind the menu */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Sliding Panel Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#f9f8f6] w-[320px] flex flex-col transition-transform duration-300 transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top section with brand and close icon */}
        <div className="relative flex-shrink-0 px-6 py-6 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-center">
              <span className="block text-2xl font-bold tracking-wide text-black">MABU</span>
              <span className="block text-xs font-light tracking-widest text-black">APARTMENTS</span>
            </Link>
          </div>
          <button
            className="absolute top-6 right-6 hover:scale-105 transition-transform duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col justify-start items-start px-6 pt-8 space-y-8">
          <Link href="/" className="text-base font-semibold text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
            HOME
          </Link>
          <Link href="/rooms" className="text-base font-semibold text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
            ROOMS & SUITES
          </Link>
          <Link href="/about" className="text-base font-semibold text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
            ABOUT US
          </Link>
          <Link href="/bakery" className="text-base font-semibold text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
            RAYUWA BAKERY
          </Link>
          <Link href="/contact" className="text-base font-semibold text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
            CONTACT
          </Link>
        </nav>

        {/* Contact Information at the bottom */}
        <div className="border-t border-gray-200 mt-auto p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <Phone className="text-[#8B7C56]" />
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase text-gray-500">For Information</span>
              <a href="tel:+2349075120963" className="text-base font-bold text-[#8B7C56]">
                +234 907 512 0963
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Phone className="text-[#8B7C56]" />
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase text-gray-500">Or Call</span>
              <a href="tel:+2348163679671" className="text-base font-bold text-[#8B7C56]">
                +234 816 367 9671
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
