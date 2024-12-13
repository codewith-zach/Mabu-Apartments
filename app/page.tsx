'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, Pause, Badge } from 'lucide-react'
import Image from 'next/image'
import { Dancing_Script } from 'next/font/google'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

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
            <Button size="lg" asChild>
              <Link href="/rooms">Book Now</Link>
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
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Welcome to Mabu Apartments
              </h2>
              <p className="text-xl md:text-2xl mb-6 text-muted-foreground">
                Where comfort and unforgettable experiences come together.
              </p>
              <p className="text-base md:text-lg mb-8 leading-relaxed">
                Our mission is to provide you with a space that feels like home, while offering the little luxuries and conveniences that make your stay truly special. Whether you're here for work, leisure, or a bit of both, we aim to make every moment seamless and enjoyable.
              </p>
              <p className={`${dancingScript.className} text-2xl md:text-3xl text-primary`}>
                Your comfort starts here. We can't wait to host you!
              </p>
            </div>
            <div className="relative h-[400px] md:h-[600px] mt-8 lg:mt-0">
              <div className="absolute right-0 top-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/mabuapartmentsfront.jpg" 
                  alt="Mabu Apartments Exterior Night View" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute left-0 bottom-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl">
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
      </section>

      {/* Featured Rooms */}
      <section className="bg-gray-100 py-12 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">Our Apartments</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Studio Apartment</CardTitle>
                <CardDescription>Cozy and efficient space for solo travelers or couples</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="/images/rooms/room3.jpg" alt="Studio Apartment" width={400} height={300} className="rounded-lg mb-4 w-full h-auto" />
                <Badge>From ₦50,000/night</Badge>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/rooms/studio">View Details</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>One Bedroom Apartment</CardTitle>
                <CardDescription>Spacious and comfortable for small families or groups</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="/images/rooms/room1.jpg" alt="One Bedroom Apartment" width={400} height={300} className="rounded-lg mb-4 w-full h-auto" />
                <Badge>From ₦75,000/night</Badge>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/rooms/one-bedroom">View Details</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Two Bedroom Apartment</CardTitle>
                <CardDescription>Luxurious space for larger groups or extended stays</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src="/images/rooms/room2.jpg" alt="Two Bedroom Apartment" width={400} height={300} className="rounded-lg mb-4 w-full h-auto" />
                <Badge>From ₦100,000/night</Badge>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/rooms/two-bedroom">View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">What Our Guests Say</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Image src="/images/avatar.jpg" alt={`Guest ${i}`} width={50} height={50} className="rounded-full" />
                    <div>
                      <CardTitle>John Doe</CardTitle>
                      <CardDescription>Stayed in One Bedroom Apartment</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base">"Amazing stay! The apartment was clean, comfortable, and had everything we needed. The staff was friendly and helpful. Will definitely come back!"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-12 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience Mabu Apartments?</h2>
          <p className="text-lg md:text-xl mb-8">Book your stay now and enjoy unparalleled comfort and luxury.</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/rooms">Book Your Stay</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

