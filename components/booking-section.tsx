'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Phone, Calendar } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function BookingSection() {
  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [currentViewMonth, setCurrentViewMonth] = useState(new Date())

  const rooms = [
    "Select Room",
    "Double Room",
    "Deluxe Room",
    "Superior Room",
    "Junior Suite"
  ]

  const generateCalendar = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayIndex = (firstDay.getDay() + 6) % 7 // Adjust to start week on Monday
    
    let calendar = []
    for (let i = 0; i < startingDayIndex; i++) {
      calendar.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push(new Date(year, month, i))
    }
    return calendar
  }

  const currentMonth = currentViewMonth.getMonth()
  const currentYear = currentViewMonth.getFullYear()
  const nextMonth = (currentMonth + 1) % 12
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear

  const currentMonthDays = generateCalendar(currentMonth, currentYear)
  const nextMonthDays = generateCalendar(nextMonth, nextMonthYear)

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const isDateSelected = (date: Date | null) => {
    return date && selectedDates.some(selectedDate => 
      selectedDate.getDate() === date.getDate() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getFullYear() === date.getFullYear()
    )
  }

  const handleDateClick = (date: Date | null) => {
    if (!date) return
    const newSelectedDates = isDateSelected(date)
      ? selectedDates.filter(selectedDate => 
          !(selectedDate.getDate() === date.getDate() &&
            selectedDate.getMonth() === date.getMonth() &&
            selectedDate.getFullYear() === date.getFullYear())
        )
      : [...selectedDates, date]
    setSelectedDates(newSelectedDates)
  }

  const renderCalendar = (days: (Date | null)[]) => (
    <div className="grid grid-cols-7 gap-2 text-center text-sm">
      {days.map((day, index) => (
        <button
          key={`day-${index}`}
          className={`p-2 rounded hover:bg-gray-100 ${
            day === null ? 'invisible' : ''
          } ${
            isDateSelected(day) ? 'bg-[#8B7355] text-white' : ''
          }`}
          onClick={() => handleDateClick(day)}
          disabled={day === null}
        >
          {day?.getDate()}
        </button>
      ))}
    </div>
  )

  const goToPreviousMonth = () => {
    setCurrentViewMonth(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const goToNextMonth = () => {
    setCurrentViewMonth(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  const selectToday = () => {
    const today = new Date()
    setSelectedDates([today])
    setCurrentViewMonth(today)
  }

  useEffect(() => {
    // Ensure the calendar view updates when selectedDates changes
    if (selectedDates.length > 0) {
      setCurrentViewMonth(selectedDates[selectedDates.length - 1])
    }
  }, [selectedDates])

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <div className="text-[#8B7355]">MABU APARTMENTS</div>
          <h2 className="text-4xl font-semibold mt-2 mb-4">Check Availability</h2>
          <p className="text-gray-600 mb-8">
            Planning your stay has never been easier. Find the perfect dates for your visit and secure your spot in just a few clicks!
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#8B7355]">
              <Phone size={20} />
              <div>
                <div className="text-sm">FOR INFORMATION</div>
                <div>+234 907 512 0963</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#8B7355]">
              <Phone size={20} />
              <div>
                <div className="text-sm">OR CALL</div>
                <div>+234 816 367 9671</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-16 w-full">
              <div className="flex-1 text-center">
                <div className="font-medium">{monthNames[currentMonth]}</div>
                <div className="text-sm text-gray-500">{currentYear}</div>
              </div>
              <div className="flex-1 text-center">
                <div className="font-medium">{monthNames[nextMonth]}</div>
                <div className="text-sm text-gray-500">{nextMonthYear}</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-end mb-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={selectToday}
              className="text-[#8B7355] border-[#8B7355] hover:bg-[#8B7355] hover:text-white"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Today
            </Button>
          </div>

          <div className="flex gap-8 mb-8">
            <div className="flex-1">
              <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-gray-500">{day}</div>
                ))}
              </div>
              {renderCalendar(currentMonthDays)}
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-gray-500">{day}</div>
                ))}
              </div>
              {renderCalendar(nextMonthDays)}
            </div>
          </div>

          <div className="grid gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Room" />
              </SelectTrigger>
              <SelectContent>
                {rooms.map((room) => (
                  <SelectItem key={room} value={room.toLowerCase()}>
                    {room}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span>Adults</span>
                  <div className="flex gap-4 items-center">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setAdults(Math.max(0, adults - 1))}
                    >
                      -
                    </Button>
                    <span>{adults}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setAdults(adults + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span>Children</span>
                  <div className="flex gap-4 items-center">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                    >
                      -
                    </Button>
                    <span>{children}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setChildren(children + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Name and Last Name" />
              <Input type="email" placeholder="Email" />
            </div>

            <Button className="w-full rounded-full">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

