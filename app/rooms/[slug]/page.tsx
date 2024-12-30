import { notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { RoomCarousel } from '@/components/room-carousel'
import { Amenities } from '@/components/amenities'
import { Reviews } from '@/components/reviews'
import { BookingForm } from '@/components/booking-form'
import { Hero } from '@/components/apartment-hero'
import { RoomDescription } from '@/components/room-description'

interface PageProps {
  params: Promise<{ slug: string }>;
}

const prisma = new PrismaClient()

export default async function RoomPage({ params }: PageProps) {
  const { slug } = await params
  
  const roomType = await prisma.roomType.findUnique({
    where: { slug },
  })

  if (!roomType) {
    notFound()
  }

  // Sample images for the carousel
  const images = [
    '/images/rooms/room1.jpg',
    '/images/rooms/room2.jpg',
    '/images/rooms/room3.jpg',
  ]

  return (
    <>
      <Hero title={roomType.name} />
      <RoomDescription />
      <div className="container mx-auto px-4 py-8 bg-[#faf9f6]">
        <div className="mx-auto max-w-5xl">
        <RoomCarousel images={images} />
        </div>
        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          <div className="lg:col-span-2">
            {/* <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">About this space</h2>
              <p className="text-gray-600 text-lg">{roomType.description}</p>
            </div> */}
            <Reviews roomId={roomType.id} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm roomTypeId={roomType.id} price={roomType.price} title={roomType.name} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

