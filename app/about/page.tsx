'use client'

import { useRef, useEffect, useState } from 'react'
import { HeroSection } from '@/components/HeroSection'
import { GetToKnowUs } from '@/components/GetToKnowUs'
import { LocationSection } from '@/components/LocationSection'
import { MainFacilities } from '@/components/MainFacilities'
import { FAQ } from '@/components/faq'

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
    <div className="bg-[#faf9f6]">
      <HeroSection />
      <div className="container mx-auto px-4 py-16 md:px-10">
        <GetToKnowUs />
        <div ref={sectionRef}>
          <LocationSection />
        </div>
        <MainFacilities />
        <FAQ />
      </div>
    </div>
  )
}

