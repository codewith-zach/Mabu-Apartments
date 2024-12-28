'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

type RoomType = {
  id: string
  name: string
  description: string
  price: number
  capacity: number
  imageUrl: string
  slug: string // Added slug property
}

export default function RoomList({ roomTypes }: { roomTypes: RoomType[] }) {
  const [filteredRooms, setFilteredRooms] = useState(roomTypes)
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
    let filtered = roomTypes.filter(room =>
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

  return (
    <>
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
                  src={room.imageUrl}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>{room.name}</CardTitle>
              <CardDescription className="mt-2">{room.description}</CardDescription>
              <p className="mt-4 font-semibold">From ₦{room.price}/night</p>
              <p>Capacity: {room.capacity} people</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/rooms/${room.slug}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
    </>
  )
}

