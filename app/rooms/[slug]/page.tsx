'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { RoomCarousel } from '@/components/room-carousel'
import { Reviews } from '@/components/reviews'
import { BookingForm } from '@/components/booking-form'
import { Hero } from '@/components/apartment-hero'
import { RoomDescription } from '@/components/room-description'
import { LoadingSpinner } from '@/components/loading-spinner'


// Define the structure of the room type
interface Room {
  id: string
  name: string
  price: number
  rooms: { id: string }[]
}

export default function RoomPage() {
  const [roomType, setRoomType] = useState<Room | null>(null) // Use the defined type
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const { slug } = params

  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const response = await fetch(`/api/rooms/${slug}`)
        const data = await response.json()
        setRoomType(data)
      } catch (error) {
        console.error('Error fetching room type:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoomType()
  }, [slug])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!roomType || roomType.rooms.length === 0) {
    return <div>Room not found</div>
  }

  const roomId = roomType.rooms[0].id

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
      <div className="w-full bg-[#faf9f6] py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl mb-8">
            <RoomCarousel images={images} />
          </div>
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <Reviews roomId={roomId} />
            </div>
            <div className="lg:col-span-2 lg:mt-[7.5rem]">
              <div className="sticky top-24">
                <BookingForm roomTypeId={roomType.id} price={roomType.price} title={roomType.name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
