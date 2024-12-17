'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

export function BookingForm({ roomTypeId, price, title }: { roomTypeId: string; price: number; title: string }) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: undefined,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [isExtending, setIsExtending] = useState(false)
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
    },
  })

  const calculateTotalPrice = () => {
    if (dateRange.from && dateRange.to) {
      const nights = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24))
      return price * nights
    }
    return 0
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const totalPrice = calculateTotalPrice()

    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          amount: totalPrice * 100, // Paystack expects amount in kobo
          metadata: {
            name: values.name,
            roomId: roomTypeId, // Updated to use roomTypeId
            checkIn: values.dateRange.from,
            checkOut: values.dateRange.to,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to Paystack checkout
        window.location.href = data.authorization_url
      } else {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (error) {
      console.error('Payment initialization failed:', error)
      toast({
        title: 'Error',
        description: 'Failed to initialize payment. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function extendBooking() {
    if (!currentBookingId || !dateRange.to) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/extend-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: currentBookingId,
          newCheckOut: dateRange.to,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Your booking has been extended successfully.',
        })
        setIsExtending(false)
        setCurrentBookingId(null)
      } else {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (error) {
      console.error('Booking extension failed:', error)
      toast({
        title: 'Error',
        description: 'Failed to extend booking. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Check Availability</h2>
              <p className="text-sm text-gray-500">
                Book your stay at {title}
              </p>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Range</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "LLL dd, y")} -{" "}
                                {format(dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={(range) => {
                          if (range?.from) {
                            setDateRange({ from: range.from, to: range.to })
                            field.onChange(range)
                          }
                        }}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {dateRange.from && dateRange.to && (
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-lg">
                  <span>Total Price:</span>
                  <span className="font-bold">₦{calculateTotalPrice().toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24))} nights at ₦{price.toLocaleString()} per night
                </p>
              </div>
            )}
            {isExtending ? (
              <Button type="button" className="w-full" size="lg" onClick={extendBooking} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Extend Booking'}
              </Button>
            ) : (
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Book Now'}
              </Button>
            )}

            {!isExtending && (
              <Button type="button" variant="outline" className="w-full" onClick={() => setIsExtending(true)}>
                Extend Existing Booking
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

