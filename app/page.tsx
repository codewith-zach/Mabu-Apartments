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
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const dancingScript = Dancing_Script({ subsets: ['latin'] })

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [fadeIn, setFadeIn] = useState(false)
  const [carouselFadeIn, setCarouselFadeIn] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const smallImageRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const locationImageRef = useRef<HTMLDivElement>(null)
  const bakeryImageRef = useRef<HTMLDivElement>(null)

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

  const rooms = [
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

  useEffect(() => {
    setFadeIn(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-full');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -200px 0px" }
    );

    if (smallImageRef.current) {
      observer.observe(smallImageRef.current);
    }

    return () => {
      if (smallImageRef.current) {
        observer.unobserve(smallImageRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCarouselFadeIn(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('translate-y-full', 'opacity-0');
          entry.target.classList.add('translate-y-0', 'opacity-100');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (smallImageRef.current) {
      observer.observe(smallImageRef.current);
    }

    return () => {
      if (smallImageRef.current) {
        observer.unobserve(smallImageRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('scale-95', 'opacity-0');
          entry.target.classList.add('scale-100', 'opacity-100');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    [locationImageRef.current, bakeryImageRef.current].forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      [locationImageRef.current, bakeryImageRef.current].forEach(ref => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
          <div className={`max-w-3xl px-4 transition-opacity duration-1000 ease-in ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm uppercase tracking-wider text-[#EBD7B2] mb-3">
                Mabu apartments
              </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4">
              MORE THAN A STAY, IT'S AN EXPERIENCE.
            </h1>
            <Button className="inline-flex bg-[#978667] hover:bg-[#4B514C] text-white font-semibold">
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
      <section className="py-12 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div 
          className="absolute top-0 right-0 bottom-0 w-1/2 opacity-100"
          style={{
            backgroundImage: "url('/images/pattern_2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
          }}
        />

        <div className="container px-4 md:px-6 mx-auto relative z-10">
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
              <div className="relative rounded-2xl overflow-hidden w-3/4 mx-auto">
                <Image
                  src="/images/mabuapartmentsfront.jpg"
                  alt="Mabu Apartments Exterior"
                  width={600}
                  height={450}
                  className="w-full h-auto rounded-2xl"
                />
              </div>

              <div 
                ref={smallImageRef}
                className="absolute left-0 top-1/3 -translate-x-1/4 w-1/3 z-10 transition-all duration-1000 ease-out opacity-0 translate-y-full"
              >
                <div className="bg-white p-1 rounded-2xl shadow-xl">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src="/images/rooms/room1.jpg"
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

      {/* CTA Section */}
      <div ref={ref}>
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative bg-primary text-white py-12 sm:py-16 md:py-20 lg:py-32 xl:py-40 overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/mabuvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute inset-0 bg-black bg-opacity-60"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="container px-4 md:px-6 text-center relative z-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-base sm:text-lg uppercase tracking-wider text-[#EBD7B2] mb-5"
          >
            mabu apartments
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8"
          >
            Ready to Experience Mabu Apartments?
          </motion.h2>
        </motion.div>
      </motion.section>
      </div>


      {/* Featured Rooms */}
      <section className="bg-[#faf9f6] flex flex-col">
        <div className="container px-4 md:px-6 flex-grow flex flex-col py-12 md:py-16 lg:py-24">
          <div className="text-center mb-8 sm:mb-12">
          <p className="text-sm uppercase tracking-wider text-[#978667] mb-3">
                luxury experience
              </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Rooms & Suites</h2>
          </div>

          <div 
            ref={carouselRef}
            className={`relative w-full max-w-full mx-auto px-4 sm:px-0 transition-all duration-1000 ease-out flex-grow flex flex-col ${
              carouselFadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
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
              className="w-full flex-grow"
            >
              <CarouselContent className="-ml-2 md:-ml-4 h-full">
                {rooms.map((room, index) => (
                  <CarouselItem 
                    key={index} 
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 h-full"
                  >
                    <Link href={`/rooms/${room.title.toLowerCase().replace(/ /g, '-')}`} className="block h-full">
                      <div className="relative transition-all duration-300 group h-full">
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden h-full">
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
            <div className="mt-8 text-center">
              <Button asChild className="bg-[#978667] hover:bg-[#4B514C] text-white">
                <Link href="/rooms">View All Rooms</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden bg-[#faf9f6] marquee-container">
          <div className="flex whitespace-nowrap animate-marquee">
            <div className="flex shrink-0">
              <span className="mx-4 text-[8rem] font-extrabold text-gray-100">RELAX</span>
              <span className="mx-4 text-[8rem] font-extrabold text-gray-100">ENJOY</span>
              <span className="mx-4 text-[8rem] font-extrabold text-gray-100">LUXURY</span>
              <span className="mx-4 text-[8rem] font-extrabold text-gray-100">HOLIDAY</span>
              <span className="mx-4 text-[8rem] font-extrabold text-gray-100">TRAVEL</span>
              <span className="mx-4 text-[8rem] font-extrabold text-gray-100">EXPERIENCE</span>
            </div>
            <div className="flex shrink-0">
              <span className="mx-4 text-[8rem] font-extrabold text-gray-100">RELAX</span>
              <span className="mx-4 text-[8rem] font-extrabold text-gray-100">ENJOY</span>
              <span className="mx-4 text-[8rem] font-extrabold text-gray-100">LUXURY</span>
              <span className="mx-4 text-[8rem] font-extrabold text-gray-100">HOLIDAY</span>
              <span className="mx-4 text-[8rem] font-extrabold text-gray-100">TRAVEL</span>
              <span className="mx-4 text-[8rem] font-extrabold text-gray-100">EXPERIENCE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Sections */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          {/* Mabu Location */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
            <div 
              ref={locationImageRef}
              className="relative aspect-[1000/625] rounded-lg overflow-hidden transform transition-all duration-1000 ease-out scale-95 opacity-0"
            >
              <Image
                src="/images/mabuapartmentsfront.jpg"
                alt="Mabu Apartments Location"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wider text-[#978667]">
                MABU APARTMENTS
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Discover Our Location
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Nestled in the heart of Abuja, our Airbnb offers the perfect balance of convenience and comfort, surrounded by vibrant attractions and local charm. Discover more about what makes our space uniquely welcoming.
              </p>
              {/* <Button variant="outline" className="mt-4"> */}
              <Button className="inline-flex bg-[#978667] hover:bg-[#4B514C] text-white font-semibold">
                Read more
              </Button>
            </div>
          </div>

          {/* Rayuwa Bakery */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 order-2 md:order-1">
              <p className="text-sm uppercase tracking-wider text-[#978667]">
                RAYUWA BAKERY
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                A Taste of Freshness Awaits
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Situated in our vibrant and welcoming neighborhood, Rayuwa Bakery is your go-to destination for freshly baked bread, delightful pastries, and refreshing juices. Discover the passion behind every bite.
              </p>
              {/* <Button variant="outline" className="mt-4"> */}
              <Button className="inline-flex bg-[#978667] hover:bg-[#4B514C] text-white font-semibold">
                Read more
              </Button>
            </div>
            <div 
              ref={bakeryImageRef}
              className="relative aspect-[1000/625] rounded-lg overflow-hidden transform transition-all duration-1000 ease-out scale-95 opacity-0 order-1 md:order-2"
            >
              <Image
                src="/images/mabuapartmentsfront.jpg"
                alt="Rayuwa Bakery"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 lg:py-24 relative overflow-hidden testimonial-section">
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
        <p className="text-sm text-center uppercase tracking-wider text-[#EBD7B2] mb-3">
                testimonials
              </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-12 text-center text-white">What Our Guests Say</h2>

          {/* Carousel Wrapper */}
          <div className="relative w-full overflow-hidden">
            <div className="testimonial-carousel">
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4">
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

      
    </div>
  )
}

