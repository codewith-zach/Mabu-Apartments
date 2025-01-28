import { Suspense } from "react"
import { RoomCarousel } from "@/components/room-carousel"
import { Reviews } from "@/components/reviews"
import { BookingForm } from "@/components/booking-form"
import { Hero } from "@/components/apartment-hero"
import { RoomDescription } from "@/components/room-description"
import { LoadingSpinner } from "@/components/loading-spinner"
import prisma from "@/lib/db"

export async function generateStaticParams() {
  const roomTypes = await prisma.roomType.findMany()
  return roomTypes.map((room) => ({
    slug: room.slug,
  }))
}

async function getRoomType(slug: string) {
  const roomType = await prisma.roomType.findUnique({
    where: { slug },
    include: {
      rooms: {
        take: 1,
      },
    },
  })
  return roomType
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function RoomPage({ params }: PageProps) {
  const { slug } = await params
  const roomType = await getRoomType(slug)

  if (!roomType || roomType.rooms.length === 0) {
    return <div>Room not found</div>
  }

  const roomId = roomType.rooms[0].id
  const images = roomType.images || [roomType.imageUrl]

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Hero title={roomType.name} />
      <RoomDescription description={roomType.description} capacity={roomType.capacity} />
      <div className="w-full bg-[#faf9f6] py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl mb-8">
            <RoomCarousel images={images} />
          </div>
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <Reviews roomId={roomId} />
            </div>
            <div className="lg:col-span-2 lg:mt-[7.5rem]">
              <div className="sticky top-24">
                <BookingForm roomTypeId={roomType.id} price={roomType.price} title={roomType.name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

