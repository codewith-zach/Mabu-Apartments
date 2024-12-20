'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, Pause } from 'lucide-react'
import Image from 'next/image'
import { Dancing_Script } from 'next/font/google'
import { ChevronLeft, ChevronRight, Phone, Calendar } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'

const dancingScript = Dancing_Script({ subsets: ['latin'] })

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const apartments = [
    {
      title: "Studio Apartment",
      description: "Cozy and efficient space for solo travelers or couples",
      price: "From ₦50,000/night",
      image: "/placeholder.svg?width=400&height=300",
      link: "/rooms/studio"
    },
    {
      title: "One Bedroom Apartment",
      description: "Spacious and comfortable for small families or groups",
      price: "From ₦75,000/night",
      image: "/placeholder.svg?width=400&height=300",
      link: "/rooms/one-bedroom"
    },
    {
      title: "Two Bedroom Apartment",
      description: "Luxurious space for larger groups or extended stays",
      price: "From ₦100,000/night",
      image: "/placeholder.svg?width=400&height=300",
      link: "/rooms/two-bedroom"
    }
  ]

  const rooms = [
    {
      title: "Studio Apartment",
      price: "FROM ₦150/NIGHT",
      description: "Cozy and efficient space for solo travelers or couples",
      image: "/images/rooms/room3.jpg"
    },
    {
      title: "One Bedroom Apartment",
      price: "FROM ₦240/NIGHT",
      description: "Spacious and comfortable for small families or groups",
      image: "/images/rooms/room1.jpg"
    },
    {
      title: "Two Bedroom Apartment",
      price: "FROM ₦300/NIGHT",
      description: "Luxurious space for larger groups or extended stays",
      image: "/images/rooms/room2.jpg"
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: "Roberta",
      date: "12 Oct",
      image: "/images/roberta.jpg",
      quote: "Mea ad postea meliore fuisset. Timeam repudiare id eum, ex paulo dictas elaboraret sed, mel cu unum nostrud."
    },
    {
      id: 2,
      name: "John",
      date: "15 Oct",
      image: "/images/john.jpg",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 3,
      name: "Sarah",
      date: "18 Oct",
      image: "/images/sarah.jpg",
      quote: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[100vh]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/mabuvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
              MORE THAN A STAY, IT'S AN EXPERIENCE.
            </h1>
            {/* <p className="text-base sm:text-lg md:text-xl text-white mb-8">
              Discover luxury and comfort in the heart of Abuja
            </p> */}
            <Button className="inline-flex bg-[#978667] hover:bg-[#4B514C] text-white font-semibold">
              Book Now
            </Button>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-4 right-4 bg-white bg-opacity-50 hover:bg-opacity-75"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </section>

      {/* Welcome Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Background wave pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('/images/wave-pattern.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col-reverse lg:flex-row gap-8 md:gap-12 items-center">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <p className="text-sm uppercase tracking-wider text-[#978667] mb-3">
                ABOUT US
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Welcome to Mabu Apartments
              </h2>
              <p className="text-xl mb-6 text-gray-700">
                Where comfort and unforgettable experiences come together.
              </p>
              <p className="text-base mb-8 leading-relaxed text-gray-600">
                Our mission is to provide you with a space that feels like home, while offering the little luxuries and conveniences that make your stay truly special. Whether you're here for work, leisure, or a bit of both, we aim to make every moment seamless and enjoyable.
              </p>
              <p className={`${dancingScript.className} text-2xl text-[#978667] italic`}>
                Your comfort starts here. We can't wait to host you!
              </p>
            </div>

            <div className="w-full lg:w-1/2 relative order-1 lg:order-2">
              {/* Main (back) image with wave pattern */}
              <div className="relative rounded-2xl overflow-hidden w-3/4 mx-auto">
                <Image
                  src="/images/mabuapartmentsfront.jpg"
                  alt="Mabu Apartments Exterior"
                  width={600}
                  height={450}
                  className="w-full h-auto rounded-2xl"
                />
              </div>

              {/* Smaller (front) image with white border */}
              <div className="absolute left-0 top-1/2 -translate-y-1/3 -translate-x-1 w-1/3 z-10">
                <div className="bg-white p-1 rounded-2xl shadow-xl">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src="/images/mabuapartmentsfront.jpg"
                      alt="Mabu Apartments Detail"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="bg-[#faf9f6] py-12 md:py-16 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-primary uppercase tracking-wider mb-2">LUXURY EXPERIENCE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Rooms & Suites</h2>
          </div>

          <div className="relative w-full max-w-full mx-auto px-4 sm:px-0">
            <Carousel
              opts={{
                align: 'center',
                loop: true,
                skipSnaps: false,
                startIndex: 1
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {rooms.map((room, index) => (
                  <CarouselItem 
                    key={index} 
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2"
                  >
                    <Link href={`/rooms/${room.title.toLowerCase().replace(/ /g, '-')}`} className="block">
                      <div className="relative transition-all duration-300 group">
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                          <Image
                            src={room.image}
                            alt={room.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                            <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">{room.price}</p>
                            <h3 className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-2">{room.title}</h3>
                            <p className="text-xs sm:text-sm text-white/80">{room.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 sm:-left-12 top-1/2 transform -translate-y-1/2 h-8 w-8 sm:h-12 sm:w-12 border-none bg-white/90 hover:bg-white shadow-lg" />
              <CarouselNext className="absolute -right-4 sm:-right-12 top-1/2 transform -translate-y-1/2 h-8 w-8 sm:h-12 sm:w-12 border-none bg-white/90 hover:bg-white shadow-lg" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 lg:py-24 relative overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-fixed bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/mabuapartmentsfront.jpg')",
            backgroundAttachment: "fixed"
          }}
        />

        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black opacity-50 z-10" />

        <div className="container px-4 md:px-6 relative z-20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-12 text-center text-white">What Our Guests Say</h2>

          {/* Carousel Wrapper */}
          <div className="relative w-full overflow-hidden">
            <div className="testimonial-carousel">
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-4">
                  <Card className="bg-gray-800 text-white border-0 h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Image src={testimonial.image} alt={`Guest ${testimonial.id}`} width={50} height={50} className="rounded-full" />
                        <div>
                          <CardTitle className="text-white text-sm sm:text-base">{testimonial.name}</CardTitle>
                          <CardDescription className="text-gray-300 text-xs sm:text-sm">{testimonial.date}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs sm:text-sm md:text-base text-gray-200">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Ready to Experience Mabu Apartments?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">Book your stay now and enjoy unparalleled comfort and luxury.</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/rooms">Book Your Stay</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

