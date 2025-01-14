'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isAtTop, setIsAtTop] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const header = headerRef.current
      
      if (!header || isMobileMenuOpen) return

      // Calculate the header height dynamically
      const headerHeight = header.offsetHeight

      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY.current || currentScrollY < headerHeight) {
        setIsVisible(true)
      } 
      // Hide header when scrolling down and not at the top
      else if (currentScrollY > lastScrollY.current && currentScrollY > headerHeight) {
        setIsVisible(false)
      }

      lastScrollY.current = currentScrollY
      setIsAtTop(currentScrollY < 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  // Prevent body from scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      setIsVisible(true) // Ensure header is visible when menu is open
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMobileMenuOpen])

  // Header background based on scroll position
  const headerBackgroundClass = isAtTop && !isMobileMenuOpen
    ? 'bg-transparent'
    : 'bg-background'

  return (
    <>
      {/* Main Header Content */}
      <div
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <header className={`${headerBackgroundClass} transition-colors duration-300`} style={{ backgroundColor: isAtTop && !isMobileMenuOpen ? 'transparent' : '#faf9f6' }}>
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span
                className={`text-2xl font-bold ${
                  isAtTop && !isMobileMenuOpen ? 'text-white' : 'text-primary'
                }`}
              >
                MABU
              </span>
              <span
                className={`text-lg ${
                  isAtTop && !isMobileMenuOpen ? 'text-white' : 'text-primary'
                }`}
              >
                Apartments
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              {/* <Button className="hidden md:inline-flex bg-[#978667] hover:bg-[#4B514C] text-white font-semibold">
                Book Now
              </Button> */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 transition-transform duration-200 hover:scale-105"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className={`h-6 w-6 ${isAtTop ? 'text-white' : 'text-primary'}`} />
                )}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay - Fixed position independent of header visibility */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 z-[60]' : 'opacity-0 pointer-events-none z-0'
        }`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel - Fixed position independent of header visibility */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] flex flex-col transition-transform duration-300 transform z-[70] ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#faf9f6' }}
      >
        {/* Top section with brand and close icon */}
        <div className="relative flex-shrink-0 px-6 py-6 border-b border-gray-200">
          <div className="flex items-center justify-center">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center"
            >
              <span className="block text-2xl font-bold tracking-wide text-black">
                MABU
              </span>
              <span className="block text-xs font-light tracking-widest text-black">
                APARTMENTS
              </span>
            </Link>
          </div>
          <button
            className="absolute top-6 right-6 hover:scale-105 transition-transform duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col justify-start items-start px-6 pt-8 space-y-8">
          <Link
            href="/"
            className="text-base font-semibold text-gray-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            HOME
          </Link>
          <Link
            href="/rooms"
            className="text-base font-semibold text-gray-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ROOMS & SUITES
          </Link>
          <Link
            href="/about"
            className="text-base font-semibold text-gray-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ABOUT US
          </Link>
          <Link
            href="/bakery"
            className="text-base font-semibold text-gray-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            RAYUWA BAKERY
          </Link>
          <Link
            href="/contact"
            className="text-base font-semibold text-gray-900"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            CONTACT
          </Link>
        </nav>

        {/* Contact Information at the bottom */}
        <div className="border-t border-gray-200 mt-auto p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <Phone className="text-[#8B7C56]" />
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase text-gray-500">
                For Information
              </span>
              <a
                href="tel:+2349075120963"
                className="text-base font-bold text-[#8B7C56]"
              >
                +234 907 512 0963
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Phone className="text-[#8B7C56]" />
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase text-gray-500">
                Or Call
              </span>
              <a
                href="tel:+2348163679671"
                className="text-base font-bold text-[#8B7C56]"
              >
                +234 816 367 9671
              </a>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <Button 
              className="w-full bg-[#978667] hover:bg-[#4B514C] text-white font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/rooms">Book Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

