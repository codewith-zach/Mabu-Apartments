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
    from: z.date(),
    to: z.date(),
  }),
})

export function BookingForm({ roomTypeId, price, title }: { roomTypeId: string; price: number; title: string }) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: undefined,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      dateRange: {
        from: new Date(),
        to: undefined,
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

      const totalPrice = calculateTotalPrice();

      console.log('Submitting booking request with values:', {
        roomTypeId,
        checkIn: values.dateRange.from,
        checkOut: values.dateRange.to,
        name: values.name,
        email: values.email,
        totalPrice
      })

      // Simulating API calls
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Booking Submitted",
        description: "Your booking request has been submitted successfully.",
      })
    } catch (error) {
      console.error('Error in booking process:', error)
      toast({
        title: 'Error',
        description: 'An error occurred during the booking process. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
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
                  <Popover>
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={{
                          from: field.value?.from,
                          to: field.value?.to,
                        }}
                        onSelect={(range) => {
                          field.onChange(range);
                          setDateRange({
                            from: range?.from,
                            to: range?.to
                          });
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
            <Button type="submit" className="w-full bg-[#978667] hover:bg-[#4B514C] text-white font-semibold" size="lg" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Book Now'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

