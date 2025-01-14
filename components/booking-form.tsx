'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format, differenceInDays, isBefore, startOfDay, isAfter } from 'date-fns'
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
import { useToast } from '@/hooks/use-toast'

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }),
})

export function BookingForm({ roomTypeId, price, title }: { roomTypeId: string; price: number; title: string }) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  })
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      dateRange: {
        from: undefined,
        to: undefined,
      },
    },
  })

  const calculateTotalPrice = (from: Date, to: Date) => {
    const nights = Math.max(1, differenceInDays(to, from))
    return price * nights
  }

  const getDisplayPrice = () => {
    if (dateRange.from && dateRange.to) {
      return calculateTotalPrice(dateRange.from, dateRange.to)
    }
    if (dateRange.from && hoverDate) {
      return calculateTotalPrice(dateRange.from, hoverDate)
    }
    return 0
  }

  const getNights = () => {
    if (dateRange.from && dateRange.to) {
      return differenceInDays(dateRange.to, dateRange.from)
    }
    if (dateRange.from && hoverDate) {
      return differenceInDays(hoverDate, dateRange.from)
    }
    return 0
  }

  const handleDateSelect = useCallback((range: DateRange | undefined) => {
    if (!range) return

    // If no dates are selected yet
    if (!range.from) {
      setDateRange({ from: undefined, to: undefined })
      return
    }

    // If only "from" date is selected
    if (range.from && !range.to) {
      setDateRange({ from: range.from, to: undefined })
      return
    }

    // If both dates are selected
    if (range.from && range.to) {
      // If the new selection is before the current check-in date
      if (isBefore(range.to, range.from)) {
        setDateRange({ from: range.to, to: undefined })
      } else {
        setDateRange({ from: range.from, to: range.to })
        setIsCalendarOpen(false)
      }
    }
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    try {
      if (!values.dateRange.from || !values.dateRange.to) {
        toast({
          title: "Invalid Date Range",
          description: "Please select both check-in and check-out dates.",
          variant: "destructive",
        });
        return;
      }

      const totalPrice = calculateTotalPrice(values.dateRange.from, values.dateRange.to);

      const availabilityResponse = await fetch('/api/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomTypeId,
          checkIn: values.dateRange.from.toISOString(),
          checkOut: values.dateRange.to.toISOString(),
        }),
      })

      const availabilityData = await availabilityResponse.json()

      if (!availabilityData.available) {
        toast({
          title: 'Room Not Available',
          description: 'Sorry, the room is not available for the selected dates. Please choose different dates.',
          variant: 'destructive',
        })
        setIsLoading(false)
        return;
      }

      const paymentResponse = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          amount: totalPrice * 100, 
          metadata: {
            name: values.name,
            roomId: availabilityData.roomId,
            checkIn: values.dateRange.from.toISOString(),
            checkOut: values.dateRange.to.toISOString(),
            roomTitle: title,
          },
        }),
      })

      const paymentData = await paymentResponse.json()

      if (paymentResponse.ok) {
        window.location.href = paymentData.authorization_url
      } else {
        throw new Error(paymentData.message || 'Payment initialization failed')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred during the booking process. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const totalPrice = getDisplayPrice()

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
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
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value?.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "LLL dd, y")} -{" "}
                                {format(field.value.to, "LLL dd, y")}
                              </>
                            ) : (
                              <>
                                {format(field.value.from, "LLL dd, y")}
                                <span className="text-muted-foreground"> - Select end date</span>
                              </>
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-auto p-0 bg-[#faf9f6]" 
                      align="center" 
                      side="bottom" 
                      sideOffset={5} 
                      alignOffset={0}
                    >
                      <div className="flex flex-col">
                        <div className="p-3 border-b">
                          <div className="text-sm text-muted-foreground text-center">
                            {!dateRange.from ? (
                              "Select check-in date"
                            ) : !dateRange.to ? (
                              "Select check-out date"
                            ) : (
                              "Update your selection"
                            )}
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={field.value?.from}
                            selected={{
                              from: field.value?.from,
                              to: field.value?.to,
                            }}
                            onSelect={(range) => {
                              handleDateSelect(range)
                              field.onChange(range)
                            }}
                            numberOfMonths={2}
                            disabled={(date) => isBefore(date, startOfDay(new Date()))}
                            onDayMouseEnter={(date) => {
                              if (dateRange.from && !dateRange.to) {
                                setHoverDate(date)
                              }
                            }}
                            onDayMouseLeave={() => setHoverDate(null)}
                          />
                        </div>
                        <div className="p-4 border-t bg-muted/50">
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">Check-in:</span>
                              <span className={cn(
                                "transition-colors",
                                dateRange.from ? "text-primary" : "text-muted-foreground"
                              )}>
                                {dateRange.from ? format(dateRange.from, "LLL dd, y") : "Select date"}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">Check-out:</span>
                              <span className={cn(
                                "transition-colors",
                                (dateRange.to || (hoverDate && dateRange.from)) ? "text-primary" : "text-muted-foreground"
                              )}>
                                {dateRange.to ? (
                                  format(dateRange.to, "LLL dd, y")
                                ) : hoverDate && dateRange.from ? (
                                  format(hoverDate, "LLL dd, y")
                                ) : (
                                  "Select date"
                                )}
                              </span>
                            </div>
                            {(dateRange.from && (dateRange.to || hoverDate)) && (
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Duration:</span>
                                <span className="text-primary font-medium">
                                  {getNights()} night{getNights() !== 1 ? 's' : ''}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {totalPrice > 0 && (
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-lg">
                  <span>Total Price:</span>
                  <span className="font-bold">₦{totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {dateRange.from && (dateRange.to || hoverDate) &&
                    `${getNights()} night${getNights() !== 1 ? 's' : ''} at ₦${price.toLocaleString()} per night`
                  }
                </p>
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-[#978667] hover:bg-[#4B514C] text-white font-semibold" 
              size="lg" 
              disabled={isLoading || !dateRange.from || !dateRange.to}
            >
              {isLoading ? 'Processing...' : 'Book Now'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

