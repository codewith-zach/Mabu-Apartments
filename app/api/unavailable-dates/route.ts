import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { startOfDay, endOfDay } from "date-fns"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const roomTypeId = searchParams.get("roomTypeId")

  if (!roomTypeId) {
    return NextResponse.json({ error: "Room Type ID is required" }, { status: 400 })
  }

  try {
    // Get all rooms of this type
    const rooms = await prisma.room.findMany({
      where: {
        roomTypeId: roomTypeId,
      },
      include: {
        bookings: {
          where: {
            checkOut: {
              gte: startOfDay(new Date()),
            },
          },
        },
      },
    })

    const totalRooms = rooms.length
    const unavailableDates = new Set<string>()

    // For each day in the next year
    for (
      let date = startOfDay(new Date());
      date <= endOfDay(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000));
      date = new Date(date.getTime() + 24 * 60 * 60 * 1000)
    ) {
      // Count how many rooms are booked for this date
      const bookedRoomsCount = rooms.filter((room) =>
        room.bookings.some((booking) => date >= startOfDay(booking.checkIn) && date < endOfDay(booking.checkOut)),
      ).length

      // If all rooms are booked for this date, add it to unavailable dates
      if (bookedRoomsCount >= totalRooms) {
        unavailableDates.add(date.toISOString().split("T")[0])
      }
    }

    return NextResponse.json({
      unavailableDates: Array.from(unavailableDates).map((date) => new Date(date)),
    })
  } catch (error) {
    console.error("Error fetching unavailable dates:", error)
    return NextResponse.json({ error: "Failed to fetch unavailable dates" }, { status: 500 })
  }
}

