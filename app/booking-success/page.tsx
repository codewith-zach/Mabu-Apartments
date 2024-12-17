import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BookingSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24 text-center">
      <h1 className="text-4xl font-bold mb-4">Booking Successful!</h1>
      <p className="text-xl mb-8">Thank you for choosing Mabu Apartments. We look forward to hosting you.</p>
      <p className="mb-8">A confirmation email has been sent to your provided email address with all the details of your booking.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}

