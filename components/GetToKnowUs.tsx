'use client'
import Image from 'next/image'
import { Dancing_Script } from 'next/font/google'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const dancingScript = Dancing_Script({ subsets: ['latin'] })

export function GetToKnowUs() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start py-8 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative w-full max-w-sm mx-auto lg:mx-0 lg:max-w-md xl:max-w-lg px-4 sm:px-0 flex-shrink-0">
        <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-gray-200">
          <Image 
            src="/images/rooms/room1.jpg"
            alt="Mabu Apartments Main View"
            fill
            className="object-cover"
          />
        </div>
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-1/4 -right-4 sm:-right-12 w-1/2 lg:w-3/5 aspect-[3/4] rounded-lg overflow-hidden border-4 border-white shadow-xl bg-gray-200 lg:-right-16"
        >
          <Image 
            src="/images/mabufront.jpg"
            alt="Mabu Apartments Detail View"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
      
      <div className="space-y-6 lg:space-y-8 w-full lg:max-w-xl xl:max-w-2xl px-4 sm:px-0 mt-8 lg:mt-0">
        <div className="space-y-2 lg:space-y-4">
          <p className="text-neutral-500 uppercase tracking-wider text-sm">MABU APARTMENTS</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">Get to Know Us</h2>
        </div>
        
        <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
          At Mabu Apartments, we believe that every stay should feel like a special getaway. Our property was designed with you in mind—a perfect blend of comfort, style, and convenience that turns a simple trip into an unforgettable experience.
        </p>
        
        <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
          What sets us apart is our attention to detail. From the thoughtfully curated decor to the amenities that make life easier, every aspect of Mabu Apartments is designed to ensure your comfort. We're passionate about hospitality and dedicated to making your visit seamless, enjoyable, and memorable.
        </p>
        
        <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
          Explore the charm of Abuja, relax in our cozy space, and let us take care of the rest. At Mabu Apartments, you're not just a guest—you're part of our story.
        </p>
        
        <p className={`${dancingScript.className} text-xl lg:text-2xl text-neutral-600 italic`}>
          We can't wait to welcome you!
        </p>
      </div>
    </div>
  )
}

