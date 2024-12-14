import { notFound } from 'next/navigation'
import { RoomCarousel } from '@/components/room-carousel'
import { Amenities } from '@/components/amenities'
import { Reviews } from '@/components/reviews'
import { BookingForm } from '@/components/booking-form'

// This would typically come from a database
const rooms = {
  'studio-apartment': {
    id: 'studio-apartment',
    title: 'Studio Apartment',
    description: 'A cozy and efficient space for solo travelers or couples.',
    price: 150,
    images: [
      '/images/rooms/room1.jpg',
      '/images/rooms/room2.jpg',
      '/images/rooms/room3.jpg'
    ],
    amenities: [
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
    ],
  },
  'one-bedroom-apartment': {
    id: 'one-bedroom-apartment',
    title: 'One Bedroom Apartment',
    description: 'Spacious and comfortable for small families or groups.',
    price: 240,
    images: [
      '/images/rooms/room1.jpg',
      '/images/rooms/room2.jpg',
      '/images/rooms/room3.jpg'
    ],
    amenities: [
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
    ],
  },
  'two-bedroom-apartment': {
    id: 'two-bedroom-apartment',
    title: 'Two Bedroom Apartment',
    description: 'Luxurious space for larger groups or extended stays.',
    price: 300,
    images: [
      '/images/rooms/room1.jpg',
      '/images/rooms/room2.jpg',
      '/images/rooms/room3.jpg'
    ],
    amenities: [
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
    ],
  },
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getRoomData(params: Promise<{ id: string }>) {
  const { id } = await params;
  return rooms[id as keyof typeof rooms];
}

export default async function RoomPage({ params }: PageProps) {
  const room = await getRoomData(params);

  if (!room) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">{room.title}</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RoomCarousel images={room.images} />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">About this space</h2>
            <p className="text-gray-600 text-lg">{room.description}</p>
          </div>
          <Amenities amenities={room.amenities} />
          <Reviews roomId={room.id} />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingForm roomId={room.id} price={room.price} title={room.title} />
          </div>
        </div>
      </div>
    </div>
  )
}

