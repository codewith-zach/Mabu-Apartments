import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { startOfDay, endOfDay } from 'date-fns'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { roomTypeId, checkIn, checkOut } = await req.json()
    
    const checkInDate = startOfDay(new Date(checkIn))
    const checkOutDate = endOfDay(new Date(checkOut))

    console.log('Checking availability for:', {
      roomTypeId,
      checkInDate,
      checkOutDate
    })

    const rooms = await prisma.room.findMany({
      where: {
        roomTypeId: roomTypeId,
      },
      include: {
        roomType: true
      }
    })

    console.log(`Found ${rooms.length} rooms of the specified type`)

    for (const room of rooms) {
      const availability = await prisma.availability.findMany({
        where: {
          roomId: room.id,
          date: {
            gte: checkInDate,
            lte: checkOutDate,
          },
          isAvailable: true
        }
      })

      console.log(`Room ${room.id} has ${availability.length} available dates in range`)

      const daysInRange = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))

      if (availability.length >= daysInRange) {
        console.log(`Room ${room.id} is available for the selected dates`)
        return NextResponse.json({ 
          available: true, 
          roomId: room.id,
          roomType: room.roomType
        })
      }
    }

    console.log('No available rooms found for the selected dates')
    return NextResponse.json({ available: false })
  } catch (error) {
    console.error('Error checking availability:', error)
    return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 })
  }
}

