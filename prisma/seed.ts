import { PrismaClient } from "@prisma/client"
import { addDays, eachDayOfInterval } from "date-fns"

const prisma = new PrismaClient()

async function main() {
  // Create room types
  const roomTypes = [
    {
      name: "Studio Apartment",
      slug: "studio-apartment",
      description: "A single open space combining living, sleeping, and kitchen areas, with a separate bathroom.",
      price: 85000,
      capacity: 2,
      imageUrl: "/images/rooms/room1.jpg",
      images: [
        "/images/rooms/room1.jpg",
        "/images/rooms/room3.jpg",
        "/images/Rooms-images/studio/studio1.jpg",
        "/images/Rooms-images/studio/studio6.jpg",
        "/images/Rooms-images/studio/studio9.jpg",
        "/images/Rooms-images/studio/studio10.jpg",
      ],
      roomCount: 5,
    },
    {
      name: "One Bedroom Apartment",
      slug: "one-bedroom-apartment",
      description: "A compact living space with a separate bedroom, living area, kitchen, and bathroom.",
      price: 120000,
      capacity: 3,
      imageUrl: "/images/rooms/room2.jpg",
      images: [
        "/images/rooms/room2.jpg",
        "/images/Rooms-images/1bedroom/1bed3.jpg",
        "/images/Rooms-images/1bedroom/1bed4.jpg",
        "/images/Rooms-images/1bedroom/1bed10.jpg",
        "/images/Rooms-images/1bedroom/1bed15.jpg",
        "/images/Rooms-images/1bedroom/1bed18.jpg",
        "/images/Rooms-images/1bedroom/1bed26.jpg",
        "/images/Rooms-images/1bedroom/1bed32.jpg",
        "/images/Rooms-images/1bedroom/1bed33.jpg",
      ],
      roomCount: 4,
    },
    {
      name: "Two Bedroom Apartment",
      slug: "two-bedroom-apartment",
      description: "A larger unit with two separate bedrooms, a living area, kitchen, and bathrooms.",
      price: 180000,
      capacity: 5,
      imageUrl: "/images/Rooms-images/2bedroom/2bed5.jpg",
      images: [
        "/images/Rooms-images/2bedroom/2bed5.jpg",
        "/images/Rooms-images/2bedroom/2bed8.jpg",
        "/images/Rooms-images/2bedroom/2bed14.jpg",
        "/images/Rooms-images/2bedroom/2bed18.jpg",
        "/images/Rooms-images/2bedroom/2bed19.jpg",
        "/images/Rooms-images/2bedroom/2bed21.jpg",
        "/images/Rooms-images/2bedroom/2bed20.jpg",
      ],
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
        data: dates.map((date) => ({
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

