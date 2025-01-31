import { PrismaClient } from "@prisma/client"
import { addDays, startOfToday } from "date-fns"

const prisma = new PrismaClient()

async function fixAvailability() {
  try {
    // Get all rooms
    const rooms = await prisma.room.findMany({
      include: {
        bookings: {
          where: {
            checkOut: {
              gte: startOfToday(),
            },
          },
        },
      },
    })

    for (const room of rooms) {
      // Delete existing availability records
      await prisma.availability.deleteMany({
        where: { roomId: room.id },
      })

      const today = startOfToday()
      const nextYear = addDays(today, 365)

      // Create new availability records
      for (let date = today; date <= nextYear; date = addDays(date, 1)) {
        // Check if there's a booking for this date
        const isBooked = room.bookings.some((booking) => date >= booking.checkIn && date < booking.checkOut)

        await prisma.availability.create({
          data: {
            roomId: room.id,
            date: date,
            isAvailable: !isBooked,
          },
        })
      }

      console.log(`Fixed availability for room ${room.roomNumber}`)
    }

    console.log("Availability fixed for all rooms")
  } catch (error) {
    console.error("Error fixing availability:", error)
  } finally {
    await prisma.$disconnect()
  }
}

fixAvailability()

