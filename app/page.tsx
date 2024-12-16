'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, Pause } from 'lucide-react'
import Image from 'next/image'
import { Dancing_Script } from 'next/font/google'
import { ChevronLeft, ChevronRight, Phone, Calendar } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} 
from "@/components/ui/carousel"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import useEmblaCarousel from 'embla-carousel-react'
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
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
              MORE THAN A STAY, IT'S AN EXPERIENCE.
            </h1>
            <p className="text-lg md:text-xl text-white mb-8">
              Discover luxury and comfort in the heart of Abuja
            </p>
            {/* <Button size="lg" asChild>
              <Link href="/rooms">Book Now</Link>
            </Button> */}
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
      <section className="py-12 md:py-24 lg:py-32 bg-white relative">
  <div className="container px-4 md:px-6 mx-auto">
    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
          About Us
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-gray-900">
          Welcome to Mabu Apartments
        </h2>
        <p className="text-xl md:text-2xl mb-6 text-gray-700">
          Where comfort and unforgettable experiences come together.
        </p>
        <p className="text-base md:text-lg mb-8 leading-relaxed text-gray-600">
          Our mission is to provide you with a space that feels like home, while offering the little luxuries and conveniences that make your stay truly special. Whether you’re here for work, leisure, or a bit of both, we aim to make every moment seamless and enjoyable.
        </p>
        <p className={`${dancingScript.className} text-2xl md:text-3xl text-primary italic`}>
          Your comfort starts here. We can’t wait to host you!
        </p>
      </div>

      <div className="relative mt-8 lg:mt-0">
        {/* Abstract background design */}
        <div className="absolute inset-0 bg-[url('/images/abstract-pattern.svg')] bg-no-repeat bg-right-top pointer-events-none" />

        {/* Container for images to manage positioning */}
        <div className="relative w-full h-auto flex items-center justify-end">

          {/* Large (back) image */}
          <div className="relative z-0 overflow-hidden shadow-xl rounded-2xl w-full lg:w-[600px] h-auto">
            <Image
              src="/images/mabuapartmentsfront.jpg"
              alt="Mabu Apartments Exterior Night View"
              width={1200}    // Adjust these based on actual image dimensions
              height={800}
              className="object-cover w-full h-auto rounded-2xl"
            />
          </div>

          {/* Smaller (front) image, styled as a floating card with white border */}
          <div 
            className="absolute z-10 overflow-hidden shadow-2xl bg-white rounded-2xl"
            style={{
              width: '350px',   // adjust as needed
              height: '230px',  // adjust as needed
              transform: 'translate(-120%, 10%)' // shifts the small card over the larger image
            }}
          >
            {/* Inner wrapper for rounded corners and to ensure image fills area */}
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/images/mabuapartmentsfront.jpg"
                alt="Mabu Apartments Building View"
                fill
                className="object-cover"
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
    <div className="text-center mb-12">
      <p className="text-primary uppercase tracking-wider mb-2">LUXURY EXPERIENCE</p>
      <h2 className="text-3xl md:text-4xl font-bold">Rooms & Suites</h2>
    </div>

    <div className="relative w-full max-w-full mx-auto"> {/* Removed max-w-[90vw] */}
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
          {[
            {
              title: "Studio Apartment",
              price: "FROM ₦150/NIGHT",
              // description: "Cozy and efficient space for solo travelers or couples",
              image: "/images/rooms/room3.jpg"
            },
            {
              title: "One Bedroom Apartment",
              price: "FROM ₦240/NIGHT",
              // description: "Spacious and comfortable for small families or groups",
              image: "/images/rooms/room1.jpg"
            },
            {
              title: "Two Bedroom Apartment",
              price: "FROM ₦300/NIGHT",
              // description: "Luxurious space for larger groups or extended stays",
              image: "/images/rooms/room2.jpg"
            }
          ].map((room, index) => (
            <CarouselItem 
              key={index} 
              className="pl-2 md:pl-4 basis-1/2" // full width on all breakpoints to make images larger
            >
              <Link href={`/rooms/${room.title.toLowerCase().replace(/ /g, '-')}`} className="block">
                <div className="relative transition-all duration-300 group">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden"> {/* Changed aspect ratio */}
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-sm font-medium mb-2">{room.price}</p>
                      <h3 className="text-2xl font-semibold mb-2">{room.title}</h3>
                      <p className="text-sm text-white/80">{room.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2 h-12 w-12 border-none bg-white/90 hover:bg-white shadow-lg" />
        <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2 h-12 w-12 border-none bg-white/90 hover:bg-white shadow-lg" />
      </Carousel>
    </div>
  </div>
</section>


      {/* Testimonials */}
      <section
      className="py-24 md:py-32 lg:py-40 relative min-h-[600px] flex items-center"
      style={{
        backgroundImage: "url('/images/mabuapartmentsfront.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative container mx-auto px-4 md:px-6 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">
          What Clients Say
        </h2>

        <div className="relative flex items-center justify-center">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full max-w-6xl"
          >
            <CarouselContent className="relative">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="basis-full">
                  {/* Message Container */}
                  <div className="bg-gray-900 text-white p-6 md:p-8 shadow-lg relative flex items-center rounded-lg">
                    {/* Circular Image */}
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 mr-6">
                      <Image
                        src={testimonial.image}
                        alt={`${testimonial.name}'s profile picture`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Text Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.date}</p>
                      </div>
                      <hr className="border-gray-700 mb-4" />
                      <blockquote className="italic text-gray-300 leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Dots */}
            <div className="absolute -bottom-6 flex justify-center w-full mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 ${
                    index === 0 ? 'bg-white' : 'bg-gray-400'
                  } rounded-full`}
                ></span>
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </section>

<div>
  <booking-section />
  </div>

      {/* CTA Section */}
      {/* <section className="bg-primary text-white py-12 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience Mabu Apartments?</h2>
          <p className="text-lg md:text-xl mb-8">Book your stay now and enjoy unparalleled comfort and luxury.</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/rooms">Book Your Stay</Link>
          </Button>
        </div>
      </section> */}
    </div>
  )
}

