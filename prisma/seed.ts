import { PrismaClient } from '@prisma/client'
import { addDays, eachDayOfInterval } from 'date-fns'

const prisma = new PrismaClient()

async function main() {
  // Create room types
  const roomTypes = [
    {
      name: 'Studio Apartment',
      slug: 'studio-apartment',
      description: 'A cozy and efficient space for solo travelers or couples.',
      price: 150,
      capacity: 2,
      imageUrl: '/images/rooms/room3.jpg',
      roomCount: 5,
    },
    {
      name: 'One Bedroom Apartment',
      slug: 'one-bedroom-apartment',
      description: 'Spacious and comfortable for small families or groups.',
      price: 240,
      capacity: 3,
      imageUrl: '/images/rooms/room1.jpg',
      roomCount: 4,
    },
    {
      name: 'Two Bedroom Apartment',
      slug: 'two-bedroom-apartment',
      description: 'Luxurious space for larger groups or extended stays.',
      price: 300,
      capacity: 5,
      imageUrl: '/images/rooms/room2.jpg',
      roomCount: 3,
    },
  ]

  for (const roomType of roomTypes) {
    const { roomCount, ...roomTypeData } = roomType
    
    // Try to find existing room type
    let createdRoomType = await prisma.roomType.findUnique({
      where: { name: roomTypeData.name },
    })

    if (!createdRoomType) {
      // If room type doesn't exist, create it
      createdRoomType = await prisma.roomType.create({
        data: roomTypeData,
      })
      console.log(`Created new room type: ${createdRoomType.name}`)
    } else {
      // If room type exists, update it
      createdRoomType = await prisma.roomType.update({
        where: { id: createdRoomType.id },
        data: roomTypeData,
      })
      console.log(`Updated existing room type: ${createdRoomType.name}`)
    }

    // Create rooms for each room type
    const existingRoomsCount = await prisma.room.count({
      where: { roomTypeId: createdRoomType.id },
    })

    for (let i = existingRoomsCount + 1; i <= roomCount; i++) {
      const room = await prisma.room.create({
        data: {
          roomNumber: `${roomType.name.charAt(0)}${i}`, // e.g., S1, O1, T1
          roomTypeId: createdRoomType.id,
        },
      })
      console.log(`Created new room: ${room.roomNumber}`)

      // Create availability for the next 365 days
      const today = new Date()
      const nextYear = addDays(today, 365)
      const dates = eachDayOfInterval({ start: today, end: nextYear })

      await prisma.availability.createMany({
        data: dates.map(date => ({
          roomId: room.id,
          date: date,
          isAvailable: true,
        })),
      })
      console.log(`Created availability for room: ${room.roomNumber}`)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

