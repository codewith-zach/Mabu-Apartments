import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params

  try {
    const roomType = await prisma.roomType.findUnique({
      where: { slug },
      include: {
        rooms: {
          take: 1,
        },
      },
    })

    if (!roomType) {
      return NextResponse.json({ error: "Room type not found" }, { status: 404 })
    }

    return NextResponse.json(roomType)
  } catch (error) {
    console.error("Error fetching room type:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

