'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function RoomCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prev = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length)
  const next = () => setCurrentIndex((currentIndex + 1) % images.length)

  // Auto-advance the carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex]) // Reset the timer when currentIndex changes

  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="aspect-[16/9] relative">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Room view ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            priority={index === 0}
          />
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 rounded-full h-10 w-10"
        onClick={prev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white/90 rounded-full h-10 w-10"
        onClick={next}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

