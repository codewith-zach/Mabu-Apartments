'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

interface LeaveReviewFormProps {
  onClose: () => void
}

export function LeaveReviewForm({ onClose }: LeaveReviewFormProps) {
  const [rating, setRating] = useState(5)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the review data to your backend
    console.log('Review submitted')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Leave a Review</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" required />
            </div>
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="comment">Comment</Label>
              <Textarea id="comment" placeholder="Your review" required />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit Review</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

