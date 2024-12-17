import { PrismaClient } from '@prisma/client'
import RoomList from '@/components/room-list'

const prisma = new PrismaClient()

export default async function RoomsPage() {
  const roomTypes = await prisma.roomType.findMany()

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-4xl font-bold mb-8">Our Rooms</h1>
      <RoomList roomTypes={roomTypes} />
    </div>
  )
}

