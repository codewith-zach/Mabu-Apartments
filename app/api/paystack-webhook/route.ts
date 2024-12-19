import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    console.log('Webhook received')
    const body = await req.text()
    console.log('Webhook body:', body)

    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest('hex')

    if (hash !== req.headers.get('x-paystack-signature')) {
      console.error('Invalid signature')
      return NextResponse.json({ message: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)
    console.log('Event type:', event.event)

    // Handle the event
    if (event.event === 'charge.success') {
      const { metadata, amount, customer, reference } = event.data
      console.log('Payment successful. Metadata:', metadata)
      
      // Final availability check
      const availableRoom = await findAvailableRoom(
        metadata.roomId,
        new Date(metadata.checkIn),
        new Date(metadata.checkOut)
      )

      if (!availableRoom) {
        console.error('Room no longer available')
        // Here you might want to implement a refund process
        return NextResponse.json({ message: 'Room no longer available' }, { status: 400 })
      }

      console.log('Room still available:', availableRoom)

      // Create the booking
      try {
        console.log('Creating booking with data:', {
          roomId: availableRoom.id,
          guestName: metadata.name,
          guestEmail: customer.email,
          checkIn: metadata.checkIn,
          checkOut: metadata.checkOut,
          totalPrice: amount / 100,
          paymentReference: reference,
        })

        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/create-booking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomId: availableRoom.id,
            guestName: metadata.name,
            guestEmail: customer.email,
            checkIn: metadata.checkIn,
            checkOut: metadata.checkOut,
            totalPrice: amount / 100, // Convert from kobo to naira
            paymentReference: reference,
          }),
        })

        if (!response.ok) {
          throw new Error(`Failed to create booking: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        console.log('Booking created:', result.booking)
      } catch (error) {
        console.error('Error creating booking:', error)
        return NextResponse.json({ message: 'Error creating booking' }, { status: 500 })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ message: 'Webhook error' }, { status: 500 })
  }
}

async function findAvailableRoom(roomId: string, checkIn: Date, checkOut: Date) {
  console.log('Finding available room for:', { roomId, checkIn, checkOut })
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      availability: {
        every: {
          AND: [
            {
              date: {
                gte: checkIn,
                lt: checkOut,
              },
            },
            { isAvailable: true },
          ],
        },
      },
    },
  })
  console.log('Available room found:', room)
  return room
}

