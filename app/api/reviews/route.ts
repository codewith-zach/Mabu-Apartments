import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const roomId = searchParams.get('roomId')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '5')

  if (!roomId) {
    return NextResponse.json({ error: 'Room ID is required' }, { status: 400 })
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { roomId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit + 1, // Fetch one extra to check if there are more
      distinct: ['id'], // Ensure we're not fetching duplicate reviews
    })

    const hasMore = reviews.length > limit
    const reviewsToReturn = hasMore ? reviews.slice(0, -1) : reviews

    return NextResponse.json({
      reviews: reviewsToReturn,
      hasMore,
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { roomId, name, rating, comment } = await req.json()

    if (!roomId || !name || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newReview = await prisma.review.create({
      data: {
        roomId,
        name,
        rating,
        comment,
      },
    })

    return NextResponse.json(newReview)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}

