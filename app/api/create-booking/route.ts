import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { sendBookingConfirmationEmail } from '@/utils/email';

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const bookingData = await req.json()
    console.log('Received booking data:', bookingData)

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
        paymentStatus: 'paid',
        paymentReference,
      },
      include: {
        room: {
          include: {
            roomType: true
          }
        }
      }
    })

    console.log('Booking created:', booking)

    // Send booking confirmation email
    await sendBookingConfirmationEmail(guestEmail, {
      roomType: booking.room.roomType.name,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      totalPrice: booking.totalPrice,
    });

    console.log('Booking confirmation email sent');

    // Update room availability
    await updateRoomAvailability(roomId, new Date(checkIn), new Date(checkOut), false)
    console.log('Room availability updated')

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ success: false, error: 'Failed to create booking' }, { status: 500 })
  }
}

async function updateRoomAvailability(roomId: string, checkIn: Date, checkOut: Date, isAvailable: boolean) {
  await prisma.availability.updateMany({
    where: {
      roomId: roomId,
      date: {
        gte: checkIn,
        lt: checkOut,
      },
    },
    data: {
      isAvailable: isAvailable,
    },
  })
}

