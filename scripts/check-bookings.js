import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const bookings = await prisma.booking.findMany({
    include: {
      room: {
        include: {
          roomType: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 5 // Get the 5 most recent bookings
  })

  console.log('Recent bookings:')
  bookings.forEach((booking, index) => {
    console.log(`\nBooking ${index + 1}:`)
    console.log(`ID: ${booking.id}`)
    console.log(`Guest Name: ${booking.guestName}`)
    console.log(`Guest Email: ${booking.guestEmail}`)
    console.log(`Check-in: ${booking.checkIn}`)
    console.log(`Check-out: ${booking.checkOut}`)
    console.log(`Total Price: ${booking.totalPrice}`)
    console.log(`Room Type: ${booking.room.roomType.name}`)
    console.log(`Room Number: ${booking.room.roomNumber}`)
    console.log(`Payment Status: ${booking.paymentStatus}`)
    console.log(`Created At: ${booking.createdAt}`)
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

