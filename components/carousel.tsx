'use client'

import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export default function CarouselWithScale() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleSelect = () => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', handleSelect)
    handleSelect() // Initialize
  }, [emblaApi])

  const rooms = [
    {
      title: 'Studio Apartment',
      price: 'FROM ₦85,000/NIGHT',
      image: '/images/rooms/room3.jpg',
    },
    {
      title: 'One Bedroom Apartment',
      price: 'FROM ₦120,000/NIGHT',
      image: '/images/rooms/room1.jpg',
    },
    {
      title: 'Two Bedroom Apartment',
      price: 'FROM ₦180,000/NIGHT',
      image: '/images/rooms/room2.jpg',
    },
  ]

  return (
    <div className="relative">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex gap-4">
          {rooms.map((room, index) => (
            <div
              key={index}
              className={`embla__slide flex-shrink-0 w-[80%] md:w-[30%] ${
                index === selectedIndex ? 'scale-[1.1]' : 'scale-[0.9]'
              } transition-transform duration-500`}
            >
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <p className="text-sm font-medium">{room.price}</p>
                  <h3 className="text-lg font-bold">{room.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
