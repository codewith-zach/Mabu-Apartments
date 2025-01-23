'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MainFacilities } from '@/components/MainFacilities'

type RoomType = {
  id: string
  name: string
  description: string
  price: number
  capacity: number
  imageUrl: string
  slug: string
}

export default function RoomList({ roomTypes }: { roomTypes: RoomType[] }) {
  const [filteredRooms, setFilteredRooms] = useState(roomTypes)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('price-asc')

  const filterRooms = (term: string, sort: string) => {
    const filtered = roomTypes.filter(room =>
      room.name.toLowerCase().includes(term) ||
      room.description.toLowerCase().includes(term)
    )

    switch (sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'capacity-asc':
        filtered.sort((a, b) => a.capacity - b.capacity)
        break
      case 'capacity-desc':
        filtered.sort((a, b) => b.capacity - a.capacity)
        break
    }

    setFilteredRooms(filtered)
  }

  useEffect(() => {
    filterRooms(searchTerm, sortOrder)
  }, [searchTerm, sortOrder])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4 lg:p-8">
          <div className="lg:sticky lg:top-20 pt-4">
            <p className="text-sm uppercase tracking-wider text-[#978667] mb-3">
              mabu apartments
            </p>
            <h2 className="text-3xl font-bold mb-8">Our Rooms</h2>
            <p className="text-base mb-8 leading-relaxed text-gray-600">
              Step into comfort and style with our thoughtfully designed rooms, tailored to meet your every need. Whether you&apos;re here to relax or explore, our accommodations offer the perfect retreat for a memorable stay.
            </p>
          </div>
        </div>
        <div className="lg:w-3/4 p-4 lg:py-8 lg:px-12 pb-24 ">
          <div className="max-w-full lg:max-w-4xl xl:max-w-5xl mx-auto space-y-48 pb-16">
            {filteredRooms.map(room => (
              <div key={room.id} className="relative group">
                <div className="aspect-[4/3] overflow-hidden rounded-[3rem]">
                  <Image
                    src={room.imageUrl}
                    alt={room.name}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-30 rounded-[3rem]" />
                </div>
                <Card className="absolute bottom-0 left-16 right-16 translate-y-1/2 overflow-hidden rounded-[3rem] shadow-lg transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-8 space-y-4 max-w-2xl mx-auto">
                    <div className="space-y-2">
                      <p className="text-sm uppercase tracking-wider text-[#978667]">
                        FROM ₦{room.price.toLocaleString()}/NIGHT
                      </p>
                      <h3 className="text-2xl font-semibold">{room.name}</h3>
                      <p className="text-gray-600 line-clamp-2">{room.description}</p>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span>Capacity: {room.capacity} people</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-[#978667] hover:bg-[#4B514C] text-white font-semibold">
                      <Link href={`/rooms/${room.slug}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MainFacilities />
    </div>
  )
}
