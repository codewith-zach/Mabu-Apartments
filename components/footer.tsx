import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container py-12 md:py-16 px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacts</h3>
            <p className="text-sm mb-2">5, Awande Close, Behind LG Show Room, Off Aminu Kano Crescent, Wuse II Abuja, Nigeria</p>
            <p className="text-sm mb-2">info@Mabuapartments.com</p>
            <p className="text-sm mb-2">+234 907 512 0963</p>
            <p className="text-sm">+234 816 367 9671</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/rooms">Rooms & Suites</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/bakery">Rayuwa Bakery</Link></li>
              <li><Link href="/contact">Contacts</Link></li>
              <li><Link href="/terms">Terms and Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Receive latest offers and promos without spam. You can cancel anytime.</p>
            <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input type="email" placeholder="Your email" className="flex-grow" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="container py-6 px-4 md:px-6 text-center text-sm">
          © 2024 Mabu Apartments. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

