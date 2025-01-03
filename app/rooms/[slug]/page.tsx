import { notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { RoomCarousel } from '@/components/room-carousel'
import { Amenities } from '@/components/amenities'
import { Reviews } from '@/components/reviews'
import { BookingForm } from '@/components/booking-form'
import { Bed, Users, SquareIcon as SquareFeet } from 'lucide-react'

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

  // For this example, we'll use placeholder images
  const images = [
    '/images/rooms/room1.jpg',
    '/images/rooms/room2.jpg',
    '/images/rooms/room3.jpg'
  ]

  // Placeholder amenities
  const amenities = [
    'King Size Bed',
    'Balcony',
    'Disable Access',
    'Welcome Bottle',
    'Air Dryer',
    'Safety Box',
    '32 Inch TV',
    'Pet Allowed',
    'Wifi / Netflix access',
    'Air Condition',
    'Laundry Service'
  ]

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">{roomType.name}</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RoomCarousel images={images} />
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">About this space</h2>
            <p className="text-gray-600 text-lg mb-6">{roomType.description}</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center">
                <Bed className="w-6 h-6 mr-2 text-gray-500" />
                <span>1 King Bed</span>
              </div>
              <div className="flex items-center">
                <Users className="w-6 h-6 mr-2 text-gray-500" />
                <span>{roomType.capacity} Guests</span>
              </div>
              <div className="flex items-center">
                <SquareFeet className="w-6 h-6 mr-2 text-gray-500" />
                <span>40 m²</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Amenities amenities={amenities} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <Reviews roomId={roomType.id} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingForm roomTypeId={roomType.id} price={roomType.price} title={roomType.name} />
          </div>
        </div>
      </div>
    </div>
  )
}

