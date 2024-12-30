import { PrismaClient } from '@prisma/client'
import RoomList from '@/components/room-list'
import Hero from '@/components/hero'

const prisma = new PrismaClient()

export default async function RoomsPage() {
  const roomTypes = await prisma.roomType.findMany()

  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-16 bg-[#faf9f6]">
        {/* <h2 className="text-3xl font-bold mb-8">Our Rooms</h2> */}
        <RoomList roomTypes={roomTypes} />
      </div>
    </div>
  )
}

