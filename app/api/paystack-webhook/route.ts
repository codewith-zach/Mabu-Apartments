import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest('hex')

    if (hash !== req.headers.get('x-paystack-signature')) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)

    // Handle the event
    switch (event.event) {
      case 'charge.success':
        const { metadata, amount, customer } = event.data
        await prisma.booking.create({
          data: {
            roomId: metadata.roomId,
            guestName: metadata.name,
            guestEmail: customer.email,
            checkIn: new Date(metadata.checkIn),
            checkOut: new Date(metadata.checkOut),
            totalPrice: amount / 100, // Convert from kobo to naira
            paymentStatus: 'paid',
          },
        })
        console.log('Booking confirmed:', event.data)
        break
      default:
        console.log('Unhandled event type:', event.event)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ message: 'Webhook error' }, { status: 500 })
  }
}

