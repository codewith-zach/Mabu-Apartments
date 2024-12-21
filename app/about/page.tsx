'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { Dancing_Script, Bokor as Bookmark } from 'next/font/google'
import { BookmarkIcon } from 'lucide-react' // Import Bookmark from lucide-react

const dancingScript = Dancing_Script({ subsets: ['latin'] })

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const sectionHeight = sectionRect.height

        // Calculate scroll progress within the section
        const sectionTop = sectionRect.top
        const progress = Math.min(
          1,
          Math.max(
            0,
            (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)
          )
        )

        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-16">
        <Image 
          src="/images/mabuapartmentsfront.jpg"
          alt="Mabu Apartments Exterior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center">
          <p className="text-lg mb-4">MABU APARTMENTS</p>
          <h1 className="text-5xl md:text-6xl font-bold">ABOUT US</h1>
        </div>
      </div>

      {/* Get to Know Us Section */}
      <div className="container mx-auto px-4 py-16 md:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image 
                src="/images/mabuapartmentsfront.jpg"
                alt="Mabu Apartments Main View"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-2/3 aspect-square rounded-lg overflow-hidden border-4 border-white shadow-xl">
              <Image 
                src="/images/mabuapartmentsfront.jpg"
                alt="Mabu Apartments Detail View"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-6 lg:max-w-xl ">
            <p className="text-primary uppercase tracking-wider">MABU APARTMENTS</p>
            <h2 className="text-4xl font-bold">Get to Know Us</h2>
            
            <p className="text-lg">
              At Mabu Apartments, we believe that every stay should feel like a special getaway. Our property was designed with you in mind—a perfect blend of comfort, style, and convenience that turns a simple trip into an unforgettable experience.
            </p>
            
            <p className="text-lg">
              What sets us apart is our attention to detail. From the thoughtfully curated decor to the amenities that make life easier, every aspect of Mabu Apartments is designed to ensure your comfort. We're passionate about hospitality and dedicated to making your visit seamless, enjoyable, and memorable.
            </p>
            
            <p className="text-lg">
              Explore the charm of Abuja, relax in our cozy space, and let us take care of the rest. At Mabu Apartments, you're not just a guest—you're part of our story.
            </p>
            
            <p className={`${dancingScript.className} text-2xl text-primary`}>
              We can't wait to welcome you!
            </p>
          </div>
        </div>

        {/* Location Section */}
        <div ref={sectionRef} className="mt-32 md:px-20">
          <div className="grid gap-16 items-start">
            {/* Text Content */}
            <div className="space-y-8">
              <div>
                <p className="text-primary uppercase tracking-wider ">MABU APARTMENTS</p>
                <h2 className="text-4xl font-bold mt-2 ">Location</h2>
                <p className="mt-4 text-lg ">
                  Despite its central location, the surrounding area offers a peaceful retreat, making it ideal for both relaxation and exploration. Whether you're here for business or leisure, our location ensures you're always connected to the best Abuja has to offer.
                </p>
              </div>

              <div>
  <h3 className="text-2xl font-bold mb-6 ">Landmarks</h3>

  <div className="space-y-16 px-4 ">
    <div className="flex flex-col md:flex-col lg:flex-row items-center gap-6">
      <div className="flex-1 w-full">
        <div className="flex items-center gap-2 mb-2">
          <BookmarkIcon className="w-6 h-6 text-primary flex-shrink-0" />
          <h4 className="text-xl font-semibold">Nnamdi Azikiwe International Airport</h4>
        </div>
        <p className="text-gray-600">
          Conveniently situated just 40 minutes from Nnamdi Azikiwe International Airport, our property offers quick and hassle-free access for travelers.
        </p>
      </div>
      <Image
        src="/images/mabuapartmentsfront.jpg"
        alt="Nnamdi Azikiwe International Airport"
        width={500}
        height={100}
        className="rounded-lg flex-shrink-0 w-full md:w-auto"
      />
    </div>

    <div className="flex flex-col md:flex-col lg:flex-row-reverse items-center gap-6">
      <div className="flex-1 w-full">
        <div className="flex items-center gap-2 mb-2">
          <BookmarkIcon className="w-6 h-6 text-primary flex-shrink-0" />
          <h4 className="text-xl font-semibold">Shehu Musa Yar'Adua Center</h4>
        </div>
        <p className="text-gray-600">
          Our property is conveniently located just 8 minutes from the Shehu Musa Yar'Adua Center, making it an ideal choice for visitors attending events or exploring the center's rich history.
        </p>
      </div>
      <Image
        src="/images/mabuapartmentsfront.jpg"
        alt="Shehu Musa Yar'Adua Center"
        width={500}
        height={100}
        className="rounded-lg flex-shrink-0 w-full md:w-auto"
      />
    </div>

    <div className="flex flex-col md:flex-col lg:flex-row items-center gap-6">
      <div className="flex-1 w-full">
        <div className="flex items-center gap-2 mb-2">
          <BookmarkIcon className="w-6 h-6 text-primary flex-shrink-0" />
          <h4 className="text-xl font-semibold">Abuja National Mosque</h4>
        </div>
        <p className="text-gray-600">
          Located just 7 minutes from the iconic Abuja National Mosque, our property offers easy access to one of the city's most significant landmarks.
        </p>
      </div>
      <Image
        src="/images/mabuapartmentsfront.jpg"
        alt="Abuja National Mosque"
        width={500}
        height={100}
        className="rounded-lg flex-shrink-0 w-full md:w-auto"
      />
    </div>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

