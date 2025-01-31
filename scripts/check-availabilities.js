import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function checkAvailabilities() {
  try {
    const roomTypes = await prisma.roomType.findMany({
      include: {
        rooms: {
          include: {
            _count: {
              select: { availability: true },
            },
          },
        },
      },
    })

    for (const roomType of roomTypes) {
      console.log(`Room Type: ${roomType.name}`)
      console.log(`Total Rooms: ${roomType.rooms.length}`)

      for (const room of roomType.rooms) {
        console.log(`  Room ${room.roomNumber}: ${room._count.availability} availability records`)
      }
      console.log("---")
    }
  } catch (error) {
    console.error("Error checking availabilities:", error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAvailabilities()

