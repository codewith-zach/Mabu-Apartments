import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { eachDayOfInterval } from 'date-fns'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { bookingId, newCheckOut } = await req.json()

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { 
        room: {
          include: {
            roomType: true
          }
        }
      },
    })

    if (!booking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 })
    }

    const isAvailable = await checkAvailability(booking.roomId, booking.checkOut, new Date(newCheckOut))

    if (!isAvailable) {
      return NextResponse.json({ message: 'Room not available for extension' }, { status: 400 })
    }

    // Calculate additional nights and price
    const additionalNights = Math.ceil((new Date(newCheckOut).getTime() - booking.checkOut.getTime()) / (1000 * 3600 * 24))
    const additionalPrice = additionalNights * booking.room.roomType.price

    // Update the booking
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        checkOut: new Date(newCheckOut),
        totalPrice: booking.totalPrice + additionalPrice,
      },
    })

    // Update room availability
    await updateRoomAvailability(booking.roomId, booking.checkOut, new Date(newCheckOut), false)

    return NextResponse.json({ message: 'Booking extended successfully', booking: updatedBooking })
  } catch (error) {
    console.error('Error extending booking:', error)
    return NextResponse.json({ message: 'An error occurred while extending the booking' }, { status: 500 })
  }
}

async function checkAvailability(roomId: string, startDate: Date, endDate: Date): Promise<boolean> {
  const availability = await prisma.availability.findMany({
    where: {
      roomId: roomId,
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
  })

  return availability.every((a: { isAvailable: boolean }) => a.isAvailable)
}

async function updateRoomAvailability(roomId: string, startDate: Date, endDate: Date, isAvailable: boolean) {
  const dates = eachDayOfInterval({ start: startDate, end: endDate })

  for (const date of dates) {
    await prisma.availability.updateMany({
      where: {
        roomId: roomId,
        date: date,
      },
      data: {
        isAvailable: isAvailable,
      },
    })
  }
}

