import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Instagram, Facebook, ArrowRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 text-white">
      <div className="container py-12 md:py-16 px-4 md:px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-medium mb-6">Contacts</h3>
            <div className="space-y-2 text-zinc-300">
              <p className="text-sm">5, Awande Close, Behind LG Show Room, Off Aminu Kano Crescent, Wuse II<br />Abuja, Nigeria</p>
              <p className="text-sm">
                <Link href="mailto:info@Mabuapartments.com" className="text-[#ebd7b2] hover:text-white transition-colors">
                  info@Mabuapartments.com
                </Link>
              </p>
              <p className="text-sm">
                <Link href="tel:+2349075120963" className="text-[#ebd7b2] hover:text-white transition-colors">
                  +234 907 512 0963
                </Link>
              </p>
              <p className="text-sm">
                <Link href="tel:+2348163679671" className="text-[#ebd7b2] hover:text-white transition-colors">
                  +234 816 367 9671
                </Link>
              </p>
            </div>
            <div className="flex space-x-4 mt-8">
              <Link href="#" className="text-zinc-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-zinc-300 hover:text-white transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </Link>
              <Link href="#" className="text-zinc-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-zinc-300 hover:text-white transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-6">Explore</h3>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/rooms" className="hover:text-white transition-colors">Rooms & Suites</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/bakery" className="hover:text-white transition-colors">Rayuwa Bakery</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contacts</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-6">Newsletter</h3>
            <p className="text-sm text-zinc-300 mb-6">
              Receive latest offers and promos without spam. You can cancel anytime.
            </p>
            <form className="flex items-center space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
              />
              <Button type="submit" variant="ghost" size="icon" className="text-white hover:text-white hover:bg-zinc-800">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-700">
        <div className="container py-6 px-4 md:px-6 text-center text-sm text-zinc-400">
          © Mabu Apartments - by M&Z Studios
        </div>
      </div>
    </footer>
  )
}

