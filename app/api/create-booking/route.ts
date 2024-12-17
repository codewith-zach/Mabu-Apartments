import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { eachDayOfInterval } from 'date-fns'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { roomTypeId, name, email, checkIn, checkOut, totalPrice } = await req.json()

    // Find an available room for the given room type and date range
    const availableRoom = await findAvailableRoom(roomTypeId, new Date(checkIn), new Date(checkOut))

    if (!availableRoom) {
      return NextResponse.json({ message: 'No rooms available for the selected dates' }, { status: 400 })
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        roomId: availableRoom.id,
        guestName: name,
        guestEmail: email,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        totalPrice,
        paymentStatus: 'pending',
      },
    })

    // Update room availability
    await updateRoomAvailability(availableRoom.id, new Date(checkIn), new Date(checkOut), false)

    // Here you would typically integrate with Paystack to create a payment session
    // For this example, we'll just return a success message
    return NextResponse.json({ message: 'Booking created successfully', bookingId: booking.id })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ message: 'An error occurred while creating the booking' }, { status: 500 })
  }
}

async function findAvailableRoom(roomTypeId: string, checkIn: Date, checkOut: Date) {
  const rooms = await prisma.room.findMany({
    where: {
      roomTypeId: roomTypeId,
    },
    include: {
      availability: {
        where: {
          date: {
            gte: checkIn,
            lt: checkOut,
          },
        },
      },
    },
  })

  return rooms.find((room: { availability: { isAvailable: boolean }[] }) => 
    room.availability.every((a: { isAvailable: boolean }) => a.isAvailable)
  )
}

async function updateRoomAvailability(roomId: string, checkIn: Date, checkOut: Date, isAvailable: boolean) {
  const dates = eachDayOfInterval({ start: checkIn, end: checkOut })

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

