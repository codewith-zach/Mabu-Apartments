import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { sendBookingConfirmationEmail } from "@/utils/email"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const bookingData = await req.json()
    console.log("Received booking data:", bookingData)

    const { roomId, guestName, guestEmail, checkIn, checkOut, totalPrice, paymentReference } = bookingData

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        roomId,
        guestName,
        guestEmail,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        totalPrice,
        paymentStatus: "paid",
        paymentReference,
      },
      include: {
        room: {
          include: {
            roomType: true,
          },
        },
      },
    })

    console.log("Booking created:", booking)

    // Get all rooms of this type
    const roomsOfType = await prisma.room.findMany({
      where: {
        roomTypeId: booking.room.roomTypeId,
      },
      include: {
        bookings: {
          where: {
            OR: [
              {
                AND: [{ checkIn: { lte: new Date(checkIn) } }, { checkOut: { gt: new Date(checkIn) } }],
              },
              {
                AND: [{ checkIn: { lt: new Date(checkOut) } }, { checkOut: { gte: new Date(checkOut) } }],
              },
            ],
          },
        },
      },
    })

    // For each date in the booking range, check if all rooms are booked
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    for (let date = new Date(checkInDate); date < checkOutDate; date.setDate(date.getTime() + 24 * 60 * 60 * 1000)) {
      const currentDate = new Date(date)

      // Count how many rooms are booked for this date
      const bookedRoomsCount = roomsOfType.filter((room) =>
        room.bookings.some((booking) => booking.checkIn <= currentDate && booking.checkOut > currentDate),
      ).length

      // Only mark the date as unavailable if ALL rooms are booked
      const isAvailable = bookedRoomsCount < roomsOfType.length

      // Update availability for this date
      await prisma.availability.updateMany({
        where: {
          roomId: {
            in: roomsOfType.map((room) => room.id),
          },
          date: currentDate,
        },
        data: {
          isAvailable: isAvailable,
        },
      })
    }

    console.log("Room availability updated")

    // Try to send emails but don't fail if they error
    try {
      // Send confirmation to guest
      await sendBookingConfirmationEmail(guestEmail, {
        guestName: guestName,
        roomType: booking.room.roomType.name,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        totalPrice: booking.totalPrice,
      })
      console.log("Booking confirmation email sent to guest")
    } catch (emailError) {
      // Log the error but don't fail the booking
      console.error("Error sending emails:", emailError)
    }

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ success: false, error: "Failed to create booking" }, { status: 500 })
  }
}

