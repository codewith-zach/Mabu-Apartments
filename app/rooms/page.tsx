'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

// This would typically come from a database
const rooms = [
  {
    id: 'studio-apartment',
    title: 'Studio Apartment',
    description: 'A cozy and efficient space for solo travelers or couples.',
    price: 150,
    capacity: 2,
    image: '/images/rooms/room3.jpg',
  },
  {
    id: 'one-bedroom-apartment',
    title: 'One Bedroom Apartment',
    description: 'Spacious and comfortable for small families or groups.',
    price: 240,
    capacity: 3,
    image: '/images/rooms/room1.jpg',
  },
  {
    id: 'two-bedroom-apartment',
    title: 'Two Bedroom Apartment',
    description: 'Luxurious space for larger groups or extended stays.',
    price: 300,
    capacity: 5,
    image: '/images/rooms/room2.jpg',
  },
  // Add more room types as needed
]

export default function RoomsPage() {
  const [filteredRooms, setFilteredRooms] = useState(rooms)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('price-asc')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    filterRooms(term, sortOrder)
  }

  const handleSort = (value: string) => {
    setSortOrder(value)
    filterRooms(searchTerm, value)
  }

  const filterRooms = (term: string, sort: string) => {
    let filtered = rooms.filter(room =>
      room.title.toLowerCase().includes(term) ||
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

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">Our Rooms</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          type="text"
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={handleSearch}
          className="md:w-1/2"
        />
        <Select onValueChange={handleSort}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="capacity-asc">Capacity: Low to High</SelectItem>
            <SelectItem value="capacity-desc">Capacity: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map(room => (
          <Card key={room.id}>
            <CardHeader>
              <div className="relative aspect-[16/9] rounded-t-xl overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>{room.title}</CardTitle>
              <CardDescription className="mt-2">{room.description}</CardDescription>
              <p className="mt-4 font-semibold">From ₦{room.price}/night</p>
              <p>Capacity: {room.capacity} people</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/rooms/${room.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

