import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const roomTypeId = searchParams.get('roomTypeId')

  if (!roomTypeId) {
    return NextResponse.json({ error: 'Room Type ID is required' }, { status: 400 })
  }

  try {
    const unavailableDates = await prisma.availability.findMany({
      where: {
        room: {
          roomTypeId: roomTypeId
        },
        isAvailable: false
      },
      select: {
        date: true
      }
    })

    return NextResponse.json({
      unavailableDates: unavailableDates.map(item => item.date)
    })
  } catch (error) {
    console.error('Error fetching unavailable dates:', error)
    return NextResponse.json({ error: 'Failed to fetch unavailable dates' }, { status: 500 })
  }
}

