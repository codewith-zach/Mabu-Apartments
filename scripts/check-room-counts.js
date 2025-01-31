import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function checkRoomCounts() {
  try {
    const roomTypes = await prisma.roomType.findMany({
      include: {
        _count: {
          select: { rooms: true },
        },
      },
    })

    roomTypes.forEach((roomType) => {
      console.log(`${roomType.name}: ${roomType._count.rooms} units`)
    })
  } catch (error) {
    console.error("Error checking room counts:", error)
  } finally {
    await prisma.$disconnect()
  }
}

checkRoomCounts()