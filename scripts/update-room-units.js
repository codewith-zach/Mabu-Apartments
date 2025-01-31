import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function updateRoomUnits() {
  try {
    // Update One Bedroom Apartments
    await prisma.roomType.update({
      where: { name: "One Bedroom Apartment" },
      data: { rooms: { deleteMany: {} } },
    })
    for (let i = 1; i <= 6; i++) {
      await prisma.room.create({
        data: {
          roomNumber: `O${i}`,
          roomType: { connect: { name: "One Bedroom Apartment" } },
        },
      })
    }
    console.log("Updated One Bedroom Apartments to 6 units")

    // Update Studio Apartments
    await prisma.roomType.update({
      where: { name: "Studio Apartment" },
      data: { rooms: { deleteMany: {} } },
    })
    for (let i = 1; i <= 2; i++) {
      await prisma.room.create({
        data: {
          roomNumber: `S${i}`,
          roomType: { connect: { name: "Studio Apartment" } },
        },
      })
    }
    console.log("Updated Studio Apartments to 2 units")

    // Update Two Bedroom Apartments
    await prisma.roomType.update({
      where: { name: "Two Bedroom Apartment" },
      data: { rooms: { deleteMany: {} } },
    })
    await prisma.room.create({
      data: {
        roomNumber: `T1`,
        roomType: { connect: { name: "Two Bedroom Apartment" } },
      },
    })
    console.log("Updated Two Bedroom Apartments to 1 unit")

    console.log("Room units updated successfully")
  } catch (error) {
    console.error("Error updating room units:", error)
  } finally {
    await prisma.$disconnect()
  }
}

updateRoomUnits()