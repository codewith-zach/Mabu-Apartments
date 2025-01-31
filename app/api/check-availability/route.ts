import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { startOfDay, endOfDay } from "date-fns"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { roomTypeId, checkIn, checkOut } = await req.json()

    const checkInDate = startOfDay(new Date(checkIn))
    const checkOutDate = endOfDay(new Date(checkOut))

    console.log("Checking availability for:", {
      roomTypeId,
      checkInDate,
      checkOutDate,
    })

    // Get all rooms of the requested type
    const rooms = await prisma.room.findMany({
      where: {
        roomTypeId: roomTypeId,
      },
      include: {
        bookings: {
          where: {
            OR: [
              {
                AND: [{ checkIn: { lte: checkInDate } }, { checkOut: { gt: checkInDate } }],
              },
              {
                AND: [{ checkIn: { lt: checkOutDate } }, { checkOut: { gte: checkOutDate } }],
              },
            ],
          },
        },
      },
    })

    console.log(`Found ${rooms.length} rooms of the specified type`)

    // For each room, check if it's available for the entire date range
    for (const room of rooms) {
      const hasConflictingBooking = room.bookings.length > 0

      // If this room has no conflicting bookings, it's available
      if (!hasConflictingBooking) {
        console.log(`Room ${room.id} is available for the selected dates`)
        return NextResponse.json({
          available: true,
          roomId: room.id,
        })
      }
    }

    // If we get here, no rooms are available for the selected dates
    console.log("No available rooms found for the selected dates")
    return NextResponse.json({ available: false })
  } catch (error) {
    console.error("Error checking availability:", error)
    return NextResponse.json({ error: "Failed to check availability" }, { status: 500 })
  }
}

