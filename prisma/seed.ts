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
    const createdRoomType = await prisma.roomType.create({
      data: roomTypeData,
    })

    // Create rooms for each room type
    for (let i = 1; i <= roomCount; i++) {
      const room = await prisma.room.create({
        data: {
          roomNumber: `${roomType.name.charAt(0)}${i}`,
          roomTypeId: createdRoomType.id,
        },
      })

      // Create availability for the next 365 days
      const today = new Date()
      const nextYear = addDays(today, 365)
      const dates = eachDayOfInterval({ start: today, end: nextYear })

      for (const date of dates) {
        await prisma.availability.create({
          data: {
            roomId: room.id,
            date: date,
            isAvailable: true,
          },
        })
      }
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

