import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Check RoomTypes
    const roomTypes = await prisma.roomType.findMany()
    console.log('Room Types:', roomTypes)

    // Check Rooms
    const rooms = await prisma.room.findMany({
      include: { roomType: true }
    })
    console.log('Rooms:', rooms)

    // Check Availability (just a sample)
    const availability = await prisma.availability.findMany({
      take: 10,
      include: { room: true }
    })
    console.log('Sample Availability:', availability)

  } catch (error) {
    console.error('Error querying database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()